// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Daily visit counter (free public counter service).
// Remove this block and the <p class="visit-count"> line in each page if you'd rather not use it.
(function () {
  var el = document.getElementById('visit-count');
  if (!el) return;
  var ns = 'jihyun-lee-site';
  var todayKey = 'daily-' + new Date().toISOString().slice(0, 10);
  fetch('https://abacus.jasoncameron.dev/hit/' + ns + '/' + todayKey)
    .then(function (r) { return r.json(); })
    .then(function (data) { el.textContent = data.value; })
    .catch(function () { el.textContent = '—'; });
  // Lifetime total is tracked silently; check it at:
  // https://abacus.jasoncameron.dev/get/jihyun-lee-site/personal-website
  fetch('https://abacus.jasoncameron.dev/hit/' + ns + '/personal-website').catch(function () {});
})();
