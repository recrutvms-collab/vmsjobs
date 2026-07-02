let currentId = "Q1";
let history = [];

const root = document.getElementById("quiz-root");

function renderHeader() {
  return `
   <img class="page-header" src="images/logo.png" alt="">
  `;
}

function renderFooter() {
  return `
    <div class="footer-copyright">
      © Третій Центр рекрутингу ВМС ЗСУ, 2026 рік <br/>
      <a href="https://recrutvms.mil.gov.ua/?utm_source=quiz&utm_medium=referral&utm_campaign=quiz_vms " target="_blank" rel="noopener">recrutvms.mil.gov.ua</a> 
      — Більше, ніж море
    </div>
  `;
}

function renderStart() {
  root.innerHTML = `
    ${renderHeader()}
    <img class="step-image start-image" src="${startScreen.image}" alt="">
    <div class="start-screen">
      <h1 class="start-title">${startScreen.title}</h1>
      <p class="start-subtitle">${startScreen.subtitle}</p>
      <p class="start-body">${startScreen.body.split("\n\n").map(p => `<span>${p}</span>`).join("")}</p>
      <button class="btn-start" id="start-btn">
        <span class="btn-start-label">${startScreen.cta}</span>
        <span class="spark" style="--angle:0deg"></span>
        <span class="spark" style="--angle:45deg"></span>
        <span class="spark" style="--angle:90deg"></span>
        <span class="spark" style="--angle:135deg"></span>
        <span class="spark" style="--angle:180deg"></span>
        <span class="spark" style="--angle:225deg"></span>
        <span class="spark" style="--angle:270deg"></span>
        <span class="spark" style="--angle:315deg"></span>
      </button>
      <div class="start-note">${startScreen.ctaNote}</div>
    </div>
    ${renderFooter()}
  `;

  document.getElementById("start-btn").addEventListener("click", () => {
    history = [];
    gtag('event', 'quiz_start', {
      project_name: 'vmsjobs'
    });
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
    ${renderHeader()}
    ${renderProgress(q.depth)}
    <h2 class="question-text">${q.text}</h2>
    <div class="options">
      ${q.options.map((opt, i) => `
        <button class="option-btn" data-next="${opt.next}">${opt.label}</button>
      `).join("")}
    </div>
    ${renderBackButton()}
    ${renderFooter()}
  `;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      history.push(currentId);
      gtag('event', 'quiz_answer', {
        project_name: 'vmsjobs',
        question_id: currentId,
        answer_next: next
      });
      const next = btn.dataset.next;
      goTo(next);
    });
  });

  const backBtn = document.getElementById("back-btn");
  if (backBtn) backBtn.addEventListener("click", goBack);
}

function renderResult(id) {
  const r = results[id];

  gtag('event', 'quiz_complete', {
    project_name: 'vmsjobs',
    result_id: id,
    result_title: r.title
  });

  root.innerHTML = `  
    ${renderHeader()}
    ${renderProgress(TOTAL_STEPS)}
    <div class="result-card">
      <img class="step-image" src="${r.image}" alt="">
      <div class="result-category">${r.category}</div>
      <h2 class="result-title">${r.title}</h2>
      <p class="result-description">${r.description}</p>
    </div>
    <div class="result-text">
      <p>Переглянути вакансії:</p>
    </div>
    <div class="btn-job-group">
      <a class="btn-job btn-job-left" href="${r.jobUrl}" target="_blank" rel="noopener" 
          onclick="gtag('event','jobs_click',{project_name:'vmsjobs',result_id:'${id}',destination:'recrutvms'})">
        <span class="btn-jobs-label">Центр рекрутингу ВМС</span>
        <span class="spark" style="--angle:0deg"></span>
        <span class="spark" style="--angle:45deg"></span>
        <span class="spark" style="--angle:90deg"></span>
        <span class="spark" style="--angle:135deg"></span>
        <span class="spark" style="--angle:180deg"></span>
        <span class="spark" style="--angle:225deg"></span>
        <span class="spark" style="--angle:270deg"></span>
        <span class="spark" style="--angle:315deg"></span>
      </a>
      <a class="btn-job btn-job-right" href="${r.jobUrlWork}" target="_blank" rel="noopener"
          onclick="gtag('event','jobs_click',{project_name:'vmsjobs',result_id:'${id}',destination:'work_ua'})">
        <span class="btn-jobs-label">Work.ua</span>
        <span class="spark" style="--angle:0deg"></span>
        <span class="spark" style="--angle:45deg"></span>
        <span class="spark" style="--angle:90deg"></span>
        <span class="spark" style="--angle:135deg"></span>
        <span class="spark" style="--angle:180deg"></span>
        <span class="spark" style="--angle:225deg"></span>
        <span class="spark" style="--angle:270deg"></span>
        <span class="spark" style="--angle:315deg"></span>
      </a>
    </div>
    <div class="result-actions-row">
    ${renderBackButton()}
    <button class="btn-restart" id="restart-btn">Почати знову</button>
    </div>
    ${renderFooter()}
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