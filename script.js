/* ==========================================================================
   HANGMAN — SCRIPT.JS
   Sections: Word Bank, Sound Manager, Storage Manager, Confetti Engine,
   Particle Background, HangmanGame class, UI wiring / event listeners.
   ========================================================================== */

'use strict';

/* --------------------------------------------------------------------------
   1. WORD BANK — 8 categories, 20+ words each, each with a one-line hint
   -------------------------------------------------------------------------- */
const WORD_BANK = {
  Animals: [
    ['elephant', 'The largest land animal, known for its trunk.'],
    ['giraffe', 'Tallest land animal with a very long neck.'],
    ['dolphin', 'A highly intelligent marine mammal that clicks and whistles.'],
    ['penguin', 'A flightless bird that loves the cold and waddles.'],
    ['kangaroo', 'An Australian marsupial that carries its young in a pouch.'],
    ['cheetah', 'The fastest land animal on Earth.'],
    ['octopus', 'A sea creature with eight arms and three hearts.'],
    ['crocodile', 'A large reptile that lurks in rivers.'],
    ['butterfly', 'An insect that transforms from a caterpillar.'],
    ['squirrel', 'A small bushy-tailed rodent that hoards nuts.'],
    ['flamingo', 'A pink wading bird that often stands on one leg.'],
    ['chameleon', 'A lizard famous for changing its color.'],
    ['hedgehog', 'A small spiny mammal that curls into a ball.'],
    ['rhinoceros', 'A huge animal known for the horn on its nose.'],
    ['gorilla', 'The largest living primate.'],
    ['dragonfly', 'A fast-flying insect with two pairs of wings.'],
    ['peacock', 'A bird famous for its colorful tail feathers.'],
    ['jellyfish', 'A gelatinous sea creature that can sting.'],
    ['antelope', 'A graceful, fast grazing animal found in Africa.'],
    ['woodpecker', 'A bird that pecks holes into tree trunks.'],
  ],
  Countries: [
    ['ghana', 'A West African nation known for cocoa and gold.'],
    ['nigeria', 'The most populous country in Africa.'],
    ['canada', 'Known for maple syrup and its vast northern wilderness.'],
    ['brazil', 'Home to the Amazon rainforest and famous carnivals.'],
    ['japan', 'An island nation known as the Land of the Rising Sun.'],
    ['germany', 'Known for its engineering and Oktoberfest.'],
    ['australia', 'A country that is also a continent, home to kangaroos.'],
    ['egypt', 'Famous for the pyramids and the Nile River.'],
    ['mexico', 'Known for tacos, mariachi, and ancient pyramids.'],
    ['portugal', 'A country famous for its coastline and Fado music.'],
    ['argentina', 'Known for tango and vast grassy plains called pampas.'],
    ['thailand', 'Known as the Land of Smiles in Southeast Asia.'],
    ['kenya', 'East African country famous for its wildlife safaris.'],
    ['norway', 'Scandinavian country known for fjords and the midnight sun.'],
    ['morocco', 'North African country known for its colorful markets.'],
    ['iceland', 'A Nordic island nation known for volcanoes and geysers.'],
    ['singapore', 'A small island city-state known for its skyline.'],
    ['switzerland', 'Famous for chocolate, watches, and the Alps.'],
    ['colombia', 'South American country famous for coffee.'],
    ['zimbabwe', 'Southern African country home to Victoria Falls.'],
  ],
  Programming: [
    ['javascript', 'A programming language used for web development.'],
    ['python', 'A beginner-friendly language named after a comedy troupe.'],
    ['variable', 'A named container used to store a value.'],
    ['function', 'A reusable block of code that performs a task.'],
    ['algorithm', 'A step-by-step procedure for solving a problem.'],
    ['database', 'An organized collection of structured data.'],
    ['compiler', 'A program that translates code into machine language.'],
    ['debugging', 'The process of finding and fixing errors in code.'],
    ['recursion', 'When a function calls itself to solve a problem.'],
    ['framework', 'A pre-built structure that helps developers build apps faster.'],
    ['boolean', 'A data type that is either true or false.'],
    ['iteration', 'Repeating a set of instructions using loops.'],
    ['syntax', 'The set of rules that define a programming language.'],
    ['backend', 'The server-side part of an application.'],
    ['frontend', 'The user-facing part of an application.'],
    ['keyboard', 'The device you type code on.'],
    ['bootstrap', 'A popular CSS framework for building responsive sites.'],
    ['typescript', 'A typed superset of JavaScript.'],
    ['encryption', 'The process of encoding data to keep it secure.'],
    ['container', 'A lightweight package that bundles software and dependencies.'],
  ],
  Movies: [
    ['inception', 'A film about entering dreams within dreams.'],
    ['titanic', 'A tragic love story aboard a doomed ocean liner.'],
    ['gladiator', 'A film about a betrayed Roman general seeking revenge.'],
    ['avatar', 'A sci-fi film set on the moon Pandora.'],
    ['frozen', 'An animated film featuring two royal sisters and an ice power.'],
    ['jaws', 'A classic thriller about a giant shark terrorizing a beach town.'],
    ['matrix', 'A film where reality turns out to be a simulation.'],
    ['rocky', 'A film about an underdog boxer chasing his dream.'],
    ['coco', 'An animated film about a boy who visits the land of the dead.'],
    ['up', 'An animated film about an old man whose house is lifted by balloons.'],
    ['casablanca', 'A classic romance set during World War Two in Morocco.'],
    ['psycho', 'A classic horror film famous for its shower scene.'],
    ['amadeus', 'A film about the rivalry surrounding composer Mozart.'],
    ['braveheart', 'A film about a Scottish warrior fighting for independence.'],
    ['tangled', 'An animated film based on the story of Rapunzel.'],
    ['moana', 'An animated film about a girl who sails to save her island.'],
    ['gravity', 'A film about astronauts stranded in space after disaster strikes.'],
    ['whiplash', 'A film about an ambitious drummer and his ruthless teacher.'],
    ['parasite', 'A film about two families from vastly different social classes.'],
    ['interstellar', 'A film about astronauts searching for a new home through a wormhole.'],
  ],
  Sports: [
    ['football', 'A sport played with a round ball and two goals.'],
    ['basketball', 'A sport where players shoot a ball through a hoop.'],
    ['volleyball', 'A sport played over a net without letting the ball touch the ground.'],
    ['badminton', 'A racket sport played with a shuttlecock.'],
    ['swimming', 'A sport performed by moving through water.'],
    ['wrestling', 'A combat sport involving grappling techniques.'],
    ['cricket', 'A bat-and-ball sport popular in England and South Asia.'],
    ['boxing', 'A combat sport involving punches thrown with gloved fists.'],
    ['cycling', 'A sport of racing on bicycles.'],
    ['gymnastics', 'A sport involving flexibility, balance, and acrobatics.'],
    ['marathon', 'A long-distance running race of just over 26 miles.'],
    ['handball', 'A team sport where players throw a ball into a goal.'],
    ['baseball', 'A bat-and-ball game popular in the United States.'],
    ['hockey', 'A sport played with sticks and a puck or ball.'],
    ['surfing', 'A sport of riding waves on a board.'],
    ['archery', 'A sport involving shooting arrows at a target.'],
    ['taekwondo', 'A Korean martial art known for its kicks.'],
    ['rugby', 'A rough contact sport played with an oval ball.'],
    ['snowboarding', 'A winter sport of gliding down slopes on a board.'],
    ['fencing', 'A sport involving sword fighting with protective gear.'],
  ],
  Fruits: [
    ['banana', 'A long yellow fruit that monkeys love.'],
    ['pineapple', 'A spiky tropical fruit with sweet yellow flesh.'],
    ['mango', 'A juicy tropical fruit often called the king of fruits.'],
    ['watermelon', 'A large green fruit with sweet red flesh and seeds.'],
    ['strawberry', 'A small red fruit covered in tiny seeds.'],
    ['blueberry', 'A small round blue fruit often used in muffins.'],
    ['pomegranate', 'A fruit filled with many juicy red seeds.'],
    ['papaya', 'An orange tropical fruit with black seeds inside.'],
    ['avocado', 'A creamy green fruit often used in guacamole.'],
    ['coconut', 'A hard-shelled fruit filled with water and white flesh.'],
    ['grapefruit', 'A tart citrus fruit often eaten at breakfast.'],
    ['raspberry', 'A small red fruit made of tiny clustered bumps.'],
    ['cherry', 'A small round red fruit with a single pit.'],
    ['tangerine', 'A small sweet citrus fruit similar to an orange.'],
    ['apricot', 'A small orange stone fruit similar to a peach.'],
    ['blackberry', 'A dark purple cluster fruit found on thorny bushes.'],
    ['dragonfruit', 'A vividly pink fruit with speckled white flesh.'],
    ['kiwi', 'A small fuzzy brown fruit with green flesh inside.'],
    ['lychee', 'A small Asian fruit with a rough red shell.'],
    ['passionfruit', 'A wrinkly purple fruit with seedy, tangy pulp.'],
  ],
  Technology: [
    ['smartphone', 'A portable device used for calls, apps, and browsing.'],
    ['bluetooth', 'A wireless technology used to connect nearby devices.'],
    ['satellite', 'An object placed in orbit to relay signals or data.'],
    ['algorithm', 'A set of rules a computer follows to solve a problem.'],
    ['processor', 'The chip that acts as the brain of a computer.'],
    ['software', 'Programs and instructions that run on a computer.'],
    ['hardware', 'The physical parts of a computer system.'],
    ['router', 'A device that directs internet traffic on a network.'],
    ['keyboard', 'An input device used for typing.'],
    ['microchip', 'A tiny electronic circuit etched onto silicon.'],
    ['broadband', 'A high-speed internet connection.'],
    ['firewall', 'A security system that blocks unauthorized network access.'],
    ['streaming', 'Watching or listening to media over the internet in real time.'],
    ['blockchain', 'A distributed digital ledger used in cryptocurrencies.'],
    ['robotics', 'The branch of technology dealing with robots.'],
    ['bandwidth', 'The amount of data that can be transferred at once.'],
    ['cybersecurity', 'The practice of protecting systems from digital attacks.'],
    ['holographic', 'Describing a 3D image formed by light interference.'],
    ['biometric', 'Technology that identifies people using physical traits.'],
    ['augmented', 'A type of reality that overlays digital content on the real world.'],
  ],
  Space: [
    ['galaxy', 'A massive system of stars, gas, and dust bound by gravity.'],
    ['asteroid', 'A small rocky body orbiting the sun.'],
    ['telescope', 'An instrument used to view distant objects in the sky.'],
    ['astronaut', 'A person trained to travel and work in space.'],
    ['nebula', 'A giant cloud of dust and gas in space.'],
    ['satellite', 'An object that orbits a planet or star.'],
    ['meteor', 'A streak of light caused by debris burning in the atmosphere.'],
    ['spacecraft', 'A vehicle designed to travel beyond Earth atmosphere.'],
    ['blackhole', 'A region of space with gravity so strong not even light escapes.'],
    ['supernova', 'The explosive death of a massive star.'],
    ['constellation', 'A recognizable pattern of stars in the night sky.'],
    ['jupiter', 'The largest planet in our solar system.'],
    ['saturn', 'A planet famous for its bright, wide rings.'],
    ['spacesuit', 'Protective clothing worn by astronauts outside a spacecraft.'],
    ['orbit', 'The curved path an object takes around another in space.'],
    ['comet', 'An icy space object that grows a glowing tail near the sun.'],
    ['universe', 'All of space, time, matter, and energy that exists.'],
    ['gravity', 'The force that pulls objects toward one another.'],
    ['spacewalk', 'An activity where an astronaut exits a craft in orbit.'],
    ['wormhole', 'A theoretical tunnel connecting distant points in spacetime.'],
  ],
};

/* Fun facts shown after a win, matched loosely by category flavor */
const FUN_FACTS = [
  'Honey never spoils — archaeologists have found edible honey in ancient tombs.',
  'Octopuses have three hearts and blue blood.',
  'A day on Venus is longer than a year on Venus.',
  'Bananas are berries, but strawberries are not.',
  'The Great Wall of China is not visible from space with the naked eye.',
  'Sharks existed before trees appeared on Earth.',
  'A single cloud can weigh more than a million pounds.',
  'Octopus arms can taste what they touch.',
  'The shortest war in history lasted just 38 minutes.',
  'Wombat droppings are cube-shaped.',
  'There are more stars in the universe than grains of sand on Earth.',
  'A group of flamingos is called a "flamboyance".',
];

/* Maps each category to the specific educational skill it reinforces,
   surfaced on the win screen alongside the fun fact. */
const CATEGORY_SKILLS = {
  Animals: 'Biology awareness — wildlife traits and habitats.',
  Countries: 'Geography knowledge — nations, cultures, and landmarks.',
  Programming: 'Computing literacy — core software development concepts.',
  Movies: 'Cultural literacy — notable films and storytelling.',
  Sports: 'Physical education knowledge — sports and their rules.',
  Fruits: 'Nutrition awareness — fruits and healthy eating.',
  Technology: 'Digital literacy — modern tech concepts and devices.',
  Space: 'Scientific curiosity — astronomy and space exploration.',
  Custom: 'Creative expression — building puzzles for others to solve.',
};

/* Achievement badge definitions: id, label, and a check function receiving stats */
const ACHIEVEMENTS = [
  { id: 'first_win', label: '🎯 First Victory', check: s => s.wins >= 1 },
  { id: 'five_wins', label: '🏅 5 Wins', check: s => s.wins >= 5 },
  { id: 'ten_wins', label: '🥇 10 Wins', check: s => s.wins >= 10 },
  { id: 'streak_3', label: '🔥 3-Win Streak', check: s => s.longestStreak >= 3 },
  { id: 'streak_5', label: '⚡ 5-Win Streak', check: s => s.longestStreak >= 5 },
  { id: 'no_mistakes', label: '💎 Flawless Round', check: s => s.hadFlawless === true },
  { id: 'high_score', label: '🚀 Score Over 500', check: s => s.bestScore >= 500 },
];

/* --------------------------------------------------------------------------
   2. SOUND MANAGER — synthesized with the Web Audio API (no external files)
   -------------------------------------------------------------------------- */
class SoundManager {
  constructor() {
    this.enabled = localStorage.getItem('hangman_sound') !== 'off';
    this.ctx = null;
  }

  _getContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    return this.ctx;
  }

  _tone(freq, duration, type = 'sine', gainValue = 0.15, delay = 0) {
    if (!this.enabled) return;
    try {
      const ctx = this._getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      gain.gain.setValueAtTime(gainValue, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      /* Audio may be blocked until user interaction; fail silently */
    }
  }

  click() { this._tone(600, 0.08, 'square', 0.08); }
  correct() { this._tone(523.25, 0.15, 'sine', 0.15); this._tone(783.99, 0.18, 'sine', 0.12, 0.08); }
  incorrect() { this._tone(180, 0.28, 'sawtooth', 0.14); }
  win() {
    [523, 659, 784, 1046].forEach((f, i) => this._tone(f, 0.25, 'triangle', 0.14, i * 0.12));
  }
  lose() {
    [400, 320, 240, 160].forEach((f, i) => this._tone(f, 0.3, 'sawtooth', 0.14, i * 0.15));
  }

  toggle() {
    this.enabled = !this.enabled;
    localStorage.setItem('hangman_sound', this.enabled ? 'on' : 'off');
    return this.enabled;
  }
}

/* --------------------------------------------------------------------------
   3. STORAGE MANAGER — wraps all localStorage reads/writes
   -------------------------------------------------------------------------- */
class StorageManager {
  constructor() {
    this.STATS_KEY = 'hangman_stats_v1';
    this.THEME_KEY = 'hangman_theme';
    this.AUTOSAVE_KEY = 'hangman_autosave_v1';
    this.UNLOCKED_KEY = 'hangman_badges_v1';
  }

  getStats() {
    const raw = localStorage.getItem(this.STATS_KEY);
    if (raw) {
      try { return JSON.parse(raw); } catch (e) { /* fall through to defaults */ }
    }
    return {
      gamesPlayed: 0,
      wins: 0,
      losses: 0,
      bestScore: 0,
      totalScore: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  saveStats(stats) {
    localStorage.setItem(this.STATS_KEY, JSON.stringify(stats));
  }

  getTheme() {
    return localStorage.getItem(this.THEME_KEY) || 'dark';
  }

  saveTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
  }

  getUnlockedBadges() {
    const raw = localStorage.getItem(this.UNLOCKED_KEY);
    return raw ? JSON.parse(raw) : [];
  }

  saveUnlockedBadges(list) {
    localStorage.setItem(this.UNLOCKED_KEY, JSON.stringify(list));
  }

  saveAutosave(state) {
    localStorage.setItem(this.AUTOSAVE_KEY, JSON.stringify(state));
  }

  getAutosave() {
    const raw = localStorage.getItem(this.AUTOSAVE_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  clearAutosave() {
    localStorage.removeItem(this.AUTOSAVE_KEY);
  }
}

/* --------------------------------------------------------------------------
   4. CONFETTI ENGINE — lightweight canvas confetti, no dependencies
   -------------------------------------------------------------------------- */
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this._resize();
    window.addEventListener('resize', () => this._resize());
  }

  _resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst() {
    const colors = ['#4F46E5', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#ffffff'];
    this.particles = [];
    for (let i = 0; i < 140; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -20 - Math.random() * 200,
        r: 4 + Math.random() * 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: 2 + Math.random() * 4,
        speedX: -2 + Math.random() * 4,
        rotation: Math.random() * 360,
        rotationSpeed: -6 + Math.random() * 12,
        life: 0,
        maxLife: 160 + Math.random() * 60,
      });
    }
    if (!this.running) {
      this.running = true;
      this._loop();
    }
  }

  _loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    let alive = false;
    for (const p of this.particles) {
      if (p.life >= p.maxLife) continue;
      alive = true;
      p.x += p.speedX;
      p.y += p.speedY;
      p.rotation += p.rotationSpeed;
      p.life++;
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = Math.max(0, 1 - p.life / p.maxLife);
      this.ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6);
      this.ctx.restore();
    }
    if (alive) {
      requestAnimationFrame(() => this._loop());
    } else {
      this.running = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

/* --------------------------------------------------------------------------
   5. BACKGROUND PARTICLES — ambient floating dots
   -------------------------------------------------------------------------- */
function spawnBackgroundParticles(container, count = 26) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 5;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${10 + Math.random() * 14}s`;
    p.style.animationDelay = `${Math.random() * 14}s`;
    container.appendChild(p);
  }
}

/* --------------------------------------------------------------------------
   6. HANGMAN GAME — core class per the required interface
   -------------------------------------------------------------------------- */
class HangmanGame {
  constructor({ sound, storage, confetti, dom }) {
    this.sound = sound;
    this.storage = storage;
    this.confetti = confetti;
    this.dom = dom; // cached DOM references, passed in from the wiring section

    this.difficultyLives = { easy: 10, medium: 7, hard: 5 };
    this.difficultyMultiplier = { easy: 1, medium: 1.5, hard: 2 };

    this.state = null; // populated by startGame()
    this.timerInterval = null;
    this.paused = false;
  }

  /* ---- Setup helpers ---- */

  _pickWord(mode, categoryChoice, customWord, customHint) {
    if (mode === 'custom' && customWord && customWord.trim().length > 0) {
      const clean = customWord.trim().toLowerCase().replace(/[^a-z\s-]/g, '');
      return {
        category: 'Custom',
        word: clean,
        hint: customHint && customHint.trim() ? customHint.trim() : 'No hint provided for this custom word.',
      };
    }

    if (mode === 'daily') {
      // Deterministic "random" pick based on today's date so every player
      // sees the same word on the same day.
      const today = new Date();
      const seed = today.getFullYear() * 372 + (today.getMonth() + 1) * 31 + today.getDate();
      const categories = Object.keys(WORD_BANK);
      const cat = categories[seed % categories.length];
      const list = WORD_BANK[cat];
      const [word, hint] = list[seed % list.length];
      return { category: cat, word, hint };
    }

    // Random mode (with optional specific category)
    const categories = Object.keys(WORD_BANK);
    const cat = (categoryChoice && categoryChoice !== 'random') ? categoryChoice : categories[Math.floor(Math.random() * categories.length)];
    const list = WORD_BANK[cat];
    const [word, hint] = list[Math.floor(Math.random() * list.length)];
    return { category: cat, word, hint };
  }

  /**
   * startGame — initializes a brand-new round with the given options.
   */
  startGame(options) {
    const { difficulty, timerSeconds, mode, category, customWord, customHint } = options;
    const picked = this._pickWord(mode, category, customWord, customHint);

    this.state = {
      difficulty,
      timerSeconds,
      timeLeft: timerSeconds,
      mode,
      category: picked.category,
      word: picked.word,
      hint: picked.hint,
      guessed: new Set(),
      wrongLetters: [],
      lives: this.difficultyLives[difficulty],
      maxLives: this.difficultyLives[difficulty],
      hintUsed: false,
      score: 0,
      status: 'playing', // 'playing' | 'won' | 'lost'
      revealStageIndex: 0,
    };

    this._clearTimer();
    if (timerSeconds > 0) {
      this._startTimer();
    }

    this.updateDisplay();
    this._autosave();
    return this.state;
  }

  /**
   * guessLetter — handles a single letter guess from keyboard or on-screen key.
   */
  guessLetter(letter) {
    if (!this.state || this.state.status !== 'playing' || this.paused) return { result: 'ignored' };
    letter = letter.toLowerCase();

    if (this.state.guessed.has(letter)) {
      return { result: 'duplicate' };
    }

    this.state.guessed.add(letter);

    if (this.state.word.includes(letter)) {
      this.sound.correct();
      this._scoreCorrectLetter();
      this.updateDisplay();
      if (this.checkWin()) {
        return { result: 'win' };
      }
      this._autosave();
      return { result: 'correct' };
    } else {
      this.sound.incorrect();
      this.state.wrongLetters.push(letter);
      this.state.lives--;
      this.drawHangman();
      this.updateDisplay();
      if (this.checkLose()) {
        return { result: 'lose' };
      }
      this._autosave();
      return { result: 'incorrect' };
    }
  }

  /**
   * useHint — reveals the hint text at the cost of one life.
   */
  useHint() {
    if (!this.state || this.state.status !== 'playing' || this.state.hintUsed) return null;
    this.state.hintUsed = true;
    this.state.lives--;
    this.drawHangman();
    this.updateDisplay();
    if (this.checkLose()) {
      return { hint: this.state.hint, result: 'lose' };
    }
    this._autosave();
    return { hint: this.state.hint, result: 'ok' };
  }

  _scoreCorrectLetter() {
    const base = 10;
    const multiplier = this.difficultyMultiplier[this.state.difficulty];
    this.state.score += Math.round(base * multiplier);
  }

  /**
   * updateDisplay — re-renders word blanks, lives, wrong letters, score.
   * DOM writing is delegated to the UI wiring layer via callbacks stored in dom.
   */
  updateDisplay() {
    if (this.dom && this.dom.onUpdate) {
      this.dom.onUpdate(this.state);
    }
  }

  /**
   * drawHangman — reveals the next body part for each wrong guess/hint use.
   */
  drawHangman() {
    const wrongCount = this.state.maxLives - this.state.lives;
    if (this.dom && this.dom.onDrawHangman) {
      this.dom.onDrawHangman(wrongCount, this.state.maxLives);
    }
  }

  /**
   * checkWin — true if every letter in the word has been guessed.
   */
  checkWin() {
    const unique = new Set(this.state.word.replace(/[\s-]/g, '').split(''));
    const allGuessed = [...unique].every(ch => this.state.guessed.has(ch));
    if (allGuessed) {
      this.state.status = 'won';
      this._clearTimer();
      this._finishRound(true);
      return true;
    }
    return false;
  }

  /**
   * checkLose — true if lives have run out.
   */
  checkLose() {
    if (this.state.lives <= 0) {
      this.state.status = 'lost';
      this._clearTimer();
      this._finishRound(false);
      return true;
    }
    return false;
  }

  _finishRound(won) {
    const stats = this.storage.getStats();
    stats.gamesPlayed++;
    if (won) {
      stats.wins++;
      stats.currentStreak++;
      stats.longestStreak = Math.max(stats.longestStreak, stats.currentStreak);
      stats.totalScore += this.state.score;
      stats.bestScore = Math.max(stats.bestScore, this.state.score);
      stats.hadFlawless = this.state.wrongLetters.length === 0 && !this.state.hintUsed;
    } else {
      stats.losses++;
      stats.currentStreak = 0;
    }
    this.storage.saveStats(stats);
    this.storage.clearAutosave();
    if (this.dom && this.dom.onRoundFinished) {
      this.dom.onRoundFinished(won, this.state, stats);
    }
  }

  /**
   * resetGame — restarts the *current* word/category from scratch.
   */
  resetGame() {
    if (!this.state) return;
    this.startGame({
      difficulty: this.state.difficulty,
      timerSeconds: this.state.timerSeconds,
      mode: 'random',
      category: this.state.category,
    });
  }

  /* ---- Timer ---- */
  _startTimer() {
    this._clearTimer();
    this.timerInterval = setInterval(() => {
      if (this.paused || !this.state || this.state.status !== 'playing') return;
      this.state.timeLeft--;
      if (this.dom && this.dom.onTimerTick) {
        this.dom.onTimerTick(this.state.timeLeft);
      }
      if (this.state.timeLeft <= 0) {
        this.state.lives = 0;
        this.checkLose();
      }
    }, 1000);
  }

  _clearTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  /* ---- Autosave ---- */
  _autosave() {
    if (!this.state) return;
    const saveable = {
      ...this.state,
      guessed: [...this.state.guessed],
    };
    this.storage.saveAutosave(saveable);
  }
}

/* --------------------------------------------------------------------------
   7. UI WIRING — DOM references, event listeners, rendering
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Cache DOM elements ---- */
  const el = {
    loadingScreen: document.getElementById('loadingScreen'),
    appWrapper: document.getElementById('appWrapper'),
    bgParticles: document.getElementById('bgParticles'),

    soundToggle: document.getElementById('soundToggle'),
    soundIcon: document.getElementById('soundIcon'),
    themeToggle: document.getElementById('themeToggle'),
    themeIcon: document.getElementById('themeIcon'),
    statsToggle: document.getElementById('statsToggle'),
    shareBtn: document.getElementById('shareBtn'),
    howToPlayToggle: document.getElementById('howToPlayToggle'),
    howToPlayOverlay: document.getElementById('howToPlayOverlay'),
    closeHowToBtn: document.getElementById('closeHowToBtn'),
    closeHowToBtnBottom: document.getElementById('closeHowToBtnBottom'),

    startScreen: document.getElementById('startScreen'),
    gameScreen: document.getElementById('gameScreen'),

    difficultyGroup: document.getElementById('difficultyGroup'),
    timerGroup: document.getElementById('timerGroup'),
    modeGroup: document.getElementById('modeGroup'),
    categoryPickerGroup: document.getElementById('categoryPickerGroup'),
    categorySelect: document.getElementById('categorySelect'),
    customWordGroup: document.getElementById('customWordGroup'),
    customWordInput: document.getElementById('customWordInput'),
    customHintInput: document.getElementById('customHintInput'),
    startGameBtn: document.getElementById('startGameBtn'),
    bestScoreDisplay: document.getElementById('bestScoreDisplay'),
    streakDisplay: document.getElementById('streakDisplay'),

    categoryLabel: document.getElementById('categoryLabel'),
    difficultyLabel: document.getElementById('difficultyLabel'),
    timerChip: document.getElementById('timerChip'),
    timerValue: document.getElementById('timerValue'),

    hangmanSvg: document.getElementById('hangmanSvg'),
    livesValue: document.getElementById('livesValue'),
    livesBarFill: document.getElementById('livesBarFill'),
    wrongLettersList: document.getElementById('wrongLettersList'),
    scoreValue: document.getElementById('scoreValue'),
    statusMessage: document.getElementById('statusMessage'),

    wordDisplay: document.getElementById('wordDisplay'),
    hintBtn: document.getElementById('hintBtn'),
    hintText: document.getElementById('hintText'),
    keyboard: document.getElementById('keyboard'),

    pauseBtn: document.getElementById('pauseBtn'),
    restartBtn: document.getElementById('restartBtn'),
    newGameBtn: document.getElementById('newGameBtn'),

    pauseOverlay: document.getElementById('pauseOverlay'),
    resumeBtn: document.getElementById('resumeBtn'),

    endOverlay: document.getElementById('endOverlay'),
    endCard: document.getElementById('endCard'),
    endTitle: document.getElementById('endTitle'),
    endWord: document.getElementById('endWord'),
    endFunFact: document.getElementById('endFunFact'),
    endSkillBenefit: document.getElementById('endSkillBenefit'),
    endScore: document.getElementById('endScore'),
    endTotalScore: document.getElementById('endTotalScore'),
    endBestScore: document.getElementById('endBestScore'),
    endPlayAgainBtn: document.getElementById('endPlayAgainBtn'),
    endNewGameBtn: document.getElementById('endNewGameBtn'),

    statsOverlay: document.getElementById('statsOverlay'),
    closeStatsBtn: document.getElementById('closeStatsBtn'),
    statGames: document.getElementById('statGames'),
    statWins: document.getElementById('statWins'),
    statLosses: document.getElementById('statLosses'),
    statWinRate: document.getElementById('statWinRate'),
    statBest: document.getElementById('statBest'),
    statStreak: document.getElementById('statStreak'),
    statLongestStreak: document.getElementById('statLongestStreak'),
    statTotalScore: document.getElementById('statTotalScore'),
    barChart: document.getElementById('barChart'),
    badgesGrid: document.getElementById('badgesGrid'),
    resetStatsBtn: document.getElementById('resetStatsBtn'),

    confettiCanvas: document.getElementById('confettiCanvas'),
    srAnnouncer: document.getElementById('srAnnouncer'),
  };

  /* ---- Instantiate services ---- */
  const sound = new SoundManager();
  const storage = new StorageManager();
  const confetti = new ConfettiEngine(el.confettiCanvas);
  spawnBackgroundParticles(el.bgParticles);

  /* ---- Populate category dropdown from the word bank ---- */
  Object.keys(WORD_BANK).forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    el.categorySelect.appendChild(opt);
  });

  /* ---- Selection state for the start screen ---- */
  const selection = {
    difficulty: 'easy',
    timer: 0,
    mode: 'random',
  };

  /* ---- Game instance ---- */
  const game = new HangmanGame({
    sound,
    storage,
    confetti,
    dom: {
      onUpdate: renderState,
      onDrawHangman: renderHangman,
      onRoundFinished: handleRoundFinished,
      onTimerTick: renderTimer,
    },
  });

  /* ==========================================================================
     RENDERING FUNCTIONS
     ========================================================================== */

  function renderState(state) {
    // Category / difficulty chips
    el.categoryLabel.textContent = `Category: ${state.category}`;
    el.difficultyLabel.textContent = `Difficulty: ${state.difficulty[0].toUpperCase()}${state.difficulty.slice(1)}`;

    // Word display with letter boxes
    el.wordDisplay.innerHTML = '';
    state.word.split('').forEach(ch => {
      const box = document.createElement('span');
      if (ch === ' ' || ch === '-') {
        box.className = 'letter-box space';
        box.textContent = ch === '-' ? '-' : '';
      } else {
        const isRevealed = state.guessed.has(ch) || state.status !== 'playing';
        box.className = 'letter-box' + (isRevealed ? ' revealed' : '');
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = isRevealed ? ch.toUpperCase() : '';
        box.appendChild(span);
      }
      el.wordDisplay.appendChild(box);
    });

    // Lives
    el.livesValue.textContent = Math.max(state.lives, 0);
    const pct = Math.max(0, (state.lives / state.maxLives) * 100);
    el.livesBarFill.style.width = `${pct}%`;

    // Wrong letters
    el.wrongLettersList.textContent = state.wrongLetters.length
      ? state.wrongLetters.map(l => l.toUpperCase()).join(', ')
      : '—';

    // Score
    el.scoreValue.textContent = state.score;

    // Timer chip visibility
    if (state.timerSeconds > 0) {
      el.timerChip.classList.remove('hidden');
      el.timerValue.textContent = state.timeLeft;
    } else {
      el.timerChip.classList.add('hidden');
    }
  }

  function renderTimer(timeLeft) {
    el.timerValue.textContent = Math.max(timeLeft, 0);
    if (timeLeft <= 10) {
      el.timerChip.style.animation = 'shakeCard 0.4s ease';
      setTimeout(() => { el.timerChip.style.animation = ''; }, 400);
    }
  }

  function renderHangman(wrongCount, maxLives) {
    // Map wrong-guess count to the 7 body parts, scaled to whatever the
    // chosen difficulty's max lives is, so the drawing always completes
    // exactly when lives reach zero.
    const parts = ['part-head', 'part-body', 'part-leftarm', 'part-rightarm', 'part-leftleg', 'part-rightleg'];
    const stepsToShow = Math.min(parts.length, Math.round((wrongCount / maxLives) * parts.length));
    parts.forEach((id, index) => {
      const node = document.getElementById(id);
      if (index < stepsToShow) {
        node.classList.add('reveal');
      } else {
        node.classList.remove('reveal');
      }
    });
  }

  function renderKeyboard() {
    el.keyboard.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
      const letter = String.fromCharCode(i);
      const btn = document.createElement('button');
      btn.className = 'key';
      btn.textContent = letter;
      btn.setAttribute('aria-label', `Guess letter ${letter}`);
      btn.dataset.letter = letter.toLowerCase();
      btn.addEventListener('click', () => handleGuess(letter.toLowerCase(), btn));
      el.keyboard.appendChild(btn);
    }
  }

  function handleGuess(letter, btnEl) {
    if (!game.state || game.state.status !== 'playing' || game.paused) return;
    if (game.state.guessed.has(letter)) {
      announce('Already guessed');
      flashStatus('Already guessed', 'info');
      return;
    }
    sound.click();
    const outcome = game.guessLetter(letter);

    const keyBtn = btnEl || el.keyboard.querySelector(`[data-letter="${letter}"]`);
    if (keyBtn) {
      keyBtn.disabled = true;
      if (game.state.word.includes(letter)) {
        keyBtn.classList.add('correct');
      } else {
        keyBtn.classList.add('incorrect');
      }
    }

    if (outcome.result === 'win') {
      flashStatus('You Win 🎉', 'win');
    } else if (outcome.result === 'lose') {
      flashStatus('You Lose 💀', 'lose');
    }
  }

  function flashStatus(text, kind) {
    el.statusMessage.textContent = text;
    el.statusMessage.className = `status-message ${kind}`;
    announce(text);
  }

  function announce(text) {
    el.srAnnouncer.textContent = text;
  }

  /* ==========================================================================
     ROUND-END HANDLING
     ========================================================================== */

  function handleRoundFinished(won, state, stats) {
    setTimeout(() => {
      el.endOverlay.classList.remove('hidden');
      el.endCard.classList.remove('shake');

      if (won) {
        sound.win();
        confetti.burst();
        el.endTitle.textContent = 'You Win 🎉';
        el.endFunFact.textContent = FUN_FACTS[Math.floor(Math.random() * FUN_FACTS.length)];
        el.endFunFact.classList.remove('hidden');
        const skill = CATEGORY_SKILLS[state.category] || CATEGORY_SKILLS.Custom;
        el.endSkillBenefit.textContent = `🎓 Skill boosted: ${skill}`;
        el.endSkillBenefit.classList.remove('hidden');
      } else {
        sound.lose();
        el.endCard.classList.add('shake');
        el.endTitle.textContent = 'You Lose 💀';
        el.endFunFact.classList.add('hidden');
        el.endSkillBenefit.classList.add('hidden');
      }

      el.endWord.textContent = `The word was: ${state.word.toUpperCase()}`;
      el.endScore.textContent = state.score;
      el.endTotalScore.textContent = stats.totalScore;
      el.endBestScore.textContent = stats.bestScore;

      el.bestScoreDisplay.textContent = stats.bestScore;
      el.streakDisplay.textContent = stats.currentStreak;

      checkAndRenderBadges(stats);
    }, won ? 350 : 500);
  }

  /* ==========================================================================
     ACHIEVEMENTS / BADGES
     ========================================================================== */

  function checkAndRenderBadges(stats) {
    const unlocked = new Set(storage.getUnlockedBadges());
    ACHIEVEMENTS.forEach(a => {
      if (a.check(stats)) unlocked.add(a.id);
    });
    storage.saveUnlockedBadges([...unlocked]);
    renderBadges(unlocked);
  }

  function renderBadges(unlockedSet) {
    el.badgesGrid.innerHTML = '';
    ACHIEVEMENTS.forEach(a => {
      const span = document.createElement('span');
      span.className = 'badge' + (unlockedSet.has(a.id) ? ' unlocked' : '');
      span.textContent = a.label;
      el.badgesGrid.appendChild(span);
    });
  }

  /* ==========================================================================
     STATISTICS PANEL
     ========================================================================== */

  function renderStatsPanel() {
    const stats = storage.getStats();
    el.statGames.textContent = stats.gamesPlayed;
    el.statWins.textContent = stats.wins;
    el.statLosses.textContent = stats.losses;
    const winRate = stats.gamesPlayed ? Math.round((stats.wins / stats.gamesPlayed) * 100) : 0;
    el.statWinRate.textContent = `${winRate}%`;
    el.statBest.textContent = stats.bestScore;
    el.statStreak.textContent = stats.currentStreak;
    el.statLongestStreak.textContent = stats.longestStreak;
    el.statTotalScore.textContent = stats.totalScore;

    const maxVal = Math.max(stats.wins, stats.losses, 1);
    el.barChart.innerHTML = `
      <div class="bar wins" style="height:${(stats.wins / maxVal) * 100}%">${stats.wins}</div>
      <div class="bar losses" style="height:${(stats.losses / maxVal) * 100}%">${stats.losses}</div>
    `;

    const unlocked = new Set(storage.getUnlockedBadges());
    renderBadges(unlocked);
  }

  /* ==========================================================================
     START SCREEN INTERACTIONS
     ========================================================================== */

  function wirePillGroup(container, key, onSelect) {
    container.querySelectorAll('.pill').forEach(pill => {
      pill.addEventListener('click', () => {
        container.querySelectorAll('.pill').forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-checked', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-checked', 'true');
        sound.click();
        onSelect(pill.dataset[key]);
      });
    });
  }

  wirePillGroup(el.difficultyGroup, 'difficulty', val => { selection.difficulty = val; });
  wirePillGroup(el.timerGroup, 'timer', val => { selection.timer = parseInt(val, 10); });
  wirePillGroup(el.modeGroup, 'mode', val => {
    selection.mode = val;
    el.categoryPickerGroup.classList.toggle('hidden', val === 'custom');
    el.customWordGroup.classList.toggle('hidden', val !== 'custom');
  });

  el.startGameBtn.addEventListener('click', () => {
    if (selection.mode === 'custom' && !el.customWordInput.value.trim()) {
      flashStartError('Please enter a custom word first.');
      return;
    }
    beginRound();
  });

  function flashStartError(msg) {
    el.startGameBtn.textContent = msg;
    setTimeout(() => { el.startGameBtn.textContent = 'Start Game'; }, 1800);
  }

  function beginRound() {
    el.startScreen.classList.add('hidden');
    el.gameScreen.classList.remove('hidden');
    el.endOverlay.classList.add('hidden');
    el.statusMessage.textContent = '';
    el.statusMessage.className = 'status-message';
    el.hintText.classList.add('hidden');
    el.hintText.textContent = '';

    // Reset hangman parts
    document.querySelectorAll('.body-part').forEach(p => p.classList.remove('reveal'));

    renderKeyboard();

    game.startGame({
      difficulty: selection.difficulty,
      timerSeconds: selection.timer,
      mode: selection.mode,
      category: el.categorySelect.value,
      customWord: el.customWordInput.value,
      customHint: el.customHintInput.value,
    });
  }

  /* ==========================================================================
     GAME CONTROLS: hint, pause/resume, restart, new game
     ========================================================================== */

  el.hintBtn.addEventListener('click', () => {
    sound.click();
    const outcome = game.useHint();
    if (!outcome) return;
    el.hintText.textContent = `💡 ${outcome.hint}`;
    el.hintText.classList.remove('hidden');
    el.hintBtn.disabled = true;
    if (outcome.result === 'lose') {
      flashStatus('You Lose 💀', 'lose');
    }
  });

  el.pauseBtn.addEventListener('click', () => {
    sound.click();
    game.pause();
    el.pauseOverlay.classList.remove('hidden');
  });

  el.resumeBtn.addEventListener('click', () => {
    sound.click();
    game.resume();
    el.pauseOverlay.classList.add('hidden');
  });

  el.restartBtn.addEventListener('click', () => {
    sound.click();
    el.endOverlay.classList.add('hidden');
    el.hintText.classList.add('hidden');
    el.hintBtn.disabled = false;
    document.querySelectorAll('.body-part').forEach(p => p.classList.remove('reveal'));
    renderKeyboard();
    game.resetGame();
    el.statusMessage.textContent = '';
    el.statusMessage.className = 'status-message';
  });

  el.newGameBtn.addEventListener('click', () => {
    sound.click();
    goToStartScreen();
  });

  function goToStartScreen() {
    game._clearTimer();
    el.endOverlay.classList.add('hidden');
    el.gameScreen.classList.add('hidden');
    el.startScreen.classList.remove('hidden');
    el.hintBtn.disabled = false;
    const stats = storage.getStats();
    el.bestScoreDisplay.textContent = stats.bestScore;
    el.streakDisplay.textContent = stats.currentStreak;
  }

  el.endPlayAgainBtn.addEventListener('click', () => {
    sound.click();
    el.endOverlay.classList.add('hidden');
    el.hintText.classList.add('hidden');
    el.hintBtn.disabled = false;
    document.querySelectorAll('.body-part').forEach(p => p.classList.remove('reveal'));
    renderKeyboard();
    game.resetGame();
    el.statusMessage.textContent = '';
    el.statusMessage.className = 'status-message';
  });

  el.endNewGameBtn.addEventListener('click', () => {
    sound.click();
    goToStartScreen();
  });

  /* ==========================================================================
     PHYSICAL KEYBOARD SUPPORT
     ========================================================================== */

  document.addEventListener('keydown', (e) => {
    if (el.gameScreen.classList.contains('hidden')) return;
    if (e.repeat) return;

    const key = e.key.toLowerCase();
    if (key.length === 1 && key >= 'a' && key <= 'z') {
      handleGuess(key);
    } else if (key === 'escape') {
      if (!el.pauseOverlay.classList.contains('hidden')) {
        el.resumeBtn.click();
      } else {
        el.pauseBtn.click();
      }
    }
    // Any other key is ignored per the spec ("Invalid key" is only surfaced
    // for letter-like input that fails validation elsewhere).
  });

  /* ==========================================================================
     TOP BAR: sound, theme, stats, share
     ========================================================================== */

  el.soundToggle.addEventListener('click', () => {
    const isOn = sound.toggle();
    el.soundIcon.textContent = isOn ? '🔊' : '🔇';
    if (isOn) sound.click();
  });

  function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    el.themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    storage.saveTheme(theme);
  }

  el.themeToggle.addEventListener('click', () => {
    sound.click();
    const current = document.body.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  el.statsToggle.addEventListener('click', () => {
    sound.click();
    renderStatsPanel();
    el.statsOverlay.classList.remove('hidden');
  });

  el.closeStatsBtn.addEventListener('click', () => {
    sound.click();
    el.statsOverlay.classList.add('hidden');
  });

  el.resetStatsBtn.addEventListener('click', () => {
    sound.click();
    storage.saveStats({
      gamesPlayed: 0, wins: 0, losses: 0, bestScore: 0,
      totalScore: 0, currentStreak: 0, longestStreak: 0,
    });
    storage.saveUnlockedBadges([]);
    renderStatsPanel();
  });

  el.howToPlayToggle.addEventListener('click', () => {
    sound.click();
    el.howToPlayOverlay.classList.remove('hidden');
  });

  el.closeHowToBtn.addEventListener('click', () => {
    sound.click();
    el.howToPlayOverlay.classList.add('hidden');
  });

  el.closeHowToBtnBottom.addEventListener('click', () => {
    sound.click();
    el.howToPlayOverlay.classList.add('hidden');
  });

  el.shareBtn.addEventListener('click', async () => {
    sound.click();
    const stats = storage.getStats();
    const text = `I've won ${stats.wins} games of Hangman with a best score of ${stats.bestScore}! 🪢🎉`;
    if (navigator.share) {
      try { await navigator.share({ text }); } catch (e) { /* user cancelled share */ }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        flashStatus('Score copied to clipboard!', 'info');
        setTimeout(() => { el.statusMessage.textContent = ''; el.statusMessage.className = 'status-message'; }, 2200);
      } catch (e) {
        alert(text);
      }
    }
  });

  /* ==========================================================================
     INITIAL BOOT
     ========================================================================== */

  applyTheme(storage.getTheme());
  el.soundIcon.textContent = sound.enabled ? '🔊' : '🔇';

  const initialStats = storage.getStats();
  el.bestScoreDisplay.textContent = initialStats.bestScore;
  el.streakDisplay.textContent = initialStats.currentStreak;

  // Simulate a brief, honest loading step (asset/font warm-up), then reveal the UI.
  window.addEventListener('load', () => {
    setTimeout(() => {
      el.loadingScreen.classList.add('hide');
      revealHowToPlayForFirstTimers();
    }, 500);
  });
  // Fallback in case 'load' already fired before listener attached.
  setTimeout(() => {
    el.loadingScreen.classList.add('hide');
    revealHowToPlayForFirstTimers();
  }, 1800);

  function revealHowToPlayForFirstTimers() {
    if (!localStorage.getItem('hangman_seen_howto')) {
      el.howToPlayOverlay.classList.remove('hidden');
      localStorage.setItem('hangman_seen_howto', 'true');
    }
  }

});
