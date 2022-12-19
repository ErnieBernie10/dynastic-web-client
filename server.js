import { createRequestHandler } from "@remix-run/vercel";

export default createRequestHandler({
  // eslint-disable-next-line global-require
  build: require("./build"),
  mode: process.env.NODE_ENV,
});
