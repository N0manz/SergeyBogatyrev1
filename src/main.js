
const dlg = document.getElementById('contactDialog');
const openBtn = document.getElementById('openDialog');
const closeBtn = document.getElementById('closeDialog');
const form = document.getElementById('contactForm');
const successNotice = document.getElementById('successNotice');
let lastActive = null;

openBtn?.addEventListener('click', () => {
  lastActive = document.activeElement;
  dlg.showModal();
  dlg.querySelector('input,select,textarea,button')?.focus();
});

// Закрыть модалку
closeBtn?.addEventListener('click', () => dlg.close('cancel'));

dlg.addEventListener('close', () => { lastActive?.focus(); });

// Маска на телефон
const phone = document.getElementById('phone');
phone?.addEventListener('input', () => {
  const digits = phone.value.replace(/\D/g,'').slice(0,11);
  const d = digits.replace(/^8/, '7');
  const parts = [];
  if (d.length > 0) parts.push('+7');
  if (d.length > 1) parts.push(' (' + d.slice(1,4));
  if (d.length >= 4) parts[parts.length - 1] += ')';
  if (d.length >= 5) parts.push(' ' + d.slice(4,7));
  if (d.length >= 8) parts.push('-' + d.slice(7,9));
  if (d.length >= 10) parts.push('-' + d.slice(9,11));
  phone.value = parts.join('');
});

phone?.setAttribute('pattern', '^\\+7 \\(\\d{3}\\) \\d{3}-\\d{2}-\\d{2}$');

// проверка валидности полей
form?.addEventListener('submit', (e) => {
  [...form.elements].forEach(el => el.setCustomValidity?.(''));

  if (!form.checkValidity()) {
    e.preventDefault();

    const email = form.elements.email;
    if (email?.validity.typeMismatch) {
      email.setCustomValidity('Введите корректный e-mail, например name@example.com');
    }

    const phoneEl = form.elements.phone;
    if (phoneEl?.validity.patternMismatch || phoneEl?.validity.valueMissing) {
      phoneEl.setCustomValidity('Укажите телефон в формате +7 (900) 000-00-00');
    }

    form.reportValidity();

    [...form.elements].forEach(el => {
      if (el.willValidate) el.toggleAttribute('aria-invalid', !el.checkValidity());
    });
    return;
  }

  e.preventDefault();
  successNotice.textContent = 'Спасибо! Форма успешно отправлена.';
  dlg.close('success');
  form.reset();

  setTimeout(() => {
    window.location.href = 'src/thankyou.html';
  }, 900);
});