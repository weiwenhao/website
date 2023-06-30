// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Nature Programming Language",
  tagline:
    "is a programming language, may you be able to experience the joy of programming.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://nature-lang.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "nature-lang", // Usually your GitHub org/user name.
  projectName: "nature", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/weiwenhao/website/blob/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          //   editUrl:
          //     "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/logo.png",
      navbar: {
        // title: "nature",
        logo: {
          alt: "Nature Logo",
          src: "img/logo_title.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "docsSidebar",
            position: "left",
            label: "Docs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/nature-lang/nature",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Get Started",
                to: "/docs/getting-started/hello-world",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discussions",
                href: "https://github.com/nature-lang/nature/discussions",
              },
              {
                label: "Discard",
                href: "https://discord.gg/xYYkVaKZ",
              }
            ],
          },
          {
            title: "More",
            items: [
              //   {
              //     label: "Blog",
              //     to: "/blog",
              //   },
              {
                label: "GitHub",
                href: "https://github.com/nature-lang",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Nature, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["nature"],
      },
    }),
};

module.exports = config;
