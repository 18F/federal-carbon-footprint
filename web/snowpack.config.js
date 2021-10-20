const config = require("./project-config");

const BASEURL = process.env.BASEURL || "";
const GITHUB = {
  owner: process.env.OWNER || "18F",
  repository: process.env.REPOSITORY || "federal-carbon-footprint",
  branch: process.env.BRANCH || "main",
};

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  alias: {
    "@footprint": "./src",
  },
  env: {
    BASEURL,
    GITHUB,
  },
  mount: {
    src: { url: "/dist" },
    [config.PUBLIC_PATH]: { url: "/", static: true },
    "node_modules/uswds/dist/fonts": { url: "/uswds/fonts", static: true },
    "node_modules/uswds/dist/img": { url: "/uswds/img", static: true },
    "node_modules/uswds/dist/js": { url: "/uswds/js", static: true },
  },
  plugins: [
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-postcss",
    [
      "@snowpack/plugin-sass",
      {
        loadPath: "./node_modules/uswds/dist/scss",
      },
    ],
    "@snowpack/plugin-webpack",
    [
      "@snowpack/plugin-typescript",
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: "yarn pnpify tsc" } : {}),
      },
    ],
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    baseUrl: BASEURL,
  },
};
