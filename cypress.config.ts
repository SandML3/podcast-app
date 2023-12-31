import {
    defineConfig
} from 'cypress'

export default defineConfig({

  e2e: {
    'baseUrl': 'http://localhost:3000',
    testIsolation: false,
    video: false
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts'
  }

})