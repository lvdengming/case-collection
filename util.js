/**
 * 获取格式化时间字符串
 * @param {Date} date 
 * @returns {String}
 */
function getFormatDateString(date) {
    let target = date ?? new Date();
    return target.toISOString().splice(0, 10);
}
