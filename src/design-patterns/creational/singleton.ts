// 单例模式【创建型模式】
// 记忆案例：全局唯一的对象实例，全局状态管理
// 章节：https://refactoringguru.cn/design-patterns/singleton
// 代码：https://refactoringguru.cn/design-patterns/singleton/typescript/example

class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    public someBusinessLogic() {
        // ...
    }
}

function clientCode() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log('Singleton works, both variables contain the same instance.');
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();
