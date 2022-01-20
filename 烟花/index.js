(function () {
  const canvas = document.getElementById("canvas");
  const context = canvas.getContext("2d");
  const hz = 1000 / 75;
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
