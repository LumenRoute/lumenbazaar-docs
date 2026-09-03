// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'LumenBazaar',
  tagline: 'Stellar-native x402 facilitator and Bazaar discovery documentation',
  url: 'https://lumenroute.github.io',
  baseUrl: '/',
  organizationName: 'LumenRoute',
  projectName: 'lumenbazaar-docs',
  onBrokenLinks: 'throw',
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/LumenRoute/lumenbazaar-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],
  themeConfig: {
    navbar: {
      title: 'LumenBazaar',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Docs',
        },
        {
          href: 'https://github.com/LumenRoute',
          label: 'GitHub',
          position: 'right',
        },
        {
          to: '/guides/seller-guide',
          label: 'Sellers',
          position: 'left',
        },
        {
          to: '/guides/buyer-guide',
          label: 'Buyers',
          position: 'left',
        },
        {
          to: '/operations/self-hosting',
          label: 'Operators',
          position: 'left',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Project',
          items: [
            {
              label: 'Overview',
              to: '/',
            },
            {
              label: 'Architecture',
              to: '/architecture/overview',
            },
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'Seller Guide',
              to: '/guides/seller-guide',
            },
            {
              label: 'Buyer Guide',
              to: '/guides/buyer-guide',
            },
          ],
        },
        {
          title: 'Operations',
          items: [
            {
              label: 'Security',
              to: '/security/threat-model',
            },
            {
              label: 'Self-Hosting',
              to: '/operations/self-hosting',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} LumenBazaar contributors.`,
    },
  },
};

module.exports = config;
