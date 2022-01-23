(function () {
  let snowFrequencyRatio = 400;
  let scrrenWidth = document.body.scrollWidth;
  let screenHeight = document.body.scrollHeight;
  let lastSnowTime = ""; // 最后一个雪花生成时间
  let snowSpeed = 3; // 雪花下落的时间
  let snowFrequemcy = Math.floor(scrrenWidth / snowFrequencyRatio); // 雪花生成的频率
  let createSnowInterval = null;
  let maxWidth = 30,
    maxHeight = 30;
  let snowAngle = 30; // 雪花的角度
  // 雪花开始
  function snowStart() {
    let now = Date.now();
    if (now - lastSnowTime > 1000 / snowFrequemcy) {
      // 创建雪花
      let snowItem = document.createElement("div");
      snowItem.className = "show-item";
      snowItem.style.opacity = Math.random();
      snowItem.snowScale = Math.random() * 0.5 + 0.5;
      snowItem.style.width = maxWidth * snowItem.snowScale + "px";
      snowItem.style.height = maxHeight * snowItem.snowScale + "px";
      let moveY = snowSpeed * snowItem.snowScale;
      snowItem.style.top = snowItem.offsetTop + moveY + "px";
      snowItem.style.left = Math.random() * scrrenWidth + "px";
      document.body.appendChild(snowItem);
      // 雪花移动
      let snowMove = () => {
        let moveX = Math.tan((snowAngle * Math.PI) / 180) * moveY;

        snowItem.style.top = snowItem.offsetTop + snowSpeed + "px";
        snowItem.style.left = snowItem.offsetLeft - moveX + "px";

        if (snowAngle > 0) {
          if (snowItem.offsetLeft < -snowItem.offsetWidth) {
            document.body.removeChild(snowItem);
            return
          }
        }
        // 如果雪花距离 屏幕顶部大于浏览器滚动高度
        if (snowItem.offsetTop > screenHeight) {
          document.body.removeChild(snowItem);
        } else {
          requestAnimationFrame(snowMove);
        }
      };
      snowMove();
      lastSnowTime = now;
    }
    createSnowInterval = requestAnimationFrame(snowStart);
  }
  snowStart();
})();
