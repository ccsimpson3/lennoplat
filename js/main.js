var canvas = document.getElementById("game").getContext("2d");

var H = canvas.canvas.height,
  W = canvas.canvas.width;
var level = new ObjectGroup();
var coinCount = 0; // Initialize coin count to 0

//platform?
level.add(new Platform(canvas, 0, H - 10, W, 10, "pink"));

//first block
level.add(new Platform(canvas, 15, H - 110, 100, 5, "pink"));

//second block
level.add(new Platform(canvas, 250, H - 200, 100, 5, "pink"));

//third block
level.add(new Platform(canvas, 500, H - 200, 100, 5, "pink"));

for (var i = 0; i < 15; i++) {
  for (var j = 0; j < 7; j++) {
    var coin = new Coin(canvas, i * 40, j * 40);
    level.add(coin);
  }
}

var morio = new Player(canvas, 100, 10, "Morio", level);

document.addEventListener("keydown", function (event) {
  morio.handleKeys(event);
});
document.addEventListener("keyup", function (event) {
  morio.handleKeys(event);
});

document.addEventListener("click", function (event) {
  console.log(event);
  shoot(event.x, event.y);
});

function shoot(x, y) {
  var xL = x / 2.2;
  var yL = y / 2 - 5;
  console.log(xL, yL);
  var coin = new Coin(canvas, xL, yL);
  level.add(coin);
  //   level.draw();
}

function step() {
  canvas.fillStyle = "#1fda9a";
  canvas.fillRect(0, 0, W, H);
  renderCoinCounter();
  level.draw();
  morio.update(level);
  morio.draw();
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

main_loop(30, step);
