class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function (data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state,
    });
  }

  async start() {
    if (gameState === 0) {
      player = new Player();
      var playerCountRef = await database.ref("playerCount").once("value");
      if (playerCountRef.exists()) {
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form();
      form.display();
      car1 = createSprite(100, 200);
      car2 = createSprite(300, 200);
      car3 = createSprite(500, 200);
      car4 = createSprite(700, 200);
      cars = [car1, car2, car3, car4];
      car1.addImage(c1);
      car2.addImage(c2);
      car3.addImage(c3);
      car4.addImage(c4);
    }
  }

  play() {
    form.hide();
    textSize(30);
    text("Game Start", 120, 100);
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if (allPlayers !== undefined) {
      background(gImg);
      image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5);
      var index = 0;
      var carX = 210;
      var carY;
      for (var plr in allPlayers) {
        index = index + 1;
        carX = carX + 250;
        carY = displayHeight - allPlayers[plr].distance;
        cars[index - 1].x = carX;
        cars[index - 1].y = carY;

        if (index === player.index) {
          stroke(10);
          fill("red");
          ellipse(carX, carY, 80, 80);
          camera.position.x = displayWidth / 2;
          camera.position.y = cars[index - 1].y;
        } else {
          cars[index - 1].shapeColor = "black";
        }
      }
      if (player.distance > 4400) {
        player.rank = player.rank + 1;
        Player.updateCarsAtEnd(player.rank);

        gameState = 2;
      }
    }

    if (keyIsDown(UP_ARROW) && player.index !== null) {
      player.distance += 50;
      player.update();
    }
    drawSprites();
  }
  end() {
    clear();
    Player.getPlayerInfo();
    fill(0)
    textSize(24)
    text(
      allPlayers.player1.name + "'s rank:" + allPlayers.player1.rank,
      displayWidth/2-100,
      camera.y - 200
    );
    text(
      allPlayers.player2.name + "'s rank:" + allPlayers.player2.rank,
      displayWidth/2-100,
      camera.y - 160
    );
    text(
      allPlayers.player3.name + "'s rank:" + allPlayers.player3.rank,
      displayWidth/2-100,
      camera.y - 120
    );
    text(
      allPlayers.player4.name + "'s rank:" + allPlayers.player4.rank,
      displayWidth/2-100,
      camera.y - 80
    );
  }
}
