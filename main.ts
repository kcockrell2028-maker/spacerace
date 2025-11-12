controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . . . . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        . . . 7 7 . . . 
        `, ship, 0, -140)
    projectile.startEffect(effects.fire, 5000)
})
sprites.onOverlap(SpriteKind.Food, SpriteKind.Player, function (sprite, otherSprite) {
    if (true) {
        sprite.startEffect(effects.hearts, 200)
        info.changeLifeBy(1)
    }
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
})
let projectile: Sprite = null
let ship: Sprite = null
let fule = [
sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . f . . . . . 
    . . . . . . 2 2 2 2 f . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . 2 2 2 2 2 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Food)
]
let asteroids = [
sprites.space.spaceSmallAsteroid1,
sprites.space.spaceSmallAsteroid0,
sprites.space.spaceAsteroid0,
sprites.space.spaceAsteroid1,
sprites.space.spaceAsteroid4,
sprites.space.spaceAsteroid3
]
ship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . f f 9 9 9 9 f f . . . . 
    . . . f f 9 9 9 9 9 9 f f . . . 
    . . . f f 9 9 9 9 9 9 f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . . f f f f f f f f f f . . . 
    . . f f f f f f f f f f f f . . 
    . f f f f f f f f f f f f f f . 
    f f f f f f f 4 5 f f f f f f f 
    f f f f f f 5 4 1 2 f f f f f f 
    f f f 2 5 2 1 2 2 5 1 2 4 f f f 
    `, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.bubbles.startScreenEffect()
forever(function () {
    music.play(music.stringPlayable("C5 B A G F G A B ", 90), music.PlaybackMode.UntilDone)
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
