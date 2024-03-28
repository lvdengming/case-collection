// 手写 Promise 同步版本
// 参考：https://juejin.cn/post/6850037281206566919

enum PromiseStatus {
    PENDING = 'PENDING',
    FULFILLED = 'FULFILLED',
    REJECTED = 'REJECTED'
}

type Executor = (resolve: (value: any) => void, reject: (reason: any) => void) => void;

class MyPromise {
    private __status: PromiseStatus = PromiseStatus.PENDING;
    private __value: any;
    private __reason: any;

    constructor(executor: Executor) {
        const resolve = (value: any) => {
            if (this.__status !== PromiseStatus.PENDING) {
                return;
            }

            this.__value = value;
            this.__status = PromiseStatus.FULFILLED;
        };

        const reject = (reason: any) => {
            if (this.__status !== PromiseStatus.PENDING) {
                return;
            }

            this.__reason = reason;
            this.__status = PromiseStatus.REJECTED;
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    public then(onFulfilled: (value: any) => any, onRejected: (reason: any) => any): void {
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
    resolve('Promise resolved');
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
