(function(){
  var root = document.documentElement;
  var themeBtn = document.getElementById("theme-toggle");
  function isDark(){
    var set = root.getAttribute("data-theme");
    if (set === "dark") return true;
    if (set === "light") return false;
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function syncTheme(){ themeBtn.setAttribute("aria-pressed", isDark() ? "true" : "false"); }
  themeBtn.addEventListener("click", function(){
    var next = isDark() ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("firstring-theme", next); } catch (e) {}
    syncTheme();
  });
  syncTheme();

  var enBtn = document.getElementById("lang-en");
  var esBtn = document.getElementById("lang-es");
  var en = document.getElementById("copy-en");
  var es = document.getElementById("copy-es");
  function apply(lang){
    var spanish = lang === "es";
    root.lang = spanish ? "es" : "en";
    en.hidden = spanish;
    es.hidden = !spanish;
    enBtn.setAttribute("aria-pressed", spanish ? "false" : "true");
    esBtn.setAttribute("aria-pressed", spanish ? "true" : "false");
    var title = document.body.getAttribute(spanish ? "data-title-es" : "data-title-en");
    if (title) document.title = title;
    document.querySelectorAll("[data-en]").forEach(function(el){
      el.textContent = el.getAttribute(spanish ? "data-es" : "data-en");
    });
    try { localStorage.setItem("firstring-lang", spanish ? "es" : "en"); } catch (e) {}
  }
  enBtn.addEventListener("click", function(){ apply("en"); });
  esBtn.addEventListener("click", function(){ apply("es"); });
  var params = new URLSearchParams(location.search);
  var start = params.get("lang");
  if (start !== "en" && start !== "es") {
    try { start = localStorage.getItem("firstring-lang"); } catch (e) { start = "en"; }
  }
  if (start === "es") apply("es");
})();
