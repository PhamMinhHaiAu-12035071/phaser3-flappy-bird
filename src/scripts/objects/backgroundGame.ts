import { STATUS_OBJECT } from '../../types/shared-types'
import Phaser from 'phaser'

export default class BackgroundGame extends Phaser.GameObjects.TileSprite {
  private _scene: Phaser.Scene
  private _status: STATUS_OBJECT
  public speed: number = 2
  public audio: Phaser.Sound.BaseSound
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    textureKey: string,
    frameKey?: string | number
  ) {
    super(scene, x, y, width, height, textureKey, frameKey)
    this._scene = scene
    this.setOrigin(0).setScrollFactor(0, 1)
    scene.add.existing(this)
    this._status = STATUS_OBJECT.Start
    this.audio = this._scene.game.sound.add('swooshing', { loop: true })
  }

  update() {
    if (this._status === STATUS_OBJECT.Running) {
      this.setTilePosition(this.tilePositionX + this.speed, 0)
    }
  }

  set status(status: STATUS_OBJECT) {
    this._status = status
    if (this._status === STATUS_OBJECT.Running) {
      this.audio.play()
    } else {
      this._scene.sound.get('swooshing').stop()
    }
  }
}
