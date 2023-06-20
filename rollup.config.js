import babel from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/index.js",
    format: "umd",
    name: "ReactUseGamepads",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    }
  },
  plugins: [
    typescript(),
    babel({
      exclude: "node_modules/**",
      extensions: [".tsx", ".ts"],
      babelHelpers: "bundled",
    }),
  ],
  external: ["react", "react-dom"],
  globals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};