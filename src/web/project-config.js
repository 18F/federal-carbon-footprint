/**
 * Define project-wide configuration settings.
 * Note that this is a CommonJS module so it may be used in
 * `snowpack.config.js` as well as application code.
 */

const { join } = require("path");

// This should map to the directory containing the package.json.
// By convention, assume that the originating process was run from the root
// directory.
const PROJECT_ROOT = process.cwd();

module.exports = {
  PUBLIC_PATH: join(PROJECT_ROOT, "public"),
};
