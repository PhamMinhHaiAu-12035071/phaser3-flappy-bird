export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' })
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.image('background-day', 'assets/img/background-day.png')
    this.load.image('background-night', 'assets/img/background-night.png')
    this.load.image('ground', 'assets/img/base.png')
    this.load.image('0', 'assets/img/0.png')
    this.load.image('1', 'assets/img/1.png')
    this.load.image('2', 'assets/img/2.png')
    this.load.image('3', 'assets/img/3.png')
    this.load.image('4', 'assets/img/4.png')
    this.load.image('5', 'assets/img/5.png')
    this.load.image('6', 'assets/img/6.png')
    this.load.image('7', 'assets/img/7.png')
    this.load.image('8', 'assets/img/8.png')
    this.load.image('9', 'assets/img/9.png')
    this.load.image('small-0', 'assets/img/font_small_0.png')
    this.load.image('small-1', 'assets/img/font_small_1.png')
    this.load.image('small-2', 'assets/img/font_small_2.png')
    this.load.image('small-3', 'assets/img/font_small_3.png')
    this.load.image('small-4', 'assets/img/font_small_4.png')
    this.load.image('small-5', 'assets/img/font_small_5.png')
    this.load.image('small-6', 'assets/img/font_small_6.png')
    this.load.image('small-7', 'assets/img/font_small_7.png')
    this.load.image('small-8', 'assets/img/font_small_8.png')
    this.load.image('small-9', 'assets/img/font_small_9.png')

    this.load.image('get-ready', 'assets/img/get-ready.png')
    this.load.image('tap-tap', 'assets/img/tap-tap.png')
    this.load.spritesheet('bird', 'assets/img/yellow-bird-sprite-sheet.png', {
      frameWidth: 34,
      frameHeight: 24
    })
    this.load.image('pipe', 'assets/img/pipe-green.png')
    this.load.image('game-over', 'assets/img/game-over.png')
    this.load.image('score-board', 'assets/img/score-board.png')
    // level score
    this.load.image('copper-medal', 'assets/img/copper-medal.png')
    this.load.image('silver-medal', 'assets/img/silver-medal.png')
    this.load.image('gold-medal', 'assets/img/gold-medal.png')
    this.load.image('platinum-medal', 'assets/img/platinum-medal.png')

    this.load.image('play-button', 'assets/img/play-button.png')
    this.load.image('pause-button', 'assets/img/pause-button.png')
    this.load.image('new-score', 'assets/img/new.png')
    this.load.image('play', 'assets/img/play.png')
    this.load.image('rank', 'assets/img/rank.png')
    this.load.image('back-button', 'assets/img/back.png')
    this.load.image('logo', 'assets/img/flappy.png')
    this.load.image('start-button', 'assets/img/start-button.png')
    this.load.image('rate-button', 'assets/img/rate-button.png')

    // load audio
    this.load.audio('die', ['assets/audio/die.mp3', 'assets/audio/die.wav'])
    this.load.audio('point', ['assets/audio/point.mp3', 'asset/audio/point.wav'])
    this.load.audio('wing', ['assets/audio/wing.mp3', 'asset/audio/wing.wav'])
    this.load.audio('swooshing', ['assets/audio/swooshing.mp3', 'asset/audio/swooshing.wav'])
  }

  create() {
    /**
     * khởi tạo animation cho con chim
     */
    this.anims.create({
      key: 'bird-idle',
      frames: this.anims.generateFrameNumbers('bird', { start: 2, end: 2 }),
      frameRate: 60
    })
    this.anims.create({
      key: 'bird-fly',
      frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    })
    this.scene.start('MenuScene')
  }
}
