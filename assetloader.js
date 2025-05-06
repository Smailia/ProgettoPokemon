function loadAssets() {
    loadSpriteAtlas('./assets/characters.png', {
        'player-down': {x: 0, y: 82, width: 16, height: 16 },
        'player-up': {x: 16, y:82 , width: 16, height: 16 },
        'player-side': {x: 0, y: 98, width: 32, height: 16, sliceX: 2, sliceY: 1, 
            anims: { 'walk': { from: 0, to: 1, speed: 6,}}
        },
        'npc': { x: 32, y: 98, width: 16, height: 16 },
        "spider-mon": { x: 32, y: 16, width: 32, height: 32 },
        "centipede-mon": { x: 64, y: 16, width: 32, height: 32 },
        "grass-mon": { x: 0, y: 49, width: 32, height: 32 },
        "mushroom-mon": { x: 32, y: 49, width: 32, height: 32 },
        "mini-mons": { x: 0, y: 0, width: 128, height: 16, sliceX: 8, sliceY: 1, 
            anims: { "spider": 1, "centipede": 2, "grass": 3}
        }
    })
}
