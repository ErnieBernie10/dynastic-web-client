/** @type {import('@remix-run/dev').AppConfig} */
// remix.config.js
// eslint-disable-next-line import/no-extraneous-dependencies
const { withEsbuildOverride } = require("remix-esbuild-override");
// eslint-disable-next-line import/no-extraneous-dependencies
const svgrPlugin = require("esbuild-plugin-svgr");

/**
 * Define callbacks for the arguments of withEsbuildOverride.
 * @param option - Default configuration values defined by the remix compiler
 * @param isServer - True for server compilation, false for browser compilation
 * @param isDev - True during development.
 * @return {EsbuildOption} - You must return the updated option
 */
withEsbuildOverride((option, { isServer, isDev }) => {
  // update the option
  // eslint-disable-next-line no-param-reassign
  option.plugins = [svgrPlugin({ ref: true }), ...option.plugins];

  return option;
});
module.exports = {
  serverBuildTarget: "node",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/index.js",
  // publicPath: "/build/",
  watchPaths: ["./packages/**/*"],
};
