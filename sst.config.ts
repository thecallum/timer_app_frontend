import { SSTConfig } from 'sst'
import { Config, NextjsSite } from 'sst/constructs'

export default {
  config() {
    return {
      name: 'timer-app-frontend',
      region: 'eu-west-2',
    }
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const SERVICE_API_KEY = new Config.Secret(stack, 'SERVICE_API_KEY')
      const SERVICE_API_URL = new Config.Secret(stack, 'SERVICE_API_URL')

      const site = new NextjsSite(stack, 'site', {
        bind: [SERVICE_API_KEY, SERVICE_API_URL],
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
