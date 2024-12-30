import { defineConfig } from '@rsbuild/core';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';

// const { publicVars } = loadEnv({ prefixes: ['PUBLIC_'] })
// console.log(publicVars)

const { PUBLIC_BASE } = process.env;
export default defineConfig({
  dev: {
    assetPrefix: PUBLIC_BASE,
    startUrl: `http://localhost:3001${PUBLIC_BASE}/project`,
  },
  output: {
    assetPrefix: PUBLIC_BASE,
  },
  source: {
    entry: {
      index: './src/main.jsx',
    },
    alias: {
      '@': './src',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // Add .jsx here
    },
  },
  html: {
    template: './public/index.html',
  },
  // performance: {
  //   removeConsole: ['log', 'table', 'info', 'warn'],
  // },
  server: {
    base: PUBLIC_BASE,
    port: 3001,
    open: true,
    // printUrls ({ urls }) {
    //   return urls.map((url) => `${url}${PUBLIC_BASE}`);
    // },
    compress: true, // gzip 压缩
    proxy: {
      '/shortVideo/': 'https://dex.bdp.123.com/',
    },
  },
  plugins: [pluginReact(), pluginLess()],
});
