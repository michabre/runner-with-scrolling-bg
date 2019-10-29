/**
 *
 */
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 400,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    backgroundColor: '#7d7d7d',
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

let player;
let cursors;

const game = new Phaser.Game(config);

/**
 *
 */
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('desert', 'assets/desert.png');
    this.load.spritesheet('runner', 'assets/runner.png',
        { 
            frameWidth: 102, 
            frameHeight: 140 
        }
    );
}

/**
 *
 */
function create ()
{
    // sky
    this.background = this.add.tileSprite(0,0,800,600, 'sky').setOrigin(0, 0);

    // desert
    this.add.image(0, 0, 'desert').setOrigin(0, 0);

    // player
    player = this.physics.add.sprite(55, 280, 'runner');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('runner', { start: 5, end: 0}),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{ key: 'runner', frame: 4}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('runner', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1,
    });

    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{

    //change this to a value suited for your needs change - to + to change direction
    this.background.tilePositionX -= 0.5; 
    
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
}
