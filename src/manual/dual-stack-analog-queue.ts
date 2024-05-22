// 双栈模拟队列（push，pop，top，empty）

class Queue {
    private __inStack: number[] = [];
    private __outStack: number[] = [];

    constructor(...nums: number[]) {
        this.__inStack.push(...nums);
    }

    public push(num: number): void {
        this.__inStack.push(num);
    }

    public pop(): number {
        while (this.__inStack.length) {
            this.__outStack.push(this.__inStack.pop());
        }

        const num = this.__outStack.pop();

        while (this.__outStack.length) {
            this.__inStack.push(this.__outStack.pop());
        }

        return num;
    }

    public top(): number {
        while (this.__inStack.length) {
            this.__outStack.push(this.__inStack.pop());
        }

        const num = this.__outStack.at(-1);

        while (this.__outStack.length) {
            this.__inStack.push(this.__outStack.pop());
        }

        return num;
    }

    public empty(): void {
        this.__inStack.length = 0;
        this.__outStack.length = 0;
    }

    public toString(): string {
        while (this.__inStack.length) {
            this.__outStack.push(this.__inStack.pop());
        }

        let str = '';
        while (this.__outStack.length) {
            const num = this.__outStack.pop();
            str += `${num}, `;
            this.__inStack.push(num);
        }

        return `Queue: ${str.slice(0, str.length - 2)}`;
    }
}

// 测试代码
const queue = new Queue(1, 2, 3, 4);
console.log(queue.toString());
console.log('');

queue.push(5);
console.log(queue.toString());
console.log('');

console.log(queue.pop());
console.log(queue.toString());
console.log('');

console.log(queue.top());
console.log(queue.toString());
console.log('');

queue.empty();
console.log(queue.toString());
console.log('');
