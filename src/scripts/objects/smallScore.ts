export default class SmallScore extends Phaser.GameObjects.Group {
  public static readonly WIDTH_ORIGINAL: number = 12
  public static readonly DURATION: number = 150
  private readonly _offsetY: number
  private _triggerTimer: Phaser.Time.TimerEvent
  private _scene: Phaser.Scene
  private _value: number
  private _tempValue: number

  constructor(scene: Phaser.Scene, offsetY: number, score: number) {
    super(scene)
    this._offsetY = offsetY
    this._value = score
    this._scene = scene
  }

  /**
   * vẽ điểm số
   * @param {number} score
   */
  createScore(score: number) {
    const scoreString = score.toString()
    const size = scoreString.length
    const xOriginal = this._scene.cameras.main.width * 0.8
    for (let i = 0; i < size; i++) {
      this.create(0, 0, `small-${scoreString[i]}`)
        .setPosition(xOriginal - (size - 1 - i) * SmallScore.WIDTH_ORIGINAL, this._offsetY)
        .setDepth(3)
    }
  }
  set value(score: number) {
    this._value = score
  }
  setScoreWithNoAnimation() {
    this.clear(true)
    const scoreString = this._value.toString()
    const size = scoreString.length
    const xOriginal = this._scene.cameras.main.width * 0.8
    for (let i = 0; i < size; i++) {
      this.create(0, 0, `small-${scoreString[i]}`)
        .setPosition(xOriginal - (size - 1 - i) * SmallScore.WIDTH_ORIGINAL, this._offsetY)
        .setDepth(3)
        .setAlpha(0)
    }
    this.children.iterate(child => {
      this._scene.tweens.add({
        targets: child,
        delay: 350,
        alpha: 1,
        ease: 'Sine.easeInOut',
        repeat: 0,
        yoyo: false,
        duration: 0
      })
    })
  }
  setScoreWithAnimation(defaultScore: number = 0) {
    this._tempValue = defaultScore
    if (this._value === 0) {
      this.clear(true)
      this.createScore(this._tempValue)
    } else if (this._tempValue <= this._value) {
      this._triggerTimer = this._scene.time.addEvent({
        callback: this.onEvent,
        callbackScope: this,
        delay: SmallScore.DURATION / this._value, // 1000 = 1 second
        loop: false,
        repeat: 0
      })
    }
  }
  onEvent() {
    this.clear(true)
    this.createScore(this._tempValue)
    this._triggerTimer.remove(false)
    this._tempValue += 1
    this.setScoreWithAnimation(this._tempValue)
  }
  get value(): number {
    return this._value
  }
}
