/* Help & legal pages: wire WhatsApp help links. */
(function () {
  var UI = window.UI;
  document.querySelectorAll("[data-wa-help]").forEach(function (a) {
    a.href = UI.waUrl(UI.WA.help(true));
    a.insertAdjacentHTML("afterbegin", UI.waGlyph());
  });
})();
