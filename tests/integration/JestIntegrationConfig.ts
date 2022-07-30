export default {
  coverageProvider: "v8",
  moduleDirectories: ["node_modules", "src"],
  testEnvironment: "node",
  testRegex: ".integration-spec.ts$",
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
}
