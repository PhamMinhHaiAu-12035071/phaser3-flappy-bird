import BaseScene from './baseScene'
import BirdObject from '../objects/birdObject'
import { STATUS_OBJECT } from '../../types/shared-types'

export default class MenuScene extends BaseScene {
  private _play: Phaser.GameObjects.Image
  constructor() {
    super('MenuScene')
  }
  create() {
    super.create()
    const duration = 1000
    const offsetLogo = this.cameras.main.height * 0.25 + 10
    const logo = this.add.image(this.cameras.main.width / 2.4, offsetLogo, 'logo').setScale(2)
    const offsetBird = this.cameras.main.height * 0.22 + 10
    const bird = new BirdObject(this, this.cameras.main.width * 0.87, offsetBird, 'bird')
    bird.play('bird-fly')
    this._play = this.add
      .image(this.cameras.main.width * 0.22, this.cameras.main.height * 0.6, 'start-button')
      .setScale(2)
      .setInteractive({ cursor: 'pointer' })
    this.add
      .image(this.cameras.main.width * 0.8, this.cameras.main.height * 0.595, 'rate-button')
      .setScale(2)
      .setInteractive({ cursor: 'pointer' })
    this._play.on('pointerdown', this.handlePressPlayButton)
    this.tweens.add({
      targets: bird,
      y: offsetBird - 30,
      ease: 'Sine.easeInOut',
      duration: duration,
      repeat: -1,
      yoyo: true
    })
    this.tweens.add({
      targets: logo,
      y: offsetLogo - 30,
      ease: 'Sine.easeInOut',
      duration: duration,
      repeat: -1,
      yoyo: true
    })
    this.backgroundGame.status = STATUS_OBJECT.Running
    // this.ground.status = STATUS_OBJECT.Running
  }

  update(time: number, delta: number) {
    super.update(time, delta)
  }
  handlePressPlayButton = () => {
    this.cameras.main.fadeOut(350, 0, 0, 0)
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
      this.scene.start('ReadyScene')
    })
  }
}
