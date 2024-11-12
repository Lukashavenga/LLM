import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
  roots: ['<rootDir>'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths || {}, { prefix: '<rootDir>/' }),
    '^react-markdown$': '<rootDir>/node_modules/react-markdown/index.js'
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.jsx?$': 'babel-jest',
    '.+\\.(css|less|sass|scss|png|jpg|gif|ttf|woff|woff2|svg)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(react-markdown)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
};

export default config;