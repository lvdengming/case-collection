/*
 * @Author: lvdengming@foxmail.com
 * @Date: 2025-04-10 22:34:51
 * @LastEditors: lvdengming@foxmail.com
 * @LastEditTime: 2025-04-10 22:53:22
 */

let config;
let count = 0;
let intervalId;

self.addEventListener('message', function (e) {
    config = e.data;
    console.log(`worker receive message:`, config);
    intervalId = setInterval(countIncrement, config.interval);
});

function countIncrement() {
    count++;

    if (count <= config.maxCount) {
        self.postMessage(count);
    } else {
        self.postMessage('done');
        clearInterval(intervalId);
    }
}
