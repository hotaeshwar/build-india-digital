import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Allows access from other devices
    port: 3001, // Ensure this matches your ngrok port
    strictPort: true, // Ensures the port doesn't change
    allowedHosts: [
      ".ngrok-free.app", // Allow ngrok URLs
      "buildingindiadigital.com", // Allow this specific host
    ],
  },
});
