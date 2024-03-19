// 观察者模式【行为型模式】
// 记忆案例：报刊订阅
// 章节：https://refactoringguru.cn/design-patterns/observer
// 代码：https://refactoringguru.cn/design-patterns/observer/typescript/example

interface Subject {
    attach(observer: Observer): void;
    detach(observer: Observer): void;
    notify(): void;
}

interface Observer {
    update(subject: Subject): void;
}

class ConcreteSubject implements Subject {
    public state: number;
    private observers: Array<Observer> = [];

    public attach(observer: Observer): void {
        const isExist = this.observers.includes(observer);
        if (isExist) {
            console.log('Subject: Observer has been attached already.');
            return;
        }

        console.log('Subject: Attached an observer.');
        this.observers.push(observer);
    }

    public detach(observer: Observer): void {
        const index = this.observers.indexOf(observer);
        if (index === -1) {
            console.log('\nSubject: Nonexistent observer.');
            return;
        }

        this.observers.splice(index, 1);
        console.log('\nSubject: Detached an observer.');
    }

    public notify(): void {
        console.log('Subject: Notifying observers...');
        for (const observer of this.observers) {
            observer.update(this);
        }
    }

    public someBusinessLogic(): void {
        console.log("\nSubject: I'm doing something important.");
        this.state = Math.floor(Math.random() * 10);

        console.log('Subject: My state has just changed to: ' + this.state);
        this.notify();
    }
}

class ConcreteObserverA implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state < 5) {
            console.log('ConcreteObserverA: Reacted to the event.');
        }
    }
}

class ConcreteObserverB implements Observer {
    public update(subject: Subject): void {
        if (subject instanceof ConcreteSubject && subject.state > 2) {
            console.log('ConcreteObserverB: Reacted to the event.');
        }
    }
}

// 测试代码
const subject = new ConcreteSubject();

const observerA = new ConcreteObserverA();
subject.attach(observerA);
const observerB = new ConcreteObserverB();
subject.attach(observerB);

subject.someBusinessLogic();
subject.someBusinessLogic();

subject.detach(observerB);

subject.someBusinessLogic();
subject.someBusinessLogic();
