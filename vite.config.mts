/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "",
    server: {
        open: true
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./setupTest.ts"],
        coverage: {
            provider: "istanbul", // or 'v8'
            reporter: ["text", "json", "html"]
        }
    }
});
