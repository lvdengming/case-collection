# ES6 class 源码分析

ES6 代码：

```ts
// 适配器模式【结构型模式】
// 记忆案例：股票-应用程序-第三方应用（xml-json）
// 章节：https://refactoringguru.cn/design-patterns/adapter
// 代码：https://refactoringguru.cn/design-patterns/adapter/typescript/example

class Target {
    public request(): string {
        return "Target: The default target's behavior.";
    }
}

class Adaptee {
    public specificRequest(): string {
        return '.eetpadA eht fo roivaheb laicepS';
    }
}

class Adapter extends Target {
    private adaptee: Adaptee;

    constructor(adaptee: Adaptee) {
        super();
        this.adaptee = adaptee;
    }

    public request(): string {
        const result = this.adaptee.specificRequest().split('').reverse().join('');
        return `Adapter: (TRANSLATED) ${result}`;
    }
}

function clientCode(target: Target) {
    console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log("Client: The Adaptee class has a weird interface. See, I don't understand it:");
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);
```

tsc 后的 ES5 代码：

```js
'use strict';
// 适配器模式【结构型模式】
// 记忆案例：股票-应用程序-第三方应用（xml-json）
// 章节：https://refactoringguru.cn/design-patterns/adapter
// 代码：https://refactoringguru.cn/design-patterns/adapter/typescript/example
var __extends =
    (this && this.__extends) ||
    (function () {
        var extendStatics = function (d, b) {
            extendStatics =
                Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array &&
                    function (d, b) {
                        d.__proto__ = b;
                    }) ||
                function (d, b) {
                    for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
                };
            return extendStatics(d, b);
        };
        return function (d, b) {
            if (typeof b !== 'function' && b !== null)
                throw new TypeError(
                    'Class extends value ' + String(b) + ' is not a constructor or null'
                );
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : ((__.prototype = b.prototype), new __());
        };
    })();
Object.defineProperty(exports, '__esModule', { value: true });
var Target = /** @class */ (function () {
    function Target() {}
    Target.prototype.request = function () {
        return "Target: The default target's behavior.";
    };
    return Target;
})();
var Adaptee = /** @class */ (function () {
    function Adaptee() {}
    Adaptee.prototype.specificRequest = function () {
        return '.eetpadA eht fo roivaheb laicepS';
    };
    return Adaptee;
})();
var Adapter = /** @class */ (function (_super) {
    __extends(Adapter, _super);
    function Adapter(adaptee) {
        var _this = _super.call(this) || this;
        _this.adaptee = adaptee;
        return _this;
    }
    Adapter.prototype.request = function () {
        var result = this.adaptee.specificRequest().split('').reverse().join('');
        return 'Adapter: (TRANSLATED) '.concat(result);
    };
    return Adapter;
})(Target);
function clientCode(target) {
    console.log(target.request());
}
console.log('Client: I can work just fine with the Target objects:');
var target = new Target();
clientCode(target);
console.log('');
var adaptee = new Adaptee();
console.log("Client: The Adaptee class has a weird interface. See, I don't understand it:");
console.log('Adaptee: '.concat(adaptee.specificRequest()));
console.log('');
console.log('Client: But I can work with it via the Adapter:');
var adapter = new Adapter(adaptee);
clientCode(adapter);
```
