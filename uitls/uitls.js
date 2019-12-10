function hasParam(params, param) {
    var has = params.some((item) => {
        return item === param;
    });
    return has;
}

function accordWithStyle(styles, style) {
    //筛选当前素材是否符合风格条件
    var noDifferent = styles.every((item, index) => {
        return hasParam(item, style[index])
    });
    return noDifferent
}

exports.findPassedByStyleArr = function(list,styles) {
    //根据标签集合找出素材中符合条件的集合
    var fontArr = [];
    list.map((item) => {
        if (accordWithStyle(styles, item)) {
            fontArr.push(item)
        }
        return ""
    })
    return fontArr
}