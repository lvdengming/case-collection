// 获取 2024-01-01 形式字符串
function getFormatDateString(date: Date): string {
    const target = date ?? new Date();
    return target.toISOString().slice(0, 10);
}

console.log(getFormatDateString(new Date()));
