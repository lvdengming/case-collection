// 手写 Promise 异步版本
// 参考：https://juejin.cn/post/6850037281206566919

enum PromiseStatus {
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
}

type Executor = (resolve: (value: any) => void, reject: (reason: any) => void) => void;
type OnFulfilled = (value: any) => any;
type OnRejected = (reason: any) => any;
type CallBacks<T extends (...args: any) => any> = Array<() => ReturnType<T>>;

class MyPromise {
    private __status: PromiseStatus = PromiseStatus.PENDING;
    private __value: any;
    private __reason: any;
    private __onFulfilledCallbacks: CallBacks<OnFulfilled> = [];
    private __onRejectedCallbacks: CallBacks<OnRejected> = [];

    constructor(executor: Executor) {
        const resolve = (value: any) => {
            if (this.__status !== PromiseStatus.PENDING) {
                return;
            }

            this.__value = value;
            this.__onFulfilledCallbacks.forEach((callback) => callback());
            this.__status = PromiseStatus.FULFILLED;
        };

        const reject = (reason: any) => {
            if (this.__status !== PromiseStatus.PENDING) {
                return;
            }

            this.__reason = reason;
            this.__onRejectedCallbacks.forEach((callback) => callback());
            this.__status = PromiseStatus.REJECTED;
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    public then(onFulfilled: OnFulfilled, onRejected: OnRejected): void {
        if (this.__status === PromiseStatus.PENDING) {
            // 选择保存箭头函数而不是直接调用 onFulfilled/onRejected 函数
            // 是因为在 Promise 的 then 方法中，onFulfilled/onRejected 函数是异步执行的
            this.__onFulfilledCallbacks.push(() => onFulfilled(this.__value));
            this.__onRejectedCallbacks.push(() => onRejected(this.__reason));
        }

        if (this.__status === PromiseStatus.FULFILLED) {
            onFulfilled(this.__value);
        }

        if (this.__status === PromiseStatus.REJECTED) {
            onRejected(this.__reason);
        }
    }
}

// 测试代码
const promise = new MyPromise((resolve, reject) => {
    console.log('In Promise executor...');
    setTimeout(() => resolve('Promise resolved'), 1000);
});

promise.then(
    (value) => {
        console.log('In onFulfilled callback...');
        console.log(value);
    },
    (reason) => {
        console.log('In onRejected callback...');
        console.log(reason);
    }
);
