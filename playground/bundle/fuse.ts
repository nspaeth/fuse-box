import { fusebox } from '../../src/core/fusebox';
import { pluginJSON } from '../../src/plugins/core/plugin_json';
import { pluginReplace } from '../../src/plugins/core/plugin_replace';
import * as path from 'path';
const fuse = fusebox({
  target: 'browser',
  logging: {
    level: 'succinct',
  },
  watch: true,
  devServer: {
    httpServer: {
      port: 9999,
    },
  },
  allowSyntheticDefaultImports: true,
  //modules: ['./oi'],
  sourceMap: { vendor: true },

  env: { NODE_ENV: 'stage', foo: 'bar' },
  stylesheet: {
    breakDepednantsCache: true,
    macros: {
      $root: __dirname,
    },
  },
  cache: {
    FTL: true,
    enabled: true,
    root: path.join(__dirname, '.cache'),
  },
  webIndex: {
    publicPath: '.',
    template: 'src/index.html',
  },
  //production: {},
  homeDir: __dirname,
  entry: 'src/index.ts',

  plugins: [pluginJSON('configs/.*', { useDefault: true }), pluginReplace('other/Other.ts', { $version: '1.1.0' })],
});

fuse.runDev();
