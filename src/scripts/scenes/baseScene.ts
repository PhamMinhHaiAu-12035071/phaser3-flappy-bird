import BackgroundGame from '../objects/backgroundGame'
import Ground from '../objects/ground'

export default class BaseScene extends Phaser.Scene {
  private _backgroundGame: BackgroundGame
  private _ground!: Ground

  constructor(key: string) {
    super({ key })
  }

  /**
   * dựa vào giờ hiện tại để thiết lập background trò chơi là sáng hay tối
   */
  drawBackgroundBasedOnHourCurrent() {
    const d = new Date()
    const hour = d.getHours()
    if (hour >= 18) {
      this._backgroundGame = new BackgroundGame(
        this,
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        'background-night'
      )
    } else {
      this._backgroundGame = new BackgroundGame(
        this,
        0,
        0,
        this.cameras.main.width,
        this.cameras.main.height,
        'background-day'
      )
    }
  }

  create() {
    this.drawBackgroundBasedOnHourCurrent()
    //    this._ground = new Ground(this, 0, this.cameras.main.height, this.cameras.main.width, 0, 'ground')
  }

  get backgroundGame(): BackgroundGame {
    return this._backgroundGame
  }

  get ground(): Ground {
    return this._ground
  }

  update(time: number, delta: number) {
    this.backgroundGame.update()
    //  this.ground.update()
  }
}
