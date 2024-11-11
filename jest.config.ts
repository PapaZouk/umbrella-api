import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'tsx', 'tsx', 'js'],
    rootDir: './test',
    testRegex: '.*\\.test\\.ts$',
}

export default config;