module.exports = {
  setupFilesAfterEnv: ["./src/setupTests.ts"], // Set up your test environment
  testEnvironment: "jsdom", // Simulate a browser environment
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest", // Transform JS/TS/JSX/TSX with Babel
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy", // Mock CSS imports for tests
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"], // Recognize JS and TS file extensions
};
