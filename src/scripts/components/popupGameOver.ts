import SmallScore from '../objects/smallScore'

export default class PopupGameOver extends Phaser.GameObjects.Group {
  private readonly _scene: Phaser.Scene
  private _currentScore: SmallScore
  private _bestScore: SmallScore

  public static readonly WIDTH_SCORE_BOARD: number = 226
  public static readonly HEIGHT_SCORE_BOARD: number = 118
  public static readonly DURATION: number = 350
  constructor(scene: Phaser.Scene) {
    super(scene, [], { setScale: { x: 0, y: 0 } })
    this._scene = scene
  }

  show(score: number) {
    const offsetBgScoreBoard = this._scene.cameras.main.height * 0.33
    const offsetMedal = offsetBgScoreBoard + 65
    const paddingScore = 5
    const offsetCurrentScore = offsetBgScoreBoard + 35 + paddingScore
    const offsetBestScore = offsetBgScoreBoard + 78 + paddingScore
    const offsetNew = offsetBgScoreBoard + 65
    const offsetButton = offsetBgScoreBoard + PopupGameOver.HEIGHT_SCORE_BOARD + 50
    this.create(this._scene.cameras.main.width / 2, this._scene.cameras.main.height * 0.25, 'game-over').setScale(0)
    const play = this.create(
      this._scene.cameras.main.width / 2 - PopupGameOver.WIDTH_SCORE_BOARD * 0.265,
      offsetButton,
      'play'
    )
      .setDepth(1)
      .setScale(0)
      .setInteractive({ cursor: 'pointer' })
    this.create(this._scene.cameras.main.width / 2 + PopupGameOver.WIDTH_SCORE_BOARD * 0.265, offsetButton, 'rank')
      .setScale(0)
      .setDepth(1)
      .setInteractive({ cursor: 'pointer' })
    this.create(this._scene.cameras.main.width / 2, offsetBgScoreBoard, 'score-board')
      .setOrigin(0.5, 0)
      .setDepth(1)
      .setScale(0)
    if (score <= 10) {
      this.create(
        this._scene.cameras.main.width / 2 - PopupGameOver.WIDTH_SCORE_BOARD * 0.29,
        offsetMedal,
        'copper-medal'
      )
        .setDepth(2)
        .setScale(0)
    } else if (score <= 100) {
      this.create(
        this._scene.cameras.main.width / 2 - PopupGameOver.WIDTH_SCORE_BOARD * 0.29,
        offsetMedal,
        'silver-medal'
      )
        .setDepth(2)
        .setScale(0)
    } else if (score <= 1000) {
      this.create(
        this._scene.cameras.main.width / 2 - PopupGameOver.WIDTH_SCORE_BOARD * 0.29,
        offsetMedal,
        'gold-medal'
      )
        .setDepth(2)
        .setScale(0)
    } else {
      this.create(
        this._scene.cameras.main.width / 2 - PopupGameOver.WIDTH_SCORE_BOARD * 0.29,
        offsetMedal,
        'platinum-medal'
      )
        .setDepth(2)
        .setScale(0)
    }
    let isShowNew: boolean = false
    this.create(this._scene.cameras.main.width / 2 + PopupGameOver.WIDTH_SCORE_BOARD * 0.16, offsetNew, 'new-score')
      .setDepth(2)
      .setScale(0)
    this._bestScore = new SmallScore(this._scene, offsetBestScore, 0)
    this._currentScore = new SmallScore(this._scene, offsetCurrentScore, 0)
    this._currentScore.value = score
    this._scene.time.addEvent({
      callback: () => {
        this._currentScore.setScoreWithAnimation()
      },
      callbackScope: this,
      delay: PopupGameOver.DURATION, // 1000 = 1 second
      loop: false,
      repeat: 0
    })
    const getScore = localStorage.getItem('score')
    if (getScore !== null) {
      const arrScore = JSON.parse(getScore)
      const max = Math.max(...arrScore)
      if (max < score) {
        const newArr = [...arrScore, score]
        localStorage.setItem('score', JSON.stringify(newArr))
        isShowNew = true
        this._bestScore.value = score
        this._bestScore.setScoreWithNoAnimation()
      } else {
        this._bestScore.value = max
        this._bestScore.setScoreWithNoAnimation()
      }
    } else {
      const newArr = [score]
      localStorage.setItem('score', JSON.stringify(newArr))
      isShowNew = true
      this._bestScore.value = score
      this._bestScore.setScoreWithNoAnimation()
    }
    this.children.iterate(child => {
      if (child['texture'].key === 'rank') {
        this._scene.tweens.add({
          targets: child,
          scaleX: '+=2',
          scaleY: '+=2',
          ease: 'Sine.easeInOut',
          duration: PopupGameOver.DURATION,
          repeat: 0,
          yoyo: false,
          delay: 0
        })
      } else if (child['texture'].key === 'new-score') {
        if (isShowNew) {
          this._scene.tweens.add({
            targets: child,
            scaleX: '+=1',
            scaleY: '+=1',
            ease: 'Sine.easeInOut',
            duration: PopupGameOver.DURATION,
            repeat: 0,
            yoyo: false,
            delay: 0
          })
        }
      } else {
        this._scene.tweens.add({
          targets: child,
          scaleX: '+=1',
          scaleY: '+=1',
          ease: 'Sine.easeInOut',
          duration: PopupGameOver.DURATION,
          repeat: 0,
          yoyo: false,
          delay: 0
        })
      }
    })

    // listen event
    play.on('pointerdown', this.handlePressPlayButton)
  }
  hidden() {
    this.children.iterate(child => {
      if (child['texture'].key === 'rank') {
        this._scene.tweens.add({
          targets: child,
          scaleX: '-=2',
          scaleY: '-=2',
          ease: 'Sine.easeInOut',
          duration: PopupGameOver.DURATION,
          repeat: 0,
          yoyo: false,
          delay: 0
        })
      } else if (child['texture'].key === 'new-score') {
        child.destroy()
      } else {
        this._scene.tweens.add({
          targets: child,
          scaleX: '-=1',
          scaleY: '-=1',
          ease: 'Sine.easeInOut',
          duration: PopupGameOver.DURATION,
          repeat: 0,
          yoyo: false,
          delay: 0
        })
      }
    })
  }
  handlePressPlayButton = () => {
    this._bestScore.clear(true)
    this._currentScore.clear(true)
    this.hidden()
    this._scene.time.addEvent({
      delay: PopupGameOver.DURATION,
      loop: false,
      callback: () => {
        this._scene.scene.restart()
      }
    })
  }
}
