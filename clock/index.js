(($) => {
    $(function () {
        // 设置时间的函数
        function setTime() {
            $('.flipper').removeClass("flipping")
            $('.flipper .new').remove()
            var date = new Date()
            var seconds = date.getSeconds().toString()
            if (seconds.length === 1) {
                seconds = '0' + seconds
            }
            var minutes = date.getMinutes().toString()
            if (minutes.length === 1) {
                minutes = '0' + minutes
            }
            var hour = date.getHours()
            if (hour > 12) {
                hour = hour - 12
            }
            if (hour === 0) {
                hour = 12
            }
            hour = hour.toString()
            if (hour.length === 1) {
                hour = '0' + hour
            }
            //把hour放到myhour结构里面去显示
            if ($(myhour[0]).text() !== hour) {//$(myhour[0])    jQuery    使用.text()方法，读取元素的纯文本内容，   减小性能开销
                flipNumber($(myhour[0]).closest('.flipper'), hour);   //jquery 中closest('flipper')作用: 取到离$(myhour[0])最近的flipper容器
                // active($(myhour[0]).closest('.flipper'))
            }
            if ($(myminute[0]).text() !== minutes) {
                flipNumber($(myminute[0]).closest('.flipper'), minutes);
                // active($(myminute[0]).closest('.flipper'))
            }
            if ($(mysecond[0]).text() !== seconds) {
                flipNumber($(mysecond[0]).closest('.flipper'), seconds);
            }
            setTimeout(function () {
                setTime();
            }, 500);
        }
        //将时间植入到text里面去
        function flipNumber(el, newnumber) {//el代表flipper
            var thisTop = el.find('.top').clone();    //在flipper中找top  多放一份top做动画效果    clone 克隆      原生JS el.getElemntByClassName('top').clone()与el.find('.top')  作用相同
            var thisBottom = el.find('.bottom').clone();
            thisTop.addClass('new');  //jquery   JS中添加类名巨麻烦
            thisBottom.addClass('new');
            thisBottom.find('.text').text(newnumber);//将test里面的内容改成newnumber里面的内容

            el.find('.top').after(thisTop)  //找到top同级的thisTop盒子
            el.find('.top.new').append(thisBottom)//在同时具有.top.new类名的盒子里添加thisBottom这个盒子
            el.addClass('flipping')//给el(flipper)添加一个flipping类名
            // el.find('.top.new').find('.text').text(newnumber);
            el.find('.top:not(.new)').find('.text').text(newnumber);//找到top中没有new类名的top，然后再在top中将newnumber赋值给text
            setTimeout(function () {
                el.find('.bottom:not(.new)').find('.text').text(newnumber);
            }, 500)// 下面的先不动翻页有时间,所以500ms才显示
        }
        var myhour = $('.clock .flipper:nth-child(1) div:not(.new) .text')
        var myminute = $('.clock .flipper:nth-child(2) div:not(.new) .text')
        var mysecond = $('.clock .flipper:nth-child(3) div:not(.new) .text')
        setTime()
    })
})(jQuery)