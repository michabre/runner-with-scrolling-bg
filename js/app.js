/**
 *
 */
const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    height: 400,
    input: {
        gamepad: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
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
let platforms;

const game = new Phaser.Game(config);

/**
 *
 */
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('desert', 'assets/desert.png');
    this.load.image('arrow', 'assets/arrow_right.png');
    this.load.spritesheet('runner', 'assets/running-lawyer.png',
        { 
            frameWidth: 102, 
            frameHeight: 140 
        }
    );
    this.load.image('floor', 'assets/floor.png');
    this.load.image('foreground', 'assets/foreground.png');
}

/**
 *
 */
function create ()
{
    // sky
    this.background = this.add.tileSprite(0,0,800,600, 'sky').setOrigin(0, 0);

    // desert
    //this.add.image(0, 0, 'desert').setOrigin(0, 0);
    this.desert = this.add.tileSprite(0,0,800,600, 'desert').setOrigin(0, 0);

    platforms = this.physics.add.staticGroup();
    platforms.create(400, 380, 'floor');

    // player
    player = this.physics.add.sprite(55, 200, 'runner');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // foreground
    this.foreground = this.add.tileSprite(0, 348, 800, 52, 'foreground').setOrigin(0, 0);

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
        key: 'jump',
        frames: [{ key: 'runner', frame: 3}],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('runner', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1,
    });

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();
}

function update ()
{

    //change this to a value suited for your needs change - to + to change direction
    this.background.tilePositionX -= 0.5;
    if (this.input.gamepad.total === 0)
    {
        return;
    }
    let pad = this.input.gamepad.getPad(0);
    if (pad.axes.length) {
        //console.log(pad.axes[0].getValue());
    }
    if (cursors.left.isDown || pad.axes[0].getValue() < 0)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown || pad.axes[0].getValue() > 0)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);

        if (player.x > 625) {
            player.x = 625;
            this.desert.tilePositionX += 5;
            this.foreground.tilePositionX += 5;
        }
    }
    else if (cursors.up.isDown && player.body.touching.down || pad.buttons[0].pressed === true)
    {
        player.anims.play('jump');
        player.setVelocityY(-130);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
}
