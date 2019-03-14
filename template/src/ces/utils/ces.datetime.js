/**
 * ces.datetime.js
 *
 *  Ces 日期处理组件
 *
 * 返回说明
 *
 *  WEEK: 周, get方法需要的模式,
 *  FULL_WEEK: 星期, get方法需要的模式,
 *  PART: 上午/下午, get方法需要的模式,
 *
 *  get: 获取 想要的 方式
 *  format: 格式化日期
 *
 */


let DateTime = (function () {

    let _week = ['周日', '周一', '周三', '周四', '周五', '周六'];
    let _full_week = ['星期天', '星期一', '星期三', '星期四', '星期五', '星期六'];

    function _check(d) {
        if (!(d instanceof Date)) {
            throw new Error('first param must a Date instance');
        }
    }

    /**
     * 将 Date 转化为指定格式的String
     *  月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     *  年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     *
     * 例子：
     *      Ces.DateTime.format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     *      Ces.DateTime.format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     *
     * @param d -- Date 对象
     * @param p -- 格式控制
     * @returns {*|string} -- 转换结果
     */
    let _format = function (d, p) {
        p = p || 'yyyy-MM-dd HH:mm:ss';
        _check(d);

        let o = {
            "M+": d.getMonth() + 1,                 //月份
            "d+": d.getDate(),                    //日
            "H+": d.getHours(),                   //小时
            "m+": d.getMinutes(),                 //分
            "s+": d.getSeconds(),                 //秒
            "q+": Math.floor((d.getMonth() + 3) / 3), //季度
            "S": d.getMilliseconds()             //毫秒
        };

        if (/(y+)/.test(p)) {
            p = p.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (let k in o)
            if (new RegExp("(" + k + ")").test(p))
                p = p.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return p;
    };

    /**
     * 获取 想要的 方式
     *
     * @param d 日期对象
     * @param mode 获取方式
     * @param prefix 返回值前面加上的字符
     * @param suffix 返回值后面加上的字符
     * @returns {*}  周几 或 星期几
     * @private
     */
    let _get = function (d, mode, prefix, suffix) {
        _check(d);
        prefix = prefix || '';
        suffix = suffix || '';
        let r;
        switch (mode) {
            case DateTime.WEEK:
                r = _week[d.getDay()];
                break;
            case DateTime.FULL_WEEK:
                r = _full_week[d.getDay()];
                break;
            case DateTime.PART:
                let hour = d.getHours();
                if (hour < 6) {
                    r = "凌晨";
                } else if (hour < 9) {
                    r = "早上";
                } else if (hour < 12) {
                    r = "上午";
                } else if (hour < 14) {
                    r = "中午";
                } else if (hour < 17) {
                    r = "下午";
                } else if (hour < 19) {
                    r = "傍晚";
                } else if (hour < 22) {
                    r = "晚上";
                } else {
                    r = "夜里";
                }
                break;
        }
        return prefix + r + suffix;
    };

    let _monthBeginEnd = function () {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let days = _getDays(month);

        return {
            begin : year + "-" + month + "-" + "01",
            end : year + "-" + month + "-" + days
        }

    };

    let _getDays = function (m, y) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        m = m || month;
        y = y || year;

        if (m === 2) {
            return y % 4 === 0 ? 29 : 28;
        } else if (m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) {
            return 31;
        } else {
            return 30;
        }
    };

    let _today = function() {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();

        return year + "-" + (month < 10 ? "0" + month : month)
            + "-" + (day < 10 ? "0" + day : day);
    };

    return {
        WEEK: 'week',
        FULL_WEEK: 'full_week',
        PART: 'part',
        get: _get,
        format: _format,
        monthBeginEnd: _monthBeginEnd,
        getDays: _getDays,
        today: _today
    }
})();

export default DateTime;
