let currentId = "Q1";
let history = [];

const root = document.getElementById("quiz-root");

function renderStart() {
  root.innerHTML = `
    <img class="step-image start-image" src="${startScreen.image}" alt="">
    <div class="start-screen">
      <h1 class="start-title">${startScreen.title}</h1>
      <p class="start-subtitle">${startScreen.subtitle}</p>
      <p class="start-body">${startScreen.body.split("\n\n").map(p => `<span>${p}</span>`).join("")}</p>
      <button class="btn-restart" id="start-btn">${startScreen.cta}</button>
      <div class="start-note">${startScreen.ctaNote}</div>
    </div>
  `;

  document.getElementById("start-btn").addEventListener("click", () => {
    history = [];
    renderQuestion("Q1");
  });
}

function renderProgress(depth) {
  const pct = Math.round((depth / TOTAL_STEPS) * 100);
  return `
    <div class="progress">
      <div class="progress-bar" style="width:${pct}%"></div>
    </div>
    <div class="progress-label">Крок ${depth} з ${TOTAL_STEPS}</div>
  `;
}

function renderBackButton() {
  if (history.length === 0) return "";
  return `<button class="btn-back" id="back-btn">← Назад</button>`;
}

function renderQuestion(id) {
  currentId = id;
  const q = questions[id];

  root.innerHTML = `
    ${renderProgress(q.depth)}
    <h2 class="question-text">${q.text}</h2>
    <div class="options">
      ${q.options.map((opt, i) => `
        <button class="option-btn" data-next="${opt.next}">${opt.label}</button>
      `).join("")}
    </div>
    ${renderBackButton()}
  `;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      history.push(currentId);
      const next = btn.dataset.next;
      goTo(next);
    });
  });

  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.addEventListener("click", goBack);
}

function renderResult(id) {
  const r = results[id];

  root.innerHTML = `
    ${renderProgress(TOTAL_STEPS)}
    <div class="result-card">
      <img class="step-image" src="${r.image}" alt="">
      <div class="result-category">${r.category}</div>
      <h2 class="result-title">${r.title}</h2>
      <p class="result-description">${r.description}</p>
    </div>
    ${renderBackButton()}
    <button class="btn-restart" id="restart-btn">Почати знову</button>
  `;

  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.addEventListener("click", goBack);

  document.getElementById("restart-btn").addEventListener("click", restart);
}

function goTo(id) {
  if (questions[id]) {
    renderQuestion(id);
  } else if (results[id]) {
    renderResult(id);
  }
}

function goBack() {
  if (history.length === 0) return;
  const prevId = history.pop();
  renderQuestion(prevId);
}

function restart() {
  history = [];
  renderQuestion("Q1");
}

renderStart();
