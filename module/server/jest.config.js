module.exports = {
  "roots": [
    "src",
    "lib"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "js"
  ],
  "moduleNameMapper": {
    "^@util/(.*)$": "<rootDir>/lib/util/$1.ts",
    "^@chat/(.*)$": "<rootDir>/lib/chat/$1.ts"
  },
  "globals": {
    "ts-jest": {
      "tsConfig": "./tsconfig.json"
    }
  }
};
