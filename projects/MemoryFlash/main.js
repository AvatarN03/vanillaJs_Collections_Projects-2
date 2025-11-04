let selectors = {
  boardContainer: document.querySelector(".board-container"),
  board: document.querySelector(".board"),
  moves: document.querySelector(".moves"),
  timer: document.querySelector(".timer"),
  start: document.querySelector("button"),
  win: document.querySelector(".win"),
  dimensionSelect: document.querySelector(".dimension-select"), // ✅ new
};

const state = {
  gameStarted: false,
  flippedCards: 0,
  totalFlips: 0,
  totalTime: 0,
  loop: null,
};

const generateGame = () => {
  const dimensions = parseInt(selectors.dimensionSelect.value);
  selectors.board.setAttribute("data-dimension", dimensions);

  if (dimensions % 2 !== 0) {
    throw new Error("The dimension of the board must be even number.");
  }

  const emojis = [
    "🧠", "💡", "📚", "🔑", "📝", "🎯", "🕹️", "🧩",
    "🎲", "🃏", "🕰️", "🔍", "📖", "🧮", "🎮", "🗝️",
  ];

  const picks = pickRandom(emojis, (dimensions * dimensions) / 2);
  const items = shuffle([...picks, ...picks]);

  const cards = `
    <div class="board" data-dimension="${dimensions}" style="grid-template-columns: repeat(${dimensions}, auto);">
      ${items.map(item => `
        <div class="card">
          <div class="card-front"></div>
          <div class="card-back">${item}</div>
        </div>`).join("")}
    </div>
  `;

  const parser = new DOMParser().parseFromString(cards, "text/html");
  const newBoard = parser.querySelector(".board");
  selectors.board.replaceWith(newBoard);
  selectors.board = newBoard; // ✅ re-assign reference
};

const pickRandom = (array, items) => {
  const clone = [...array];
  const result = [];
  for (let i = 0; i < items; i++) {
    const randIndex = Math.floor(Math.random() * clone.length);
    result.push(clone[randIndex]);
    clone.splice(randIndex, 1);
  }
  return result;
};

const shuffle = (array) => {
  const clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[randIndex]] = [clone[randIndex], clone[i]];
  }
  return clone;
};

const attachEventListeners = () => {
  document.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (card && !card.classList.contains("flipped")) {
      flipCard(card);
    } else if (
      event.target.nodeName === "BUTTON" &&
      !event.target.classList.contains("disabled")
    ) {
      startGame();
    }
  });
};

const startGame = () => {
  // Reset state
  state.gameStarted = false;
  state.flippedCards = 0;
  state.totalFlips = 0;
  state.totalTime = 0;
  clearInterval(state.loop);

  selectors.moves.innerText = `0 moves`;
  selectors.timer.innerText = `time: 0 sec`;
  selectors.win.innerHTML = ``;
  selectors.boardContainer.classList.remove("flipped");

  // ✅ Generate new board based on selected dimension
  generateGame();

  // ✅ Start new game timer after board generation
  state.gameStarted = true;
  selectors.start.classList.add("disabled");
  state.loop = setInterval(() => {
    state.totalTime++;
    selectors.moves.innerText = `Moves: ${state.totalFlips} moves`;
    selectors.timer.innerHTML = `Time: ${state.totalTime} seconds`;
  }, 1000);
};


const flipCard = (card) => {
  if (!state.gameStarted) startGame();

  if (!card.classList.contains("flipped") && state.flippedCards < 2) {
    card.classList.add("flipped");
    state.flippedCards++;
    state.totalFlips++;
  }

  if (state.flippedCards === 2) {
    const flipped = document.querySelectorAll(".flipped:not(.matched)");

    if (flipped[0].innerText === flipped[1].innerText) {
      flipped.forEach(c => c.classList.add("matched"));
    }

    setTimeout(() => {
      flipBackCards();

      // ✅ Check for win AFTER delay and flip-back
      const remaining = document.querySelectorAll(".card:not(.matched)");
      if (remaining.length === 0) {
        selectors.boardContainer.classList.add("flipped");
        selectors.win.innerHTML = `
          <span class="win-text">
            You won in ${state.totalFlips} moves and ${state.totalTime} seconds!
          </span>
        `;
        clearInterval(state.loop);
      }
    }, 1000);
  }
};

const flipBackCards = () => {
  document.querySelectorAll(".card:not(.matched)").forEach((card) => {
    card.classList.remove("flipped");
  });
  state.flippedCards = 0;
};

generateGame();
attachEventListeners();
