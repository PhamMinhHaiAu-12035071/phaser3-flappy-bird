import PipeObject from './pipeObject'

export default class GroupPipes extends Phaser.Physics.Arcade.Group {
  public pipeVerticalDistanceRange: Array<number>
  public pipeHorizontalDistanceRange: Array<number>
  private readonly _scene: Phaser.Scene
  private readonly _callback: Function
  public static readonly HEIGHT_PIPE: number = 320
  public static readonly MAXIMUM_PIPES_TO_RENDER: number = 4
  constructor(scene: Phaser.Scene, callBackRecyclePipe: Function) {
    super(scene.physics.world, scene)
    this.pipeVerticalDistanceRange = [150, 350]
    this.pipeHorizontalDistanceRange = [200, 350]
    this._scene = scene
    this._callback = callBackRecyclePipe
    for (let i = 0; i < GroupPipes.MAXIMUM_PIPES_TO_RENDER; i++) {
      const upPipe = this.create(0, 0, 'pipe')
      upPipe.body.immovable = true
      upPipe.setOrigin(0, 0)
      upPipe.flipY = true

      const downPipe = this.create(0, 0, 'pipe')
      downPipe.body.immovable = true
      downPipe.setOrigin(0, 1)

      this.addCouplePipe(upPipe, downPipe)
    }
    this.setVelocityX(-100)
    // listen event
    scene.events.on('update', this.update)
  }

  getRightMosPosition(): number {
    const originalX = 100
    const arrOffsetX = this.getChildren().map((pipe: any) => pipe.x)
    return Math.max(...arrOffsetX.concat(originalX))
  }

  addCouplePipe(upPipe: PipeObject, downPipe: PipeObject): void {
    // get maximum right offset
    const rightMosX = this.getRightMosPosition()
    const pipeVerticalDistance = Phaser.Math.Between(
      this.pipeVerticalDistanceRange[0],
      this.pipeVerticalDistanceRange[1]
    )
    const pipeHorizontalDistance =
      this.getChildren().length === 0
        ? 0
        : Phaser.Math.Between(this.pipeHorizontalDistanceRange[0], this.pipeHorizontalDistanceRange[1])
    const offsetX = rightMosX + pipeHorizontalDistance
    const sumHeightTwoPipe = this._scene.cameras.main.height - pipeVerticalDistance
    const ratioUpPipe = Phaser.Math.Between(2, 8)
    const ratioDownPipe = 10 - ratioUpPipe
    const heightUpPipe = (ratioUpPipe / 10) * sumHeightTwoPipe
    const heightDownPipe = (ratioDownPipe / 10) * sumHeightTwoPipe
    const offsetY = GroupPipes.HEIGHT_PIPE - heightUpPipe
    upPipe.x = offsetX
    upPipe.y = -offsetY
    const offsetYDownPipe = GroupPipes.HEIGHT_PIPE - heightDownPipe
    downPipe.x = offsetX
    downPipe.y = this._scene.cameras.main.height + offsetYDownPipe
  }
  recyclePipes(): void {
    let couplePipe: Array<PipeObject> = []
    this.getChildren().forEach((pipe: any) => {
      const right = pipe.getBounds().right
      if (right <= 0) {
        couplePipe.push(pipe as PipeObject)
        if (couplePipe.length === 2) {
          // recycle pipe
          this.addCouplePipe(couplePipe[0], couplePipe[1])
          this._callback()
        }
      }
    })
  }

  update = (time: number, delta: number) => {
    this.recyclePipes()
  }
  get pipes(): Phaser.Physics.Arcade.Group {
    return this
  }
}
