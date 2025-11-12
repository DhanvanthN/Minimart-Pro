export default {
  testEnvironment: "node",
  transform: {}, // keep this for native ESM
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
