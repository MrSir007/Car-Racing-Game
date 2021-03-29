class Game {
  constructor() {

  }
  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {gameState = data.val()});
  }
  update(state) {
    database.ref("/").update({gameState: state});
  }
  async start() {
    if (gameState == 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
    }
    car1 = createSprite(200.200);
    car2 = createSprite(400.200);
    car3 = createSprite(600.200);
    car4 = createSprite(800.200);
    car1.addImage("car1",car1Img);
    car2.addImage("car2",car2Img);
    car3.addImage("car3",car3Img);
    car4.addImage("car4",car4Img);
    cars = [car1, car2, car3, car4];
  }
  play() {
    form.hide();
    // textSize(30);
    // text("Game Start",150,100);
    Player.getInfo();
    player.win();
    if (allPlayers !== undefined) {
      background(groundImg);
      image(trackImg,200,-displayHeight*4,displayWidth - 400,displayHeight*5)
      var index = 0;
      var x = 410, y;
      for (var p in allPlayers) {
        index += 1;
        x = x + 225;
        y = displayHeight - allPlayers[p].distance;
        cars[index - 1].x = x;
        cars[index - 1].y = y;
        if (index == player.index) {
          stroke(10);
          fill("Orange");
          ellipse(x, y, 60,60);
          cars[index - 1].shapeColor = "Red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index - 1].y;
        }
      }
    }
    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 30;
      player.update();
    }
    if (player.distance > 5200) {
      gameState = 2;
      player.rank += 1;
      Player.stop(player.rank);
    }
    drawSprites();
  }
  end() {
    background("White");
    var over = createElement("h2");
    over.html("Game Over");
    over.position(displayWidth/2 - 50, displayHeight/2 - 50);
    var winner = createElement("h3");
    winner.html("rank: " + player.rank);
    winner.position(displayWidth/2 - 50, displayHeight/2);
  }
}