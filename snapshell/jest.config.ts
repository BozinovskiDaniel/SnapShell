import type { Config } from 'jest'
import nextJest from 'next/jest.js'
 
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})
 
// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Specific mapping for components
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    // General mapping for any other @/ prefixed paths
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/jest.setup.ts'],
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/src/__tests__/jest.setup.ts'],
}
 
// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)