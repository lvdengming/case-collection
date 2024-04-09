// 工厂方法模式【创建型模式】
// 记忆案例：产品不直接通过 new 创建，而是通过工厂方法创建
// 章节：https://refactoringguru.cn/design-patterns/factory-method
// 代码：https://refactoringguru.cn/design-patterns/factory-method/typescript/example

abstract class Creator {
    public abstract factoryMethod(): Product;

    public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

interface Product {
    operation(): string;
}

class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

function clientCode(creator: Creator) {
    console.log(
        `Client: I'm not aware of the creator's class, but it still works.\n${creator.someOperation()}`
    );
}

console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());
