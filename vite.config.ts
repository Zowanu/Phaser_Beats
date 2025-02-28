import { defineConfig,normalizePath } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from "path";

export default defineConfig({
    build: {
        assetsInlineLimit: 0,
    },
    base: './',
    plugins: [
        viteStaticCopy({
            targets: [
                {
                  src: normalizePath(resolve(__dirname, "src/assets/*")),
                  dest: normalizePath(resolve(__dirname, "dist/assets")),
                },
              ]
        })
    ],
    server: {
        hmr: {
         host: 'localhost',
        },
    },
});