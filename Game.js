/**
 * Created by itcast on 2017 12/05.
 */
//所有关于游戏的代码，都放在这个文件里。

(function (window) {

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