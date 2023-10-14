/** @type {import('jest').Config} */
const config = {
  transform: { "^.+\\.ts?$": "ts-jest" },
  testEnvironment: "jsdom",
  testRegex: "/tests/.*\\.(test|spec)?\\.(ts|tsx)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["jest-canvas-mock"],
  verbose: true
};

export default config;
