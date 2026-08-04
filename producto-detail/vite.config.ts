import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    build:{
        lib: {
            entry: resolve(__dirname, 'src/my-element.ts'),
            name: 'ProductoDetail',
            fileName: 'producto-detail',
            formats: ['es']
        }
    }
});