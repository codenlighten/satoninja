const width = 640;
const height = 360;
kaboom({
	width: width,
	height: height,
});

// load assets
loadSprite("player", "./assets/player.png");
loadSprite("enemy", "./assets/enemy.png");

// set game dimensions

// create player object
const player = add([
	sprite("player"),
	pos(width / 2, height - 40),
	scale(0.5),
	body(),
	"player",
]);

// create enemy object
function spawnEnemy() {
	const enemy = add([
		sprite("enemy"),
		pos(-50, rand(50, height - 50)),
		origin("left"),
		scale(0.5),
		"enemy",
	]);
	const direction = Math.random() < 0.5 ? 1 : -1;
	enemy.moveSpeed = 100 * direction;
}

// spawn enemies at random intervals
loop(1, () => {
	spawnEnemy();
});

// move enemies across the screen
action("enemy", (enemy) => {
	enemy.move(enemy.moveSpeed, 0);
	if (enemy.pos.x < -50 || enemy.pos.x > width + 50) {
		destroy(enemy);
	}
});

// jump when player presses space
keyPress("space", () => {
	if (player.grounded()) {
		player.jump(300);
	}
});

// check for player/enemy collision
player.collides("enemy", () => {
	go("lose", { score: score.value });
});

// define game over scene
scene("lose", ({ score }) => {
	add([
		text("Game Over! Score: " + score, 32),
		pos(width / 2, height / 2),
		origin("center"),
	]);
});
