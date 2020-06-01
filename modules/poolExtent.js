//poolextent.js
// 连接池扩展封装
let poolExtend = function(target, source, flag) {
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            flag ? (target[key] = source[key]) : (target[key] === void 0 && (target[key] = source[key]));
        }
    }
    return target;
};
module.exports = poolExtend;
