/**
 * Created by itcast on 2017 12/05.
 */
//---关于食物的   begin---------------------------------------
//所有的关于食物的代码就写在这个文件中。
;(function (window) {

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

//---关于食物的   end---------------------------------------

//---关于蛇的    begin---------------------------------/
//所有关于蛇的代码写在这个文件中。

//经过分析
//蛇一开始由三节组成，每一节有宽高、位置、背景色、移动的方向。
//蛇应该是一个对象。

;(function (window) {

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

//---关于蛇的    end---------------------------------/

//---关于游戏    begin-------------------------------/
//所有关于游戏的代码，都放在这个文件里。

;(function (window) {

  //声明一个变量that，用来保存Game对象的。
  var that = null;

  //1.游戏对象构造函数。
  //游戏对象里面，应该有蛇、食物、地图。
  function Game(map){
    //游戏对象里面的蛇和食物是通过构造函数创建的，而地图是客观存在传进来的。
    this.food = new Food();
    this.snake = new Snake();
    this.map = map;

    that = this; //把Game赋值给that。
  }

  //2.游戏开始的方法
  Game.prototype.start = function () {
    //a.渲染食物
    this.food.render(this.map);
    //b.渲染蛇
    this.snake.render(this.map);


    //  //让蛇移动起来（调用蛇移动的方法）,只是改变了蛇的坐标。
    //  this.snake.move();
    //  //让这个拥有新坐标的蛇渲染出来
    //  this.snake.render(this.map);

    //c.调用这个方法，让这个蛇不停的动起来。
    runSnake();

    //d.让蛇根据键盘按的键来移动。
    bindKey();
  }


  //4.写一个方法，让蛇自动移动起来。
  //在这个方法里面，写一个计时器，不停的调用上面那个两个方法。
  function runSnake(){

    var timerID = setInterval(function () {

      //console.log(this); //window
      //console.log(this.snake); //undefiend;
      //this.snake.move(); //报错了
      //this.snake.render(this.map); //报错了

      this.snake.move(this.food,this.map);
      this.snake.render(this.map);


      //判断蛇有没有撞墙。
      //判断蛇头的坐标和墙的边界。
      var snakeHeadX = this.snake.body[0].x * this.snake.width;
      var snakeHeadY = this.snake.body[0].y * this.snake.height;
      if(snakeHeadX >= this.map.offsetWidth || snakeHeadY >= this.map.offsetHeight || snakeHeadX < 0 || snakeHeadY < 0){
        //结束游戏，停止计时器就好了
        alert("Game Over!");
        clearInterval(timerID);
      }
    }.bind(that),200);
  }



  //5.写一个方法，让蛇根据键盘按的键来改变方向移动。
  function bindKey(){
    //给页面设置一个键盘按下的时间
    document.onkeydown = function (e) {
      e = e || window.event;
      //console.log(e.keyCode); //左37  上38  右39  下40
      switch(e.keyCode){
        case 37:
          if(that.snake.direction != 'right'){
            that.snake.direction = 'left';
          }
          break;
        case 38:
          that.snake.direction = 'top';
          break;
        case 39:
          that.snake.direction = 'right';
          break;
        case 40:
          that.snake.direction = 'bottom';
          break;
      }
    }
  }


  //3.把构造函数暴露出去
  window.Game = Game;


}(window));

//---关于游戏    end-------------------------------/