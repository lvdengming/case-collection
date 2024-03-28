// 外观模式【结构型模式】
// 记忆案例：网购下单
// 章节：https://refactoringguru.cn/design-patterns/facade
// 代码：https://refactoringguru.cn/design-patterns/facade/typescript/example

class Facade {
    protected subsystem1: Subsystem1;
    protected subsystem2: Subsystem2;

    constructor(subsystem1?: Subsystem1, subsystem2?: Subsystem2) {
        this.subsystem1 = subsystem1 ?? new Subsystem1();
        this.subsystem2 = subsystem2 ?? new Subsystem2();
    }

    public operation(): string {
        let result = 'Facade initializes subsystems:\n';
        result += this.subsystem1.operationA();
        result += this.subsystem2.operationB();
        result += 'Facade orders subsystems to perform the action:\n';
        result += this.subsystem1.operationC();
        result += this.subsystem2.operationD();
        return result;
    }
}

class Subsystem1 {
    public operationA(): string {
        return 'Subsystem1: Ready!\n';
    }

    public operationC(): string {
        return 'Subsystem1: Go!\n';
    }
}

class Subsystem2 {
    public operationB(): string {
        return 'Subsystem2: Get ready!\n';
    }

    public operationD(): string {
        return 'Subsystem2: Fire!\n';
    }
}

function clientCode(facade: Facade) {
    console.log(facade.operation());
}

// 测试代码
const subsystem1 = new Subsystem1();
const subsystem2 = new Subsystem2();
const facade = new Facade(subsystem1, subsystem2);
clientCode(facade);
