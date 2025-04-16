class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;
        
        this.leftEyeX = 250;
        this.rightEyeX = 350;
        this.leftEyeY = 300;
        this.rightEyeY = 300;   

        this.hornRightX = 340;
        this.hornLeftX = 260;
        this.hornRightY = 250;
        this.hornLeftY = 250;
        
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");
        
        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_greenF.png");
        
        my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_psycho_light.png");
        my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterParts", "eye_psycho_dark.png");

        my.sprite.smile = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "mouthH.png");
        
        my.sprite.legRight = this.add.sprite(this.bodyX + 50, this.bodyY + 60, "monsterParts", "leg_greenC.png");
        my.sprite.legRight.setDepth(-1);

        my.sprite.legLeft = this.add.sprite(this.bodyX - 50, this.bodyY + 60, "monsterParts", "leg_greenC.png").setFlipX(true);
        my.sprite.legLeft.setDepth(-1);

        my.sprite.armRight = this.add.sprite(this.bodyX + 70, this.bodyY + 10, "monsterParts", "arm_greenE.png");
        my.sprite.armRight.setAngle(-45);
        my.sprite.armRight.setDepth(-1);

        my.sprite.armLeft = this.add.sprite(this.bodyX - 70, this.bodyY + 10, "monsterParts", "arm_greenE.png").setFlipX(true);
        my.sprite.armLeft.setAngle(55);
        my.sprite.armLeft.setDepth(-1);

        my.sprite.hornRight = this.add.sprite(this.hornRightX, this.hornRightY, "monsterParts", "detail_white_horn_small.png");
        my.sprite.hornLeft = this.add.sprite(this.hornLeftX, this.hornLeftY, "monsterParts", "detail_white_horn_small.png").setFlipX(true);
        my.sprite.hornRight.setAngle(-45);
        my.sprite.hornLeft.setAngle(45);

        my.sprite.fangs = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "mouthF.png");
        my.sprite.fangs.setVisible(false); // hide fangs by default

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); // A key
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D); // D key
    }
1
    update() {
        let my = this.my;    // create an alias to this.my for readability
       
        // Check for keyboard input
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey("S"), 0)) {
            my.sprite.smile.setVisible(true); // show smile
            my.sprite.fangs.setVisible(false); // hide fangs
        } else if (this.input.keyboard.checkDown(this.input.keyboard.addKey("F"), 0)) {
            my.sprite.smile.setVisible(false); // hide smile
            my.sprite.fangs.setVisible(true); // show fangs
        }

        for (let part in my.sprite) {
            if (this.aKey.isDown){
                my.sprite[part].x -= 2;
            } else if (this.dKey.isDown){
                my.sprite[part].x += 2;
            }
        }
    }

}
