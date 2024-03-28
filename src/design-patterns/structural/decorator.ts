// 装饰器模式【结构型模式】
// 记忆案例：给对象添加新功能
// 章节：https://refactoringguru.cn/design-patterns/decorator
// 代码：https://refactoringguru.cn/design-patterns/decorator/typescript/example

interface Component {
    operation(): string;
}

class ConcreteComponent implements Component {
    public operation(): string {
        return 'ConcreteComponent';
    }
}

class Decorator implements Component {
    protected component: Component;

    constructor(component: Component) {
        this.component = component;
    }

    public operation(): string {
        return this.component.operation();
    }
}

class ConcreteDecoratorA extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`;
    }
}

class ConcreteDecoratorB extends Decorator {
    public operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`;
    }
}

function clientCode(component: Component) {
    console.log(`RESULT: ${component.operation()}`);
}

// 测试代码
const simple = new ConcreteComponent();
console.log("Client: I've got a simple component:");
clientCode(simple);
console.log('');

const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("Client: Now I've got a decorated component:");
clientCode(decorator2);
