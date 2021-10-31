import { STATUS_OBJECT } from '../../types/shared-types'

export default class Ground extends Phaser.GameObjects.TileSprite {
  private _status: STATUS_OBJECT
  public static readonly SPEED = 2

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
    this.setOrigin(0, 1).setScrollFactor(0, 1)
    scene.add.existing(this)
    this._status = STATUS_OBJECT.Start
  }

  update() {
    if (this._status === STATUS_OBJECT.Running) {
      this.setTilePosition(this.tilePositionX + Ground.SPEED, 0)
    }
  }

  set status(status: STATUS_OBJECT) {
    this._status = status
  }
}
