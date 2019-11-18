declare namespace Kscreenshot {
  interface IToolShow {
    complete: boolean; // 控制确认按键显示
    quit: boolean; // 控制退出按键显示
    back: boolean; // 控制后退按键显示
    arrow: boolean; // 控制箭头按键显示
    drawLine: boolean; // 控制线条按键显示（可以输入数字，初始化线条粗细，[1-10]
    rect: boolean; // 控制矩形按键显示
    ellipse: boolean; // 控制椭圆按键显示
    text: boolean; // 控制文字按键显示
    color: boolean; // 控制颜色版按键显示
  }
}
