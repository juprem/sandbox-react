import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
// @ts-ignore
import eslintPlugin from 'vite-plugin-eslint';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3000,
        strictPort: true,
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
    plugins: [react(), svgr(), TanStackRouterVite(), eslintPlugin(), tsconfigPaths()],
    build: {
        outDir: 'build/',
    },
});
