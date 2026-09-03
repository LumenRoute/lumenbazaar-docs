// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'introduction',
    'getting-started',
    {
      type: 'category',
      label: 'Project',
      items: [
        'project/positioning',
        'project/problem-and-goals',
        'project/personas',
        'project/non-goals',
      ],
    },
    {
      type: 'category',
      label: 'Architecture',
      items: [
        'architecture/overview',
        'architecture/payment-flow',
        'architecture/discovery-flow',
        'architecture/trust-model',
        'architecture/repository-map',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/seller-guide',
        'guides/buyer-guide',
        'guides/agent-guide',
        'guides/operator-guide',
        'guides/testnet-guide',
        'guides/mainnet-guide',
      ],
    },
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api-reference/facilitator',
        'api-reference/discovery',
        'api-reference/resources',
        'api-reference/payments',
        'api-reference/mcp',
      ],
    },
    {
      type: 'category',
      label: 'Contracts',
      items: [
        'contracts/upto-session',
        'contracts/policy-wallet-example',
        'contracts/deployment',
      ],
    },
    {
      type: 'category',
      label: 'SDKs',
      items: [
        'sdks/seller-sdk',
        'sdks/buyer-sdk',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'examples/paid-weather-api',
        'examples/paid-rag-api',
        'examples/paid-mcp-tool',
      ],
    },
    {
      type: 'category',
      label: 'Security',
      items: [
        'security/threat-model',
        'security/dependency-policy',
        'security/disclosure-policy',
        'security/audit-readiness',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/self-hosting',
        'operations/monitoring',
        'operations/incident-response',
        'operations/runbook',
        'operations/publishing',
        'operations/maintenance',
      ],
    },
    {
      type: 'category',
      label: 'Funding',
      items: [
        'funding/scf-rfp-proposal',
        'funding/drips-plan',
        'funding/milestones',
        'funding/metrics',
        'funding/conformance-report-template',
        'funding/tranche-evidence',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        'contributing/repository-standards',
        'contributing/issue-template',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      items: [
        'reference/glossary',
        'reference/source-links',
        'reference/generated-references',
        'reference/content-qa',
        'reference/consistency-audit',
      ],
    },
  ],
};

module.exports = sidebars;
