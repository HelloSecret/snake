/**
 * Created by itcast on 2017 12/05.
 */
//所有的关于食物的代码就写在这个文件中。
(function (window) {

  //声明一个数组，用来保存食物对应的div。
  var list = [];

  //创建食物，食物有宽高、定位的位置xy,背景色， 所以他是一个对象。
  //1.食物构造函数
  function Food(x,y,width,height,bgc){
    this.x = x || 0;
    this.y = y || 0;
    this.width = width || 20;
    this.height = height || 20;
    this.bgc = bgc || "green";
  }

  //把这个食物显示在地图上。 显示在地图上肯定有很多代码，就封装成一个方法。
  //不管是那个食物，都要显示在地图上，所以这个显示在地图上的方法就写在原型中。
  //2.定义一个显示在地图上的方法。
  Food.prototype.render = function (map) {
    //产生新的食物之前要删掉原来的食物
    removeFood(map);


    //随机产生一个食物的坐标x,y。
    this.x = Math.floor(Math.random() * map.offsetWidth/this.width) * this.width;
    this.y = Math.floor(Math.random() * map.offsetHeight /this.height) *this.height;
    //创建一个div，让这个div拥有所有这个食物的显示信息。
    var div1 = document.createElement('div');
    div1.style.position = 'absolute';
    div1.style.left = this.x +'px';
    div1.style.top = this.y +'px';
    div1.style.width = this.width + 'px';
    div1.style.height = this.height + 'px';
    div1.style.backgroundColor = this.bgc;
    //再把这个div添加到这个地图map上。
    map.appendChild(div1);
    //再把这div存进保存食物div的list数组中。
    list.push(div1);
  }


  //4.删掉食物  私有方法。
  function removeFood(map){
    for(var i = 0 ; i < list.length; i++){
      map.removeChild(list[i]);
    }
    //清空数组
    list = [];
  }

  //3.把创建食物的代码给暴露出去
  window.Food = Food;

}(window));