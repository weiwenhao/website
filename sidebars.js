/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  //   tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  docsSidebar: [
    {
      type: "category",
      label: "序言",
      items: [{type: 'autogenerated', dirName: "prologue"}]
    },
    {
        type: "category",
        label: "入门指南",
        items: [{type: 'autogenerated', dirName: "getting-started"}]
    },
    {
        type: "category",
        label: "基础概念",
        items: [{type: 'autogenerated', dirName: "the-basics"}]
    },
    {
        type: "category",
        label: "继续深入",
        items: [{type: 'autogenerated', dirName: "digging-deeper"}]
    },
  ],
};

module.exports = sidebars;
