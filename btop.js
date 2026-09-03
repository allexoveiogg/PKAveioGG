(function () {
  if (document.getElementById('btop-btn')) return;

  var style = document.createElement('style');
  style.textContent =
    '#btop-btn{position:fixed;right:24px;bottom:24px;z-index:9999;width:52px;height:52px;border:none;border-radius:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;background:linear-gradient(160deg,#2A63E0 0%,#1E2A3D 100%);color:#FFFFFF;font-size:24px;font-weight:800;font-family:\'Segoe UI\',Tahoma,Geneva,Verdana,sans-serif;box-shadow:0 6px 20px rgba(0,0,0,0.45);opacity:0;visibility:hidden;transform:translateY(20px);transition:opacity 0.3s ease,transform 0.3s ease,visibility 0.3s ease,box-shadow 0.2s ease,background 0.2s ease;}' +
    '#btop-btn.show{opacity:1;visibility:visible;transform:translateY(0);}' +
    '#btop-btn:hover{transform:translateY(-3px);box-shadow:0 10px 26px rgba(0,0,0,0.55);background:linear-gradient(160deg,#4E82F0 0%,#2A63E0 100%);}' +
    '#btop-btn:active{transform:translateY(0);}' +
    '@media (max-width:600px){#btop-btn{right:16px;bottom:16px;width:48px;height:48px;font-size:22px;}}';
  document.head.appendChild(style);

  var btn = document.createElement('button');
  btn.id = 'btop-btn';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Voltar ao topo');
  btn.title = 'Voltar ao topo';
  btn.innerHTML = '&#8593;';
  document.body.appendChild(btn);

  var shown = false;
  function onScroll() {
    var y = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (y > 300 && !shown) {
      shown = true;
      btn.classList.add('show');
    } else if (y <= 300 && shown) {
      shown = false;
      btn.classList.remove('show');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  btn.addEventListener('click', function () {
    var start = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    var duration = 400;
    var startTime = null;
    function step(t) {
      if (startTime === null) startTime = t;
      var progress = Math.min((t - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - eased));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
})();
