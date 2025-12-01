export const siteConfig = {
  features: {
    showSolutions: false,
    showResources: true,
    showIntegrations: false,
    showSecurityCompliance: false,
    showCaseStudies: false,
    showFooterSolutions: false,
    showFooterIntegrations: false,
    showFooterResources: false,
  },
  site: {
    name: 'Momentum',
    description: 'Smart Staff Scheduling For Healthcare',
  },
} as const;

export type FeatureFlags = typeof siteConfig.features;
