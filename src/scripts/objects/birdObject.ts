/**
 * start status offset body will is: x: 6, y: 0
 * when have gravity offset body will is: x: -8, y: -8
 * when fly offset body will is: x: 15, y: -2
 */
export default class BirdObject extends Phaser.Physics.Arcade.Sprite {
  private _applyGravity: boolean
  private _isPaused: boolean
  private _scene: Phaser.Scene
  public static readonly GRAVITY: number = 400
  public static readonly VELOCITY: number = 250
  public static readonly ROTATE: number = 45
  public static readonly MAXIMUM_ROTATE: number = 90
  public static readonly VELOCITY_ROTATE: number = 1.4
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame)
    this._scene = scene
    this.setOrigin(0.5, 0)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this._applyGravity = false
    this._isPaused = false
    // change rectangle become circle
    this.body.setCircle(13)
    this.body.offset.x = 6
    this.body.offset.y = 0
    // listen event
    scene.events.on('update', this.update)
  }

  set applyGravity(applyGravity: boolean) {
    this._applyGravity = applyGravity
    if (this._applyGravity) {
      // apply gravity
      this.body.gravity.y = BirdObject.GRAVITY
      // apply bird in world
      this.setCollideWorldBounds(true)
    }
  }
  fly = () => {
    if (this._applyGravity) {
      this._scene.game.sound.play('wing')
      this.body.velocity.y = -BirdObject.VELOCITY
      // smooth apply rotate
      this._scene.tweens.add({
        targets: this,
        angle: -BirdObject.ROTATE,
        ease: 'Sine.easeInOut',
        duration: 350,
        repeat: 0
      })
      this.body.offset.x = 15
      this.body.offset.y = -2
    }
  }

  set isPaused(isPaused: boolean) {
    this._isPaused = isPaused
  }

  update = (time: number, delta: number) => {
    if (this.angle <= BirdObject.MAXIMUM_ROTATE && this._applyGravity && !this._isPaused) {
      this.setAngle(this.angle + BirdObject.VELOCITY_ROTATE)
      if (this.body.offset.x >= -8) {
        this.body.offset.x -= 0.22
      }
      if (this.body.offset.y >= -8) {
        this.body.offset.y -= 0.13
      }
    }
  }
}
