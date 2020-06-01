//json.js
//封装接送模块
var json = function (res, result, msg) {
    if (typeof result === 'undefined') {
        res.json({
            code: '1',
            msg: msg
        });
    } else if (result === 'insert') {
        res.json({
            code: '200',
            msg: msg || '添加成功'
        });
    } else if (result === 'delete') {
        res.json({
            code: '200',
            msg: msg
        });
    } else if (result === 'update') {
        res.json({
            code: '200',
            msg: msg
        });
    } else if (result === 'batchUpdate') {
        res.json({
            code: '200',
            msg: '更新成功'
        });
    } else if (!!result.result && result.result === 'query') {
        if (result.data.length === 0) {
            res.json({
                code: '200',
                msg: '未匹配到数据',
                data: result.data,
                totalCount: 0
            });
        } else {
            res.json({
                code: '200',
                msg: '查找成功',
                data: result.data,
                totalCount: result.data.length
            });
        }
    } else if (!!result.result && result.result === 'queryById') {
        if (result.data.length === 0) {
            res.json({
                code: '200',
                msg: '未匹配到数据',
                data: result.data,
                totalCount: 0
            });
        } else {
            res.json({
                code: '200',
                msg: '查找成功',
                data: result.data,
                totalCount: result.data.length
            });
        }
    } else if (!!result.result && result.result === 'queryAll') {
        if (!result.data) {
            res.json({
                code: '200',
                msg: '未查询到数据',
                data: result.data,
                totalCount: 0
            });
        } else {
            res.json({
                code: '200',
                msg: '查找成功',
                data: result.data,
                totalCount: result.data.length
            });
        }
    } else {
        res.json(result);
    }
};
module.exports = json;
