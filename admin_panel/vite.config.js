import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'; // ✅ correct spelling

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
