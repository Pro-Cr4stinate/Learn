class mainScene {

    preload() {
        this.load.image('player', 'assets/player.png');
        this.load.image('coin', 'assets/coin.png');
        this.load.image('spcoin', 'assets/coin.png');
    }

    create() {
        this.player = this.physics.add.sprite(100, 100, 'player');
        this.coin = this.physics.add.sprite(300, 300, 'coin');
        this.spcoin = this.physics.add.sprite(300, 300, 'spcoin');

        this.score = 0;

        // Start with spcoin hidden; only the regular coin is active
        this.spcoin.disableBody(true, true);

        let style = { font: '20px Arial', fill: '#fff' };
        this.scoreText = this.add.text(20, 20, 'score: ' + this.score, style);
        this.arrow = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player, this.coin, this.hitCoin, null, this);
        this.physics.add.overlap(this.player, this.spcoin, this.hitBoost, null, this);
    }

    update() {
        if (this.arrow.right.isDown) {
            this.player.x += 3;
        } else if (this.arrow.left.isDown) {
            this.player.x -= 3;
        }

        if (this.arrow.down.isDown) {
            this.player.y += 3;
        } else if (this.arrow.up.isDown) {
            this.player.y -= 3;
        }
    }

    hitCoin() {
        this.score += 5;
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true,
        });

        if (this.score % 30 === 0) {
            // Hide the regular coin, summon the boost coin
            this.coin.disableBody(true, true);
            this.spcoin.enableBody(true, Phaser.Math.Between(100, 600), Phaser.Math.Between(100, 300), true, true);
        } else {
            // Move the regular coin to a new spot
            this.coin.x = Phaser.Math.Between(100, 600);
            this.coin.y = Phaser.Math.Between(100, 300);
        }
    }

    hitBoost() {
        this.score += 10;
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.5,
            scaleY: 1.5,
            yoyo: true,
        });

        // Hide the boost coin, bring the regular coin back
        this.spcoin.disableBody(true, true);
        this.coin.enableBody(true, Phaser.Math.Between(100, 600), Phaser.Math.Between(100, 300), true, true);
    }
}

new Phaser.Game({
    width: 700, // Width of the game in pixels
    height: 400, // Height of the game in pixels
    backgroundColor: '#3498db', // The background color (blue)
    scene: mainScene, // The name of the scene we created
    physics: { default: 'arcade' }, // The physics engine to use
    parent: 'game', // Create the game inside the <div id="game"> 
});