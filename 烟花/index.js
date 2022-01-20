window.onload = function () {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let animation;
  let fireArr = [];
  let fragments = [];
  init()
  // 初始化
  function init() {
    canvas.width = document.body.clientWidth
    canvas.height = document.body.clientHeight
    for (let i = 0; i < 5; i++) {
      fireArr.push(createRandomFire(CreateFireObj));
    }
    if(fireArr.length){
      animate()
    }
  }

  // 创建烟花的对象
  function CreateFireObj(x, y, color, offsetValueX, offsetValueY) {
    this.fragArr = [];
    this.initialX = x;
    this.initialY = y;
    this.x = x;
    this.y = y;
    this.vx = 2;
    this.vy = 2;
    this.radius = 4;
    this.color = color;
    this.angel = 180;
    this.offsetValueX = offsetValueX;
    this.offsetValueY = offsetValueY;
    this.disappear = false;
    this.boomJudge = true;
    
    // 绘制
    this.draw = function() {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
    // 移动
    this.move = function () {
      this.x += this.vx + this.offsetValueX;
			this.y -= this.vy + this.offsetValueY;
    };
    // 爆炸 产生碎片
    this.boom = function () {
      const scope = Math.round(getRandom(10, 40));
      for (let i = 0; i < scope; i++) {
        const angel = getRandom(0, 2 * Math.PI);
        const range = Math.round(getRandom(50, 300));
        const targetX = this.x + range * Math.cos(angel);
        const targetY = this.y + range * Math.sin(angel);
        const r = Math.round(getRandom(120, 255));
				const g = Math.round(getRandom(120, 255));
				const b = Math.round(getRandom(120, 255));
				const color = 'rgb(' + r + ',' + g + ',' + b + ')';
        const frag = new CreateFrag(this.x, this.y, color, targetX, targetY);
        this.fragArr.push(frag);
      }
    };
    function CreateFrag(x, y, color, tx, ty) {
      this.x = x;
      this.y = y;
      this.ty = ty;
      this.tx = tx;
      this.color = color;
      this.disappear = false;
      // 绘制
      this.draw = function () {
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, 2, 2);
        ctx.restore();
      };
      // 移动
      this.move = () => {
        this.ty += 0.5;
        const dy = this.ty - this.y,
          dx = this.tx - this.x;
        this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.01);
        this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.01);
        if (
          dx === 0 ||
          dy === 0 ||
          this.y >= 700 ||
          this.x <= 300 ||
          this.x >= 1700
        ) {
          this.fragDisappear = true;
        }
      };
    }
  }
  // 创建随机的烟花
  function createRandomFire(func) {
    const r = Math.round(getRandom(200, 255));
		const g = Math.round(getRandom(200, 255));
		const b = Math.round(getRandom(0, 255));
		const color = 'rgb(' + r + ',' + g + ',' + b + ')';
    const fire = new func(
      960 + getRandom(-300, 300),
      800,
      color,
      getRandom(-5, 5),
      getRandom(0, 3)
    );
    return fire;
  }

  // 运动
  function animate() {
    ctx.fillStyle = "rgba(0,0,0,0.05)"; //产生拖尾效果
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 如果烟花数组有数据
    if (fireArr.length) {
      fireArr.forEach((item, index) => {
        const marginWidthLeft = parseInt(getRandom(0, canvas.width / 5));
        const marginWidthRight = parseInt(getRandom(1500, canvas.width));
        const marginHeight = parseInt(getRandom(0, 300));
        if (
          item.x >= marginWidthRight ||
          item.x <= marginWidthLeft ||
          item.y <= marginHeight
        ) {
          item.disappear = true;
        }
        // false
        if (!item.disappear) {
          item.draw();
          item.move();
        } else {
          // 烟花到达最高点之后我们需要删除这个烟花，将烟花放入爆炸数组中
          const removeFire = fireArr.splice(index, 1);
          // 把删除的烟花放在另一个数组中
          fragments.push(...removeFire);
          if (fragments.length) {
            fragments.forEach((item) => {
              if (item.boomJudge) {
                item.boom();
                item.boomJudge = false;
              }
            });
          }
          fireArr.push(createRandomFire(CreateFireObj));
        }
      });
    }
    if (fragments.length) {
      fragments.forEach((item1, index1) => {
        item1.fragArr.forEach((item2, index2) => {
          if (item2.fragDisappear) {
            fragments.splice(index1, 1);
          }
          item2.draw();
          item2.move()
        });
      });
    }
    animation = requestAnimationFrame(animate);
  }
  // 获取颜色
  function getColor() {
    const r = Math.round(getRandom(200, 255));
    const g = Math.round(getRandom(200, 255));
    const b = Math.round(getRandom(0, 255));
    const color = "rgb(" + r + "," + g + "," + b + ")";
    return color;
  }

  // 随机数
  function getRandom(a, b) {
    return Math.random() * (b - a) + a;
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
};
