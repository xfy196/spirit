const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let percent = 90; // 最终的百分比
let circleX = canvas.width / 2; // 中心x的坐标
let circleY = canvas.height / 2; // 中心y的坐标
let raduis = 100; // 圆形半径
let lineWidth = 1; // 圆形线条的宽度
let fontSize = 42; // 字体大小

// 画圆阶段
function circle(cx, cy, r) {
  ctx.beginPath();
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#666";
  ctx.lineCap = "round";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.arc(cx, cy, r + 10, 0, (Math.PI / 180) * 360);
  ctx.moveTo(cx + r, cy);
  ctx.arc(cx, cy, r, 0, (Math.PI / 180) * 360);
  ctx.stroke();
}

// 画弧线阶段
function sector(cx, cy, r, startAngle, endAngle, anti) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - r - 5);
  ctx.lineWidth = 12;
  ctx.strokeStyle = "#ffccff";
  ctx.lineCap = "round";
  ctx.shadowColor = "#ff6699";
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.shadowBlur = 4;
  ctx.arc(
    cx,
    cy,
    r + 5,
    startAngle * (Math.PI / 180.0) - Math.PI / 2,
    endAngle * (Math.PI / 180.0) - Math.PI / 2,
    anti
  );
  ctx.moveTo(cx, cy - r);
  ctx.stroke();
}

function sectorCover(cx, cy, r, startAngle, endAngle, anti) {
  ctx.beginPath();
  ctx.moveTo(cx, cy - r - 5);
  ctx.lineWidth = 10;
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.arc(
    cx,
    cy,
    r + 5,
    startAngle * (Math.PI / 180.0) - Math.PI / 2,
    endAngle * (Math.PI / 180) - Math.PI / 2,
    anti
  );
  ctx.moveTo(cx, cy - r);
  ctx.stroke();
}

function loading(n) {
  ctx.clearRect(0, 0, circleX * 2, circleY * 2);
  ctx.font = fontSize + "px April";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#ffccff";
  ctx.fillText(parseFloat(n).toFixed(0) + "%", circleX, circleY);
  circle(circleX, circleY, raduis);
  sector(circleX, circleY, raduis, 0, (n / 100) * 360);
  sectorCover(circleX, circleY, raduis, 0, (n / 100) * 360);
}
function changeProcess(val, times) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      loading(val);
      resolve();
    }, times);
  });
}

async function loop(val) {
  while (true) {
    for (let i = 0; i < val; i++) {
      await changeProcess(i + 1, 10);
    }
    return;
  }
}
loop(percent);
