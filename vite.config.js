import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// Load environment variables for the local Express API
dotenv.config()

// Import the Express app
import apiApp from './api/index.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'express-backend-plugin',
      configureServer(server) {
        // Mount the Express app directly onto the Vite development server
        server.middlewares.use((req, res, next) => {
          if (req.url.startsWith('/api')) {
            apiApp(req, res, next);
          } else {
            next();
          }
        });
      }
    }
  ],
})
