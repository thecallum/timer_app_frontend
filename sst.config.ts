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
        environment: {
          API_KEY: process.env.SERVICE_API_KEY ?? '',
          API_URL: process.env.SERVICE_API_URL ?? '',
        },
        customDomain: {
          domainName:
            stack.stage === 'production'
              ? 'timer-app.thecallum.com'
              : 'timer-app-development.thecallum.com',
          hostedZone: 'thecallum.com',
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
