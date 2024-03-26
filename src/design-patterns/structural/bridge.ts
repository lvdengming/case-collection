// 桥接模式【结构型模式】
// 记忆案例：形状类和颜色类
// 章节：https://refactoringguru.cn/design-patterns/bridge
// 代码：https://refactoringguru.cn/design-patterns/bridge/typescript/example

class Abstraction {
    protected implementation: Implementation;

    constructor(implementation: Implementation) {
        this.implementation = implementation;
    }

    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with:\n${result}`;
    }
}

class ExtendedAbstraction extends Abstraction {
    public operation(): string {
        const result = this.implementation.operationImplementation();
        return `ExtendedAbstraction: Extended operation with:\n${result}`;
    }
}

interface Implementation {
    operationImplementation(): string;
}

class ConcreteImplementationA implements Implementation {
    public operationImplementation(): string {
        return "ConcreteImplementationA: Here's the result on the platform A.";
    }
}

class ConcreteImplementationB implements Implementation {
    public operationImplementation(): string {
        return "ConcreteImplementationB: Here's the result on the platform B.";
    }
}

function clientCode(abstraction: Abstraction) {
    console.log(abstraction.operation());
}

const implementationA = new ConcreteImplementationA();
const abstraction = new Abstraction(implementationA);
clientCode(abstraction);

console.log('');

const implementationB = new ConcreteImplementationB();
const extendedAbstraction = new ExtendedAbstraction(implementationB);
clientCode(extendedAbstraction);
