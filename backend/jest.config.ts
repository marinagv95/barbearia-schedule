export default {
  preset: "ts-jest",
  testEnvironment: "node",

  setupFilesAfterEnv: ["<rootDir>/tests/setup.ts"],

  testTimeout: 30000,

  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }]
  },

  moduleFileExtensions: ["ts", "js", "json"],

  clearMocks: true,
};