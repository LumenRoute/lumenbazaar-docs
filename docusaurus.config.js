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
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
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
          ],
        },
        {
          title: 'Developers',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/LumenRoute',
            },
          ],
        },
        {
          title: 'Operations',
          items: [
            {
              label: 'Repository',
              href: 'https://github.com/LumenRoute/lumenbazaar-docs',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} LumenBazaar contributors.`,
    },
  },
};

module.exports = config;
