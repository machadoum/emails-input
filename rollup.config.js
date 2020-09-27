import typescriptPlugin from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import nested from "postcss-nested";
import cssvariables from "postcss-css-variables";
import typescript from "typescript";
import functions from "postcss-functions";
import { terser } from "rollup-plugin-terser";
import postcssImport from "postcss-import";
import pkg from "./package.json";

const production = !process.env.ROLLUP_WATCH;

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
    typescriptPlugin({
      typescript,
    }),
    postcss({
      minimize: production,
      plugins: [
        cssvariables(),
        postcssImport(),
        nested(),
        functions({
          functions: {
            px(value) {
              return `${value / 16}rem`;
            },
          },
        }),
      ],
    }),
    !production && serve(),
    !production && livereload(),
    production && terser(),
  ],
};
