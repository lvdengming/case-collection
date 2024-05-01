// 使用 XMLHttpRequest 进行网络请求

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', data => {
    console.log(data);
});
xhr.open('GET', 'http://localhost:3000');
xhr.send();
