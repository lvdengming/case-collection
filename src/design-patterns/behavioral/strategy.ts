// 策略模式【行为型模式】
// 记忆案例：路线导游程序，根据不同的出行方式规划不同的路线（和状态模式类似）
// 章节：https://refactoringguru.cn/design-patterns/strategy
// 代码：https://refactoringguru.cn/design-patterns/strategy/typescript/example

class Context {
    private strategy: Strategy;

    constructor(strategy: Strategy) {
        this.strategy = strategy;
    }

    public setStrategy(strategy: Strategy): void {
        this.strategy = strategy;
    }

    public doSomeBusinessLogic(): void {
        console.log("Context: Sorting data using the strategy (not sure how it'll do it)");
        const result = this.strategy.doAlgorithm(['a', 'b', 'c', 'd', 'e']);
        console.log(result.join(','));
    }
}

interface Strategy {
    doAlgorithm(data: string[]): string[];
}

class ConcreteStrategyA implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.sort();
    }
}

class ConcreteStrategyB implements Strategy {
    public doAlgorithm(data: string[]): string[] {
        return data.reverse();
    }
}

const context = new Context(new ConcreteStrategyA());
console.log('Client: Strategy is set to normal sorting.');
context.doSomeBusinessLogic();

console.log('');

console.log('Client: Strategy is set to reverse sorting.');
context.setStrategy(new ConcreteStrategyB());
context.doSomeBusinessLogic();
