/* =========================================================
   NATAL PIXEL ART — Sistema de efeitos natalinos retrô 16-bit
   Injeta tudo via JS. Não altera layout, menus ou funções.
   Uso: <script src="natal.js"></script>
   ========================================================= */
(function () {
  'use strict';

  // ---------- Config ----------
  var KEY = 'natal-effects-enabled';
  var ALPHA = 0.6; // opacidade global dos efeitos (0 = invisível, 1 = original)
  var store = {
    get: function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set: function(k,v){ try { localStorage.setItem(k,v); } catch(e){} }
  };
  var enabled = store.get(KEY) !== 'off';

  var PALETTE = {
    red: '#E8392C', darkred: '#A62018', green: '#2E9E4F', darkgreen: '#1E6B35',
    gold: '#FFD447', yellow: '#FFF3A0', white: '#FFFFFF', ice: '#BFE9FF',
    ice2: '#7FC8E8', blue: '#3A7BD5', brown: '#8B5A2B', skin: '#F0C9A0',
    black: '#1A1A2E', gray: '#6B7280',
    pika: '#F8D030', pikaDark: '#C8A020', pink: '#F8B8D0', pinkDark: '#D880A8',
    lightBlue: '#A0D8F0', darkBlue: '#3060A0', orange: '#F08030', darkOrange: '#C05820',
    flame: '#FF9020', flame2: '#FFD040', lava: '#E03010', lilac: '#C8A0E8',
    lilacDark: '#9060C0', cream: '#FFF8E0', shadow: '#14141E',
    cheekRed: '#E04030', fireRed: '#E83820', fireYellow: '#FFC030',
    bulb: '#58A890'
  };

  // ---------- Sprites pixel art (matrizes) ----------
  var S = {
    snow: [
      '..W..', '.WWW.', 'WWWWW', '.WWW.', '..W..'
    ],
    star: [
      '..G..', '..G..', 'GGGGG', '..G..', '..G..'
    ],
    starBig: [
      '...G...', '...G...', '.GGGGG.', 'GGGGGGG', '.GGGGG.', '...G...', '...G...'
    ],
    gift: [
      'RRRRRRR', 'RYYYYYR', 'RRRRRRR', 'GRRRRRG', 'GGRRRGG', 'GGRRRGG', 'GGGGGGG'
    ],
    santa: [
      '......RRRR......', '.....RRRRRR.....', '....RRRRRRRR....', '...WWSKKSKKSWW...',
      '..WWSKKSKKSKKSWW.', '..WRRRRRRRRRRRRW.', '.WRRWRRRRRRWRRRW.', '.WRRWRRRRRRWRRRW.',
      '.WRRRRRRRRRRRRRW.', '..WWRRRRRRRRWWW..', '...WWBBBBBBWW....', '....BBBBBBBB.....'
    ],
    reindeer: [
      '..BB......BB..', '.BBBB....BBBB.', '.BBBBBBBBBBBB.', '..BBBBNNBBBB...',
      '...BBBNNNBBB...', '...RBBBNNBBB...', '..RRRBBBBB.....', '..BB.BBB.B.....'
    ],
    tree: [
      '.....G.....', '....GGG....', '...GGGGG...', '..GGRGRGG..', '.GGGGRGGGG.',
      '.GGYGGYGGG.', 'GGGGRGRGGGG', 'GGYGGGGGYGG', 'GGGGRGRGGGG', '...BBBBB...',
      '...BBBBB...', '...BBBBB...'
    ],
    snowman: [
      '...WWW...', '..WWWWW..', '..WBWBW..', '..WWWWW..', '...WRW...', '...WWW...',
      '.WWWWWWW.', 'WWWBWBWWW', 'WWWWWWWWW', 'WWWRRRWWW', '.WWWWWWW.', '..WWWWW..'
    ],
    candy: [
      '.RR..', 'R.RR.', 'R.RR.', '.RR..', '.RR..', '.RR..', '.RR..', '.RR..', '.RR..', '.RR..'
    ],
    crystal: [
      '..I..', '.III.', 'IIIII', '.III.', '.III.', '..I..', '..I..'
    ],
    garland: [
      'G.G.G.G.G.G.G.G', '.G.G.G.G.G.G.G.', 'G.G.G.G.G.G.G.G'
    ],

    /* ---- POKÉMON PIXEL ART (2 frames cada) ---- */
    /* Pikachu: orelhas longas com ponta preta, bochechas vermelhas, cauda em raio */
    pikachu1: [
      '.....K....K.....', '....KYK..KYK....', '....KYK..KYK....', '....KYYKKYYK....',
      '.....KYYYYK.....', '...KYYYYYYYYK...', '..KYYYYYYYYYYK..', '..KYKYYYYYYKYK..',
      '..KYYRYYYYRYYK..', '..KYYRYYYYRYYK..', '..KYYYYKKYYYYK..', '...KYYYYYYYYK...',
      '....KYYYYYYK....', '.....KYYYYK.....', '..KKKKYYYYKKKK..', '.KYYYYYYYYYYYYK.',
      '..KKYYYYYYYYKK..', '....KKKKKKKK....'
    ],
    pikachu2: [
      '.....K....K.....', '....KYK..KYK....', '....KYK..KYK....', '....KYYKKYYK....',
      '.....KYYYYK.....', '...KYYYYYYYYK...', '..KYYYYYYYYYYK..', '..KYKYYYYYYKYK..',
      '..KYYRYYYYRYYK..', '..KYYRYYYYRYYK..', '..KYYYYKKYYYYK..', '...KYYYYYYYYK...',
      '....KYYYYYYK....', '.....KYYYYK.....', '..KKKKYYYYKKKK..', '.KYYYYYYYYYYYYK.',
      '...KKYYYYYYYYKK.', '.....KKKKKKKK...'
    ],
    /* Eevee: orelhas grandes, colarinho creme, cauda fofa */
    eevee1: [
      '...BB......BB...', '..BBBB....BBBB..', '..BBBBB..BBBBB..', '...BBBBBBBBBB...',
      '..BBBBBBBBBBBB..', '..BBKKBBBBKKBB..', '..BBBBBBBBBBBB..', '..BBCWWWWWWCBB..',
      '..BBBBBNNBBBBB..', '...BBBBBBBBBB...', '....BBBBBBBB....', '.....BBBBBB.....',
      '....BBBBBBBB....', '...BBBBBBBBBB...', '....BBBBBBBB....', '.....BBBBBB.....'
    ],
    eevee2: [
      '...BB......BB...', '..BBBB....BBBB..', '..BBBBB..BBBBB..', '...BBBBBBBBBB...',
      '..BBBBBBBBBBBB..', '..BBKKBBBBKKBB..', '..BBBBBBBBBBBB..', '..BBCWWWWWWCBB..',
      '..BBBBBNNBBBBB..', '...BBBBBBBBBB...', '....BBBBBBBB....', '.....BBBBBB.....',
      '....BBBBBBBB....', '...BBBBBBBBBB...', '.....BBBBBB.....', '......BBBB......'
    ],
    /* Piplup: azul, barriga branca, bico amarelo, crista */
    piplup1: [
      '......LL........', '.....LLLL.......', '....LLLLLL......', '...LLLLLLLL.....',
      '...LLKLLKLL.....', '...LLLLLLLL.....', '...LWWWWWWL.....', '..LLWWWWWWLL....',
      '..LLWLLLLWLL....', '..LLLAAAALLL....', '...LLLLLLLL.....', '....LLLLLL......',
      '....LLLLLL......', '...LLL..LLL.....'
    ],
    piplup2: [
      '......LL........', '.....LLLL.......', '....LLLLLL......', '...LLLLLLLL.....',
      '...LLKLLKLL.....', '...LLLLLLLL.....', '...LWWWWWWL.....', '..LLWWWWWWLL....',
      '..LLWLLLLWLL....', '..LLLAAAALLL....', '...LLLLLLLL.....', '....LLLLLL......',
      '....LLLLLL......', '..LLL....LLL....'
    ],
    /* Snorlax: corpo grande, olhos fechados, barriga creme */
    snorlax1: [
      '....KKKKKKKK....', '..KKSSSSSSSSKK..', '.KSSSSSSSSSSSSK.', '.KSSKSSSSSSKSSK.',
      '.KSSSSSSSSSSSSK.', '.KSS-WWSSWW-SSK.', '.KSSSSSSSSSSSSK.', '.KSSMMMMMMMMSSK.',
      '.KSSMMMMMMMMSSK.', '.KSSMMMMMMMMSSK.', '..KKSSSSSSSSKK..', '....KKKKKKKK....'
    ],
    snorlax2: [
      '....KKKKKKKK....', '..KKSSSSSSSSKK..', '.KSSSSSSSSSSSSK.', '.KSSKSSSSSSKSSK.',
      '.KSSSSSSSSSSSSK.', '.KSSWWSSSSWWSSK.', '.KSSSSSSSSSSSSK.', '.KSSMMMMMMMMSSK.',
      '.KSSMMMMMMMMSSK.', '.KSSMMMMMMMMSSK.', '..KKSSSSSSSSKK..', '....KKKKKKKK....'
    ],
    /* Charmander: laranja, olhos azuis, barriga clara, cauda com chama */
    charmander1: [
      '......OO........', '.....OOOO.......', '....OOOOOO......', '....OUOUOO......',
      '....OOOOOO......', '...OOONOOO......', '..OOOOMOOOO.....', '..OOOMMMOOO.....',
      '..OOOMMMOOO.....', '...OOOMMOO......', '....OOOO........', '....OO.OO.......',
      '...OOO.OOO......', '..OOOO.OOOO.....', '..OOOOOFFF......', '...OOO.FFF......',
      '....OO.F........'
    ],
    charmander2: [
      '......OO........', '.....OOOO.......', '....OOOOOO......', '....OUOUOO......',
      '....OOOOOO......', '...OOONOOO......', '..OOOOMOOOO.....', '..OOOMMMOOO.....',
      '..OOOMMMOOO.....', '...OOOMMOO......', '....OOOO........', '....OO.OO.......',
      '...OOO.OOO......', '..OOOO.OOOO.....', '..OOOOOFF.......', '...OOO.FF.......',
      '....OO.F........'
    ],
    /* Squirtle: azul claro, casco marrom, cauda enrolada */
    squirtle1: [
      '....DDDDDD......', '...DDDDDDDD.....', '..DDDDDDDDDD....', '..DDKDDDKDDD....',
      '..DDDDDDDDDD....', '..DDDBBBBBBD....', '.DDDBBBBBBBBD...', '.DDDBNBBBNBBD...',
      '.DDDBBBBBBBBD...', '..DDDBBBBBBD....', '...DDDDDDDD.....', '....DDDDDD......',
      '....DD..DD......', '...DD....DD.....'
    ],
    squirtle2: [
      '....DDDDDD......', '...DDDDDDDD.....', '..DDDDDDDDDD....', '..DDKDDDKDDD....',
      '..DDDDDDDDDD....', '..DDDBBBBBBD....', '.DDDBBBBBBBBD...', '.DDDBBNBNBBBD...',
      '.DDDBBBBBBBBD...', '..DDDBBBBBBD....', '...DDDDDDDD.....', '....DDDDDD......',
      '....DD..DD......', '...DD...DD......'
    ],
    /* Bulbasaur: verde, bulbo azul-esverdeado, olhos vermelhos */
    bulbasaur1: [
      '.....TTTT.......', '....TTTTTT......', '...TTTTTTTT.....', '..TTGGGGGGGT....',
      '..GGGGGGGGGG....', '..GGKGGGGKGG....', '..GGRGGGGRGG....', '..GGGGNNGGGG....',
      '...GGGGGGGG.....', '....GGGGGG......', '...GGGGGGGG.....', '..GGGGGGGGGG....',
      '..GGG....GGG....'
    ],
    bulbasaur2: [
      '.....TTTT.......', '....TTTTTT......', '...TTTTTTTT.....', '..TTGGGGGGGT....',
      '..GGGGGGGGGG....', '..GGKGGGGKGG....', '..GGRGGGGRGG....', '..GGGGNNGGGG....',
      '...GGGGGGGG.....', '....GGGGGG......', '...GGGGGGGG.....', '..GGGGGGGGGG....',
      '..GGG..G.GGG....'
    ],
    /* Jigglypuff: rosa, olhos azuis grandes, tufo, orelhas */
    jigglypuff1: [
      '......PP........', '.....PPPP.......', '...PPPPPPPP.....', '..PPPPPPPPPP....',
      '.PPPPPPPPPPPP...', '.PPKAPPPPAKPP...', '.PPPPPPPPPPPP...', '.PPPPRRRRPPPP...',
      '.PPPPPKKPPPPP...', '..PPPPPPPPPP....', '...PPPPPPPP.....', '....PPPPPP......',
      '...PP....PP.....'
    ],
    jigglypuff2: [
      '......PP........', '.....PPPP.......', '...PPPPPPPP.....', '..PPPPPPPPPP....',
      '.PPPPPPPPPPPP...', '.PPKAPPPPAKPP...', '.PPPPPPPPPPPP...', '.PPPPPKKPPPPP...',
      '.PPPPPOOPPPPP...', '..PPPPPPPPPP....', '...PPPPPPPP.....', '....PPPPPP......',
      '...PP....PP.....'
    ],

    /* ---- Acessórios e cenário ---- */
    hat: [
      '..RRRR..', '.RRRRRR.', 'RRRRRRRR', '.WWWWWW.', 'WWWWWWWW'
    ],
    scarf: [
      'RRRRRRR', 'RRRRRRR', '.RRRRR.', '..RRR..'
    ],
    snowball: [
      '.WW.', 'WWWW', 'WWWW', '.WW.'
    ],
    campfire: [
      '..F...F..', '.FHFHFH..', '..FHF....', '.FHHHF...', '..FHF....',
      '..BBBB...', '.BBBBBB..', '..BBBB...'
    ],
    paw: [
      '.I.I.', 'IIIII', '.III.', '..I..'
    ],
    note: [
      '..NNN.', '.NNNNN', 'NN.NNN', 'NN.NNN', '.NNNNN', '..NNN.'
    ]
  };

  var COLOR = {
    // Base
    W: PALETTE.white, G: PALETTE.green, R: PALETTE.red, K: PALETTE.black,
    I: PALETTE.ice, N: PALETTE.black, H: PALETTE.fireRed, F: PALETTE.flame,
    // Pokémon
    Y: PALETTE.pika,        // Pikachu amarelo
    O: PALETTE.orange,      // Charmander laranja
    U: PALETTE.blue,        // olhos azuis
    M: PALETTE.cream,       // barriga clara / Snorlax
    P: PALETTE.pink,        // Jigglypuff rosa
    A: PALETTE.darkBlue,    // íris azul do Jigglypuff
    B: PALETTE.brown,       // Eevee / casco Squirtle
    C: PALETTE.cream,       // colarinho Eevee
    D: PALETTE.lightBlue,   // Squirtle azul
    L: PALETTE.darkBlue,    // Piplup azul escuro
    S: PALETTE.ice2,        // Snorlax azul-acinzentado
    T: PALETTE.bulb,        // bulbo do Bulbasaur
    // extras
    V: PALETTE.lilac, E: PALETTE.red, Z: PALETTE.gray
  };

  // ---------- Sprites reais (GBA / 16-bit) ----------
  var IMG = {};
  var imgsReady = false;
  (function loadImages() {
    var names = ['pikachu','eevee','piplup','snorlax','charmander','squirtle','bulbasaur','jigglypuff'];
    var pending = names.length;
    names.forEach(function (n) {
      var im = new Image();
      im.onload = function () { if (--pending === 0) imgsReady = true; };
      im.onerror = function () { IMG[n] = null; if (--pending === 0) imgsReady = true; };
      im.src = 'sprites/' + n + '.png';
      IMG[n] = im;
    });
  })();

  function drawPokemon(img, x, y, size, alpha, flip) {
    if (!img || !img.complete || !img.naturalWidth) return;
    ctx.save();
    if (alpha != null) ctx.globalAlpha *= alpha;
    if (flip) {
      ctx.translate(x + size, y);
      ctx.scale(-1, 1);
      ctx.drawImage(img, 0, 0, size, size);
    } else {
      ctx.drawImage(img, x, y, size, size);
    }
    ctx.restore();
  }

  function drawSprite(ctx, sprite, x, y, px, alpha) {
    ctx.save();
    if (alpha != null) ctx.globalAlpha *= alpha;
    for (var r = 0; r < sprite.length; r++) {
      var row = sprite[r];
      for (var c = 0; c < row.length; c++) {
        var ch = row.charAt(c);
        if (ch === '.') continue;
        var col = COLOR[ch];
        if (!col) continue;
        ctx.fillStyle = col;
        ctx.fillRect(Math.round(x) + c * px, Math.round(y) + r * px, px, px);
      }
    }
    ctx.restore();
  }

  // ---------- Canvas ----------
  var canvas = document.createElement('canvas');
  canvas.id = 'natal-canvas';
  Object.assign(canvas.style, {
    position: 'fixed', inset: '0', width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: '9998', imageRendering: 'pixelated'
  });
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var W = 0, H = 0, dpr = 1, compactMode = false;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    compactMode = W < 700;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = false;
    buildDecor();
  }

  // ---------- Partículas ----------
  var snow = [], stars = [], gifts = [], magic = [];
  var santa = null, reindeers = [];
  var pokemon = [], paws = [], snowballs = [], notes = [];

  function rand(a, b) { return a + Math.random() * (b - a); }

  function initParticles() {
    snow = [];
    var count = Math.min(100, Math.max(28, Math.floor(W * H / 22000)));
    for (var i = 0; i < count; i++) {
      snow.push({
        x: rand(0, W), y: rand(-H, H),
        s: Math.random() < 0.2 ? 3 : (Math.random() < 0.5 ? 2 : 1),
        vy: rand(0.3, 1.6), vx: rand(-0.4, 0.4),
        sway: rand(0, Math.PI * 2), a: rand(0.4, 0.95)
      });
    }
    stars = [];
    for (var j = 0; j < 45; j++) {
      stars.push({
        x: rand(0, W), y: rand(0, H * 0.6),
        p: rand(0, Math.PI * 2), sp: rand(0.02, 0.06),
        big: Math.random() < 0.25
      });
    }
    magic = [];
    for (var m = 0; m < 24; m++) spawnMagic(true);
    santa = { x: -120, y: 60, speed: rand(0.5, 0.9), active: true };
    reindeers = [];
    for (var r = 0; r < 3; r++) {
      reindeers.push({ x: -200 - r * 70, y: 110 + r * 18, speed: santa.speed + 0.02 });
    }

    // ---- Pokémon ----
    pokemon = [];
    paws = []; snowballs = []; notes = [];
    var baseY = H - 66;
    var compact = W < 700;
    var px = compact ? 2 : 3;
    var inset = compact ? 8 : 20;
    var span = W - inset * 2;

    function addP(kind, fx, yOff, act, opts) {
      var o = opts || {};
      var p = {
        kind: kind, x: inset + span * fx, y: baseY + yOff, px: px,
        hat: !!o.hat, scarf: o.scarf || false, act: act,
        frame: 0, phase: rand(0, 6), baseY: baseY + yOff
      };
      if (o.dir) p.dir = o.dir;
      pokemon.push(p);
      return p;
    }

    // Posições variadas: inferior e lateral (escalonadas para não sobrepor)
    addP('pikachu',    0.02, 0,   'snowman',   { hat:true, scarf:'R' });
    addP('eevee',      0.15, -30, 'jump',      { scarf:'G' });
    addP('jigglypuff', 0.27, 22,  'sing',      { hat:true, scarf:'R' });
    addP('piplup',     0.39, 0,   'snowball',  { hat:true, scarf:'B' });
    addP('snorlax',    0.52, 6,   'sleep',     { hat:true });
    addP('charmander', 0.66, 0,   'warm',      { scarf:'R' });
    addP('squirtle',   0.80, -24, 'slide',     { hat:true, dir:1 });
    addP('bulbasaur',  0.91, -4,  'decorate',  { scarf:'G' });
    // Visitante: entra, brinca e sai periodicamente
    addP('eevee', -0.2, 18, 'visit', { scarf:'G', dir:1 });

    // Fogueira ao lado do Charmander
    pokemon.push({ kind:'campfire', x: inset + span*0.66 + 50, y: baseY + 26, px: px, act:'fire', frame:0, phase:0 });

    // Pegadas iniciais
    for (var p = 0; p < 8; p++) paws.push({ x: rand(0,W), y: rand(H*0.6,H), a: rand(0.2,0.5), life: rand(200,500) });
  }

  function spawnMagic(initial) {
    magic.push({
      x: rand(0, W), y: initial ? rand(0, H) : H + 10,
      vy: rand(-0.5, -1.2), vx: rand(-0.3, 0.3),
      life: rand(80, 200), max: 200, hue: Math.random() < 0.5 ? 'Y' : 'I'
    });
  }

  // ---------- Decorações fixas ----------
  var decor = { trees: [], snowmen: [], candy: [], crystals: [], lights: [] };
  function buildDecor() {
    decor = { trees: [], snowmen: [], candy: [], crystals: [], lights: [] };
    var small = W < 700;
    var tpx = small ? 2 : 3;
    // Árvores nos cantos
    decor.trees.push({ x: 8, y: H - 12 * tpx, px: tpx });
    decor.trees.push({ x: W - 8 - 11 * tpx, y: H - 12 * tpx, px: tpx });
    // Bonecos de neve
    decor.snowmen.push({ x: 46, y: H - 12 * 2 - 6, px: 2 });
    decor.snowmen.push({ x: W - 46 - 9 * 2, y: H - 12 * 2 - 6, px: 2 });
    // Bengalas
    decor.candy.push({ x: 20, y: H / 2, px: 2, p: 0 });
    decor.candy.push({ x: W - 20 - 5 * 2, y: H / 2 + 80, px: 2, p: 1 });
    // Cristais de gelo nas bordas laterais
    for (var i = 0; i < Math.floor(H / 90); i++) {
      decor.crystals.push({ x: 2, y: 40 + i * 90, px: 2, left: true });
      decor.crystals.push({ x: W - 2 - 5 * 2, y: 70 + i * 90, px: 2, left: false });
    }
    // Luzes natalinas na borda superior
    var n = Math.floor(W / 46);
    for (var k = 0; k < n; k++) {
      decor.lights.push({ x: 20 + k * 46, p: rand(0, Math.PI * 2), c: k % 3 });
    }
  }

  // ---------- Pisca-piscas do card de parceiros ----------
  var partnerCard = null;
  function drawPartnerLights() {
    if (!partnerCard) partnerCard = document.querySelector('.partner-card');
    if (!partnerCard) return;
    var r = partnerCard.getBoundingClientRect();
    if (r.width < 20 || r.bottom < 0 || r.top > H) return;
    var cores = [PALETTE.red, PALETTE.gold, PALETTE.ice, PALETTE.green];
    var n = Math.max(4, Math.floor(r.width / 34));
    var step = r.width / n;
    for (var i = 0; i < n; i++) {
      var on = Math.sin(t * 0.09 + i * 0.9) > -0.2;
      var x = Math.round(r.left + step * (i + 0.5)) - 2;
      var yTop = Math.round(r.top) + 8;
      var yBot = Math.round(r.bottom) - 12;
      ctx.save();
      ctx.globalAlpha *= on ? 1 : 0.25;
      ctx.fillStyle = cores[i % cores.length];
      ctx.fillRect(x, yTop, 5, 5);
      ctx.fillRect(x, yBot, 5, 5);
      if (on) {
        ctx.globalAlpha *= 0.35;
        ctx.fillRect(x - 3, yTop - 3, 11, 11);
        ctx.fillRect(x - 3, yBot - 3, 11, 11);
      }
      ctx.restore();
    }
  }

  // ---------- Update ----------
  var t = 0, nextGift = 300;
  function update() {
    t++;
    for (var i = 0; i < snow.length; i++) {
      var s = snow[i];
      s.y += s.vy; s.sway += 0.01;
      s.x += s.vx + Math.sin(s.sway) * 0.3;
      if (s.y > H + 10) { s.y = -10; s.x = rand(0, W); }
      if (s.x < -10) s.x = W + 10;
      if (s.x > W + 10) s.x = -10;
    }
    for (var g = 0; g < gifts.length; g++) {
      gifts[g].y += gifts[g].vy;
      gifts[g].rot = (gifts[g].rot || 0) + 0.02;
      if (gifts[g].y > H + 20) gifts.splice(g, 1);
    }
    if (t > nextGift) {
      gifts.push({ x: rand(30, W - 30), y: -20, vy: rand(0.6, 1.2), px: 2 });
      nextGift = t + rand(400, 900);
    }
    for (var m = magic.length - 1; m >= 0; m--) {
      var mg = magic[m];
      mg.x += mg.vx; mg.y += mg.vy; mg.life--;
      if (mg.life <= 0 || mg.y < -10) magic.splice(m, 1);
    }
    if (magic.length < 24 && Math.random() < 0.1) spawnMagic(false);

    // Papai Noel e renas
    if (santa) {
      santa.x += santa.speed;
      if (santa.x > W + 140) {
        santa.x = -160; santa.y = rand(40, 100);
        santa.speed = rand(0.5, 0.9);
      }
      for (var r = 0; r < reindeers.length; r++) {
        var d = reindeers[r];
        d.x += santa.speed + 0.02;
        if (d.x > W + 120) d.x = -160 - r * 70;
        d.y = santa.y + 50 + r * 18 + Math.sin(t * 0.05 + r) * 5;
      }
    }

    // ---- Animação dos Pokémon ----
    for (var i = 0; i < pokemon.length; i++) {
      var p = pokemon[i];
      p.frame = Math.floor((t * 0.12) + p.phase) % 2;

      if (p.act === 'jump') {
        p.y = p.baseY - Math.abs(Math.sin(t * 0.06 + p.phase)) * 14;
      } else if (p.act === 'slide') {
        p.x += p.dir * 0.45;
        if (p.x > W - 40) p.dir = -1;
        if (p.x < 20) p.dir = 1;
      } else if (p.act === 'visit') {
        // Entra correndo, brinca no meio e sai; depois volta a entrar
        p.x += 0.8;
        if (t % 7 === 0) paws.push({ x:p.x+4, y:p.y+22, a:0.35, life:300 });
        if (p.x > W + 40) {
          p.x = -40;
          p.phase = rand(0, 6);
        }
      } else if (p.act === 'snowball') {
        if (t % 90 === 0) snowballs.push({ x:p.x+10, y:p.y, vx:rand(1,2), vy:-2, life:120 });
      } else if (p.act === 'sing') {
        if (t % 30 === 0) notes.push({ x:p.x+14, y:p.y-6, vy:-0.4, life:70 });
      } else if (p.act === 'snowman') {
        if (t % 120 === 0) paws.push({ x:p.x+rand(-10,20), y:p.y+30, a:0.4, life:400 });
      }
    }
    for (var s = snowballs.length - 1; s >= 0; s--) {
      var sb = snowballs[s];
      sb.x += sb.vx; sb.y += sb.vy; sb.vy += 0.05; sb.life--;
      if (sb.life <= 0 || sb.y > H) snowballs.splice(s, 1);
    }
    for (var n = notes.length - 1; n >= 0; n--) {
      notes[n].y += notes[n].vy; notes[n].life--;
      if (notes[n].life <= 0) notes.splice(n, 1);
    }
    for (var pa = paws.length - 1; pa >= 0; pa--) {
      paws[pa].life--;
      paws[pa].a -= 0.0008;
      if (paws[pa].life <= 0 || paws[pa].a <= 0) paws.splice(pa, 1);
    }
  }

  // ---------- Draw ----------
  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalAlpha = ALPHA; // aplica a opacidade global a todos os efeitos

    // Estrelas
    for (var i = 0; i < stars.length; i++) {
      var st = stars[i];
      st.p += st.sp;
      var a = 0.3 + Math.abs(Math.sin(st.p)) * 0.7;
      drawSprite(ctx, st.big ? S.starBig : S.star, st.x, st.y, st.big ? 2 : 1, a);
      // brilho
      ctx.save(); ctx.globalAlpha *= a * 0.25; ctx.fillStyle = PALETTE.yellow;
      ctx.fillRect(st.x - 3, st.y + (st.big ? 7 : 5), st.big ? 21 : 9, 1);
      ctx.restore();
    }

    // Guirlanda superior (linha + luzes)
    ctx.save();
    ctx.fillStyle = PALETTE.darkgreen;
    ctx.fillRect(0, 0, W, 4);
    ctx.fillStyle = PALETTE.green;
    ctx.fillRect(0, 4, W, 2);
    var lc = [PALETTE.red, PALETTE.gold, PALETTE.ice];
    for (var l = 0; l < decor.lights.length; l++) {
      var li = decor.lights[l];
      li.p += 0.05;
      var on = Math.sin(li.p) > -0.2;
      ctx.globalAlpha *= on ? 1 : 0.25;
      ctx.fillStyle = lc[li.c];
      ctx.fillRect(li.x, 6, 5, 5);
      if (on) { ctx.globalAlpha *= 0.3; ctx.fillRect(li.x - 2, 4, 9, 9); }
    }
    ctx.restore();

    // Pisca-piscas no card de parceiros
    drawPartnerLights();

    // Cristais nas bordas
    for (var c = 0; c < decor.crystals.length; c++) {
      var cr = decor.crystals[c];
      drawSprite(ctx, S.crystal, cr.x, cr.y, cr.px, 0.55);
    }

    // Árvores
    for (var tr = 0; tr < decor.trees.length; tr++) {
      var tree = decor.trees[tr];
      drawSprite(ctx, S.tree, tree.x, tree.y, tree.px);
      // pisca luzes da árvore
      ctx.save();
      ctx.globalAlpha *= 0.5 + Math.abs(Math.sin(t * 0.06 + tr)) * 0.5;
      ctx.fillStyle = PALETTE.gold;
      ctx.fillRect(tree.x + 4 * tree.px, tree.y + 4 * tree.px, 2, 2);
      ctx.fillStyle = PALETTE.red;
      ctx.fillRect(tree.x + 7 * tree.px, tree.y + 7 * tree.px, 2, 2);
      ctx.restore();
    }

    // Bonecos de neve (balanço)
    for (var sn = 0; sn < decor.snowmen.length; sn++) {
      var sm = decor.snowmen[sn];
      var bob = Math.sin(t * 0.04 + sn * 2) * 2;
      drawSprite(ctx, S.snowman, sm.x, sm.y + bob, sm.px);
    }

    // Bengalas
    for (var cd = 0; cd < decor.candy.length; cd++) {
      var cy = decor.candy[cd];
      var sway = Math.sin(t * 0.03 + cy.p) * 3;
      drawSprite(ctx, S.candy, cy.x + sway, cy.y, cy.px);
    }

    // Partículas mágicas
    for (var mg = 0; mg < magic.length; mg++) {
      var m2 = magic[mg];
      drawSprite(ctx, m2.hue === 'Y' ? S.star : S.snow, m2.x, m2.y, 1,
        Math.min(1, m2.life / 60));
    }

    // Neve
    for (var n = 0; n < snow.length; n++) {
      var s2 = snow[n];
      drawSprite(ctx, S.snow, s2.x, s2.y, s2.s, s2.a);
    }

    // Presentes
    for (var g = 0; g < gifts.length; g++) {
      var gf = gifts[g];
      drawSprite(ctx, S.gift, gf.x, gf.y, gf.px, 0.9);
    }

    // Renas
    for (var r = 0; r < reindeers.length; r++) drawSprite(ctx, S.reindeer, reindeers[r].x, reindeers[r].y, 2);

    // Papai Noel
    if (santa) drawSprite(ctx, S.santa, santa.x, santa.y + Math.sin(t * 0.05) * 3, 2);

    // ---- Pegadas na neve ----
    for (var pa = 0; pa < paws.length; pa++) {
      var pw = paws[pa];
      drawSprite(ctx, S.paw, pw.x, pw.y, 2, pw.a);
    }

    // ---- Pokémon (sprites reais GBA) ----
    var pokeSize = compactMode ? 46 : 64;
    for (var i = 0; i < pokemon.length; i++) {
      var p = pokemon[i];
      if (p.kind === 'campfire') {
        drawSprite(ctx, S.campfire, p.x, p.y, p.px, 0.95);
        ctx.save();
        ctx.globalAlpha *= 0.3 + Math.abs(Math.sin(t*0.1)) * 0.4;
        ctx.fillStyle = PALETTE.flame2;
        ctx.fillRect(p.x+6, p.y-4, 3, 4);
        ctx.restore();
        continue;
      }
      var img = IMG[p.kind];
      if (!img) continue;
      var flip = (p.act === 'slide' && p.dir < 0) || (p.act === 'visit' && p.dir < 0);
      var bob = (p.act === 'sleep') ? Math.sin(t*0.04+p.phase)*1.5 : 0;
      var x = p.x, y = p.y + bob;
      // Ajusta para manter os pés na mesma linha
      drawPokemon(img, x, y - 14, pokeSize, 0.95, flip);

      // Gorro natalino desenhado por cima do sprite
      if (p.hat) {
        var hx = x + pokeSize * 0.32, hy = y - 14 + pokeSize * 0.02;
        drawSprite(ctx, S.hat, hx, hy, 2);
        ctx.save();
        ctx.fillStyle = PALETTE.white;
        ctx.fillRect(hx + 2, hy + 8, 10, 2);
        ctx.fillStyle = PALETTE.red;
        ctx.fillRect(hx + 8, hy - 2, 2, 2);
        ctx.restore();
      }
      // Cachecol
      if (p.scarf) {
        ctx.save();
        ctx.globalAlpha *= 0.9;
        ctx.fillStyle = p.scarf === 'R' ? PALETTE.red : (p.scarf === 'G' ? PALETTE.green : PALETTE.blue);
        ctx.fillRect(x + pokeSize*0.28, y + pokeSize*0.52, pokeSize*0.44, 4);
        ctx.fillRect(x + pokeSize*0.62, y + pokeSize*0.52, 4, pokeSize*0.2);
        ctx.restore();
      }
      // "zzz" do Snorlax
      if (p.act === 'sleep' && Math.sin(t*0.03) > 0) {
        ctx.save(); ctx.fillStyle = PALETTE.ice; ctx.font = '12px monospace';
        ctx.fillText('z', x + pokeSize*0.8, y - 6); ctx.restore();
      }
    }

    // Bolas de neve
    for (var s = 0; s < snowballs.length; s++) drawSprite(ctx, S.snowball, snowballs[s].x, snowballs[s].y, 2);

    // Notas musicais (Jigglypuff cantando)
    for (var nn = 0; nn < notes.length; nn++) {
      ctx.save(); ctx.globalAlpha *= Math.min(1, notes[nn].life/30);
      drawSprite(ctx, S.note, notes[nn].x, notes[nn].y, 1);
      ctx.restore();
    }
  }

  function loop() {
    if (!enabled) return;
    update(); draw();
    requestAnimationFrame(loop);
  }

  // ---------- Toggle ----------
  var btn = document.createElement('button');
  btn.id = 'natal-toggle';
  btn.setAttribute('aria-label', 'Ativar/desativar efeitos natalinos');
  btn.title = 'Ativar/desativar decoração natalina';
  btn.textContent = '🎄';
  Object.assign(btn.style, {
    position: 'fixed', left: '14px', bottom: '14px', zIndex: '9999',
    width: '42px', height: '42px', border: '2px solid #FFD447',
    borderRadius: '10px', background: '#161E2A', color: '#fff',
    fontSize: '20px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,.5)',
    imageRendering: 'pixelated', lineHeight: '1', padding: '0'
  });
  btn.addEventListener('click', function () {
    enabled = !enabled;
    store.set(KEY, enabled ? 'on' : 'off');
    if (enabled) {
      canvas.style.display = '';
      btn.textContent = '🎄';
      btn.style.borderColor = '#FFD447';
      resize(); initParticles(); loop();
    } else {
      canvas.style.display = 'none';
      btn.textContent = '❄️';
      btn.style.borderColor = '#7FC8E8';
      ctx.clearRect(0, 0, W, H);
    }
  });
  document.body.appendChild(btn);

  window.addEventListener('resize', function () { if (enabled) resize(); });

  // ---------- Start ----------
  if (enabled) {
    resize(); initParticles(); loop();
  } else {
    canvas.style.display = 'none';
    btn.textContent = '❄️';
    btn.style.borderColor = '#7FC8E8';
  }
})();
