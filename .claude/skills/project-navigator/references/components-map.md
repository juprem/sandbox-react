# Components Map

All components live under `src/components/`. Each entry shows the root file and notable sub-files.

## AdventOfCode
`question1/question1.ts`, `question1/r.ts` — Advent of Code puzzle solutions.

## AutoResizeText
`AutoResizeText.tsx` — Auto-resizing textarea.

## Calendar ⭐ (complex)
```
Calendar.tsx                         ← entry point
CalendarHeader/
  CalendarHeader.tsx, MonthHeader.tsx, SelectMonth.tsx, WeekHeader.tsx
CalendarBody/CalendarBody.tsx
CalendarWeekBody/CalendarWeekBody.tsx
DayCell/
  DayCell.tsx, DayNumber.tsx, EmptyCell.tsx
  DayContent/
    DayContent.tsx, DayContentHeader.tsx, DayContentBody/
      DayContentBody.tsx, DayDisplayMode.tsx
      Hours/Hours.tsx, HourSection/
    AddRdv/AddRdv.tsx
    model/DisplayMode.ts
DaysHeader/DaysHeader.tsx
hooks/dayContext.ts
model/CalendarModel.ts
store/useCalendarStore.ts            ← Zustand store
utils/constructMonth.ts, constructWeek.ts
```

## Canvas ⭐
```
Canvas.tsx
WhiteBoard/
  WhiteBoard.tsx, CanvasDrawing.tsx
  DrawingControls/ (ColorControl, DrawingControls, FormDrawingSelect)
  hooks/useCanvasSizeInit.ts
  models/CanvasModel.ts
  stateManager/WhiteBoardState.ts
```

## Card / CardTodo
`Card.tsx` + `ActionButton/` — generic card.  
`CardTodo/TodoCard.tsx`, `CardContent.tsx` — todo-specific card.

## CodeDisplay ⭐ (reusable)
```
CodeDisplay.tsx                      ← demo page
PreviewCode.tsx                      ← <pre> wrapper for shiki
MultiPageCodeShiki/
  CodeDisplayShiki.tsx               ← REUSABLE: shiki highlighter component
  MultiPageCodeShiki.tsx
  ExampleCode.tsx
```
**Use `CodeDisplayShiki` when you need syntax highlighting in any component.**

## CompoundComponent
`CompoundComponent.tsx` — React compound component pattern demo.

## CSSAmusement
`BorderAnimation.tsx`, `FlexExpansionPlusElementAppereance.tsx`, `HasSelector.tsx`, `LightItUp.tsx`, `ScrollAppearance.tsx`, `SelectedAnim.tsx`, `StickyPosition.tsx` — various CSS technique demos.

## CustomFetch
`UsingCustomTanstackQuery.tsx` — custom TanStack Query usage.

## CustomModal
`CustomModal.tsx`, `CustomModalHeader.tsx` — CSS Modules modal.

## CustomTags
`CustomTags.tsx` — custom tag input component.

## DomManipulation
`FunctionRef.tsx` — ref callback demo.

## EffectTodo ⭐ (Effect library course)
```
index.tsx                            ← EffectTodo navigator (entry point)
chapters/
  Ch01Intro.tsx                      ← What is Effect? Mental model
  Ch02BasicEffects.tsx               ← succeed, fail, sync, run
  Ch03Pipelines.tsx                  ← pipe, map, flatMap, tap
  Ch04ErrorHandling.tsx              ← TaggedError, catchTag, match
  Ch05EffectGen.tsx                  ← Generator syntax
  Ch06Services.tsx                   ← Context.Tag, Layer, provide
  Ch07TodoApp.tsx                    ← Full todo app demo
shared/
  CodeBlock.tsx                      ← REUSABLE: shiki block for Effect course
  Callout.tsx                        ← info/tip/warning/concept callout
  ChapterLayout.tsx                  ← chapter wrapper + Section helper
```

## FileHeader
`FileHeader.tsx` — file/section header display.

## FilterConstruction
`DataDisplay.tsx`, `fakeData.ts` — filter UI demo.

## Flex / LayoutBlock
`Flex.tsx` — flex container demo.  
`LayoutBlock/Centered.tsx`, `CenteredBlock.tsx`, `Separator.tsx` — layout primitives.

## FormAntdWrapper
`FormAntdWrapper.tsx`, `FormItemWrapper.tsx`, `InputForm.tsx` — Ant Design form wrapper utilities.

## GameOfLife ⭐
```
ConwayGame.tsx / LifeGame.tsx / Cell.tsx / Rules.tsx / calculation.ts  ← v1
GameOfLifeV2/
  ConwayGameV2.tsx, ConwayDashboard.tsx
  gridCalculation.ts (+ .test.ts)
```

## InfiniteScrolling
`InfiniteScrolling.tsx`, `InfiniteQueryPage.tsx`, `InfiniteLoadingContainer.tsx`, `InfiniteScrollingCard.tsx`, `useInfiniteScrolling.ts`, `useIntersectionNextPage.ts`

## Layout ⭐ (app shell)
```
Sidebar.tsx     ← left nav sidebar (receives children: the route links)
Content.tsx     ← main content area wrapper
Breadcrumbs.tsx ← breadcrumb bar
```
These are rendered by `__root.tsx` and persist across all routes.

## MineSweeper ⭐
```
MineSweeper.tsx
Difficulty/DifficultySelector.tsx
Grid/Grid.tsx, GridContent.tsx, GameStatus.tsx
Grid/Cell/ (Cell, CellContent, RevealCell)
Reset/Reset.tsx
generator/generator.ts
hooks/useCellListener.ts
models/cell.ts, difficulty.ts
statusHandling/ (changeStatus, gridStatushandling, un.test.ts)
```

## ModalDrag
`ModalDrag.tsx`, `DraggableModalContainer.tsx`, `Drag.tsx`, `CustomModalButton.tsx`, `TitleRender.tsx` — draggable Ant Design modal.

## MotionAnimation
`BasicAnimation.tsx`, `DraggableMotion.tsx`, `EnhancedSwitch.tsx`, `BackgroundMove.tsx`, `CubeAnimation.tsx`, `InfiniteAnimation.tsx`, `ProgressBar.tsx`, `SpinningElement.tsx`, `StickyAnimation.tsx`, `Settings/SliderMotion.tsx`

## MountingTest
`MountingTesting.tsx`, `MountingTesting2.tsx`, `MoutingTestBase.tsx` — mount lifecycle demos.

## MultiSelect ⭐
```
MultiSelect.tsx
MultiSelectControl/ (MultiSelectControl, MultiSelectTag)
MultiSelectDropdown/MultiSelectDropdown.tsx
MultiSelectOption/ (MultiSelectOption, MultiSelectOptionGroup)
hooks/useSelectOptions.ts
model/Option.ts
```

## OptimisticDeepDive
`OptimisticWrapper.tsx`, `OptimisticInput.tsx` — React 19 optimistic updates demo.

## Pedantix ⭐
```
Pedantix.tsx → PedantixBoard.tsx, PedantixInput.tsx, PedantixWinSection.tsx
PedantixHeader/PedantixHeader.tsx
Word/Word.tsx
hooks/PedantixStore.ts   ← Zustand store
service/pedantixService.ts
```

## React19
`React19.tsx`, `FormTypeZod.tsx`, `OptimisticUpdate/OptimisticUpdate.tsx` — React 19 feature demos.

## ReactCssTree
`ReactCssTree.tsx`, `Row.tsx`, `BaseRowType.ts` — recursive CSS tree visualization.

## RPG ⭐
```
RPGCanvas.tsx
model/ (BaseStat, Monster, Player, Qualifier, Weapon)
store/ (BattleStore.ts, PlayerStore.ts)   ← Zustand stores
```

## SandPile
`SandPileGrid.tsx` — Abelian sandpile simulation.

## Snake
`SnakeBoard.tsx`, `Dashboard.tsx`, `Snake.ts` — Snake game.

## Sonner
`SonnerSandbox.tsx` — Sonner toast notifications demo.

## Sudoku
```
Sudoku.tsx, Cell.tsx, CalculateCell.tsx
hooks/useSudokuStore.ts   ← Zustand
utils/ (createGrid, getBorderColor, gridCalculator, utils.test.ts)
```

## SuspenseTesting
`React18Suspense.tsx` — Suspense/lazy loading demo.

## Tetris ⭐
```
Tetris.tsx, TetrisGrid.tsx, NextFormGrid.tsx
positionReducer.ts
formModel/formModel.ts
utils/formManager.ts (+ .test.ts)
```

## TextSection
`TextSection.tsx` — text display section.

## TodoEffect
```
models/Todo.ts
services/TodoService.ts
EffectCourse/
  App.ts, Errors.ts, Repository.ts, Schema.ts, Service.ts, TanStackQuery.ts
  README.md
```
Pure Effect 3.x service/repository pattern (non-UI, reference implementation).

## UseReducerTest
`UseReducerTest.tsx` — useReducer patterns.

## VanillaForm
`VanillaForm.tsx`, `ErrorDisplay.tsx`, `FormType.ts` — uncontrolled form demo.

## ViewTransition
`BasicViewTransition.tsx` — View Transitions API demo.

## VirtualizedList
`VirtualizedList.tsx` — TanStack Virtual list.

## WebComponent
`WebComponent.tsx` — Web Components integration.

## WithSkeleton
`WithSkeleton.tsx`, `Skeleton.tsx`, `WithSuspenseSkeleton.tsx` — skeleton loading patterns.

## xstate
`XState.tsx` — XState v5 state machine demo.

---

## Misc small components (single-file)
| Dir | File | Purpose |
|---|---|---|
| `componentElipsis` | `ComponentElipsis.ts` | Text ellipsis utility |
| `crashTest` | `CrashTest.tsx` | Error boundary test |
| `iterator` | `GridGenerator.ts`, `generatorFunctionHelper.ts` | JS generator demos |
| `renderTesting` | `RenderTesting.tsx`, `BasicComponent.tsx` | Render cycle test |
| `useVirtualResponsiveColumn` | `useResponsiveColumn.ts` | Virtual responsive column hook |
| `LayoutWithTopContent` | `LayoutWithTopContent.tsx` | Layout with sticky top |
