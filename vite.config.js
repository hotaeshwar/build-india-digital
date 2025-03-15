import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows access from other devices
    port: 3001, // Ensure this matches your ngrok port or custom domain
    strictPort: true, // Ensures the port doesn't change
    cors: {
      origin: ["https://buildingindiadigital.com", "https://*.ngrok-free.app"], // Allow specific domains
      credentials: true,
    },
    hmr: {
      clientPort: 443, // Important for HTTPS environments
    },
  },
  preview: {
    port: 3001,
    cors: {
      origin: ["https://buildingindiadigital.com", "https://*.ngrok-free.app"],
      credentials: true,
    },
  },
});
