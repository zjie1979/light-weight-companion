(() => {
  "use strict";

  const KEYS = {
    checkin: "meal-plan-weight-checkin.v1",
    weight: "diet-weight-tracker-v1",
    dinner: "weightDinnerGuide.v2.jin.records",
    dinnerDraft: "weightDinnerGuide.v2.jin.todayDraft",
    loop: "swift-light-loop-v1"
  };

  const FOOD_RULES = {
    solid: { label: "固体", factor: 1, symbol: "●" },
    liquid: { label: "液体", factor: 0.1, symbol: "◒" },
    soft: { label: "酸奶 / 粥", factor: 0.3, symbol: "◉" },
    produce: { label: "水果 / 蔬菜", factor: 0.5, symbol: "✦" },
    nuts: { label: "坚果", factor: 3, symbol: "◆" }
  };

  const CHECKIN_PLANS = {
    five: {
      name: "幸福五日食谱",
      days: [
        { mood: "从容开始", meals: { breakfast: "茶叶蛋 1 个 + 黑咖啡 / 无糖豆浆 500ml", lunch: "半只蒸鸡或窑鸡（去皮食用）", dinner: "1 个拳头大小的白馒头" } },
        { mood: "轻盈海鲜日", meals: { breakfast: "茶叶蛋 1 个 + 鲜牛奶 500ml", lunch: "鲜虾云吞 10 个", dinner: "白灼虾仁 10 只，可配醋或干碟" } },
        { mood: "清爽蔬食日", meals: { breakfast: "1 份蒸蛋 + 黑咖啡", lunch: "鸡蛋生菜肠粉", dinner: "凉拌菠菜豆腐" } },
        { mood: "外食也简单", meals: { breakfast: "鸡蛋 1 个 + 香蕉 1 根", lunch: "便利店关东煮：优先选蔬菜、海带、菌菇", dinner: "板烧鸡腿堡" } },
        { mood: "稳稳收尾", meals: { breakfast: "黑咖啡 + 椰子水", lunch: "馒头 1 个 + 鸡蛋 1 个", dinner: "手枪腿 1 个 + 西兰花 + 一拳头米饭" } }
      ]
    },
    seven: {
      name: "七日高蛋白食谱",
      days: [
        { mood: "蛋白质开场", meals: { breakfast: "鸡蛋 2 个 + 原味坚果 10 颗 + 黑咖啡", lunch: "半只蒸鸡或窑鸡（去皮），也可选烤鸡腿 2 个", dinner: "水煮虾 15 只" } },
        { mood: "外食选择日", meals: { breakfast: "松露香菌菇牛肉恰巴塔三明治 + 黑咖啡", lunch: "烫捞 / 火锅：主食选魔芋丝，肉类约 150g，蔬菜不限量", dinner: "无糖酸奶 150g + 香蕉 1 根" } },
        { mood: "一份分两餐", meals: { breakfast: "鸡蛋 2 个 + 原味坚果 10 颗 + 无糖绿茶", lunch: "老乡鸡：1 肉 + 1 菜 + 1 主食，先吃一半", dinner: "把午餐剩余的一半吃完" } },
        { mood: "满足感也重要", meals: { breakfast: "鸡肉帕尼尼 + 热美式 + 原味坚果 10 颗", lunch: "跷脚牛肉（小锅）+ 1 份蔬菜", dinner: "三文鱼 150g，生熟均可" } },
        { mood: "自在搭配日", meals: { breakfast: "蒸红薯 / 紫薯 150g + 无糖豆浆 + 原味坚果", lunch: "赛百味三明治（400 kcal 内）", dinner: "水油焖菜或清汤麻辣烫" } },
        { mood: "分餐更轻松", meals: { breakfast: "蒸玉米半根 + 原味坚果 10 颗", lunch: "老乡鸡：1 肉 + 1 菜 + 1 主食，先吃一半", dinner: "把午餐剩余的一半吃完" } },
        { mood: "弹性放松日", meals: { breakfast: "自由选择，吃到七分饱", lunch: "自由选择，吃到七分饱", dinner: "自由选择，吃到七分饱" } }
      ]
    }
  };

  const LOOP_DAYS = [
    {
      name: "蛋白质日", subtitle: "轻断食 · 收拢", description: "用清晰、简单的选择开启本轮。",
      meals: {
        breakfast: { title: "1 个鸡蛋 + 饮品", note: "不饿可以跳过" },
        meal1: { title: "2 个鸡蛋", note: "水煮、蒸或少油烹调均可" },
        meal2: { title: "10–12 个水煮虾", note: "可蘸喜欢的调料" }
      }
    },
    {
      name: "健康饮食日", subtitle: "均衡 · 过渡", description: "一顿满足，一顿简单，稳稳接住节奏。",
      meals: {
        breakfast: { title: "1 个鸡蛋 + 无糖饮品", note: "不饿可以跳过" },
        meal1: { title: "三明治或汉堡", note: "单点，不买套餐" },
        meal2: { title: "蒸玉米或蒸南瓜", note: "选一种，简单收口" }
      }
    },
    {
      name: "类健康饮食日", subtitle: "丰富 · 满足", description: "肉、菜、碳水都到位，吃一顿完整的。",
      meals: {
        breakfast: { title: "1 个鸡蛋 + 咖啡 / 茶", note: "不饿可以跳过" },
        meal1: { title: "肉 + 菜 + 碳水的完整餐", note: "轻食碗、黄焖鸡、拌饭等均可" },
        meal2: { title: "1 根蒸玉米", note: "简单结束本轮最后一餐" }
      }
    }
  ];

  const DINNER_RULES = [
    { id: "protein", match: (value) => value < 0, title: "吃高蛋白", detail: "蛋、鱼虾、瘦肉或豆制品任选一类，配蔬菜即可。", icon: "蛋", safety: "" },
    { id: "normal", match: (value) => value < 0.6, title: "吃正常晚饭", detail: "按平时的正常份量吃，不需要额外补偿。", icon: "饭", safety: "" },
    { id: "light", match: (value) => value < 1, title: "少吃 / 轻量晚餐", detail: "优先蛋白质和蔬菜，减少主食、油盐和零食。", icon: "轻", safety: "如已明显饥饿或不舒服，不要硬扛，少量进食更安全。" },
    { id: "skip", match: (value) => value < 2, title: "按规则减少晚饭", detail: "这是你设定的查表规则；身体不适时改为少量高蛋白。", icon: "停", safety: "出现头晕、心慌、低血糖或明显不适时，应及时进食。" },
    { id: "cardio", match: () => true, title: "减少晚饭并量力活动", detail: "仅在身体状态允许时轻松活动，不追求高强度。", icon: "动", safety: "不建议空腹进行高强度运动；身体不适时停止并及时进食。" }
  ];

  const today = localDateKey();
  let checkinState = loadCheckinState();
  let loopState = loadLoopState();
  let weightState = loadWeightState();
  let selectedType = "solid";
  let typeWasManual = false;
  let toastTimer;

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function readJSON(key, fallback) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  }

  function round1(value) { return Math.round((Number(value) + Number.EPSILON) * 10) / 10; }
  function formatNumber(value) { const rounded = round1(value); return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1); }
  function escapeHTML(value) { return String(value).replace(/[&<>'"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#039;", "\"": "&quot;" })[character]); }
  function parseDate(value) { return new Date(`${value}T12:00:00`); }
  function dayDiff(start, end) { return Math.round((parseDate(end) - parseDate(start)) / 86400000); }

  function loadCheckinState() {
    const fallback = { version: 1, settings: { activePlan: "five", startDate: today }, records: {} };
    const saved = readJSON(KEYS.checkin, null);
    if (!saved || typeof saved !== "object") return fallback;
    const settings = { ...fallback.settings, ...(saved.settings || {}) };
    if (!CHECKIN_PLANS[settings.activePlan]) settings.activePlan = "five";
    return { ...fallback, ...saved, settings, records: saved.records && typeof saved.records === "object" ? saved.records : {} };
  }

  function loadLoopState() {
    const fallback = { currentDay: 0, completedRounds: 0, eatingStart: "12:00", checks: {} };
    const saved = readJSON(KEYS.loop, null);
    if (!saved || typeof saved !== "object") return fallback;
    return { ...fallback, ...saved, currentDay: Math.max(0, Math.min(2, Number(saved.currentDay) || 0)), checks: saved.checks && typeof saved.checks === "object" ? saved.checks : {} };
  }

  function loadWeightState() {
    const saved = readJSON(KEYS.weight, null);
    const limit = Number(saved?.limit);
    const records = Array.isArray(saved?.records) ? saved.records.filter((record) => record && FOOD_RULES[record.type] && Number(record.actual) > 0 && record.date).map((record) => ({
      id: String(record.id || `${Date.now()}-${Math.random()}`), date: String(record.date), name: String(record.name || FOOD_RULES[record.type].label).slice(0, 30), type: record.type, actual: round1(record.actual), hasShell: Boolean(record.hasShell), shell: Number(record.shell) > 0 ? round1(record.shell) : null, createdAt: Number(record.createdAt) || Date.now()
    })) : [];
    return { limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, 9999) : 650, records };
  }

  function saveCheckin() { writeJSON(KEYS.checkin, checkinState); }
  function saveLoop() { writeJSON(KEYS.loop, loopState); }
  function saveWeight() { writeJSON(KEYS.weight, weightState); }

  function derivedDayIndex(planId, date = today) {
    const plan = CHECKIN_PLANS[planId] || CHECKIN_PLANS.five;
    const start = checkinState.settings.startDate || today;
    const diff = dayDiff(start, date);
    return ((diff % plan.days.length) + plan.days.length) % plan.days.length;
  }

  function todayRecord() {
    if (!checkinState.records[today]) {
      const planId = checkinState.settings.activePlan || "five";
      checkinState.records[today] = { planId, dayIndex: derivedDayIndex(planId), meals: { breakfast: false, lunch: false, dinner: false }, weightKg: null, note: "", updatedAt: new Date().toISOString() };
    }
    const record = checkinState.records[today];
    if (!CHECKIN_PLANS[record.planId]) record.planId = checkinState.settings.activePlan || "five";
    const maxDay = CHECKIN_PLANS[record.planId].days.length - 1;
    record.dayIndex = Math.max(0, Math.min(maxDay, Number(record.dayIndex) || 0));
    record.meals = { breakfast: false, lunch: false, dinner: false, ...(record.meals || {}) };
    return record;
  }

  function cycleChecks() { return Array.isArray(loopState.checks[`day-${loopState.currentDay}`]) ? loopState.checks[`day-${loopState.currentDay}`] : []; }
  function cycleDone(id) { return cycleChecks().includes(id); }
  function setCycleDone(id, done) {
    const values = cycleChecks().filter((item) => item !== id);
    if (done) values.push(id);
    loopState.checks[`day-${loopState.currentDay}`] = values;
    saveLoop();
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function renderPlanSelectors(record) {
    const planSelect = document.querySelector("#planSelect");
    const daySelect = document.querySelector("#planDaySelect");
    planSelect.innerHTML = Object.entries(CHECKIN_PLANS).map(([id, plan]) => `<option value="${id}">${plan.name}</option>`).join("");
    planSelect.value = record.planId;
    const plan = CHECKIN_PLANS[record.planId];
    daySelect.innerHTML = plan.days.map((day, index) => `<option value="${index}">Day ${index + 1} · ${day.mood}</option>`).join("");
    daySelect.value = String(record.dayIndex);
  }

  function renderFlow() {
    const record = todayRecord();
    const plan = CHECKIN_PLANS[record.planId];
    const planDay = plan.days[record.dayIndex];
    const cycle = LOOP_DAYS[loopState.currentDay];
    const cycleMap = { breakfast: "breakfast", lunch: "meal1", dinner: "meal2" };
    const mealMeta = { breakfast: ["早餐", "☀", "早餐"], lunch: ["午餐", "◐", "午餐"], dinner: ["晚餐", "☾", "晚餐"] };
    const planDone = Object.values(record.meals).filter(Boolean).length;
    const cycleDoneCount = ["meal1", "meal2"].filter((id) => cycleDone(id)).length;

    renderPlanSelectors(record);
    document.querySelector("#cycleDayPill").textContent = `DAY ${loopState.currentDay + 1}`;
    document.querySelector("#cycleRound").textContent = `第 ${Math.max(0, Number(loopState.completedRounds) || 0) + 1} 轮`;
    document.querySelector("#cycleSubtitle").textContent = cycle.subtitle;
    document.querySelector("#cycleTitle").textContent = cycle.name;
    document.querySelector("#cycleDescription").textContent = cycle.description;
    document.querySelector("#planProgress").textContent = `${planDone} / 3`;
    document.querySelector("#cycleProgress").textContent = `${cycleDoneCount} / 2`;

    document.querySelector("#mealFlow").innerHTML = Object.entries(mealMeta).map(([key, meta]) => {
      const cycleId = cycleMap[key];
      const cycleMeal = cycle.meals[cycleId];
      const planText = escapeHTML(planDay.meals[key]);
      const cycleText = escapeHTML(`${cycleMeal.title} · ${cycleMeal.note}`);
      const planIsDone = Boolean(record.meals[key]);
      const cycleIsDone = cycleDone(cycleId);
      return `<article class="meal-row"><div class="meal-row-icon" aria-hidden="true">${meta[1]}</div><div class="meal-row-copy"><div class="meal-row-title"><h3>${meta[0]}</h3><span>餐单 + 循环</span></div><p class="meal-plan-text">${planText}</p><p class="meal-cycle-text">循环：${cycleText}</p></div><div class="meal-checks"><button class="check-toggle plan-toggle ${planIsDone ? "done" : ""}" type="button" data-plan-meal="${key}" aria-label="${meta[0]}餐单打卡" aria-pressed="${planIsDone}"><i aria-hidden="true">✓</i><span>餐单</span></button><button class="check-toggle cycle-toggle ${cycleIsDone ? "done" : ""}" type="button" data-cycle-meal="${cycleId}" aria-label="${meta[0]}循环打卡" aria-pressed="${cycleIsDone}"><i aria-hidden="true">✓</i><span>循环</span></button></div></article>`;
    }).join("");

    const complete = cycleDoneCount === 2;
    const completeButton = document.querySelector("#completeCycleDay");
    completeButton.disabled = !complete;
    completeButton.textContent = loopState.currentDay === 2 ? "完成 Day 3，开始下一轮" : "完成今天，进入下一日";
    document.querySelector("#cycleHint").textContent = complete ? "两顿循环正餐已完成，可以进入下一日。" : "完成循环的两顿正餐后，进入下一日。";
    document.querySelector("#dailyNote").value = record.note || "";
  }

  function renderBodyWeight() {
    const record = todayRecord();
    const input = document.querySelector("#bodyWeight");
    input.value = Number(record.weightKg) > 0 ? formatNumber(Number(record.weightKg) * 2) : "";
    const previous = Object.entries(checkinState.records).filter(([date, item]) => date < today && Number(item.weightKg) > 0).sort(([a], [b]) => b.localeCompare(a))[0];
    const status = document.querySelector("#bodyWeightStatus");
    if (!record.weightKg) status.textContent = "连续记录后看变化";
    else if (!previous) status.textContent = "已保存 · 这是第一条记录";
    else {
      const delta = (Number(record.weightKg) - Number(previous[1].weightKg)) * 2;
      status.textContent = `已保存 · 较上次 ${delta === 0 ? "持平" : `${delta > 0 ? "+" : ""}${delta.toFixed(1)} 斤`}`;
    }
  }

  function classifyFood(name) {
    const value = String(name || "").toLowerCase();
    const matches = (words) => words.some((word) => value.includes(word));
    if (matches(["酸奶", "粥", "豆腐脑", "奶昔"])) return "soft";
    if (matches(["水", "牛奶", "豆浆", "咖啡", "奶茶", "茶", "果汁", "汤", "饮料", "椰子水", "柠檬水"])) return "liquid";
    if (matches(["坚果", "杏仁", "核桃", "腰果", "花生", "瓜子", "巴旦木"])) return "nuts";
    if (matches(["水果", "蔬菜", "香蕉", "苹果", "橙", "梨", "西瓜", "番茄", "黄瓜", "菠菜", "生菜", "西兰花", "玉米", "南瓜", "红薯", "紫薯"])) return "produce";
    return "solid";
  }

  function todayFoodRecords() { return weightState.records.filter((record) => record.date === today).sort((a, b) => b.createdAt - a.createdAt); }
  function netFoodWeight(record) { return round1(Math.max(0, Number(record.actual) - (record.hasShell && Number(record.shell) > 0 ? Number(record.shell) : 0))); }
  function effectiveFoodWeight(record) { return round1(netFoodWeight(record) * (FOOD_RULES[record.type]?.factor || 1)); }

  function updateFoodPreview() {
    const name = document.querySelector("#foodName").value.trim();
    if (!typeWasManual) selectedType = name ? classifyFood(name) : "solid";
    document.querySelectorAll(".type-option").forEach((button) => button.classList.toggle("selected", button.dataset.type === selectedType));
    const rule = FOOD_RULES[selectedType];
    const actual = Number(document.querySelector("#foodWeight").value) || 0;
    const effective = actual * rule.factor;
    document.querySelector("#foodDetection").textContent = name ? `自动判断：${rule.label} · 按 ${rule.factor === 1 ? "100" : rule.factor * 100}% 计入${typeWasManual ? "（已手动修正）" : ""}` : "将按名称自动判断类型";
    document.querySelector("#foodPreviewLabel").textContent = actual > 0 ? `${rule.label} · 本次计入` : "本次计入";
    document.querySelector("#foodPreview").textContent = `${formatNumber(effective)} 克`;
  }

  function renderFood() {
    const records = todayFoodRecords();
    const effective = records.reduce((sum, record) => sum + effectiveFoodWeight(record), 0);
    const actual = records.reduce((sum, record) => sum + netFoodWeight(record), 0);
    document.querySelector("#foodTotal").textContent = `${formatNumber(effective)} / ${formatNumber(weightState.limit)}g`;
    document.querySelector("#foodRecords").innerHTML = records.length ? records.slice(0, 6).map((record) => {
      const rule = FOOD_RULES[record.type];
      return `<div class="food-record"><span>${rule.symbol} ${escapeHTML(record.name || rule.label)}</span><small>${formatNumber(netFoodWeight(record))}g · ${rule.label}</small><strong>计入 ${formatNumber(effectiveFoodWeight(record))}g</strong></div>`;
    }).join("") : `<div class="food-record"><span>今天还没有食物重量</span><small>净重合计 0g</small><strong>还可以 ${formatNumber(weightState.limit)}g</strong></div>`;
    document.querySelector("#foodRecords").dataset.actual = String(actual);
  }

  function dinnerRule(value) { return DINNER_RULES.find((rule) => rule.match(value)) || DINNER_RULES[1]; }
  function parseInput(id) { const value = document.querySelector(id).value.trim(); return value === "" ? null : Number(value); }
  function validateDinner(morning, evening, clothing) {
    if (morning !== null && (!Number.isFinite(morning) || morning < 40 || morning > 600)) return "早体重请输入 40–600 斤之间的数字。";
    if (evening !== null && (!Number.isFinite(evening) || evening < 40 || evening > 600)) return "晚间秤重请输入 40–600 斤之间的数字。";
    if (clothing !== null && (!Number.isFinite(clothing) || clothing < 0 || clothing > 20)) return "衣服重量请输入 0–20 斤之间的数字。";
    if (morning !== null && evening !== null && clothing !== null && Math.abs(evening - clothing - morning) > 20) return "扣除衣服后的差值超过 20 斤，请检查是否输错。";
    return "";
  }

  function saveDinnerDraft() { writeJSON(KEYS.dinnerDraft, { date: today, morning: document.querySelector("#morningWeight").value, evening: document.querySelector("#eveningWeight").value, clothing: document.querySelector("#clothingWeight").value }); }

  function renderDinner() {
    const morning = parseInput("#morningWeight");
    const evening = parseInput("#eveningWeight");
    const clothing = parseInput("#clothingWeight");
    const error = validateDinner(morning, evening, clothing);
    document.querySelector("#dinnerError").textContent = error;
    const complete = morning !== null && evening !== null && clothing !== null && !error;
    document.querySelector("#dinnerEmpty").hidden = complete;
    document.querySelector("#dinnerContent").hidden = !complete;
    document.querySelector("#dinnerResult").classList.toggle("has-result", complete);
    document.querySelector("#saveDinner").disabled = !complete;
    if (!complete) return;
    const difference = round1(evening - clothing - morning);
    const rule = dinnerRule(difference);
    document.querySelector("#dinnerDifference").textContent = `${difference > 0 ? "+" : ""}${difference.toFixed(1)} 斤`;
    document.querySelector("#dinnerIcon").textContent = rule.icon;
    document.querySelector("#dinnerRecommendation").textContent = rule.title;
    document.querySelector("#dinnerDetail").textContent = rule.detail;
    document.querySelector("#dinnerSafety").textContent = rule.safety;
    document.querySelector("#dinnerSafety").hidden = !rule.safety;
  }

  function loadDinnerInputs() {
    const draft = readJSON(KEYS.dinnerDraft, null);
    const records = readJSON(KEYS.dinner, []);
    const record = Array.isArray(records) ? records.find((item) => item.date === today) : null;
    const source = draft?.date === today ? draft : record;
    if (!source) return;
    document.querySelector("#morningWeight").value = source.morning ?? "";
    document.querySelector("#eveningWeight").value = source.evening ?? "";
    document.querySelector("#clothingWeight").value = source.clothing ?? "";
  }

  function saveDinnerRecord() {
    const morning = parseInput("#morningWeight");
    const evening = parseInput("#eveningWeight");
    const clothing = parseInput("#clothingWeight");
    const error = validateDinner(morning, evening, clothing);
    if (error || morning === null || evening === null || clothing === null) return;
    const difference = round1(evening - clothing - morning);
    const rule = dinnerRule(difference);
    const current = readJSON(KEYS.dinner, []);
    const records = (Array.isArray(current) ? current : []).filter((item) => item.date !== today);
    records.unshift({ date: today, morning: round1(morning), evening: round1(evening), clothing: round1(clothing), difference, ruleId: rule.id, recommendation: rule.title, updatedAt: new Date().toISOString() });
    writeJSON(KEYS.dinner, records);
    document.querySelector("#dinnerSaved").textContent = "已保存，只在这台设备里。";
    showToast("今天的晚饭判断已保存");
  }

  function exportAllData() {
    const data = { app: "light-weight-companion", version: 2, exportedAt: new Date().toISOString(), storage: Object.fromEntries(Object.values(KEYS).map((key) => [key, localStorage.getItem(key)])) };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `轻盈生活_全部数据_${today}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    document.querySelector("#dataMessage").textContent = "已导出餐单、循环、称重、晚饭秤四组本机数据。";
    showToast("全部数据已导出");
  }

  async function importAllData(event) {
    const [file] = event.target.files || [];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data?.app !== "light-weight-companion" || !data.storage || typeof data.storage !== "object") throw new Error("invalid");
      let restored = 0;
      Object.values(KEYS).forEach((key) => {
        if (!(key in data.storage)) return;
        const raw = data.storage[key];
        if (raw === null) localStorage.removeItem(key);
        else { JSON.parse(raw); localStorage.setItem(key, raw); }
        restored += 1;
      });
      checkinState = loadCheckinState();
      loopState = loadLoopState();
      weightState = loadWeightState();
      loadDinnerInputs();
      renderAll();
      document.querySelector("#dataMessage").textContent = `已恢复 ${restored} 组数据。`;
      showToast("备份已恢复");
    } catch {
      document.querySelector("#dataMessage").textContent = "无法恢复：请选择由本应用导出的 JSON 备份。";
      showToast("备份文件不正确");
    } finally { event.target.value = ""; }
  }

  function completeCycleDay() {
    if (!["meal1", "meal2"].every((id) => cycleDone(id))) return;
    if (loopState.currentDay < 2) {
      loopState.currentDay += 1;
      saveLoop();
      renderFlow();
      showToast(`今天完成，进入 DAY ${loopState.currentDay + 1}`);
    } else {
      loopState.currentDay = 0;
      loopState.completedRounds = (Number(loopState.completedRounds) || 0) + 1;
      loopState.checks = {};
      saveLoop();
      renderFlow();
      showToast(`第 ${loopState.completedRounds} 轮完成，重新开始 DAY 1`);
    }
  }

  function renderAll() {
    renderFlow();
    renderBodyWeight();
    renderFood();
    updateFoodPreview();
    renderDinner();
  }

  function setGreeting() {
    const hour = new Date().getHours();
    document.querySelector("#greeting").textContent = hour < 11 ? "早上好 · 今日执行台" : hour < 18 ? "下午好 · 稳稳完成就很好" : "晚上好 · 辛苦了一天";
    document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(new Date());
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (!refreshing) { refreshing = true; window.location.reload(); } });
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {}));
  }

  document.querySelector("#installOpen").addEventListener("click", () => document.querySelector("#installDialog").showModal());
  document.querySelector("#planSelect").addEventListener("change", (event) => {
    const record = todayRecord();
    record.planId = event.target.value;
    record.dayIndex = Math.min(record.dayIndex, CHECKIN_PLANS[record.planId].days.length - 1);
    checkinState.settings.activePlan = record.planId;
    saveCheckin();
    renderFlow();
  });
  document.querySelector("#planDaySelect").addEventListener("change", (event) => { todayRecord().dayIndex = Number(event.target.value) || 0; saveCheckin(); renderFlow(); });
  document.querySelector("#mealFlow").addEventListener("click", (event) => {
    const planButton = event.target.closest("[data-plan-meal]");
    const cycleButton = event.target.closest("[data-cycle-meal]");
    if (planButton) { const record = todayRecord(); const key = planButton.dataset.planMeal; record.meals[key] = !record.meals[key]; record.updatedAt = new Date().toISOString(); saveCheckin(); renderFlow(); }
    if (cycleButton) { const id = cycleButton.dataset.cycleMeal; setCycleDone(id, !cycleDone(id)); renderFlow(); }
  });
  document.querySelector("#completeCycleDay").addEventListener("click", completeCycleDay);
  document.querySelector("#saveNote").addEventListener("click", () => { todayRecord().note = document.querySelector("#dailyNote").value.trim(); saveCheckin(); showToast("备注已保存"); });
  document.querySelector("#saveBodyWeight").addEventListener("click", () => { const value = Number(document.querySelector("#bodyWeight").value); if (!Number.isFinite(value) || value < 40 || value > 600) { showToast("请输入 40–600 斤之间的体重"); return; } todayRecord().weightKg = round1(value / 2); saveCheckin(); renderBodyWeight(); showToast("体重已保存"); });
  document.querySelector("#foodName").addEventListener("input", () => { typeWasManual = false; updateFoodPreview(); });
  document.querySelector("#foodWeight").addEventListener("input", updateFoodPreview);
  document.querySelector("#typeGrid").addEventListener("click", (event) => { const button = event.target.closest("[data-type]"); if (!button) return; typeWasManual = true; selectedType = button.dataset.type; updateFoodPreview(); });
  document.querySelector("#foodForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.querySelector("#foodName").value.trim();
    const actual = Number(document.querySelector("#foodWeight").value);
    if (!name) { showToast("先输入食物名称"); document.querySelector("#foodName").focus(); return; }
    if (!Number.isFinite(actual) || actual <= 0 || actual > 9999) { showToast("请输入 1–9999 克的重量"); document.querySelector("#foodWeight").focus(); return; }
    weightState.records.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, date: today, name, type: selectedType, actual: round1(actual), hasShell: false, shell: null, createdAt: Date.now() });
    saveWeight();
    document.querySelector("#foodName").value = "";
    document.querySelector("#foodWeight").value = "";
    typeWasManual = false;
    renderFood();
    updateFoodPreview();
    showToast("食物重量已记下");
  });
  ["#morningWeight", "#eveningWeight", "#clothingWeight"].forEach((selector) => document.querySelector(selector).addEventListener("input", () => { saveDinnerDraft(); renderDinner(); }));
  document.querySelector("#saveDinner").addEventListener("click", saveDinnerRecord);
  document.querySelector("#exportAll").addEventListener("click", exportAllData);
  document.querySelector("#importAll").addEventListener("change", importAllData);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) { checkinState = loadCheckinState(); loopState = loadLoopState(); weightState = loadWeightState(); renderAll(); } });

  loadDinnerInputs();
  setGreeting();
  renderAll();
  registerServiceWorker();
})();
