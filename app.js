(() => {
  "use strict";

  const KEYS = {
    checkin: "meal-plan-weight-checkin.v1",
    weight: "diet-weight-tracker-v1",
    dinner: "weightDinnerGuide.v2.jin.records",
    dinnerDraft: "weightDinnerGuide.v2.jin.todayDraft",
    loop: "swift-light-loop-v1"
  };
  const RULE_FACTORS = { solid: 1, liquid: 0.1, nuts: 3, soft: 0.3, produce: 0.5 };
  const today = localDateKey();
  let toastTimer;

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function readJSON(key, fallback = null) {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch {
      return fallback;
    }
  }

  function round1(value) {
    return Math.round((Number(value) + Number.EPSILON) * 10) / 10;
  }

  function formatNumber(value) {
    const rounded = round1(value);
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }

  function updateCheckinStatus() {
    const state = readJSON(KEYS.checkin, {});
    const record = state?.records?.[today];
    if (!record) return;
    const mealCount = Object.values(record.meals || {}).filter(Boolean).length;
    const weightText = Number(record.weightKg) > 0 ? `体重 ${formatNumber(Number(record.weightKg) * 2)} 斤` : "体重未记";
    document.querySelector("#checkinStatus").textContent = `${mealCount} / 3 餐 · ${weightText}`;
  }

  function updateWeightStatus() {
    const state = readJSON(KEYS.weight, { limit: 650, records: [] });
    const records = Array.isArray(state?.records) ? state.records.filter((record) => record?.date === today) : [];
    if (!records.length) return;
    const effective = records.reduce((sum, record) => {
      const actual = Number(record.actual) || 0;
      const shell = record.hasShell && Number(record.shell) > 0 ? Number(record.shell) : 0;
      const factor = RULE_FACTORS[record.type] || 1;
      return sum + Math.max(0, actual - shell) * factor;
    }, 0);
    const pending = records.filter((record) => record.hasShell && !(Number(record.shell) > 0)).length;
    const pendingText = pending ? ` · ${pending} 条待补壳重` : "";
    document.querySelector("#weightStatus").textContent = `${formatNumber(effective)} / ${formatNumber(Number(state.limit) || 650)}g${pendingText}`;
  }

  function updateDinnerStatus() {
    const records = readJSON(KEYS.dinner, []);
    const record = Array.isArray(records) ? records.find((item) => item?.date === today) : null;
    if (record) {
      const value = Number(record.difference) || 0;
      document.querySelector("#dinnerStatus").textContent = `${value > 0 ? "+" : ""}${value.toFixed(1)} 斤 · ${record.recommendation || "已保存"}`;
      return;
    }
    const draft = readJSON(KEYS.dinnerDraft, null);
    if (draft?.date === today && (draft.morning || draft.evening || draft.clothing)) {
      document.querySelector("#dinnerStatus").textContent = "今天已开始填写 · 待完成";
    }
  }

  function updateLoopStatus() {
    const state = readJSON(KEYS.loop, {});
    const day = Math.max(0, Math.min(2, Number(state?.currentDay) || 0));
    const checks = Array.isArray(state?.checks?.[`day-${day}`]) ? state.checks[`day-${day}`] : [];
    const required = ["meal1", "meal2"].filter((id) => checks.includes(id)).length;
    const round = Math.max(0, Number(state?.completedRounds) || 0) + 1;
    document.querySelector("#loopStatus").textContent = `第 ${round} 轮 · DAY ${day + 1} · ${required} / 2 餐`;
  }

  function refreshDashboard() {
    updateCheckinStatus();
    updateWeightStatus();
    updateDinnerStatus();
    updateLoopStatus();
  }

  function showToast(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  }

  function exportAllData() {
    const data = {
      app: "light-weight-companion",
      version: 1,
      exportedAt: new Date().toISOString(),
      storage: Object.fromEntries(Object.values(KEYS).map((key) => [key, localStorage.getItem(key)]))
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `轻盈生活_全部数据_${today}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    document.querySelector("#dataMessage").textContent = "已导出四个模块的本机数据。";
    showToast("全部数据已导出");
  }

  async function importAllData(event) {
    const [file] = event.target.files || [];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data?.app !== "light-weight-companion" || !data?.storage || typeof data.storage !== "object") {
        throw new Error("invalid");
      }
      let restored = 0;
      Object.values(KEYS).forEach((key) => {
        if (!(key in data.storage)) return;
        const raw = data.storage[key];
        if (raw === null) localStorage.removeItem(key);
        else {
          JSON.parse(raw);
          localStorage.setItem(key, raw);
        }
        restored += 1;
      });
      refreshDashboard();
      document.querySelector("#dataMessage").textContent = `已恢复 ${restored} 组数据。`;
      showToast("备份已恢复");
    } catch {
      document.querySelector("#dataMessage").textContent = "无法恢复：请选择由本应用导出的 JSON 备份。";
      showToast("备份文件不正确");
    } finally {
      event.target.value = "";
    }
  }

  function setPageText() {
    const now = new Date();
    const hour = now.getHours();
    document.querySelector("#greeting").textContent = hour < 11 ? "早上好，今天也照顾好自己" : hour < 18 ? "下午好，稳稳完成就很好" : "晚上好，辛苦了一天";
    document.querySelector("#todayLabel").textContent = new Intl.DateTimeFormat("zh-CN", { month: "long", day: "numeric", weekday: "long" }).format(now);
  }

  function registerServiceWorker() {
    if (!("serviceWorker" in navigator)) return;
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js", { scope: "./" }).catch(() => {}));
  }

  document.querySelector("#installOpen").addEventListener("click", () => document.querySelector("#installDialog").showModal());
  document.querySelector("#exportAll").addEventListener("click", exportAllData);
  document.querySelector("#importAll").addEventListener("change", importAllData);
  window.addEventListener("pageshow", refreshDashboard);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) refreshDashboard(); });

  setPageText();
  refreshDashboard();
  registerServiceWorker();
})();
