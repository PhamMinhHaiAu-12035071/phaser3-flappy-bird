import BaseScene from './baseScene'
import Score from '../objects/score'
import BirdObject from '../objects/birdObject'
import { STATUS_OBJECT } from '../../types/shared-types'
import GroupPipes from '../objects/groupPipes'
import PopupGameOver from '../components/popupGameOver'

export default class StartGameScene extends BaseScene {
  private _score: Score
  private _bird: BirdObject
  private _groupPipes: GroupPipes
  private _gameOver: PopupGameOver
  private _playButton: Phaser.GameObjects.Sprite
  private _pauseButton: Phaser.GameObjects.Sprite
  private _backButton: Phaser.GameObjects.Sprite
  private _isPressingPlayButton: boolean
  private _isPressingPauseButton: boolean
  private _isGameOver: boolean
  constructor() {
    super('StartGameScene')
  }

  create() {
    super.create()
    this._isGameOver = false
    this._score = new Score(this, this.cameras.main.height * 0.125, 0)
    this._playButton = this.add
      .sprite(this.cameras.main.width * 0.9, this.cameras.main.height * 0.125, 'play-button')
      .setScale(1.5)
      .setDepth(2)
      .setInteractive({ cursor: 'pointer' })
      .setAlpha(1)

    this._pauseButton = this.add
      .sprite(this.cameras.main.width * 0.9, this.cameras.main.height * 0.125, 'pause-button')
      .setScale(1.5)
      .setDepth(2)
      .setInteractive({ cursor: 'pointer' })
      .setAlpha(0)

    this._backButton = this.add
      .sprite(this.cameras.main.width * 0.1, this.cameras.main.height * 0.125, 'back-button')
      .setScale(1)
      .setDepth(2)
      .setInteractive({ cursor: 'pointer' })
      .setAlpha(1)
    this._bird = new BirdObject(this, this.cameras.main.width * 0.3, this.cameras.main.height / 2 - 20, 'bird')
    this._bird.play('bird-fly', true)
    this.backgroundGame.status = STATUS_OBJECT.Running
    // this.ground.status = STATUS_OBJECT.Running
    this._groupPipes = new GroupPipes(this, this.callBackRecyclePipe)
    this.createColliders()
    // create popup game over
    this._gameOver = new PopupGameOver(this)

    this._isPressingPlayButton = false
    this._isPressingPauseButton = false
    this._bird.applyGravity = true
    // listener event
    this.input.on('pointerdown', this.handlePressSpaceOrTouch)
    this.input.keyboard.on('keydown-SPACE', this.handlePressSpaceOrTouch)
    this._playButton.on('pointerdown', this.handlePressPlayButton)
    this._pauseButton.on('pointerdown', this.handlePressPauseButton)
    this._backButton.on('pointerdown', this.goBack)
  }

  update(time: number, delta: number) {
    super.update(time, delta)
    if (!this._isGameOver) {
      this.checkBirdCollidingWorld()
      this.increaseDifficultyOfGame()
    }
  }

  createColliders(): void {
    // check colliding between bird and multiple pipes
    this.physics.add.collider(this._bird, this._groupPipes, this.gameOver, undefined, this)
  }
  checkBirdCollidingWorld(): void {
    const totalBird = Math.round(this._bird.y + this._bird.height)
    if (totalBird >= this.cameras.main.height || totalBird <= this._bird.width) {
      this.gameOver()
    }
  }

  pauseGame(): void {
    this.physics.pause()
    this._bird.stop() // stop animation of bird
    this._bird.isPaused = true // stop update angle for bird
    // stop move background game
    this.backgroundGame.status = STATUS_OBJECT.Stop
    this.backgroundGame.audio.pause()
    // this.ground.status = STATUS_OBJECT.Stop
  }

  resumeGame(): void {
    this.physics.resume()
    this._bird.play('bird-fly', true)
    this._bird.isPaused = false
    // resume background game
    this.backgroundGame.status = STATUS_OBJECT.Running
    // this.ground.status = STATUS_OBJECT.Running
  }
  gameOver(): void {
    // remove all event listeners
    this.game.sound.play('die')
    this._isGameOver = true
    this.removeEvent()
    this.pauseGame()
    // open popup game over
    this._gameOver.show(this._score.value)
  }

  callBackRecyclePipe = () => {
    this._score.value += 1 // increase point
    this.game.sound.play('point')
  }

  increaseDifficultyOfGame() {
    if (this._score.value <= 100) {
      // level easy game
      this._groupPipes.pipeVerticalDistanceRange = [150, 350]
      this._groupPipes.pipeHorizontalDistanceRange = [200, 350]
      this._groupPipes.setVelocityX(-100)
      this.backgroundGame.speed = 2
    } else if (this._score.value <= 1000) {
      // level normal game
      this._groupPipes.pipeVerticalDistanceRange = [150, 250]
      this._groupPipes.pipeHorizontalDistanceRange = [150, 250]
      this._groupPipes.setVelocityX(-150)
      this.backgroundGame.speed = 4
    } else if (this._score.value > 1000) {
      // level hard game
      this._groupPipes.pipeVerticalDistanceRange = [100, 150]
      this._groupPipes.pipeHorizontalDistanceRange = [150, 200]
      this._groupPipes.setVelocityX(-200)
      this.backgroundGame.speed = 6
    }
  }

  handlePressSpaceOrTouch = () => {
    if (!this._isPressingPlayButton) {
      if (this._isPressingPauseButton) {
        this._isPressingPauseButton = !this._isPressingPauseButton // unlock fly of bird
      } else {
        this._bird.fly()
      }
    }
  }

  handlePressPlayButton = () => {
    this._isPressingPlayButton = true // lock fly of bird
    this._isPressingPauseButton = false
    this._playButton.setAlpha(0)
    this._pauseButton.setAlpha(1)
    this.pauseGame()
  }

  handlePressPauseButton = () => {
    this.physics.resume()
    this._playButton.setAlpha(1)
    this._pauseButton.setAlpha(0)
    this.resumeGame()
    this._isPressingPlayButton = false
    this._isPressingPauseButton = true
  }

  removeEvent() {
    this._playButton.removeListener('pointerdown')
    this._pauseButton.removeListener('pointerdown')
    this.input.removeListener('pointerdown')
    this.input.keyboard.removeListener('keydown-SPACE')
  }
  goBack = () => {
    this.scene.start('ReadyScene')
  }
}
