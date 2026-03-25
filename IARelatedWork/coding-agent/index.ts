import { runPlannerAgent } from './agents/planner.js'
import { runCoderAgent } from './agents/coder.js'
import { runReviewerAgent } from './agents/reviewer.js'
import { runTestRunnerAgent } from './agents/testRunner.js'
import type { PlanStep, ReviewIssue, PipelineResult } from './types.js'

const MAX_REVIEW_RETRIES = 3

// ---------------------------------------------------------------------------
// Dependency-aware batch builder
// ---------------------------------------------------------------------------

function buildExecutionBatches(steps: PlanStep[]): PlanStep[][] {
  const completed = new Set<string>()
  const remaining = [...steps]
  const batches: PlanStep[][] = []

  while (remaining.length > 0) {
    const ready = remaining.filter((s) => s.dependsOn.every((dep) => completed.has(dep)))
    if (ready.length === 0) throw new Error('Circular dependency detected in plan steps')
    batches.push(ready)
    ready.forEach((s) => {
      completed.add(s.id)
      remaining.splice(remaining.indexOf(s), 1)
    })
  }

  return batches
}

// ---------------------------------------------------------------------------
// Single step: coder + incremental reviewer loop
// ---------------------------------------------------------------------------

async function executeStepWithReview(step: PlanStep): Promise<string[]> {
  let reviewFeedback: ReviewIssue[] | undefined

  for (let attempt = 1; attempt <= MAX_REVIEW_RETRIES; attempt++) {
    console.log(`\n  [step:${step.id}] coder attempt ${attempt}/${MAX_REVIEW_RETRIES}`)
    const coderResult = await runCoderAgent(step, reviewFeedback)

    if (!coderResult.success) {
      console.warn(`  [step:${step.id}] coder reported failure`)
      return coderResult.changes.map((c) => c.path)
    }

    const writtenPaths = coderResult.changes.map((c) => c.path)
    console.log(`  [step:${step.id}] reviewing ${writtenPaths.length} file(s) in parallel`)

    const reviewResults = await Promise.all(writtenPaths.map(runReviewerAgent))
    const criticalIssues = reviewResults.flatMap((r) => r.issues.filter((i) => i.severity === 'critical'))

    if (criticalIssues.length === 0) {
      console.log(`  [step:${step.id}] approved ✓`)
      return writtenPaths
    }

    console.log(`  [step:${step.id}] ${criticalIssues.length} critical issue(s) — retrying`)
    reviewFeedback = criticalIssues

    if (attempt === MAX_REVIEW_RETRIES) {
      console.warn(`  [step:${step.id}] max retries reached with unresolved issues`)
      return writtenPaths
    }
  }
  return []
}

// ---------------------------------------------------------------------------
// Main pipeline
// ---------------------------------------------------------------------------

export async function runCodingPipeline(goal: string): Promise<PipelineResult> {
  const allFilesChanged: string[] = []

  // Phase 1 — Plan
  console.log('\n[pipeline] Phase 1 — Planning')
  const plan = await runPlannerAgent(goal)
  console.log(`[pipeline] ${plan.steps.length} step(s) planned`)
  plan.steps.forEach((s) => console.log(`  - [${s.id}] ${s.description}`))

  // Phase 2 — Implement (parallel batches + incremental review)
  console.log('\n[pipeline] Phase 2 — Implementation')
  const batches = buildExecutionBatches(plan.steps)

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i]
    console.log(`\n[pipeline] Batch ${i + 1}/${batches.length}: ${batch.length} step(s) running in parallel`)

    const batchResults = await Promise.all(batch.map(executeStepWithReview))
    allFilesChanged.push(...batchResults.flat())
  }

  // Phase 3 — Test + auto-patch
  console.log('\n[pipeline] Phase 3 — Testing')
  const testResult = await runTestRunnerAgent()

  return {
    success: true,
    message: testResult.passed
      ? `Done. ${allFilesChanged.length} file(s) changed — all tests passing.`
      : `Done. ${allFilesChanged.length} file(s) changed — some tests still failing after auto-patch.`,
    filesChanged: allFilesChanged,
    testsPassed: testResult.passed,
    batches: batches.length,
  }
}

// ---------------------------------------------------------------------------
// CLI entry point
// ---------------------------------------------------------------------------

const goal = process.argv[2]

if (!goal) {
  console.error('Usage: npx tsx coding-agent/index.ts "<feature description>"')
  process.exit(1)
}

const result = await runCodingPipeline(goal)
console.log('\n[pipeline] Result:')
console.log(JSON.stringify(result, null, 2))
