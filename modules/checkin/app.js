const STORAGE_KEY = "meal-plan-weight-checkin.v1";

const plans = {
  five: {
    id: "five",
    name: "幸福五日食谱",
    shortName: "五日舒适计划",
    subtitle: "按原图整理的 5 天菜单",
    description: "三餐清晰、选择简单，适合用打卡方式逐餐完成。",
    days: [
      {
        mood: "从容开始",
        meals: {
          breakfast: "茶叶蛋 1 个 + 黑咖啡 / 无糖豆浆 500ml",
          lunch: "半只蒸鸡或窑鸡（去皮食用）",
          dinner: "1 个拳头大小的白馒头",
        },
        tip: "原图提示：一天喝够约 1.5L 水、细嚼慢咽、早点休息。",
      },
      {
        mood: "轻盈海鲜日",
        meals: {
          breakfast: "茶叶蛋 1 个 + 鲜牛奶 500ml",
          lunch: "鲜虾云吞 10 个",
          dinner: "白灼虾仁 10 只，可配醋或干碟",
        },
        tip: "按自己的饥饿感调整，不舒服就停止执行。",
      },
      {
        mood: "清爽蔬食日",
        meals: {
          breakfast: "1 份蒸蛋 + 黑咖啡",
          lunch: "鸡蛋生菜肠粉",
          dinner: "凉拌菠菜豆腐",
        },
        tip: "原图提示：特别饿时可加一小把坚果或一个番茄。",
      },
      {
        mood: "外食也简单",
        meals: {
          breakfast: "鸡蛋 1 个 + 香蕉 1 根",
          lunch: "便利店关东煮：优先选萝卜、魔芋、昆布、香菇、海带、金针菇等素菜",
          dinner: "板烧鸡腿堡",
        },
        tip: "饮品选择无糖、常温或热饮；晚上少喝含咖啡因饮品。",
      },
      {
        mood: "稳稳收尾",
        meals: {
          breakfast: "黑咖啡 + 椰子水",
          lunch: "馒头 1 个 + 鸡蛋 1 个",
          dinner: "手枪腿 1 个 + 西兰花 + 一拳头米饭",
        },
        tip: "完成 5 天后可以从 Day 1 重新循环，也可以切换另一套计划。",
      },
    ],
  },
  seven: {
    id: "seven",
    name: "七日高蛋白食谱",
    shortName: "七日丰富计划",
    subtitle: "按原图整理的 7 天菜单",
    description: "在家做和外食选项都有，最后一天保留弹性。",
    days: [
      {
        mood: "蛋白质开场",
        meals: {
          breakfast: "鸡蛋 2 个 / 火腿培根 150g + 原味坚果 10 颗 + 黑咖啡",
          lunch: "半只蒸鸡或窑鸡（去皮），也可选烤鸡腿 2 个",
          dinner: "水煮虾 15 只",
        },
        tip: "原图蘸料建议：醋、少量麻椒油、酱油、蚝油、葱蒜香菜、小米辣。餐间饿了可喝柠檬水或椰子水。",
      },
      {
        mood: "外食选择日",
        meals: {
          breakfast: "松露香菌菇牛肉恰巴塔三明治 + 黑咖啡",
          lunch: "烫捞/火锅：主食选魔芋丝，肉类约 150g，蔬菜不限量，不点丸子",
          dinner: "无糖酸奶 150g + 香蕉 1 根",
        },
        tip: "原图提示：每餐吃到七分饱，慢慢吃。",
      },
      {
        mood: "一份分两餐",
        meals: {
          breakfast: "鸡蛋 2 个 + 原味坚果 10 颗 + 无糖绿茶",
          lunch: "老乡鸡：1 肉 + 1 菜 + 1 主食，先吃一半",
          dinner: "把午餐剩余的一半吃完",
        },
        tip: "可选肉菜：三杯鸡、酸菜鱼、番茄菌菇肉丸等；可选蔬菜和小份杂粮饭/米饭。外食偏咸时注意补水。",
      },
      {
        mood: "满足感也重要",
        meals: {
          breakfast: "肯德基猪柳帕尼尼 / 鸡肉帕尼尼 + 热美式 + 原味坚果 10 颗",
          lunch: "跷脚牛肉（小锅）+ 1 份蔬菜",
          dinner: "三文鱼 150g，生熟均可",
        },
        tip: "按原图组合整理；具体份量可根据个人状况调整。",
      },
      {
        mood: "自在搭配日",
        meals: {
          breakfast: "蒸红薯 / 紫薯 150g + 无糖豆浆 + 原味坚果 10 颗",
          lunch: "赛百味三明治（400 kcal 内）：照烧鸡、火腿、香烤牛肉、意式经典或缤纷蔬菜；酱选番茄、蜂蜜芥末或烧烤酱",
          dinner: "水油焖菜；不做饭可选清汤麻辣烫：3 菜 2 肉 1 主食，不点丸子，调料加醋，不加麻酱辣油，不喝汤",
        },
        tip: "主食可选魔芋丝、玉米、土豆或山药；肉类可选鸡、牛、鱼、虾。",
      },
      {
        mood: "分餐更轻松",
        meals: {
          breakfast: "蒸甜玉米 1 根 / 糯玉米半根 + 原味坚果 10 颗",
          lunch: "老乡鸡：1 肉 + 1 菜 + 1 主食，先吃一半",
          dinner: "把午餐剩余的一半吃完",
        },
        tip: "可选豉汁鱼块、毛豆烧鸡、白灼虾、农家蒸蛋等，搭配蔬菜和小份杂粮饭/米饭。",
      },
      {
        mood: "弹性放松日",
        meals: {
          breakfast: "自由选择，吃到七分饱",
          lunch: "自由选择，吃到七分饱",
          dinner: "自由选择，吃到七分饱",
        },
        tip: "原图写作“放纵日”，这里保留为弹性日：正常吃、留意份量，不用补偿性节食。",
      },
    ],
  },
};

const mealMeta = {
  breakfast: { label: "早餐", icon: "☀" },
  lunch: { label: "午餐", icon: "◐" },
  dinner: { label: "晚餐", icon: "☾" },
};

const todayString = () => {
  const now = new Date();
  return formatDate(now);
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseDate = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
};

const addDays = (value, amount) => {
  const date = parseDate(value);
  date.setDate(date.getDate() + amount);
  return formatDate(date);
};

const dayDiff = (start, end) => Math.round((parseDate(end) - parseDate(start)) / 86400000);

const defaultState = () => ({
  version: 1,
  settings: {
    activePlan: "five",
    startDate: todayString(),
  },
  records: {},
});

let state = loadState();
let selectedDate = todayString();
let toastTimer;

const elements = {
  friendlyDate: document.querySelector("#friendlyDate"),
  recordDate: document.querySelector("#recordDate"),
  previousDate: document.querySelector("#previousDate"),
  nextDate: document.querySelector("#nextDate"),
  planSelect: document.querySelector("#planSelect"),
  daySelect: document.querySelector("#daySelect"),
  activePlanChip: document.querySelector("#activePlanChip"),
  activeDayTitle: document.querySelector("#activeDayTitle"),
  heroMessage: document.querySelector("#heroMessage"),
  progressRing: document.querySelector("#progressRing"),
  progressPercent: document.querySelector("#progressPercent"),
  mealCount: document.querySelector("#mealCount"),
  mealList: document.querySelector("#mealList"),
  weightInput: document.querySelector("#weightInput"),
  saveWeightButton: document.querySelector("#saveWeightButton"),
  weightPrompt: document.querySelector("#weightPrompt"),
  weightDelta: document.querySelector("#weightDelta"),
  dailyNote: document.querySelector("#dailyNote"),
  saveNoteButton: document.querySelector("#saveNoteButton"),
  noteStatus: document.querySelector("#noteStatus"),
  latestWeight: document.querySelector("#latestWeight"),
  totalChange: document.querySelector("#totalChange"),
  streakCount: document.querySelector("#streakCount"),
  chartRange: document.querySelector("#chartRange"),
  weightChart: document.querySelector("#weightChart"),
  historyList: document.querySelector("#historyList"),
  planCards: document.querySelector("#planCards"),
  startDateInput: document.querySelector("#startDateInput"),
  planDetails: document.querySelector("#planDetails"),
  exportButton: document.querySelector("#exportButton"),
  importInput: document.querySelector("#importInput"),
  installHelpButton: document.querySelector("#installHelpButton"),
  installDialog: document.querySelector("#installDialog"),
  toast: document.querySelector("#toast"),
};

function loadState() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!parsed || !parsed.settings || !parsed.records) return defaultState();
    if (!plans[parsed.settings.activePlan]) parsed.settings.activePlan = "five";
    if (!parsed.settings.startDate) parsed.settings.startDate = todayString();
    return parsed;
  } catch {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function derivedDayIndex(date, planId = state.settings.activePlan) {
  const count = plans[planId].days.length;
  const diff = dayDiff(state.settings.startDate, date);
  return ((diff % count) + count) % count;
}

function getRecord(date = selectedDate) {
  if (!state.records[date]) {
    state.records[date] = {
      planId: state.settings.activePlan,
      dayIndex: derivedDayIndex(date),
      meals: { breakfast: false, lunch: false, dinner: false },
      weightKg: null,
      note: "",
      updatedAt: new Date().toISOString(),
    };
  }
  const record = state.records[date];
  if (!plans[record.planId]) record.planId = state.settings.activePlan;
  if (!record.meals) record.meals = { breakfast: false, lunch: false, dinner: false };
  return record;
}

function isComplete(record) {
  return Boolean(record.weightKg) && Object.values(record.meals).every(Boolean);
}

function updateRecord(mutator) {
  const record = getRecord();
  mutator(record);
  record.updatedAt = new Date().toISOString();
  saveState();
}

function setupSelectors() {
  elements.planSelect.innerHTML = Object.values(plans)
    .map((plan) => `<option value="${plan.id}">${plan.name}</option>`)
    .join("");
}

function renderCheckin() {
  const record = getRecord();
  const plan = plans[record.planId];
  record.dayIndex = Math.min(Math.max(Number(record.dayIndex) || 0, 0), plan.days.length - 1);
  const day = plan.days[record.dayIndex];
  const completedMeals = Object.values(record.meals).filter(Boolean).length;
  const progressItems = completedMeals + (record.weightKg ? 1 : 0);
  const percent = Math.round((progressItems / 4) * 100);

  elements.recordDate.value = selectedDate;
  elements.friendlyDate.textContent = friendlyDate(selectedDate);
  elements.nextDate.disabled = selectedDate >= todayString();
  elements.nextDate.style.opacity = selectedDate >= todayString() ? "0.28" : "1";
  elements.planSelect.value = record.planId;
  elements.daySelect.innerHTML = plan.days
    .map((_, index) => `<option value="${index}">Day ${index + 1}</option>`)
    .join("");
  elements.daySelect.value = String(record.dayIndex);
  elements.activePlanChip.textContent = plan.name;
  elements.activeDayTitle.textContent = `Day ${record.dayIndex + 1} · ${day.mood}`;
  elements.heroMessage.textContent = isComplete(record)
    ? "今天已经完整打卡，做得很好。"
    : "不用追求完美，完成一餐就是一步。";
  elements.progressRing.style.setProperty("--progress", `${percent * 3.6}deg`);
  elements.progressPercent.textContent = `${percent}%`;
  elements.mealCount.textContent = `${completedMeals} / 3`;

  elements.mealList.innerHTML = Object.entries(mealMeta)
    .map(([key, meta]) => {
      const done = Boolean(record.meals[key]);
      return `
        <article class="meal-card ${done ? "done" : ""}" data-meal="${key}" tabindex="0" role="button" aria-pressed="${done}">
          <div class="meal-icon" aria-hidden="true">${meta.icon}</div>
          <div class="meal-copy">
            <h3>${meta.label}</h3>
            <p>${escapeHtml(day.meals[key])}</p>
          </div>
          <div class="meal-check" aria-hidden="true">✓</div>
        </article>`;
    })
    .join("") + `<p class="day-tip">${escapeHtml(day.tip)}</p>`;

  elements.weightInput.value = record.weightKg ? (Number(record.weightKg) * 2).toFixed(1) : "";
  if (record.weightKg) {
    elements.weightPrompt.textContent = `${(Number(record.weightKg) * 2).toFixed(1)} 斤`;
    const previous = previousWeight(selectedDate);
    if (previous) {
      const deltaJin = (Number(record.weightKg) - previous.weight) * 2;
      elements.weightDelta.textContent = `较上次 ${deltaJin === 0 ? "持平" : `${deltaJin > 0 ? "+" : ""}${deltaJin.toFixed(1)} 斤`}`;
    } else {
      elements.weightDelta.textContent = "这是第一条体重记录";
    }
  } else {
    elements.weightPrompt.textContent = "记录今天的体重";
    elements.weightDelta.textContent = "连续记录后会显示变化";
  }
  elements.dailyNote.value = record.note || "";
}

function friendlyDate(value) {
  const diff = dayDiff(todayString(), value);
  if (diff === 0) return "今天";
  if (diff === -1) return "昨天";
  const date = parseDate(value);
  const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][date.getDay()];
  return `${date.getMonth() + 1}月${date.getDate()}日 · ${weekday}`;
}

function previousWeight(beforeDate) {
  const entries = Object.entries(state.records)
    .filter(([date, record]) => date < beforeDate && Number(record.weightKg) > 0)
    .sort(([a], [b]) => b.localeCompare(a));
  return entries.length ? { date: entries[0][0], weight: Number(entries[0][1].weightKg) } : null;
}

function renderTrend() {
  const weightEntries = Object.entries(state.records)
    .filter(([, record]) => Number(record.weightKg) > 0)
    .sort(([a], [b]) => a.localeCompare(b));
  const latest = weightEntries.at(-1);
  const first = weightEntries[0];

  elements.latestWeight.textContent = latest ? (Number(latest[1].weightKg) * 2).toFixed(1) : "--";
  if (latest && first && latest !== first) {
    const deltaJin = (Number(latest[1].weightKg) - Number(first[1].weightKg)) * 2;
    elements.totalChange.textContent = `${deltaJin > 0 ? "+" : ""}${deltaJin.toFixed(1)}`;
  } else {
    elements.totalChange.textContent = weightEntries.length ? "0.0" : "--";
  }
  elements.streakCount.textContent = String(calculateStreak());
  renderChart(weightEntries.slice(-14));
  renderHistory();
}

function calculateStreak() {
  let count = 0;
  let cursor = todayString();
  while (state.records[cursor] && isComplete(state.records[cursor])) {
    count += 1;
    cursor = addDays(cursor, -1);
  }
  return count;
}

function renderChart(entries) {
  if (!entries.length) {
    elements.chartRange.textContent = "暂无记录";
    elements.weightChart.innerHTML = `<div class="chart-empty">保存第一条体重后<br>这里会出现趋势曲线</div>`;
    return;
  }

  const values = entries.map(([, record]) => Number(record.weightKg) * 2);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = Math.max(max - min, 1.2);
  const width = 320;
  const height = 160;
  const xPad = 18;
  const yPad = 20;
  const points = entries.map(([date, record], index) => {
    const x = entries.length === 1 ? width / 2 : xPad + (index * (width - xPad * 2)) / (entries.length - 1);
    const weightJin = Number(record.weightKg) * 2;
    const y = yPad + ((max + range * 0.25 - weightJin) / (range * 1.5)) * (height - yPad * 2);
    return { x, y, date, weight: weightJin };
  });
  const line = points.map((point) => `${point.x},${point.y}`).join(" ");
  const area = `${points[0].x},${height - 10} ${line} ${points.at(-1).x},${height - 10}`;
  const labelPoints = points.length <= 5 ? points : [points[0], points[Math.floor(points.length / 2)], points.at(-1)];
  elements.chartRange.textContent = `${min.toFixed(1)}–${max.toFixed(1)} 斤`;
  elements.weightChart.innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="最近体重由 ${values[0].toFixed(1)} 斤到 ${values.at(-1).toFixed(1)} 斤">
      <defs>
        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#9fb8a4" stop-opacity="0.4" />
          <stop offset="1" stop-color="#9fb8a4" stop-opacity="0" />
        </linearGradient>
      </defs>
      <line x1="18" y1="40" x2="302" y2="40" stroke="#dfe5df" stroke-dasharray="3 5" />
      <line x1="18" y1="90" x2="302" y2="90" stroke="#dfe5df" stroke-dasharray="3 5" />
      <line x1="18" y1="140" x2="302" y2="140" stroke="#dfe5df" stroke-dasharray="3 5" />
      <polygon points="${area}" fill="url(#areaGradient)" />
      <polyline points="${line}" fill="none" stroke="#466a55" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      ${points.map((point) => `<circle cx="${point.x}" cy="${point.y}" r="4" fill="#fff" stroke="#466a55" stroke-width="2.4" />`).join("")}
      ${labelPoints.map((point) => `<text x="${point.x}" y="156" text-anchor="middle" fill="#7a827c" font-size="8">${Number(point.date.slice(5, 7))}/${Number(point.date.slice(8, 10))}</text>`).join("")}
    </svg>`;
}

function renderHistory() {
  const entries = Object.entries(state.records)
    .filter(([, record]) => record.weightKg || Object.values(record.meals || {}).some(Boolean) || record.note)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, 14);

  if (!entries.length) {
    elements.historyList.innerHTML = `<div class="empty-list">还没有打卡记录，完成今天的第一餐吧。</div>`;
    return;
  }

  elements.historyList.innerHTML = entries.map(([date, record]) => {
    const dateObj = parseDate(date);
    const plan = plans[record.planId] || plans.five;
    const mealsDone = Object.values(record.meals || {}).filter(Boolean).length;
    return `
      <article class="history-row">
        <div class="history-date"><strong>${dateObj.getDate()}</strong><span>${dateObj.getMonth() + 1}月</span></div>
        <div>
          <h3>${escapeHtml(plan.shortName)} · Day ${(Number(record.dayIndex) || 0) + 1}</h3>
          <p>${mealsDone}/3 餐${record.weightKg ? ` · ${(Number(record.weightKg) * 2).toFixed(1)} 斤` : " · 未记体重"}${isComplete(record) ? " · 完整打卡" : ""}</p>
        </div>
        <button type="button" data-open-date="${date}">查看</button>
      </article>`;
  }).join("");
}

function renderPlans() {
  elements.planCards.innerHTML = Object.values(plans).map((plan) => `
    <button class="plan-choice ${state.settings.activePlan === plan.id ? "active" : ""}" type="button" data-activate-plan="${plan.id}">
      <div>
        <span>${plan.days.length} 天循环</span>
        <h3>${escapeHtml(plan.shortName)}</h3>
        <p>${escapeHtml(plan.description)}</p>
      </div>
      <strong>${state.settings.activePlan === plan.id ? "当前计划 ✓" : "设为当前计划"}</strong>
    </button>`).join("");

  elements.startDateInput.value = state.settings.startDate;
  const activePlan = plans[state.settings.activePlan];
  elements.planDetails.innerHTML = activePlan.days.map((day, index) => `
    <details class="plan-day" ${index === derivedDayIndex(todayString(), activePlan.id) ? "open" : ""}>
      <summary><strong>Day ${index + 1} · ${escapeHtml(day.mood)}</strong><span>查看菜单 ＋</span></summary>
      <div class="plan-day-content">
        <p><strong>早餐</strong>　${escapeHtml(day.meals.breakfast)}
<strong>午餐</strong>　${escapeHtml(day.meals.lunch)}
<strong>晚餐</strong>　${escapeHtml(day.meals.dinner)}</p>
        <p>${escapeHtml(day.tip)}</p>
      </div>
    </details>`).join("");
}

function renderAll() {
  renderCheckin();
  renderTrend();
  renderPlans();
}

function switchView(target) {
  document.querySelectorAll(".view").forEach((view) => view.classList.toggle("active", view.dataset.view === target));
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.target === target));
  if (target === "trend") renderTrend();
  if (target === "plans") renderPlans();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function toast(message) {
  clearTimeout(toastTimer);
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2100);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function bindEvents() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", () => switchView(item.dataset.target));
  });

  elements.recordDate.addEventListener("change", () => {
    selectedDate = elements.recordDate.value || todayString();
    if (selectedDate > todayString()) selectedDate = todayString();
    renderCheckin();
  });
  elements.previousDate.addEventListener("click", () => {
    selectedDate = addDays(selectedDate, -1);
    renderCheckin();
  });
  elements.nextDate.addEventListener("click", () => {
    if (selectedDate < todayString()) selectedDate = addDays(selectedDate, 1);
    renderCheckin();
  });

  elements.planSelect.addEventListener("change", () => {
    updateRecord((record) => {
      record.planId = elements.planSelect.value;
      record.dayIndex = derivedDayIndex(selectedDate, record.planId);
    });
    renderCheckin();
    renderTrend();
  });
  elements.daySelect.addEventListener("change", () => {
    updateRecord((record) => { record.dayIndex = Number(elements.daySelect.value); });
    renderCheckin();
    renderTrend();
  });

  elements.mealList.addEventListener("click", (event) => {
    const card = event.target.closest("[data-meal]");
    if (!card) return;
    const meal = card.dataset.meal;
    updateRecord((record) => { record.meals[meal] = !record.meals[meal]; });
    renderCheckin();
    renderTrend();
    toast(getRecord().meals[meal] ? `${mealMeta[meal].label}已打卡` : `${mealMeta[meal].label}已取消`);
  });
  elements.mealList.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-meal]");
    if (card) card.click();
  });

  elements.saveWeightButton.addEventListener("click", () => {
    const weightJin = Number(elements.weightInput.value);
    if (!Number.isFinite(weightJin) || weightJin < 40 || weightJin > 600) {
      toast("请输入 40–600 斤之间的体重");
      elements.weightInput.focus();
      return;
    }
    updateRecord((record) => { record.weightKg = Math.round(weightJin * 10) / 20; });
    renderCheckin();
    renderTrend();
    toast("体重已保存在本机");
  });
  elements.weightInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") elements.saveWeightButton.click();
  });

  elements.saveNoteButton.addEventListener("click", () => {
    updateRecord((record) => { record.note = elements.dailyNote.value.trim(); });
    elements.noteStatus.textContent = "刚刚已保存";
    toast("备注已保存");
    setTimeout(() => { elements.noteStatus.textContent = "自动保存在本机"; }, 1800);
  });
  elements.dailyNote.addEventListener("blur", () => {
    updateRecord((record) => { record.note = elements.dailyNote.value.trim(); });
  });

  elements.historyList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-open-date]");
    if (!button) return;
    selectedDate = button.dataset.openDate;
    switchView("checkin");
    renderCheckin();
  });

  elements.planCards.addEventListener("click", (event) => {
    const button = event.target.closest("[data-activate-plan]");
    if (!button) return;
    const planId = button.dataset.activatePlan;
    state.settings.activePlan = planId;
    state.settings.startDate = todayString();
    const record = getRecord(todayString());
    record.planId = planId;
    record.dayIndex = 0;
    saveState();
    renderAll();
    toast(`${plans[planId].name}已设为当前计划`);
  });

  elements.startDateInput.addEventListener("change", () => {
    if (!elements.startDateInput.value) return;
    state.settings.startDate = elements.startDateInput.value;
    saveState();
    renderAll();
    toast("起始日已更新");
  });

  elements.exportButton.addEventListener("click", () => {
    const payload = {
      app: "轻盈打卡",
      exportedAt: new Date().toISOString(),
      storageKey: STORAGE_KEY,
      data: state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `轻盈打卡备份-${todayString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    toast("备份文件已导出");
  });

  elements.importInput.addEventListener("change", async () => {
    const file = elements.importInput.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const imported = parsed.data || parsed;
      if (!imported.settings || !imported.records) throw new Error("invalid");
      state = imported;
      if (!plans[state.settings.activePlan]) state.settings.activePlan = "five";
      saveState();
      selectedDate = todayString();
      renderAll();
      toast("备份已恢复");
    } catch {
      toast("这个备份文件无法识别");
    } finally {
      elements.importInput.value = "";
    }
  });

  elements.installHelpButton.addEventListener("click", () => elements.installDialog.showModal());
}

function setGreeting() {
  const hour = new Date().getHours();
  document.querySelector("#greeting").textContent = hour < 11 ? "早上好，今天也照顾好自己" : hour < 18 ? "下午好，慢慢完成就很好" : "晚上好，辛苦了一天";
}

setupSelectors();
bindEvents();
setGreeting();
renderAll();
