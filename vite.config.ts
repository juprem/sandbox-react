import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3001,
        strictPort: true,
    },
    preview: {
        port: 3000,
        strictPort: true,
    },
    plugins: [react(), svgr(), TanStackRouterVite(),],
    build: {
        outDir: 'build/',
    },
});
