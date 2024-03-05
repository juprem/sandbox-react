import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/sandbox-react/',
    server: {
        port: 3001,
        strictPort: true,
    },
    preview: {
        port: 3001,
        strictPort: true,
    },
    plugins: [
        TanStackRouterVite({ autoCodeSplitting: true }),
        react(),
        svgr(),
        eslintPlugin(),
        tsconfigPaths(),
        nodePolyfills({
            globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
        }),
    ],
    build: {
        outDir: 'build/',
    },
});
