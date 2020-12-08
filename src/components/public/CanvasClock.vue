<template>
  <!-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>基于canvas实现时钟</title>
    <link href="/example/resources/css/common.css" rel="stylesheet">
    <link href="/css/font-awesome-4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <style>
    	body{background:#ffffff;}
    	.code-frame{z-index:10000;}
    	.download-frame{z-index:10000;}
    </style>
    <script>
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?9bb82b4ce75393884c0e7fc9218475cb";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	</script>
</head>
<body> -->
	<div id="starry-frame">
		<canvas id="canvas"></canvas>
	</div>
	<!-- </body> -->
	<!-- <script type="text/javascript" src="/example/jquery.min.js"></script>
    <script type="text/javascript" src="/example/ace/ace.js"></script>
	<script type="text/javascript" src="/example/ace/ext-language_tools.js"></script>
	<script>
	</script>
</html> -->
</template>

<script>
export default {
  data () {
    return {
      canvas: '',
      ctx: '',
			// 时钟内圈半径
			centerBallRadius: 150,
			// 时钟内圈环宽度
			centerBallRange: 5,
			// 时钟外圈环宽度
			outerBallRange: 10,
			// 时钟内圈环颜色
			centerBallColor: '#ffffff',
			// 时钟外圈环颜色
			outerBallColor: '#bdbcba',
			// 时钟外环线条宽度
			outerLineWidth: 1,
			// 时钟刻度标记颜色
			clockMarkColor: '#ffffff',
			// 时钟刻度标记尺寸
			clockMarkWidth: 4,
			// 时钟3,6,9,12刻度标记半径
			clockMarkCircleRadius: 3,
			// 时钟刻度线宽度
			clockMarkLineWidth: 1,
			// 时钟刻度线与3,6,9,12刻度尺寸差
			sperateWidth: 2,
			// 时钟字体大小
			fontSize: 14,
			// 时钟字体颜色
			fontColor: '#ffffff',
			// 时钟水印颜色
			fontWaterColor: 'rgba(255,255,255,0.5)',
			// 时钟中心点颜色
			indicatorColor: '#ffffff',
			// 时钟中心点圆半径
			indicatorBallRadius: 5,
			// 时钟秒针颜色
      indicatorSecondColor: '#ff0000',
    }
  },
  mounted() {
    	var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?9bb82b4ce75393884c0e7fc9218475cb";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
    this.clockInit()
  },
  methods: {
    clockInit() {
      this.canvas = document.getElementById('canvas');
      console.log(canvas, 123)
			this.ctx = canvas.getContext('2d');
			// // 时钟内圈半径
			// var this.centerBallRadius = 150;
			// // 时钟内圈环宽度
			// var this.centerBallRange = 5;
			// // 时钟外圈环宽度
			// var this.outerBallRange = 10;
			// // 时钟内圈环颜色
			// var this.centerBallColor = '#ffffff';
			// // 时钟外圈环颜色
			// var this.outerBallColor = '#bdbcba';
			// // 时钟外环线条宽度
			// var this.outerLineWidth = 1;
			// // 时钟刻度标记颜色
			// var this.clockMarkColor = '#ffffff';
			// // 时钟刻度标记尺寸
			// var this.clockMarkWidth = 4;
			// // 时钟3,6,9,12刻度标记半径
			// var this.clockMarkCircleRadius = 3;
			// // 时钟刻度线宽度
			// var this.clockMarkLineWidth = 1;
			// // 时钟刻度线与3,6,9,12刻度尺寸差
			// var this.sperateWidth = 2;
			// // 时钟字体大小
			// var this.fontSize = 14;
			// // 时钟字体颜色
			// var this.fontColor = '#ffffff';
			// // 时钟水印颜色
			// var this.fontWaterColor = 'rgba(255,255,255,0.5)';
			// // 时钟中心点颜色
			// var this.indicatorColor = '#ffffff';
			// // 时钟中心点圆半径
			// var this.indicatorBallRadius = 5;
			// // 时钟秒针颜色
      // var this.indicatorSecondColor = '#ff0000';
      this.drawClock();
    },
    drawClock() {
      var width = document.getElementById('starry-frame').offsetHeight;
      var height = document.getElementById('starry-frame').offsetWeight;
      this.ctx.clearRect(0,0,width,height);
      this.canvas.width = width;
      this.canvas.height = height;
      var centerX = width / 2;
      var centerY = height / 2;
      this.drawClockBall(centerX,centerY);
      this.drawClockMark(centerX,centerY);
      this.drawIndicatorFun(centerX,centerY);
      // this.requestAnimationFrame(this.drawClock)
    },
    drawClockBall(centerX, centerY) {
      this.ctx.strokeStyle = this.centerBallColor;
      this.ctx.lineWidth = this.centerBallRange;
      this.ctx.beginPath();
      this.ctx.arc(centerX,centerY,this.centerBallRadius + this.centerBallRange / 2,0,2 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.strokeStyle = this.outerBallColor;
      this.ctx.lineWidth = this.outerBallRange;
      this.ctx.beginPath();
      this.ctx.arc(centerX,centerY,this.centerBallRadius + this.centerBallRange + this.outerBallRange / 2,0,2 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
      this.ctx.strokeStyle = this.centerBallColor;
      this.ctx.lineWidth = this.outerLineWidth;
      this.ctx.beginPath();
      this.ctx.arc(centerX,centerY,this.centerBallRadius + this.centerBallRange + this.outerBallRange,0,2 * Math.PI);
      this.ctx.closePath();
      this.ctx.stroke();
    },
    drawClockSpecialMark(rotate, centerX, centerY) {
      this.ctx.save();
      this.ctx.translate(centerX,centerY);
      this.ctx.rotate(rotate * Math.PI / 180)
      this.ctx.fillStyle = this.clockMarkColor;
      this.ctx.beginPath();
      this.ctx.arc(0,-this.centerBallRadius + this.clockMarkWidth * 2,this.clockMarkCircleRadius,0,2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
    
      this.ctx.translate(0,-this.centerBallRadius + this.clockMarkWidth * 3 + this.fontSize);
      this.ctx.rotate(-rotate * Math.PI / 180)
      this.ctx.font = this.fontSize + 'px bold 黑体';
      this.ctx.fillStyle = this.fontColor;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(parseInt(rotate / 30), 0, 0);
      this.ctx.restore();
    },
    drawClockIntMark(rotate, lineWidth, range, centerX, centerY) {
      this.ctx.save();
      this.ctx.translate(centerX,centerY);
      this.ctx.rotate(rotate * Math.PI / 180)
      this.ctx.strokeStyle = this.clockMarkColor;
      this.ctx.lineWidth = lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(0,-this.centerBallRadius + this.clockMarkWidth);
      this.ctx.lineTo(0,-this.centerBallRadius + this.clockMarkWidth * 3 - range);
      this.ctx.stroke();
      if (rotate % 30 == 0) {
        this.ctx.translate(0,-this.centerBallRadius + this.clockMarkWidth * 3 + this.fontSize);
        this.ctx.rotate(-rotate * Math.PI / 180)
        this.ctx.font = this.fontSize + 'px bold 黑体';
        this.ctx.fillStyle = this.fontColor;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(parseInt(rotate / 30), 0, 0);
      }
      this.ctx.restore();
    },
    drawClockMark(centerX, centerY) {
      this.drawClockSpecialMark(360,centerX,centerY);
      this.drawClockSpecialMark(90,centerX,centerY);
      this.drawClockSpecialMark(180,centerX,centerY);
      this.drawClockSpecialMark(270,centerX,centerY);
      this.ctx.font = this.fontSize * 1.2 + 'px bold 黑体';
      this.ctx.fillStyle = this.fontWaterColor;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('朵朵视野', centerX, centerY + this.centerBallRadius - this.clockMarkWidth * 18 - this.fontSize);
      this.ctx.fillText('duoduoview.com', centerX, centerY + this.centerBallRadius - this.clockMarkWidth * 13 - this.fontSize);
      for (var i = 0; i < 60; i ++) {
        if (i % 5 == 0 && i != 0 && i != 15 && i != 30 && i != 45) {
            this.drawClockIntMark(i *6,this.clockMarkLineWidth * 3,0,centerX,centerY);
          }
        if (i % 5 != 0) {
            this.drawClockIntMark(i *6,this.clockMarkLineWidth,this.sperateWidth,centerX,centerY);
          }
      }
    },
    drawIndicatorFun(centerX, centerY) {
      var newDate = new Date();
      var currentHour = newDate.getHours();
      var currentMinute = newDate.getMinutes();
      var currentSecond = newDate.getSeconds();
      this.ctx.fillStyle = this.indicatorColor;
      this.ctx.beginPath();
      this.ctx.arc(centerX,centerY,this.indicatorBallRadius,0,2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.fillStyle = '#fff';
      this.ctx.beginPath();
      this.ctx.arc(centerX,centerY,this.indicatorBallRadius - 3,0,2 * Math.PI);
      this.ctx.closePath();
      this.ctx.fill();
      // 时针
      this.ctx.save();
      this.ctx.translate(centerX,centerY);
      this.ctx.rotate((currentHour * 30 + currentMinute / 60 * 30) * Math.PI / 180)
      this.ctx.strokeStyle = this.indicatorColor;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(0,25)
      this.ctx.lineTo(0,-this.centerBallRadius + this.clockMarkWidth * 12,this.clockMarkCircleRadius)
      this.ctx.stroke();
      this.ctx.restore();
      // 分针
      this.ctx.save();
      this.ctx.translate(centerX,centerY);
      this.ctx.rotate((currentMinute * 6 + currentSecond / 60 * 6) * Math.PI / 180)
      this.ctx.strokeStyle = this.indicatorColor;
      this.ctx.lineWidth = 3;
      this.ctx.beginPath();
      this.ctx.moveTo(0,25)
      this.ctx.lineTo(0,-this.centerBallRadius + this.clockMarkWidth * 3,this.clockMarkCircleRadius)
      this.ctx.stroke();
      this.ctx.restore();
      // 秒针
      this.ctx.save();
      this.ctx.translate(centerX,centerY);
      this.ctx.rotate((currentSecond * 6) * Math.PI / 180)
      this.ctx.strokeStyle = this.indicatorSecondColor;
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(0,25)
      this.ctx.lineTo(0,-this.centerBallRadius + this.clockMarkWidth * 3,this.clockMarkCircleRadius)
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
}
</script>

<style lang="scss" scoped>
  // #starry-frame {
  //   height: 100px;
  //   width: 100%;
  //   #canvas{
  //         height: 100%;
  //   width: 100%;
  //   }
  // }
</style>