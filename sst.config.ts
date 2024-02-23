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
      const SERVICE_API_URL = new Config.Secret(stack, 'SERVICE_API_URL')
      const CLIENT_SECRET = new Config.Secret(stack, 'CLIENT_SECRET')

      const site = new NextjsSite(stack, 'site', {
        bind: [SERVICE_API_URL, CLIENT_SECRET],
        customDomain: {
          domainName:
            stack.stage === 'production'
              ? 'timer-app.thecallum.com'
              : 'timer-app-development.thecallum.com',
          hostedZone: 'thecallum.com',
        },
        environment: {
          NEXT_PUBLIC_AUTH_DOMAIN: process.env.AUTH_DOMAIN ?? '',
          NEXT_PUBLIC_CLIENT_ID: process.env.CLIENT_ID ?? '',
          NEXT_PUBLIC_BASE_URL: process.env.BASE_URL ?? '',
          NEXT_PUBLIC_AUDIENCE: process.env.AUDIENCE ?? '',
          NEXT_PUBLIC_REDIRECT_URI: process.env.REDIRECT_URI ?? '',
          COOKIE_DOMAIN:
            stack.stage === 'production'
              ? 'timer-app.thecallum.com'
              : 'timer-app-development.thecallum.com',
        },
      })

      stack.addOutputs({
        SiteUrl: site.url,
      })
    })
  },
} satisfies SSTConfig
