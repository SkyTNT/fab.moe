<template lang="html">
  <div ref="anchor" style="width: 100%;height: 100%;" @mousemove="mousemove($event)">
    <v-img style="position: absolute;" min-height="100%" min-width="100%" :src="bg">
    </v-img>
    <canvas v-intersect="onIntersect" ref="canvas" style="width: 100%;height: 100%;position: absolute;"></canvas>
    <div style="width: 100%;height: 100%;position: absolute;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
function Effect(anchor, canvas) { //Effect类

  let width, height, scale, ctx, points, target, stopped = false; //宽度，长度，canvas上下文，点，目标，是否暂停
  initEffect();
  initAnimation();

  this.stop = function() { //暂停
    stopped = true;
  }
  this.start = function() { //开始
    if (!stopped)
      return;
    stopped = false;
    initAnimation();
  }

  this.setTarget = function(x, y) { //设置目标位置
    target.x = x * scale;
    target.y = y * scale;
  }

  function initEffect() { //初始化
    ctx = canvas.getContext('2d');
    points = [];
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        points.push({
          x: 0,
          originX: 0,
          y: 0,
          originY: 0
        });
      }
    }
    for (var i in points) {
      var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
      points[i].circle = c;
    }

    scale = 1;
    resize();
    target = {
      x: width / 2,
      y: height / 2
    };

  }

  function resetPoints() { //重置点
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        let x = i * width / 20;
        let y = j * height / 20;
        let px = x + Math.random() * width / 20;
        let py = y + Math.random() * height / 20;
        let p = points[i * 20 + j];
        p.x = px;
        p.originX = px;
        p.y = py;
        p.originY = py;
      }
    }

    // 对每个点找5个最近点
    for (var i = 0; i < points.length; i++) {
      var closest = [];
      var p1 = points[i];
      for (var j = 0; j < points.length; j++) {
        var p2 = points[j]
        if (!(p1 == p2)) {
          var placed = false;
          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (closest[k] == undefined) {
                closest[k] = p2;
                placed = true;
              }
            }
          }

          for (var k = 0; k < 5; k++) {
            if (!placed) {
              if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                closest[k] = p2;
                placed = true;
              }
            }
          }
        }
      }
      p1.closest = closest;
    }
  }

  function initAnimation() { //开始动画
    animate();
    for (var i in points) {
      shiftPoint(points[i]);
    }
  }

  function resize() { //重置大小
    if (anchor.offsetWidth > 800)
      scale = 1;
    else
      scale = 2;

    if (width != anchor.offsetWidth * scale || height != anchor.offsetHeight * scale) {
      width = anchor.offsetWidth * scale;
      height = anchor.offsetHeight * scale;
      canvas.width = width;
      canvas.height = height;
      resetPoints();
    }
  }

  function animate() { //动画
    resize();
    ctx.clearRect(0, 0, width, height);
    for (var i in points) {
      if (Math.abs(getDistance(target, points[i])) < 4000) {
        points[i].active = 0.3;
        points[i].circle.active = 0.6;
      } else if (Math.abs(getDistance(target, points[i])) < 20000) {
        points[i].active = 0.1;
        points[i].circle.active = 0.3;
      } else if (Math.abs(getDistance(target, points[i])) < 40000) {
        points[i].active = 0.02;
        points[i].circle.active = 0.1;
      } else {
        points[i].active = 0;
        points[i].circle.active = 0;
      }

      drawLines(points[i]);
      points[i].circle.draw();
    }
    if (!stopped)
      requestAnimationFrame(animate);
  }

  function shiftPoint(p) { //缓动
    TweenLite.to(p, 1 + 1 * Math.random(), {
      x: p.originX - 50 + Math.random() * 100,
      y: p.originY - 50 + Math.random() * 100,
      ease: Circ.easeInOut,
      onComplete: function() {
        if (!stopped)
          shiftPoint(p);
      }
    });
  }

  function drawLines(p) { //画线
    if (!p.active) return; //透明直接不画
    for (var i in p.closest) {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.closest[i].x, p.closest[i].y);
      ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
      ctx.stroke();
    }
  }

  function Circle(pos, rad, color) { //圆形
    var _this = this;

    (function() {
      _this.pos = pos || null;
      _this.radius = rad || null;
      _this.color = color || null;
    })();

    this.draw = function() {
      if (!_this.active) return; //透明直接不画
      ctx.beginPath();
      ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = 'rgba(156,217,249,' + _this.active + ')';
      ctx.fill();
    };
  }

  function getDistance(p1, p2) { //取距离
    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
  }
}

export default {
  name: "EffectView",
  props: {
    bg: String
  },
  data() {
    return {
      anchor: { //尺寸锚点
        offsetWidth: 0,
        offsetHeight: 0
      },
      ef: {}
    }
  },
  methods: {
    onIntersect(entries, observer) {
      if (entries[0].isIntersecting) //当出现在视窗中才运动
        this.ef.start();
      else
        this.ef.stop();
    },
    mousemove(e) { //鼠标事件
      let canvas = this.$refs.canvas;
      let cRect = canvas.getBoundingClientRect();
      let canvasX = Math.round(e.clientX - cRect.left);
      let canvasY = Math.round(e.clientY - cRect.top);
      this.ef.setTarget(canvasX, canvasY);
    }
  },
  mounted() {
    this.anchor = this.$refs.anchor;
    this.ef = new Effect(this.anchor, this.$refs.canvas);
  }
}
</script>

<style lang="css" scoped>
</style>
