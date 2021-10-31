import BaseScene from './baseScene'
import Score from '../objects/score'
import BirdObject from '../objects/birdObject'
import { STATUS_OBJECT } from '../../types/shared-types'

export default class ReadyScene extends BaseScene {
  private _score: Score
  private _isPressingButton: boolean
  constructor() {
    super('ReadyScene')
  }
  create() {
    super.create()
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this._isPressingButton = false
    this._score = new Score(this, this.cameras.main.height * 0.125, 0)
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height * 0.25, 'get-ready')
    this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'tap-tap')
    const backButton = this.add
      .image(this.cameras.main.width * 0.1, this.cameras.main.height * 0.125, 'back-button')
      .setInteractive({ cursor: 'pointer' })
    const bird = new BirdObject(this, this.cameras.main.width * 0.3, this.cameras.main.height / 2 - 20, 'bird')
    bird.play('bird-idle')
    // listener event
    this.input.on('pointerdown', this.navigateStartScene)
    this.input.keyboard.on('keydown-SPACE', this.navigateStartScene)
    backButton.on('pointerdown', this.goBack)
    this.backgroundGame.status = STATUS_OBJECT.Stop
  }

  update(time: number, delta: number) {
    super.update(time, delta)
  }

  navigateStartScene = () => {
    if (!this._isPressingButton) {
      this.scene.start('StartGameScene')
    }
  }
  goBack = () => {
    this._isPressingButton = true
    this.scene.start('MenuScene')
  }
}
