//json.js
//封装接送模块
var json = function (res, result, err) {
    if (typeof result === 'undefined') {
        res.json({
            code: '1',
            msg: err
        });
    } else if (result === 'add') {
        res.json({
            code: '200',
            msg: '添加成功'
        });
    } else if (result === 'delete') {
        res.json({
            code: '200',
            msg: '删除成功'
        });
    } else if (result === 'update') {
        res.json({
            code: '200',
            msg: '更改成功'
        });
    } else if (!!result.result && result.result === 'select') {
        if (!result.data) {
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
    } else if (!!result.result && result.result === 'selectAll') {
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
