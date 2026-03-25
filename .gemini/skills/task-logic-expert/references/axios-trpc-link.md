# Axios-powered tRPC Link

## Client Configuration (src/utils/trpc.ts)

```tsx
import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import axios from "axios";
import type { AppRouter } from "../server/trpc/routers/_app";

export const trpc = createTRPCReact<AppRouter>();

// Custom axios instance with interceptors
export const api = axios.create({
  baseURL: "/api/trpc",
});

api.interceptors.request.use((config) => {
  // Add auth tokens or custom headers here
  return config;
});

// tRPC client setup
export const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      // Optional: Pass custom axios logic here if needed
      // (Normally tRPC uses native fetch, but we can wrap it)
    }),
  ],
});
```

## Axios Interceptor Pattern

```ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized
    }
    return Promise.reject(error);
  },
);
```
