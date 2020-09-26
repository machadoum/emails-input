import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import nested from "postcss-nested";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "iife",
      name: "EmailsInput",
    },
  ],
  plugins: [
    typescript({
      typescript: require("typescript"),
    }),
    postcss({
      plugins: [nested()],
    }),
    serve(),
    livereload(),
  ],
};
