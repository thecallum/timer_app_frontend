import { SSTConfig } from 'sst'
import { NextjsSite } from 'sst/constructs'

export default {
  config(_input) {
    return {
      name: 'timer-app-frontend',
      region: 'eu-west-2',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, 'site', {
        customDomain:
          stack.stage === 'production'
            ? 'timer-app.thecallum.com'
            : 'timer-app-development.thecallum.com',
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
