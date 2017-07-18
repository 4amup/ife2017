## 主要是用下面几个CSS属性实现的：
1. background-image
2. -webkit-background-clip
3. -webkit-text-fill-color
4. background-size
5. animation
## 具体实现
### 绘制渐变背景图

```background-image: -webkit-linear-gradient(left, blue, red 25%, blue 50%, red 75%, blue 100%);```
* 使用CSS3的渐变绘制图像，从左到右。
* 需要注意的是颜色是 0到49%的颜色组 = 50%到99%的颜色组，且最后100%的颜色要和开头0的颜色相等
* 这是为了能无缝衔接流光效果, 之后有说到

### 裁剪背景图

```-webkit-background-clip: text;```
* 使用文字作为裁剪区域向外裁剪，此时文字颜色仍覆盖背景图

### 设置字体颜色

```-webkit-text-fill-color: transparent; or color: transparent;```
* 将字体颜色设置成透明，这样就能将背景图显示出来了

### 设置背景图长度

* background-size: 200% 100%;
* 将背景图宽度拉长至两倍，之前设置background-image的两份相同的颜色组，就是为了能在此拉长后只显示一份颜色组，另外超出的半截颜色组用来实现流光效果

### 开始动画

```animation: streamer 5s infinite linear;```

```
@keyframes streamer {
    0%  {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}
```
* 最后通过动画改变背景图的位置实现流光效果