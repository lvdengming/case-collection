/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-04-24 23:01:41
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-04-24 23:33:48
 */
import { name } from '@common/name.js';
import { age } from '@util/age.mjs';
import * as React from 'react';
import * as Server from 'react-dom/server';

const Greet = () => <h1>Hello, world!</h1>;
console.log(Server.renderToString(<Greet />));
console.log(name, age);
