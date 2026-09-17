(function () {
  var section = document.querySelector('[data-contact-section]');
  if (!section) return;

  var chips = Array.prototype.slice.call(section.querySelectorAll('[data-store]'));
  var maps = Array.prototype.slice.call(section.querySelectorAll('[data-store-map]'));
  var cards = Array.prototype.slice.call(section.querySelectorAll('[data-store-card]'));

  function showStore(id) {
    chips.forEach(function (chip) {
      var active = chip.getAttribute('data-store') === id;
      chip.classList.toggle('is-active', active);
      chip.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    maps.forEach(function (map) {
      map.classList.toggle('is-active', map.getAttribute('data-store-map') === id);
    });
    cards.forEach(function (card) {
      card.classList.toggle('is-active', card.getAttribute('data-store-card') === id);
    });
  }

  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      showStore(chip.getAttribute('data-store'));
    });
  });

  var form = section.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    var required = Array.prototype.slice.call(form.querySelectorAll('[required]'));
    var invalid = required.filter(function (field) {
      return !field.checkValidity();
    });

    required.forEach(function (field) {
      field.setAttribute('aria-invalid', field.checkValidity() ? 'false' : 'true');
    });

    if (invalid.length) {
      e.preventDefault();
      invalid[0].focus();
    }
  });
})();
