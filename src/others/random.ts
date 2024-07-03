// 通过 Math.random() 生成各种数据

// 获取随机颜色
function randomColor(): string {
    const hex: string = Math.random().toString(16).substring(2, 8).padEnd(6, '0');
    return '#' + hex;
}

// 获取指定长度的随机字符串
function randomString(len: number): string {
    if (len <= 11) {
        // 这种方式最多产生11位随机字符串
        return (
            Math.random()
                // 36进制表示用完了所有小写字母
                .toString(36)
                .substring(2, 2 + len)
                .padEnd(len, '0')
        );
    }

    return randomString(11) + randomString(len - 11);
}
