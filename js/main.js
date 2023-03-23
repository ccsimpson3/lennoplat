var canvas = document.getElementById("game").getContext("2d");

var H = canvas.canvas.height, W = canvas.canvas.width;
var level = new ObjectGroup();
var coinCount = 0; // Initialize coin count to 0

level.add(new Platform(canvas, 0, H-5, W, 10, "pink"))
level.add(new Platform(canvas, 15, H-110, 100, 5, "pink"))
level.add(new Platform(canvas, 250, H-200, 100, 5, "pink"))
level.add(new Platform(canvas, 500, H-200, 100, 5, "pink"))

for (var i = 0; i < 15; i++) {
    for (var j = 0; j < 7; j++) {
        var coin = new Coin(canvas, i*40, j*40);
        coin.onCollect = function() {
            coinCount++;
        };
        level.add(coin);
    }
}

var morio = new Player(canvas, 100, 10, "Morio", level);

document.addEventListener("keydown", function(event) {
    morio.handleKeys(event);
});
document.addEventListener("keyup", function(event) {
    morio.handleKeys(event);
});

function step() {
    canvas.fillStyle = "#1fda9a";
    canvas.fillRect(0, 0, W, H);

    level.draw();
    morio.update(level);
    morio.draw();

    canvas.fillStyle = "#000";
    canvas.font = "bold 24px Arial";
    var coinCountText = "Coins: " + coinCount;
    var coinCountWidth = canvas.measureText(coinCountText).width;
    canvas.fillText(coinCountText, W - coinCountWidth - 10, 30);
}

function main_loop(fps, update) {
    setInterval(update, 1000/fps);
}

main_loop(30, step);
