import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import postcssNesting from "postcss-nesting";
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	css: {
		postcss: {
			plugins: [postcssNesting, autoprefixer],
		},
	},
});
