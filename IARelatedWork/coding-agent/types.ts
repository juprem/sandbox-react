export interface PlanStep {
  id: string
  description: string
  filesToCreate: string[]
  filesToModify: string[]
  dependsOn: string[]
}

export interface ImplementationPlan {
  goal: string
  steps: PlanStep[]
}

export interface CodeChange {
  path: string
  operation: 'create' | 'modify'
}

export interface CoderResult {
  stepId: string
  changes: CodeChange[]
  success: boolean
  errorMessage?: string
}

export interface ReviewIssue {
  severity: 'critical' | 'suggestion'
  filePath: string
  message: string
}

export interface ReviewResult {
  filePath: string
  approved: boolean
  issues: ReviewIssue[]
}

export interface TestFailure {
  testName: string
  errorMessage: string
}

export interface TestResult {
  passed: boolean
  failures: TestFailure[]
  rawOutput: string
}

export interface PipelineResult {
  success: boolean
  message: string
  filesChanged: string[]
  testsPassed: boolean
  batches: number
}
