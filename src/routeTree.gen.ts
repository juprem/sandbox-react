/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TodoImport } from './routes/todo'
import { Route as MountingImport } from './routes/mounting'
import { Route as EnhancedSwitchImport } from './routes/enhanced-switch'
import { Route as DraggableMotionImport } from './routes/draggable-motion'
import { Route as CrashTestImport } from './routes/crash-test'
import { Route as ConwayGameImport } from './routes/conway-game'
import { Route as CodeDisplayImport } from './routes/code-display'
import { Route as BasicAnimationImport } from './routes/basic-animation'
import { Route as TodoTodoIdImport } from './routes/todo_.$todoId'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const TodoRoute = TodoImport.update({
  path: '/todo',
  getParentRoute: () => rootRoute,
} as any)

const MountingRoute = MountingImport.update({
  path: '/mounting',
  getParentRoute: () => rootRoute,
} as any)

const EnhancedSwitchRoute = EnhancedSwitchImport.update({
  path: '/enhanced-switch',
  getParentRoute: () => rootRoute,
} as any)

const DraggableMotionRoute = DraggableMotionImport.update({
  path: '/draggable-motion',
  getParentRoute: () => rootRoute,
} as any)

const CrashTestRoute = CrashTestImport.update({
  path: '/crash-test',
  getParentRoute: () => rootRoute,
} as any)

const ConwayGameRoute = ConwayGameImport.update({
  path: '/conway-game',
  getParentRoute: () => rootRoute,
} as any)

const CodeDisplayRoute = CodeDisplayImport.update({
  path: '/code-display',
  getParentRoute: () => rootRoute,
} as any)

const BasicAnimationRoute = BasicAnimationImport.update({
  path: '/basic-animation',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TodoTodoIdRoute = TodoTodoIdImport.update({
  path: '/todo/$todoId',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/basic-animation': {
      preLoaderRoute: typeof BasicAnimationImport
      parentRoute: typeof rootRoute
    }
    '/code-display': {
      preLoaderRoute: typeof CodeDisplayImport
      parentRoute: typeof rootRoute
    }
    '/conway-game': {
      preLoaderRoute: typeof ConwayGameImport
      parentRoute: typeof rootRoute
    }
    '/crash-test': {
      preLoaderRoute: typeof CrashTestImport
      parentRoute: typeof rootRoute
    }
    '/draggable-motion': {
      preLoaderRoute: typeof DraggableMotionImport
      parentRoute: typeof rootRoute
    }
    '/enhanced-switch': {
      preLoaderRoute: typeof EnhancedSwitchImport
      parentRoute: typeof rootRoute
    }
    '/mounting': {
      preLoaderRoute: typeof MountingImport
      parentRoute: typeof rootRoute
    }
    '/todo': {
      preLoaderRoute: typeof TodoImport
      parentRoute: typeof rootRoute
    }
    '/todo/$todoId': {
      preLoaderRoute: typeof TodoTodoIdImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  BasicAnimationRoute,
  CodeDisplayRoute,
  ConwayGameRoute,
  CrashTestRoute,
  DraggableMotionRoute,
  EnhancedSwitchRoute,
  MountingRoute,
  TodoRoute,
  TodoTodoIdRoute,
])

/* prettier-ignore-end */
