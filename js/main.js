var canvas = document.getElementById("game").getContext("2d");

var H = canvas.canvas.height,
  W = canvas.canvas.width;
var level = new ObjectGroup();
// level.image = new Image();
// level.image.src = "img/bg/main.jpg";
var coinCount = 0; // Initialize coin count to 0

var soundTrack = new Audio("sounds/sound-track/main.mp3");


shots = [];

//platform?
level.add(new Platform(canvas, 0, H - 10, W, 10, '#040027'));

//first block
level.add(new Platform(canvas, 15, H - 110, 100, 5, '#00E6FF'));

//second block
level.add(new Platform(canvas, 250, H - 200, 100, 5, '#00E6FF'));

//third block
level.add(new Platform(canvas, 500, H - 200, 100, 5, '#00E6FF'));

trackStarted = false;

for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 7; j++) {
    var coin = new Coin(canvas, i * 40, j * 40);
    level.add(coin);
  }
}

var morio = new Player(canvas, 100, 10, "Morio", level);

document.addEventListener("keydown", function (event) {
  playSoundTrack();
  morio.handleKeys(event);
});
document.addEventListener("keyup", function (event) {
  morio.handleKeys(event);
});

document.addEventListener("click", function (event) {
  playSoundTrack();
  shoot(event.x, event.y);
});

function newShot(player, shot, startX, startY, midX, midY, endX, endY, order) {
  return {
    player: player,
    shot: shot,
    startX: startX,
    startY: startY,
    midX: midX,
    midY: midY,
    endX: endX,
    endY: endY,
    order: order,
  };
}

function shoot(x, y) {
  var laserSound = new Audio("sounds/effects/laser.mp3");
  laserSound.volume = 0.2;
  laserSound.play();
  var midX = x / 2.2;
  var midY = y / 2 - 5;
  var startX = morio.x;
  var startY = morio.y;
  var endX;
  var endY = 0;
  if (startX - midX <= 0) {
    endX = 865;
  } else {
    endX = 0;
  }
  if (startY - midY <= 0) {
    endY = 865;
  } else {
    endY = 0;
  }

  var shot = new Projectile(
    canvas,
    startX,
    startY,
    `shot${this.shots.length}`,
    level
  );
  level.add(shot);
  this.shots.push(
    newShot(
      morio,
      shot,
      Math.round(startX),
      Math.round(startY),
      Math.round(midX),
      Math.round(midY),
      Math.round(endX),
      Math.round(endY),
      this.shots.length + 1
    )
  );
}

function step() {
  // canvas.fillStyle = "#1fda9a";
  canvas.clearRect(0, 0, W, H);
  renderCoinCounter();
  // level.draw();
  morio.update(level);
  morio.draw();

  if (this.shots.length > 0) {
    for (var i = 0; i < this.shots.length; i++) {
      var currentShot = shots[i];
      var xStepsToMid = Math.abs(currentShot.startX - currentShot.midX);
      var yStepsToMid = Math.abs(currentShot.startY - currentShot.midY);
      var directionX;
      var directionY;
      if (currentShot.startX - currentShot.midX <= 0) {
        directionX = "right";
      } else {
        directionX = "left";
      }
      if (currentShot.startY - currentShot.midY <= 0) {
        directionY = "down";
      } else {
        directionY = "up";
      }
      currentShot.shot.directionX = directionX;
      currentShot.shot.directionY = directionY;
      if (directionX === "right") {
        for (var j = currentShot.startX; j <= currentShot.endX; j++) {
          this.renderShot(currentShot, j, currentShot.shot.y);
          // if (directionY === "up") {
          //   for (var k = currentShot.startY; k <= currentShot.endY; k++) {
          //     this.renderShot(currentShot, j, k);
          //   }
          // } else {
          //   for (var k = currentShot.startY; j >= currentShot.endY; k--) {
          //     this.renderShot(currentShot, j, k);
          //   }
          // }
        }
      } else {
        for (var j = currentShot.startX; j >= currentShot.endX; j--) {
          this.renderShot(currentShot, j, currentShot.shot.y);
          // if (directionY === "up") {
          //   for (var k = currentShot.startY; k <= currentShot.endY; k++) {
          //     this.renderShot(currentShot, j, k);
          //   }
          // } else {
          //   for (var k = currentShot.startY; j >= currentShot.endY; k--) {
          //     this.renderShot(currentShot, j, k);
          //   }
          // }
        }
      }
    }
  }
}

function renderShot(shotObj, x, y) {
  // shotObj.shot.x = x;
  // shotObj.shot.y = y;
  shotObj.shot.update(level);
  shotObj.shot.draw();
  if (
    shotObj.shot.x == 0 ||
    shotObj.shot.x == 865 ||
    shotObj.shot.y == 0 ||
    shotObj.shot.y == 865
  ) {
    var toDelete = shots.indexOf(shotObj);
    if (toDelete !== -1) {
      console.log("DELETE");
      level.remove(shotObj.shot);
      this.shots.splice(toDelete, 1);
    }
  }
}

function renderCoinCounter() {
  canvas.fillStyle = "#000";
  canvas.font = "bold 24px Arial";
  var coinCountText = "Coins: " + coinCount;
  var coinCountWidth = canvas.measureText(coinCountText).width;
  canvas.fillText(coinCountText, W - coinCountWidth - 10, 30);
  level.draw();
}

function main_loop(fps, update) {
  setInterval(update, 1000 / fps);
}

function playSoundTrack() {
  if (!trackStarted) {    
    soundTrack.play();
    this.trackStarted = true;
  }
}

main_loop(30, step);
