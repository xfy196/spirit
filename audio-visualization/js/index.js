const audioEle = document.querySelector("audio");
const cvs = document.querySelector("canvas");
const ctx = cvs.getContext("2d");
// 初始化
function initCvs() {
  cvs.width = window.innerWidth * devicePixelRatio;
  cvs.height = (window.innerHeight / 2) * devicePixelRatio;
}
initCvs();

let isInit = false;
let dataArray = [];
let analyser;
audioEle.addEventListener("play", function () {
  if (isInit) {
    return;
  }
  const audCtx = new AudioContext();
  const source = audCtx.createMediaElementSource(audioEle);
  analyser = audCtx.createAnalyser();
  analyser.fftSize = 512;
  // 用于接收分析器节点
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser);
  source.connect(audCtx.destination);
  isInit = true;
});
// 绘制
function draw() {
  requestAnimationFrame(draw);
  // 清空画布
  const { width, height } = cvs;
  ctx.clearRect(0, 0, width, height);
  if (!isInit) {
    return;
  }
  // 获取分析器节点分析出来的音频数据
  analyser.getByteFrequencyData(dataArray);
  // 有一部分音频人耳朵听不到我们不需要显示，所以除以一个值去可以听到的部分
  const len = dataArray.length / 2.5;
  // 音频轨道是对称的除以2
  const barwidth = width / len / 2;
  ctx.fillStyle = "#419fff";
  for (let i = 0; i < len; i++) {
    const data = dataArray[i];
    const barHeight = (data / 255) * height;
    // 右边
    const x1 = i * barwidth + width / 2;
    // 左边
    const x2 = width / 2 - (i + 1) * barwidth;
    const y = height - barHeight;
    ctx.fillRect(x1, y, barwidth - 2, barHeight);
    ctx.fillRect(x2, y, barwidth - 2, barHeight);
  }
}
draw();
