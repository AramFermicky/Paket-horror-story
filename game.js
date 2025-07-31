// game.js - ЕДИНЫЙ ФАЙЛ С ИГРОЙ
// Версия: Demo 030a1

// Глобальное состояние игры
let gameState = {
  health: 100,
  sanity: 100,
  inventory: [],
  choices: {
    total: 0,
    successful: 0,
    failed: 0,
    risky: 0
  },
  currentScene: 'scene1',
  sceneHistory: []
};

// Все сцены
const scenes = {
  scene1: {
    type: 'scene',
    title: 'МИКРОРАЙОН',
    image: 'https://placehold.co/600x300/000000/0F0?text=Микрорайон&font=Press+Start+2P',
    text: 'Данил (14 лет) идет по микрорайону. <br>Вдалеке виднеется вывеска: <span class="accent">"МАГНИТ МОЯ ЦЕНА"</span>. <br>В голове одна мысль: <span class="accent">"Сегодня я украду золотой пакет..."</span>',
    choices: [
      {
        text: 'ПОЙТИ В МАГАЗИН',
        consequence: {
          sanity: -5,
          health: -2
        },
        nextScene: 'scene2'
      },
      {
        text: 'ОСМОТРЕТЬ УЛИЦУ',
        consequence: {
          sanity: -10,
          risky: true
        },
        nextScene: 'scene1b'
      }
    ]
  },

  scene1b: {
    type: 'scene',
    title: 'ЗАДНИЙ ДВОР',
    image: 'https://placehold.co/600x300/000000/0A0?text=Задний+двор&font=Press+Start+2P',
    text: 'За магазином — мусорные баки. Один приоткрыт... и пуст. <br>Ты слышишь шаги: <span class="accent">"Эй, мелкий, чо тут шныряешь?"</span>',
    choices: [
      {
        text: 'ВОЙТИ СПЕРЕДИ',
        consequence: {
          sanity: -3
        },
        nextScene: 'scene2'
      },
      {
        text: 'ПРОНИКНУТЬ ЧЕРЕЗ ЗАДНЮЮ ДВЕРЬ',
        consequence: {
          sanity: -15,
          risky: true
        },
        nextScene: 'scene1c'
      }
    ]
  },

  scene1c: {
    type: 'scene',
    title: 'ЗАДНЯЯ ДВЕРЬ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Задняя+дверь&font=Press+Start+2P',
    text: 'Задняя дверь приоткрыта. Изнутри слышен скрип. <br>За тобой следит <span class="accent">дед-уборщик</span> с ведром и шваброй.',
    choices: [
      {
        text: 'ПРОНИКНУТЬ ВНУТРЬ',
        consequence: {
          sanity: -10,
          risky: true
        },
        nextScene: 'scene3'
      },
      {
        text: 'ВЕРНУТЬСЯ К ВХОДУ',
        consequence: {
          sanity: +5
        },
        nextScene: 'scene2'
      }
    ]
  },

  scene2: {
    type: 'scene',
    title: 'ВХОД В МАГНИТ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Вход+в+Магнит&font=Press+Start+2P',
    text: 'Дверь скрипит. За стеклом видны полки. <br>Ты слышишь голос кассирши: <span class="flicker accent">"СЛЕДУЮЩИЙ!"</span>',
    choices: [
      {
        text: 'ПРОЙТИ ВНУТРЬ',
        consequence: {
          sanity: -5
        },
        nextScene: 'scene3'
      },
      {
        text: 'ОСМОТРЕТЬ ДВЕРЬ',
        consequence: {
          sanity: -10
        },
        nextScene: 'scene2b'
      }
    ]
  },

  scene2b: {
    type: 'scene',
    title: 'ДВЕРЬ',
    image: 'https://placehold.co/600x300/000000/0A0?text=Дверь&font=Press+Start+2P',
    text: 'На двери табличка: <span class="accent">"Охрана Вася — на месте!"</span> <br>Ты видишь, как <span class="accent">Вася</span> с дубинкой патрулирует зал.',
    choices: [
      {
        text: 'ВОЙТИ',
        consequence: {
          sanity: -5
        },
        nextScene: 'scene3'
      }
    ]
  },

  scene3: {
    type: 'scene',
    title: 'МАГАЗИН',
    image: 'https://placehold.co/600x300/000000/0A0?text=Магазин&font=Press+Start+2P',
    text: 'Полки с товарами. <span class="accent">Дед-уборщик</span> мыт пол в углу. <br>В конце коридора — дверь кладовки. <br>Справа — касса с <span class="accent flicker">жирной потной кассиршей</span>.',
    choices: [
      {
        text: 'ПОДОЙТИ К КАССЕ',
        consequence: {
          sanity: -10
        },
        nextScene: 'scene4'
      },
      {
        text: 'ПОЙТИ К КЛАДОВКЕ',
        consequence: {
          sanity: -15,
          risky: true
        },
        nextScene: 'scene5'
      }
    ]
  },

  scene4: {
    type: 'scene',
    title: 'КАССА',
    image: 'https://placehold.co/600x300/000000/0F0?text=Касса&font=Press+Start+2P',
    text: 'Кассирша скучно жуёт жвачку: <br><span class="flicker accent">"СЛЕДУЮЩИЙ!"</span> <br>Она замечает тебя и кричит: <br><span class="accent">"ЭЙ, ПАКЕТ НАДО БРАТЬ НА КАССЕ, А НЕ В КЛАДОВКЕ!"</span>',
    choices: [
      {
        text: 'НАЗАД К ПОЛКАМ',
        nextScene: 'scene3'
      },
      {
        text: 'СБЕЖАТЬ В КЛАДОВКУ',
        consequence: {
          sanity: -20,
          risky: true
        },
        nextScene: 'scene5'
      },
      {
        text: 'ПОГОВОРИТЬ С КАССИРШЕЙ',
        consequence: {
          sanity: -15
        },
        nextScene: 'scene4b'
      }
    ]
  },

  scene4b: {
    type: 'scene',
    title: 'КАССИРША',
    image: 'https://placehold.co/600x300/000000/0F0?text=Кассирша&font=Press+Start+2P',
    text: 'Кассирша поворачивается к тебе: <br><span class="flicker accent">"ЭЙ, ЧО НАДО ПИЗДЮК? ДАВАЙ ПЛАТИ ЗА ПАКЕТ ИЛИ ВАСЯ ТЕБЯ НАЙДЕТ!"</span> <br>Она жирно хихикает, поправляя фартук.',
    choices: [
      {
        text: 'НАЗАД',
        nextScene: 'scene4'
      },
      {
        text: 'СБЕЖАТЬ',
        consequence: {
          sanity: -25,
          risky: true
        },
        nextScene: 'scene6'
      }
    ]
  },

  scene5: {
    type: 'scene',
    title: 'КЛАДОВКА',
    image: 'https://placehold.co/600x300/000000/0F0?text=Кладовка&font=Press+Start+2P',
    text: 'Ты в кладовке. На столе — <span class="flicker accent">золотой пакет</span> с надписью <span class="accent">"МОЯ ЦЕНА"</span>. <br>Слышен скрип двери — <span class="accent">Вася</span> идет сюда!',
    choices: [
      {
        text: 'ВЗЯТЬ ПАКЕТ И СБЕЖАТЬ',
        consequence: {
          sanity: -15,
          inventory: ['Золотой пакет']
        },
        nextScene: 'scene6'
      },
      {
        text: 'УЙТИ БЕЗ ПАКЕТА',
        nextScene: 'scene3'
      },
      {
        text: 'ОСМОТРЕТЬ ПАКЕТ',
        consequence: {
          sanity: -10
        },
        nextScene: 'scene5b'
      }
    ]
  },

  scene5b: {
    type: 'scene',
    title: 'ПАКЕТ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Пакет&font=Press+Start+2P',
    text: 'Пакет тёплый. Изнутри слышен стук. <br>На нём надпись: <span class="accent">"ОТКРОЙ МЕНЯ — И ПОЛУЧИШЬ ВСЁ"</span> <br>Ты чувствуешь, что кто-то смотрит на тебя...',
    choices: [
      {
        text: 'НАЗАД',
        nextScene: 'scene5'
      },
      {
        text: 'ВЗЯТЬ ПАКЕТ',
        consequence: {
          sanity: -5,
          inventory: ['Золотой пакет']
        },
        nextScene: 'scene6'
      }
    ]
  },

  scene6: {
    type: 'minigame',
    title: 'ПОГОНЯ',
    image: 'https://placehold.co/600x300/000000/0A0?text=ПОГОНЯ&font=Press+Start+2P',
    text: 'Ты бежишь по бесконечным коридорам. <br>За спиной слышен топот и маты охранника Васи: <br><span class="flicker accent">"СТОЙ, СУКА! Я ТЕБЯ НАЙДУ!"</span>',
    minigame: 'chase',
    successScene: 'scene7',
    failScene: 'ending2'
  },

  scene7: {
    type: 'scene',
    title: 'ЛЮДМИЛКА',
    image: 'https://placehold.co/600x300/000000/0F0?text=Людмилка&font=Press+Start+2P',
    text: '<span class="accent flicker">ЛЮДМИЛКА:</span> <br>"НУ ЧТО, НЕ ЗАБЫЛ СДЕЛАТЬ ДОМАШКУ? <br>НЕ ЗАБЫВАЙ НАМ ЧЕРЕЗ 2 ЧАСА ВСТРЕЧАТЬСЯ <span class="flicker">*</span>А ПОТОМ СМЕЁТСЯ КАК ДУРА<span class="flicker">*</span>" <br>Ты вспоминаешь, как она ставила тебе двойки за малейшую ошибку.',
    choices: [
      {
        text: 'СРАЗИТЬСЯ С УЧИЛКОЙ',
        consequence: {
          sanity: -20,
          risky: true
        },
        nextScene: 'scene8'
      },
      {
        text: 'ПОПЫТАТЬСЯ СБЕЖАТЬ',
        nextScene: 'scene7b'
      },
      {
        text: 'ВСПОМНИТЬ ПРОШЛОЕ',
        nextScene: 'scene7c'
      }
    ]
  },

  scene7b: {
    type: 'scene',
    title: 'БЕГСТВО',
    image: 'https://placehold.co/600x300/000000/0A0?text=Бегство&font=Press+Start+2P',
    text: 'Ты бежишь, но коридоры удлиняются. <br>Смех Людмилки преследует тебя. <br>Внезапно появляется <span class="accent flicker">Данад</span> — злой клон Данила.',
    choices: [
      {
        text: 'ПРОДОЛЖИТЬ',
        nextScene: 'scene8'
      }
    ]
  },

  scene7c: {
    type: 'scene',
    title: 'ВОСПОМИНАНИЯ',
    image: 'https://placehold.co/600x300/000000/0A0?text=Воспоминания&font=Press+Start+2P',
    text: '<span class="character-name">ЛЮДМИЛКА:</span> <br>"ДАНИЛ, ДОМАШКУ ЗАБЫЛ? ДВОЙКА! <br>А ЗАВТРА ПРИХОДИ В 8 УТРА НА ДОПОЛНИТЕЛЬНЫЕ ЗАНЯТИЯ!" <br>Ты помнишь её смех и то, как она издевалась над тобой.',
    choices: [
      {
        text: 'НАЗАД',
        nextScene: 'scene7'
      }
    ]
  },

  scene8: {
    type: 'minigame',
    title: 'БОЙ С ЛЮДМИЛКОЙ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Бой+с+Людмилкой&font=Press+Start+2P',
    text: 'Людмилка атакует с указкой! <br>Но появляется <span class="flicker accent">Данад</span> — злой клон Данила, чтобы помочь ей. <br>Это твой последний шанс!',
    minigame: 'battle',
    successScene: 'scene9',
    failScene: 'ending3'
  },

  scene9: {
    type: 'scene',
    title: 'ФИНАЛ',
    image: 'https://placehold.co/600x300/000000/000000?text=Финал&font=Press+Start+2P',
    text: 'Что дальше? <br>Ты держишь в руках <span class="flicker accent">золотой пакет</span>. <br>Смех Людмилки стих. Но что внутри?',
    choices: [
      {
        text: 'УЗНАТЬ СВОЮ СУДЬБУ',
        nextScene: 'ending17'
      },
      {
        text: 'ПРОВЕРИТЬ ПАКЕТ',
        condition: () => gameState.inventory.includes('Золотой пакет'),
        nextScene: 'scene9b'
      }
    ]
  },

  scene9b: {
    type: 'scene',
    title: 'ПАКЕТ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Пакет&font=Press+Start+2P',
    text: 'Ты открываешь пакет... <br>Внутри — тетрадь с домашкой по русскому. <br>Записка: <span class="accent">"Ты прошел испытание, Данил"</span>',
    choices: [
      {
        text: 'ПРИНЯТЬ СУДЬБУ',
        nextScene: 'ending6'
      }
    ]
  },

  // Концовки
  ending1: {
    type: 'ending',
    title: 'КОНЕЦ #1: ТРУС',
    image: 'https://placehold.co/600x300/000000/0F0?text=Пакет+не+украден&font=Press+Start+2P',
    text: 'Ты так и не решился украсть пакет. <br>Теперь ты работаешь уборщиком в Магните. <br>Каждую ночь тебя будит смех Людмилки...'
  },

  ending2: {
    type: 'ending',
    title: 'КОНЕЦ #2: ПОЙМАН ВАСЕЙ',
    image: 'https://placehold.co/600x300/000000/0A0?text=Пойман+Васей&font=Press+Start+2P',
    text: 'Вася поймал тебя. <br>Ты провел остаток жизни убирая полы в Магните. <br>Золотой пакет так и остался легендой...'
  },

  ending3: {
    type: 'ending',
    title: 'КОНЕЦ #3: РАБ ДОМАШКИ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Поражение+Людмилке&font=Press+Start+2P',
    text: 'Людмилка победила. <br>Ты навсегда застрял в школе. <br>Домашка по русскому — твоя вечная кара...'
  },

  ending4: {
    type: 'ending',
    title: 'КОНЕЦ #4: НОВЫЙ ОХРАННИК',
    image: 'https://placehold.co/600x300/000000/0A0?text=Победа+над+Людмилкой&font=Press+Start+2P',
    text: 'Ты победил Людмилку! <br>Но Данад занял твое место. <br>Теперь ты — новый охранник Вася...'
  },

  ending17: {
    type: 'ending',
    title: 'КОНЕЦ #17: ПОСЛЕДНИЙ ПАКЕТ',
    image: 'https://placehold.co/600x300/000000/0F0?text=Последний&font=Press+Start+2P',
    text: 'Ты открыл последний пакет. <br>Внутри — твоя душа. <br>Ты понял: цена была всегда тобой.'
  }
};

// Функции для интерфейса
function startGame() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('game').classList.remove('hidden');
  renderScene('scene1');
}

function showSettings() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('settings').classList.remove('hidden');
}

function showCredits() {
  document.getElementById('menu').classList.add('hidden');
  document.getElementById('credits').classList.remove('hidden');
}

function exitGame() {
  if (confirm('ЗАКРЫТЬ ИГРУ? ПАКЕТ БУДЕТ СКУЧАТЬ...')) {
    window.close();
    setTimeout(() => alert('НУ ЛАДНО, НЕ ЗАКРЫЛОСЬ... НО СПАСИБО ЗА ИГРУ!'), 1000);
  }
}

function backToMenu() {
  document.getElementById('settings').classList.add('hidden');
  document.getElementById('credits').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
}

// Отображение сцены
function renderScene(sceneId) {
  console.log(`👉 Отображение сцены: ${sceneId}`);
  
  const scene = scenes[sceneId];
  if (!scene) {
    console.error(`❌ Сцена ${sceneId} не найдена!`);
    return;
  }
  
  gameState.currentScene = sceneId;
  gameState.sceneHistory.push(sceneId);
  
  // Обновляем статистику
  updateStats();
  
  // Генерируем HTML сцены
  let sceneHTML = `
    <div class="scene-content">
      <img src="${scene.image}" class="scene-image" alt="${scene.title}">
      <div class="scene-text">${scene.text}</div>
    </div>
  `;
  
  // Добавляем варианты выбора
  if (scene.type === 'scene' && scene.choices) {
    sceneHTML += '<div class="choices-container">';
    
    scene.choices.forEach((choice, index) => {
      // Проверяем условие для отображения выбора
      if (choice.condition && !choice.condition()) {
        return;
      }
      
      sceneHTML += `
        <button class="btn-main choice-btn" onclick="makeChoice(${index})">
          ${choice.text}
        </button>
      `;
    });
    
    sceneHTML += '</div>';
  }
  
  // Концовки
  if (scene.type === 'ending') {
    sceneHTML += `
      <button class="btn-main" onclick="restartGame()">НАЧАТЬ ЗАНОВО</button>
    `;
  }
  
  // Вставляем в DOM
  let container = document.querySelector('.game-scenes');
  if (!container) {
    const gameContainer = document.getElementById('game');
    if (gameContainer) {
      const newContainer = document.createElement('div');
      newContainer.className = 'game-scenes';
      gameContainer.querySelector('.container').appendChild(newContainer);
      container = newContainer;
    }
  }
  
  if (container) {
    container.innerHTML = sceneHTML;
  }
  
  // Сохраняем состояние
  saveState();
  
  // Запускаем мини-игру, если это необходимо
  if (scene.type === 'minigame') {
    setTimeout(() => {
      if (window[scene.minigame + 'Battle']) {
        window[scene.minigame + 'Battle'].start();
      }
    }, 300);
  }
}

// Принятие решения
function makeChoice(choiceIndex) {
  console.log(`🎯 Выбор: ${choiceIndex}`);
  
  const scene = scenes[gameState.currentScene];
  if (!scene || !scene.choices) {
    console.error('❌ Сцена не имеет вариантов выбора!');
    return;
  }
  
  const choice = scene.choices[choiceIndex];
  if (!choice) {
    console.error(`❌ Выбор ${choiceIndex} не найден!`);
    return;
  }
  
  // Обновляем состояние игры
  gameState.choices.total++;
  
  if (choice.consequence) {
    if (choice.consequence.sanity) {
      gameState.sanity = Math.max(0, Math.min(100, gameState.sanity + choice.consequence.sanity));
    }
    
    if (choice.consequence.health) {
      gameState.health = Math.max(0, Math.min(100, gameState.health + choice.consequence.health));
    }
    
    if (choice.consequence.inventory) {
      choice.consequence.inventory.forEach(item => {
        if (!gameState.inventory.includes(item)) {
          gameState.inventory.push(item);
        }
      });
    }
    
    if (choice.consequence.risky) {
      gameState.choices.risky++;
    }
  }
  
  // Переход к следующей сцене
  renderScene(choice.nextScene);
}

// Обновление статистики
function updateStats() {
  // Обновляем полосы состояния
  const healthFill = document.getElementById('health-fill');
  const sanityFill = document.getElementById('sanity-fill');
  const inventory = document.getElementById('inventory');
  
  if (healthFill) {
    healthFill.style.width = `${gameState.health}%`;
    healthFill.parentElement.setAttribute('data-value', `${gameState.health}%`);
  }
  
  if (sanityFill) {
    sanityFill.style.width = `${gameState.sanity}%`;
    sanityFill.parentElement.setAttribute('data-value', `${gameState.sanity}%`);
  }
  
  if (inventory) {
    inventory.textContent = gameState.inventory.join(', ') || 'ПУСТО';
  }
}

// Сохранение состояния
function saveState() {
  try {
    localStorage.setItem('paket_game_state', JSON.stringify(gameState));
  } catch (e) {
    console.warn("⚠️ Не удалось сохранить состояние");
  }
}

// Загрузка состояния
function loadState() {
  try {
    const saved = localStorage.getItem('paket_game_state');
    if (saved) {
      gameState = JSON.parse(saved);
      console.log("🔄 Состояние загружено");
    }
  } catch (e) {
    console.warn("⚠️ Не удалось загрузить состояние");
  }
}

// Перезапуск игры
function restartGame() {
  console.log("🔄 Перезапуск игры");
  
  gameState = {
    health: 100,
    sanity: 100,
    inventory: [],
    choices: {
      total: 0,
      successful: 0,
      failed: 0,
      risky: 0
    },
    currentScene: 'scene1',
    sceneHistory: []
  };
  
  saveState();
  renderScene('scene1');
  
  // Возвращаемся в меню
  document.getElementById('game').classList.add('hidden');
  document.getElementById('menu').classList.remove('hidden');
}

// Мини-игра "Погоня"
window.chaseBattle = {
  start() {
    console.log("🏃‍♂️ Запуск мини-игры: Погоня");
    
    const container = document.getElementById('minigame-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="minigame-title">ПОГОНЯ ЗА ДАНИЛОМ</div>
      <div class="chase-track">
        <div class="chase-runner" id="chase-runner"></div>
        <div class="chase-zone good-zone"></div>
        <div class="chase-zone danger-zone"></div>
      </div>
      <div class="chase-instructions">НАЖМИТЕ ПРОБЕЛ, КОГДА ПОЛОСА В ЗЕЛЁНОЙ ЗОНЕ!</div>
      <div class="chase-counter">ПОПЫТКИ: <span id="chase-attempts">3</span></div>
    `;
    
    let progress = 0;
    let speed = 2;
    const runner = document.getElementById('chase-runner');
    
    const animate = () => {
      progress += speed;
      if (progress > 100) progress = 0;
      runner.style.left = `${progress}%`;
      requestAnimationFrame(animate);
    };
    
    animate();
    
    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space') {
        const zonePosition = runner.offsetLeft + runner.offsetWidth/2;
        const goodZone = document.querySelector('.good-zone');
        const zoneStart = goodZone.offsetLeft;
        const zoneEnd = zoneStart + goodZone.offsetWidth;
        
        if (zonePosition >= zoneStart && zonePosition <= zoneEnd) {
          setTimeout(() => {
            const scene = scenes[gameState.currentScene];
            renderScene(scene.successScene);
          }, 500);
        } else {
          const attemptsEl = document.getElementById('chase-attempts');
          let attempts = parseInt(attemptsEl.textContent) - 1;
          attemptsEl.textContent = attempts;
          
          if (attempts <= 0) {
            setTimeout(() => {
              const scene = scenes[gameState.currentScene];
              renderScene(scene.failScene);
            }, 500);
          }
        }
      }
    });
  }
};

// Мини-игра "Бой"
window.battleBattle = {
  start() {
    console.log("⚔️ Запуск мини-игры: Бой");
    
    const container = document.getElementById('minigame-container');
    if (!container) return;
    
    container.innerHTML = `
      <div class="minigame-title">БОЙ С ЛЮДМИЛКОЙ</div>
      <div class="battle-arena">
        <div class="battle-character player">
          <div class="status-bar" data-label="ДАНИЛ">
            <div class="status-fill" id="player-health" data-value="100%"></div>
          </div>
        </div>
        <div class="battle-character teacher">
          <div class="status-bar" data-label="ЛЮДМИЛКА">
            <div class="status-fill" id="teacher-health" data-value="100%"></div>
          </div>
        </div>
      </div>
      <div class="battle-controls">
        <button class="battle-btn" onclick="battleAttack()">АТАКОВАТЬ</button>
        <button class="battle-btn" onclick="battleDodge()">УКЛОНИТЬСЯ</button>
      </div>
      <div class="battle-log" id="battle-log">БОЙ НАЧИНАЕТСЯ...</div>
      <div class="battle-round">РАУНД: <span id="round-counter">1</span>/5</div>
    `;
    
    let playerHealth = 100;
    let teacherHealth = 100;
    let round = 1;
    
    const updateHealth = () => {
      document.getElementById('player-health').style.width = `${playerHealth}%`;
      document.getElementById('player-health').setAttribute('data-value', `${playerHealth}%`);
      
      document.getElementById('teacher-health').style.width = `${teacherHealth}%`;
      document.getElementById('teacher-health').setAttribute('data-value', `${teacherHealth}%`);
      
      document.getElementById('round-counter').textContent = round;
    };
    
    const log = (message, type = '') => {
      const log = document.getElementById('battle-log');
      if (!log) return;
      
      const entry = document.createElement('div');
      entry.textContent = message;
      if (type) entry.classList.add(type);
      log.appendChild(entry);
      log.scrollTop = log.scrollHeight;
    };
    
    window.battleAttack = () => {
      const damage = Math.floor(Math.random() * 20) + 10;
      teacherHealth = Math.max(0, teacherHealth - damage);
      log(`ТЫ НАНЕС ЛЮДМИЛКЕ ${damage} УРОНА!`, 'player-action');
      
      setTimeout(() => {
        round++;
        
        const attackType = Math.random() > 0.5 ? 'direct' : 'combo';
        let damage = attackType === 'direct' 
          ? Math.floor(Math.random() * 25) + 10 
          : Math.floor(Math.random() * 15) + 5;
        
        log(attackType === 'direct' 
          ? 'ЛЮДМИЛКА ЗАМАХИВАЕТСЯ УКАЗКОЙ!' 
          : 'ДАНАД АТАКУЕТ С ТЫЛА!', 'enemy-action');
        
        playerHealth = Math.max(0, playerHealth - damage);
        log(`ТЫ ПОЛУЧИЛ ${damage} УРОНА!`, 'damage');
        
        updateHealth();
        
        if (teacherHealth <= 0) {
          log('ТЫ ПОБЕДИЛ ЛЮДМИЛКУ!', 'victory');
          setTimeout(() => {
            const scene = scenes[gameState.currentScene];
            renderScene(scene.successScene);
          }, 1500);
        } else if (playerHealth <= 0) {
          log('ЛЮДМИЛКА ОДЕРЖАЛА ПОБЕДУ...', 'defeat');
          setTimeout(() => {
            const scene = scenes[gameState.currentScene];
            renderScene(scene.failScene);
          }, 1500);
        }
      }, 500);
    };
    
    window.battleDodge = () => {
      log('ТЫ УКЛОНИЛСЯ!', 'player-action');
      
      setTimeout(() => {
        round++;
        
        const attackType = Math.random() > 0.5 ? 'direct' : 'combo';
        let damage = attackType === 'direct' 
          ? Math.floor(Math.random() * 25) + 10 
          : Math.floor(Math.random() * 15) + 5;
        
        log(attackType === 'direct' 
          ? 'ЛЮДМИЛКА ЗАМАХИВАЕТСЯ УКАЗКОЙ!' 
          : 'ДАНАД АТАКУЕТ С ТЫЛА!', 'enemy-action');
        
        playerHealth = Math.max(0, playerHealth - damage);
        log(`ТЫ ПОЛУЧИЛ ${damage} УРОНА!`, 'damage');
        
        updateHealth();
        
        if (playerHealth <= 0) {
          log('ЛЮДМИЛКА ОДЕРЖАЛА ПОБЕДУ...', 'defeat');
          setTimeout(() => {
            const scene = scenes[gameState.currentScene];
            renderScene(scene.failScene);
          }, 1500);
        }
      }, 500);
    };
    
    log('ЛЮДМИЛКА И ДАНАД ОКРУЖАЮТ ТЕБЯ!', 'highlight');
    setTimeout(() => {
      log('НАЖМИ АТАКОВАТЬ ИЛИ УКЛОНИТЬСЯ!', 'highlight');
    }, 1000);
    
    updateHealth();
  }
};

// Режим оптимизации
function toggleOptimizationMode() {
  const optimizationToggle = document.getElementById('optimization-toggle');
  if (!optimizationToggle) return;
  
  if (optimizationToggle.checked) {
    showOptimizationModal();
  } else {
    disableOptimizationMode();
  }
}

function showOptimizationModal() {
  const modal = document.getElementById('optimization-modal');
  const timer = document.getElementById('optimization-timer');
  let seconds = 5;
  
  modal.classList.remove('hidden');
  timer.textContent = seconds;
  
  const interval = setInterval(() => {
    seconds--;
    timer.textContent = seconds;
    
    if (seconds <= 0) {
      clearInterval(interval);
      modal.classList.add('hidden');
      enableOptimizationMode();
    }
  }, 1000);
}

function enableOptimizationMode() {
  console.log("⚡ Включаем режим оптимизации");
  
  // Сохраняем состояние
  localStorage.setItem('optimizationMode', 'true');
  
  // Применяем оптимизации
  document.body.classList.add('optimization-mode');
  
  // Отключаем анимации
  document.body.style.animation = 'none';
  
  // Упрощаем графику
  document.querySelectorAll('img').forEach(img => {
    if (!img.src.includes('placehold.co')) {
      img.src = img.src.replace(/(https?:\/\/[^/]+\/)(.*)/, '$1600x400/000000/0F0?text=Оптимизировано&font=Press+Start+2P');
    }
  });
  
  // Отключаем статику и сканирующую линию
  document.querySelector('.static').style.display = 'none';
  document.querySelector('.scanline').style.display = 'none';
  
  // Обновляем интерфейс
  updateStats();
}

function disableOptimizationMode() {
  console.log("⚡ Отключаем режим оптимизации");
  
  // Сохраняем состояние
  localStorage.setItem('optimizationMode', 'false');
  
  // Восстанавливаем оригинальные настройки
  document.body.classList.remove('optimization-mode');
  
  // Включаем анимации
  const effectsToggle = document.getElementById('effects-toggle');
  if (effectsToggle && effectsToggle.checked) {
    document.body.style.animation = '';
  }
  
  // Восстанавливаем оригинальные изображения
  document.querySelectorAll('img').forEach(img => {
    if (img.src.includes('Оптимизировано')) {
      img.src = img.dataset.originalSrc || img.src;
    }
  });
  
  // Включаем статику и сканирующую линию
  document.querySelector('.static').style.display = 'block';
  document.querySelector('.scanline').style.display = 'block';
  
  // Обновляем интерфейс
  updateStats();
}

// Автоинициализация
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  
  // Настройка режима оптимизации
  const optimizationToggle = document.getElementById('optimization-toggle');
  if (optimizationToggle) {
    optimizationToggle.checked = localStorage.getItem('optimizationMode') === 'true';
    optimizationToggle.addEventListener('change', toggleOptimizationMode);
  }
  
  // Активируем сцены
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.add('active');
  });
});