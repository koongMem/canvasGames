# canvasGames
自写canvas简易射鸡游戏，

https://github.com/supperjet/H5-Animation 处学习
万分感激...

demo
https://codepen.io/koongMem/full/ALWAYz/

部分js参考，图片资源借用了一下~~~~

不知道怎么改私有呀。。。。


# 通用运算公式

## 角度旋转
```js
dx = mouse.x - object.x;
dy = mouse.y - object.y;
object.rotation = Math.atan2(dy,dx)*180/Math.PI
```
## 平滑运动
```js
value = center + Math.sin(angle)*range;
angle += speed;
```
## 正圆运动
```js
x_position = centerX + Math.sin(angle)*radius;
y_position = centerY + Math.cos(angle)*radius;
angle += speed;
```
## 椭圆运动
```js
x_position = centerX + Math.cos(angle)*radiusX;
y_position = centerY + Math.sin(angle)*radiusY;
angle += speed;
```
## 两点间距离
```js
dx = x2 - x1;
dy = y2 - y1;
dist = Math.sqrt(dx*dx + dy*dy);
```
## 任意方向速度
```js
vx = speed * Math.cos(angle);
vy = speed * Math.sin(angle);
```
## 任意方向加速度
```js
ax = force * Math.cos(angle);
ay = force * Math.xin(angle);
```
## 改变速度
```js
vx += ax;
vx += ay;
```
## 改变位置
```js
object.x += vx;
object.y += vy;
/*1.移除一个超过边界的物体*/
if(object.x - object.width/2 > right || 
   object.x + object.width/2 < left ||
   object.y - object.height/2 > bottom ||
   object.y + object.height/2 < top){/*移除物体代码*/}

/* 2.重现一个超出边界的物体*/
if(object.x - object.width/2 > right || 
   object.x + object.width/2 < left ||
   object.y - object.height/2 > bottom ||
   object.y + object.height/2 < top){
    /*重新设置对象的位置和速度*/
   }

/*3. 边界环绕*/
if(object.x - object.width/2 > right){
    object.x = left - object.width/2;
}elseif(object.x + object.width/2 < left){
    object.x = object.width/2 + right;
}

if(object.y - object.height/2 > bottom){
    object.y = top - object.height/2;
}elseif(object.y + object.height/2 < top){
    object.y = object.height/2 + bottom;
}
```
