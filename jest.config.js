const config = {
    transform: {'^.+\\.ts?$': 'ts-jest'},
    testEnvironment: 'jsdom',
    testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    setupFiles: ["jest-canvas-mock"]
  }

export default config