function setWorld(worldState) {
    console.log(worldState);
    function makeTile(type) {
      return [sprite("tile"), { type }];
    }
  
    const map = [
      addLevel(
        [
          "                   ",
          " cdddddddddddddde    ",
          " 3000000000000002    ",
          " 3000000000000002    ",
          " 3000000000000002    ",
          " 3003000000888889    ",
          " 3003000002444445    ",
          " 300a888889777777   ",
          " 30064g4445777777    ",
          " 3000000000000000    ",
          " 3000000000021111   ",
          " 300000000002        ",
          " 111111111111        ",
          "      b            ",
          "     b             ",
          " b               b ",
        ],
        {
          tileWidth: 16,
          tileHeight: 16,
          tiles: {
            0: () => makeTile("grass-m"),
            1: () => makeTile("grass-water"),
            2: () => makeTile("grass-r"),
            3: () => makeTile("grass-l"),
            4: () => makeTile("ground-m"),
            5: () => makeTile("ground-r"),
            6: () => makeTile("ground-l"),
            7: () => makeTile("sand-1"),
            8: () => makeTile("grass-mb"),
            9: () => makeTile("grass-br"),
            a: () => makeTile("grass-bl"),
            b: () => makeTile("rock-water"),
            c: () => makeTile("grass-tl"),
            d: () => makeTile("grass-tm"),
            e: () => makeTile("grass-tr"),
            f: () => makeTile("plank-water"),
            g: () => makeTile("door-cave"),
          },
        }
      ),
      addLevel(
        [
          "      12       ",
          "      34       ",
          "   0     0  12 ",
          "      0     34 ",
          " 0    0        ",
          "      012      ",
          "       34      ",
          "              ",
          "              ",
          "        0        ",
          "                8",
          "                8",
          "                7",
        ],
        {
          tileWidth: 16,
          tileHeight: 16,
          tiles: {
            0: () => makeTile(),
            1: () => makeTile("bigtree-pt1"),
            2: () => makeTile("bigtree-pt2"),
            3: () => makeTile("bigtree-pt3"),
            4: () => makeTile("bigtree-pt4"),
            5: () => makeTile("tree-t"),
            6: () => makeTile("tree-b"),
            7: () => makeTile("plank-water"),
            8: () => makeTile("plank-wood"),
          },
        }
      ),
      addLevel(
        [
          " 0000000000000000",
          "0     11         0",
          "0           11   0",
          "0           11   0",
          "0                0",
          "0   2            0",
          "0   2  00 33333330",
          "0   2  00 3      0",
          "0   3333333      0",
          "0                0",
          "0            000 0",
          "0            0 0 0",
          " 00000000000      ",
          "     0           ",
          "                ",
          " 0               0",
        ],
        {
          tileWidth: 16,
          tileHeight: 16,
          tiles: {
            0: () => [
              area({ shape: new Rect(vec2(0), 16, 16) }),
              body({ isStatic: true }),
            ],
            1: () => [
              area({
                shape: new Rect(vec2(0), 8, 8),
                offset: vec2(4, 4),
              }),
              body({ isStatic: true }),
            ],
            2: () => [
              area({ shape: new Rect(vec2(0), 2, 16) }),
              body({ isStatic: true }),
            ],
            3: () => [
              area({
                shape: new Rect(vec2(0), 16, 20),
                offset: vec2(0, -4),
              }),
              body({ isStatic: true }),
            ],
          },
        }
      ),
    ];
  
    for (const layer of map) {
      layer.use(scale(4));
      for (const tile of layer.children) {
        if (tile.type) {
          tile.play(tile.type);
        }
      }
    }

    const spiderMon = add([
      sprite("mini-mons"),
      area(),
      body({ isStatic: true }),
      pos(600, 300),
      scale(4),
      "spider",
    ]);
    const laprasStartPos = vec2(700, 775);
    let lapras = add([
      sprite("lapras"),
      scale(2),
      pos(laprasStartPos),
      area(),
      body({ isStatic: true }),
      "lapras",
    ]);
    spiderMon.play("spider");
    spiderMon.flipX = true;
  
    const centipedeMon = add([
      sprite("mini-mons"),
      area(),
      body({ isStatic: true }),
      pos(100, 100),
      scale(4),
      "centipede",
    ]);
    centipedeMon.play("centipede");
  
    const grassMon = add([
      sprite("mini-mons"),
      area(),
      body({ isStatic: true }),
      pos(900, 570),
      scale(4),
      "grass",
    ]);
    grassMon.play("grass");
  
    add([
      sprite("npc"),
      scale(4),
      pos(600, 700),
      area(),
      body({ isStatic: true }),
      "npc",
    ]);
  
    const player = add([
      sprite("player-down"),
      pos(500, 700),
      scale(4),
      area(),
      body(),
      {
        currentSprite: "player-down",
        speed: 300,
        isInDialogue: false,
        isLapras: false,
      },
    ]);
    player.onCollide("lapras", () => {
      if (!player.isLapras) {
        player.isLapras = true;
        player.use(sprite("lapras"));
        player.scale = vec2(2);
        player.speed = 400;
        player.laprasStartPos = laprasStartPos.clone();
        destroy(lapras);
      }
    });
  
    let tick = 0;
    onUpdate(() => {
      camPos(player.pos);
      tick++;
      if (
        (isKeyDown("s") || isKeyDown("w")) &&
        tick % 20 === 0 &&
        !player.isInDialogue
      ) {
        player.flipX = !player.flipX;
      }
      if (player.isLapras && isNearRightCoast(player)) {
        player.isLapras = false;
        player.use(sprite("player-down"));
        player.scale = vec2(4);
        player.speed = 300;
        lapras = add([
          sprite("lapras"),
          scale(2),
          pos(laprasStartPos),
          area(),
          body({ isStatic: true }),
          "lapras",
        ]);
      }
    });
  
    function setSprite(player, spriteName) {
      if (player.currentSprite !== spriteName) {
        player.use(sprite(spriteName));
        player.currentSprite = spriteName;
      }
    }
  
    onKeyDown("s", () => {
      if (player.isInDialogue) return;
      if (player.isLapras) {
        player.move(0, player.speed);
      } else {
        setSprite(player, "player-down");
        player.move(0, player.speed);
      }
    });
    onKeyDown("w", () => {
      if (player.isInDialogue) return;
      if (player.isLapras) {
        player.move(0, -player.speed);
      } else {
        setSprite(player, "player-up");
        player.move(0, -player.speed);
      }
    });
    onKeyDown("a", () => {
      if (player.isInDialogue) return;
      if (player.isLapras) {
        player.move(-player.speed, 0);
      } else {
        player.flipX = false;
        if (player.curAnim() !== "walk") {
          setSprite(player, "player-side");
          player.play("walk");
        }
        player.move(-player.speed, 0);
      }
    });
    onKeyDown("d", () => {
      if (player.isInDialogue) return;
      if (player.isLapras) {
        player.move(player.speed, 0);
      } else {
        player.flipX = true;
        if (player.curAnim() !== "walk") {
          setSprite(player, "player-side");
          player.play("walk");
        }
        player.move(player.speed, 0);
      }
    });

    onKeyRelease("a", () => {
      player.stop();
    });

    onKeyRelease("d", () => {
      player.stop();
    });

    if (!worldState) {
      worldState = {
        playerPos: player.pos,
        faintedMons: [],
      };
    }
  
    player.pos = vec2(worldState.playerPos);
    for (const faintedMon of worldState.faintedMons) {
      destroy(get(faintedMon)[0]);
    }
  
    player.onCollide("npc", () => {
      player.isInDialogue = true;
      const dialogueBoxFixedContainer = add([fixed()]);
      const dialogueBox = dialogueBoxFixedContainer.add([
        rect(1000, 200),
        outline(5),
        pos(150, 500),
        fixed(),
      ]);
      const dialogue =
        "Sconfiggi ogni pokemon per diventare il campione dell'isola!";
      const content = dialogueBox.add([
        text("", {
          size: 42,
          width: 900,
          lineSpacing: 15,
        }),
        color(10, 10, 10),
        pos(40, 30),
        fixed(),
      ]);
  
      if (worldState.faintedMons.length < 3) {
        content.text = dialogue;
      } else {
        content.text = "Sei il campione dell'isola!";
      }
  
      onUpdate(() => {
        if (isKeyDown("space")) {
          destroy(dialogueBox);
          player.isInDialogue = false;
        }
      });
    });
  
    function flashScreen() {
      const flash = add([
        rect(1280, 720),
        color(10, 10, 10),
        fixed(),
        opacity(0),
      ]);
      tween(
        flash.opacity,
        1,
        0.5,
        (val) => (flash.opacity = val),
        easings.easeInBounce
      );
    }
  
    function onCollideWithPlayer(enemyName, player, worldState) {
      player.onCollide(enemyName, () => {
        flashScreen();
        setTimeout(() => {
          worldState.playerPos = player.pos;
          worldState.enemyName = enemyName;
          go("battle", worldState);
        }, 1000);
      });
    }
  
    onCollideWithPlayer("cat", player, worldState);
    onCollideWithPlayer("spider", player, worldState);
    onCollideWithPlayer("centipede", player, worldState);
    onCollideWithPlayer("grass", player, worldState);
  }
  function isNearRightCoast(player) {
    return player.pos.x > 1000;
  }