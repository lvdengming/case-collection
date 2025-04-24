/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-04-24 23:06:19
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-04-24 23:33:03
 */
import * as esbuild from 'esbuild';
import { aliasPlugin } from './plugins/alias-plugin.mjs';

await esbuild.build({
    entryPoints: ['app.jsx'],
    bundle: true,
    outfile: 'dist/bundle.js',
    plugins: [
        aliasPlugin({
            '@common': 'a',
            '@util': 'b'
        })
    ]
});
