/**
 * Created by itcast on 2017 12/05.
 */
//所有关于蛇的代码写在这个文件中。

//经过分析
//蛇一开始由三节组成，每一节有宽高、位置、背景色、移动的方向。
//蛇应该是一个对象。

(function (window) {

  //定义一些颜色
  var arrColor = ['skyblue','purple','pink','yellowGreen','greenYellow','red','hotPink','orange'];

  //声明一个数组，用来保存蛇的每一节身体对应的div。
  var list = [];

  //1.写一个创建蛇的构造函数
  function Snake(width,height,direction){
    this.width = width || 20;
    this.height = height || 20;
    this.direction = direction || 'right';

    this.body = [
      {x:3,y:1,color:'red'},
      {x:2,y:1,color:'yellow'},
      {x:1,y:1,color:'skyblue'}
    ];
  }

  //2.把蛇显示在地图上的方法。写在原型中
  Snake.prototype.render = function (map) {
    //每次渲染新蛇，要把老蛇给删掉。
    removeSnake(map);

    //a.遍历出蛇的每一节身体，然后让每一节身体都显示在地图上。
    for(var i = 0 ; i < this.body.length; i++){
      var unit = this.body[i]; //蛇的每一节身体。
      //创建div，让这个div拥有这节身体的所有显示信息。
      var div1 = document.createElement('div');
      div1.style.position = 'absolute';
      div1.style.left = unit.x * this.width + 'px';
      div1.style.top = unit.y * this.height + 'px';
      div1.style.backgroundColor = unit.color;
      div1.style.width = this.width + 'px';
      div1.style.height = this.height + 'px';
      //把这个div1添加到地图上
      map.appendChild(div1);

      //把这个div给保存在list数组中
      list.push(div1);
    }
  }

  //4.写一个删除蛇的方法。
  function removeSnake(map){
    //找到蛇的每一个身体对应的div。 让他们的父亲把他们给移除掉。
    for(var i = 0 ; i < list.length; i++){
    	map.removeChild(list[i]);
    }
    list = []; //清空数组。
  }


  //3.写一个方法，让蛇动起来
  Snake.prototype.move= function(food,map){
    //蛇动起来其实是分为两部分的，一部分是蛇头(蛇头是根据你的方向动起来)，一部分是蛇身体(蛇身体移动后的坐标等于他的上一节没有移动之前的坐标。):

    //a.让蛇身体(除了蛇头之外的所有节)移动一下
    for(var i = this.body.length-1;i>0;i--){
      this.body[i].x = this.body[i-1].x;
      this.body[i].y = this.body[i-1].y;
    }

    //b.让蛇头移动一下。（蛇头移动是根据方向的）。
    switch(this.direction){
      case 'left':
        this.body[0].x--;
        break;
      case 'right':
        this.body[0].x++;
        break;
      case 'top':
        this.body[0].y--;
        break;
      case 'bottom':
        this.body[0].y++;
        break;
    }

    //c.判断蛇有没有吃到食物。
    //如果蛇头的坐标和食物的坐标 重叠了，就说明蛇吃到了食物。
    var snakeHeadX = this.body[0].x * this.width ;
    var snakeHeadY = this.body[0].y * this.height;
    var foodX = food.x;
    var foodY = food.y;

    //先把蛇的最后一节身体的取出来来。
    var lastUnit = this.body[this.body.length-1];
    //判断蛇有没有吃到食物
    if(snakeHeadX == foodX && snakeHeadY == foodY){
      //吃到了食物，就应该长一节身体。
      this.body.push({
        x:lastUnit.x,
        y:lastUnit.y,
        color: arrColor[Math.floor(Math.random()*8)]
      });

      //再重新的来一个食物。（让这个食物重新的render一下，不就有重新随机生成的xy坐标了吗）
      food.render(map);
    }




  }


  //把这个构造函数给暴露出去
  window.Snake = Snake;

}(window));