import { dirname, join } from "node:path";
import type { StorybookConfig } from "@storybook/nextjs";

import path from "node:path";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-onboarding"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-viewport"),
    {
      name: "storybook-addon-next",
      options: {
        nextConfigPath: path.resolve(__dirname, "../next.config.js"),
      },
    },
  ],
  webpackFinal: (config) => {
    if (config.resolve) {
      // typescriptのエイリアスをstorybookでも使えるようにする
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
      };
    }
    return config;
  },
  framework: {
    name: getAbsolutePath("@storybook/nextjs"),
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  staticDirs: ["../public"],
};
export default config;

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
