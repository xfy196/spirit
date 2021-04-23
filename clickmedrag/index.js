window.onload = (ev) => {
    // 盒子的节点
    let oDiv = document.getElementById("box")
    oDiv.onmousedown = (event) => {
        let e = event || window.event // 兼容IE浏览器
        let diffX = e.clientX - oDiv.offsetLeft
        let diffY = e.clientY - oDiv.offsetTop
        // 拖拽过程中不受其他影响
        if(typeof oDiv.setCapture !== "undefined"){
            oDiv.setCapture()
        }

        document.onmousemove = (event) => {
            let e = event || window.event
            // 移动的x值
            let moveX = e.clientX - diffX
            // 移动的y值
            let moveY = e.clientY - diffY
            // 边界值判断
            if(moveX < 0){
                moveX = 0
            }else if(moveX > window.innerWidth - oDiv.offsetWidth){
                moveX = window.innerWidth - oDiv.offsetWidth
            }
            if(moveY < 0){
                moveY = 0
            }else if(moveY > window.innerHeight - oDiv.offsetHeight){
                moveY = window.innerHeight - oDiv.offsetHeight
            }
            // 设置值
            oDiv.style.left = moveX + "px"
            oDiv.style.top = moveY + "px"
        }

        document.onmouseup = (event) => {
            document.onmousemove = null;
            document.onmouseup = null;
            //修复低版本ie bug
            if(typeof oDiv.releaseCapture!='undefined'){
                oDiv.releaseCapture();
            }
        }
    }
}