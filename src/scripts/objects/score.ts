export default class Score extends Phaser.GameObjects.Group {
  public static readonly WIDTH_ORIGINAL = 24
  private readonly _offsetY: number
  private _scene: Phaser.Scene
  private _value: number
  constructor(scene: Phaser.Scene, offsetY: number, score: number) {
    super(scene)
    this._offsetY = offsetY
    this._value = score
    this._scene = scene
    this.createScore(score)
  }

  /**
   * vẽ điểm số
   * @param {number} score
   */
  createScore(score: number) {
    const scoreString = score.toString()
    const size = scoreString.length
    const xOriginal = this._scene.cameras.main.width / 2 - size * Score.WIDTH_ORIGINAL * 0.5
    for (let i = 0; i < size; i++) {
      this.create(0, 0, `${scoreString[i]}`)
        .setPosition(Score.WIDTH_ORIGINAL / 2 + i * Score.WIDTH_ORIGINAL + xOriginal, this._offsetY)
        .setDepth(1)
    }
  }
  set value(score: number) {
    this._value = score
    this.clear(true)
    this.createScore(score)
  }

  get value(): number {
    return this._value
  }
}
