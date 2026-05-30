/* 월급계산기(pigbrain_salary_v1)에 월급일/월급이 저장돼 있으면,
   다른 화면(게임 등) 구석에 "오늘 번 돈"을 실시간 표시한다. 클릭은 방해하지 않음. */
(function () {
  var KEY = "pigbrain_salary_v1";
  var cfg;
  try { cfg = JSON.parse(localStorage.getItem(KEY)); } catch (e) { return; }
  if (!cfg || !(cfg.payDay >= 1 && cfg.payDay <= 31) || !(cfg.salary > 0)) return;

  function paydayInMonth(y, m, p) {
    var last = new Date(y, m + 1, 0).getDate();
    return new Date(y, m, Math.min(p, last), 0, 0, 0, 0);
  }
  function todayEarned() {
    var now = new Date();
    var thisMonth = paydayInMonth(now.getFullYear(), now.getMonth(), cfg.payDay);
    var lastP, nextP;
    if (thisMonth.getTime() > now.getTime()) {
      lastP = paydayInMonth(now.getFullYear(), now.getMonth() - 1, cfg.payDay);
      nextP = thisMonth;
    } else {
      lastP = thisMonth;
      nextP = paydayInMonth(now.getFullYear(), now.getMonth() + 1, cfg.payDay);
    }
    var ratePerMs = cfg.salary / (nextP.getTime() - lastP.getTime());
    var midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    var start = Math.max(midnight.getTime(), lastP.getTime());
    return ratePerMs * (now.getTime() - start);
  }
  function fmt(n) { return Math.floor(n).toLocaleString("ko-KR"); }

  var el = document.createElement("div");
  el.id = "pb-earn-badge";
  el.style.cssText =
    "position:fixed;left:12px;bottom:12px;z-index:9998;" +
    "background:rgba(31,158,99,0.95);color:#fff;" +
    "font-family:-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;" +
    "font-size:13px;font-weight:700;padding:8px 13px;border-radius:999px;" +
    "box-shadow:0 4px 14px rgba(0,0,0,0.22);pointer-events:none;line-height:1.2;white-space:nowrap;";

  function render() {
    el.innerHTML = "💰 오늘 번 돈 <b style='font-size:14px'>₩" + fmt(todayEarned()) + "</b>";
  }
  function init() {
    render();
    document.body.appendChild(el);
    setInterval(render, 2000);
  }
  if (document.body) init();
  else document.addEventListener("DOMContentLoaded", init);
})();
