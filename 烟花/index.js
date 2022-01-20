(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const hz = 1000 / 75;
  //   绘制单个小球
  function drawArc(x, y, r, color = rgb().random()) {
    context.beginPath();
    context.drawArc(x, y, r, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
  }
  // 随机生成颜色的函数
  const rgb = function () {
    let str = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
    ];
    return {
      random() {
        let color = "#";
        for (let i = 0; i < 6; i++) {
          color += str[parseInt(Math.floor(Math.random() * 16))];
        }
        return color;
      },
    };
  };
})();
