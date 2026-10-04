import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import json from "@rollup/plugin-json";

// The release bundle is committed (HACS installs it straight from dist/), so it
// ships without a source map: the .map is git-ignored, and a referenced but
// missing map only produces 404s in the browser console. `npm run watch` still
// emits one locally for debugging.
const watch = !!process.env.ROLLUP_WATCH;

export default {
  input: "src/index.ts",
  output: {
    file: "dist/xiaomi-smart-pet-fountain-2-card.js",
    format: "es",
    sourcemap: watch,
  },
  plugins: [
    resolve(),
    commonjs(),
    json(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: false,
      sourceMap: watch,
    }),
    terser(),
  ],
};
