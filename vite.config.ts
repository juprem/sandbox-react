import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import { defineConfig } from 'vite';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import viteReact from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        port: 3001,
        strictPort: true,
    },
    preview: {
        port: 3001,
        strictPort: true,
    },
    plugins: [
        tsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tanstackStart({
            srcDirectory: 'src',
        }),
        viteReact({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        svgr(),
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
