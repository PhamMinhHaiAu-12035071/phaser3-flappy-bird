import 'phaser'
import PreloadScene from './scenes/preloadScene'
import MenuScene from './scenes/menuScene'
import ReadyScene from './scenes/readyScene'
import StartGameScene from './scenes/startGameScene'

const DEFAULT_WIDTH = 288
const DEFAULT_HEIGHT = 512

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  pixelArt: true,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MenuScene, ReadyScene, StartGameScene],
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
      // debugShowVelocity: true,
      // debugVelocityColor: 0xffff00,
      // debugBodyColor: 0x0000ff,
      // debugStaticBodyColor: 0xffffff
    }
  }
}

window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
})
