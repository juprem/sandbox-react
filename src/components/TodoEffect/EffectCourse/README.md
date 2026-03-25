# Effect Library Course: Todo App Examples

This course provides a comprehensive guide to using the **Effect** library within a TypeScript/React environment, using a Todo application as a practical example.

## What is Effect?
Effect is a powerful TypeScript library designed to help developers build complex, type-safe, and highly maintainable applications. It provides a unified system for:
- **Error Management**: Handling errors explicitly with type safety.
- **Dependency Injection**: Managing services and resources cleanly.
- **Concurrency**: Writing asynchronous code without the pitfalls of Promises.
- **Observability**: Built-in logging, tracing, and metrics.

## Course Structure

1. **[Models & Schemas](./Schema.ts)**: Using `Effect.Schema` for robust data modeling and validation.
2. **[Custom Errors](./Errors.ts)**: Defining type-safe error structures.
3. **[Service Definitions](./Service.ts)**: Creating abstract services (Tags) and implementations.
4. **[Repositories & Logic](./Repository.ts)**: Implementing business logic using generators (`Effect.gen`).
5. **[Layers & Composition](./App.ts)**: Composing services and running the final program.
6. **[TanStack Query Integration](./TanStackQuery.ts)**: Bridging Effect with React query hooks.

## Core Concepts

### `Effect<Value, Error, Requirements>`
The central type in the library. It describes a program that:
- Returns a **Value**.
- Might fail with an **Error**.
- Needs some **Requirements** (Context/Services) to run.

### `Effect.gen`
The most common way to write Effect code. It uses generator functions (`yield*`) to handle asynchronous and effectful operations in a flat, readable style, similar to `async/await`.

### `Layer`
A way to construct and provide services. Layers can depend on other layers, making dependency management modular and testable.
