(() => {
  "use strict";
  const moduleName = location.pathname.includes("/checkin/") ? "餐单打卡"
    : location.pathname.includes("/weight-log/") ? "饮食称重"
      : location.pathname.includes("/dinner/") ? "晚饭秤" : "三日循环";
  const bar = document.createElement("nav");
  bar.className = "companion-bar";
  bar.setAttribute("aria-label", "轻盈生活导航");
  bar.innerHTML = `<a class="companion-home" href="../../"><b aria-hidden="true">‹</b><span>轻盈生活首页</span></a><span class="companion-module-chip">${moduleName}</span>`;
  document.body.prepend(bar);

  if ("serviceWorker" in navigator) {
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (refreshing) return;
      refreshing = true;
      window.location.reload();
    });
    window.addEventListener("load", () => navigator.serviceWorker.register("../../sw.js", { scope: "../../" }).catch(() => {}));
  }
})();
