var { fontStyleObject,fontStyleList,pictureStyles } = require(`../common/styles.js`);
var { findPassedByStyleArr} = require(`../../uitls/uitls.js`);

exports.getFontDataByStyle = function (style) {
    //根据整体风格，筛选出细粒度更低的风格组合
    //0，整体风格；现代商务，pop招贴，可爱少女，文艺清新，狂放霸气，简单大气，现代科技，朋克工业
    //1，艺术风格；卡通，写实，抽象，手绘
    //2，线条特征；圆润，弯曲，有衬线，无衬线
    //3，书写方式：手写，仿手写，机刷
    //4，笔划复杂度；极简，简单，复杂，超复杂--根据所选此条
    //5，粗细程度；bold，light，regular---标题大概率为bold，内容大概率为regular
    //6，简体繁体英文;简,繁,英--选择繁体的设计只能选择繁体，而选择简体的设计，简繁两种都可以选，英文只能选英文
    //7，字体名称;--字体文件名称

    var fontData = {
        //字体对象
        title: "",//主标题
        subhead: "",//副标题
        content: "",//正文
    };


    fontData = findFontData(pictureStyles[style].font);

    return fontData;

    function getRandomItem(arr, filterArr) {
        //随机选取并返回当前数组中的一项,
        //filter过滤不需要的，重新选取
        var newArr = [...arr];
        var item = newArr[Math.floor(Math.random() * newArr.length)]
        var noPass = false;
        if (filterArr) {
            //如果有过滤项
            filterArr.map((itemOwn, index) => {
                if (item.indexOf(itemOwn) > -1) {
                    noPass = true;
                    newArr.splice(index, 1)
                } else {
                    newArr.splice(index, 1)
                }
                return ""
            });
            if (noPass && newArr.length > 0) {
                //不通过则删除此项并重新随机选取
                console.log("本次没有通过")
                return getRandomItem(newArr, filterArr)
            } else if(noPass){
                //如果全部不符合则使用思源黑体Reguler
                console.log("没有找到任何一个通过的")
                item = ["写实", "有衬线", "刚硬", "机刷", "简单", "Regular", "简", "思源黑体Reguler"];
                 return item;
            }else{
                return item;
            }
        }else{
            return item;
        }
    }

    function getFamilyGroup(FamilyArr) {
        //遵循常用设计原则，标题的线条粗细一定不细于 内容得粗细
        //先随机选取标题风格样式 然后依据标题风格确定副标题和内容风格
        //随机选取标题风格
        var titleFamily = getRandomItem(FamilyArr,["extraLight"]);
        var newStyleObject = [];
        Object.keys(fontStyleObject).map((item, index) => {
            var arr = [];
            var itemArr = fontStyleObject[item];
            // if (index > 0) {
                arr = itemArr.slice(itemArr.indexOf(titleFamily[index]), itemArr.length);
                newStyleObject.push(arr);
            // }
            return "";
        })
        var contentFamilyArr = findPassedByStyleArr(fontStyleList,newStyleObject);//符合标题字体的子集
        var subheadFamily = getRandomItem(contentFamilyArr, ["light","extraLight"]);
        var contentFamily = getRandomItem(contentFamilyArr, ["heavy","bold"]);
        console.log(contentFamily, "contentFamily")
        return {
            title: titleFamily,//主标题
            subhead: subheadFamily,//副标题
            content: contentFamily,//正文
        }
    }

    function findFontData(styles) {
        //返回字体组合
        var fontData = null;
        var fontStyleListOwn = findPassedByStyleArr(fontStyleList,styles);//所有符合条件的字体集合

        fontData = getFamilyGroup(fontStyleListOwn);
        return fontData;
    }


}