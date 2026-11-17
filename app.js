const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 48);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Fechar menu');
  nav.classList.toggle('open', !expanded);
});
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    nav.classList.remove('open');
    menuButton.focus();
  }
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const heroArt = document.querySelector('.hero-art');
let scrollTicking = false;
if (!reducedMotion.matches && window.matchMedia('(min-width: 681px)').matches) {
  window.addEventListener('scroll', () => {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(() => {
      const progress = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1);
      heroArt.style.transform = `scale(${1.04 + progress * 0.025}) translateY(${progress * 1.3}%)`;
      scrollTicking = false;
    });
  }, { passive: true });
}

const properties = {
  horizonte: {
    title: 'Casa Horizonte', type: 'CASA · LITORAL', price: 'R$ 8,9 milhões', art: 'art--house',
    image: '/public/images/ambiente.jpg',
    description: 'Uma residência de linhas abertas, pátio protegido e materiais naturais, imaginada para acompanhar o ritmo da costa.',
    features: ['Integração entre sala, jardim e piscina', 'Madeira, pedra clara e grandes planos de vidro', 'Ambientes voltados para a paisagem']
  },
  atlantica: {
    title: 'Villa Atlântica', type: 'VILLA · COSTA', price: 'R$ 12,4 milhões', art: 'art--villa',
    image: '/public/images/hero.jpg',
    description: 'Um refúgio de volumes generosos, vegetação tropical e espaços pensados para receber com leveza.',
    features: ['Jardim tropical e piscina de borda longa', 'Áreas sociais abertas para o exterior', 'Paleta de tons minerais e madeira']
  },
  aurora: {
    title: 'Penthouse Aurora', type: 'PENTHOUSE · CIDADE', price: 'R$ 6,7 milhões', art: 'art--penthouse',
    image: '/public/images/destaque-02.jpg',
    description: 'Uma cobertura urbana com terraço privativo e janelas amplas que enquadram a cidade ao longo do dia.',
    features: ['Terraço com áreas de estar', 'Vista panorâmica para o horizonte urbano', 'Materiais de tons quentes e desenho essencial']
  }
};
const dialog = document.querySelector('#property-dialog');
const dialogArt = document.querySelector('#dialog-art');
let lastDialogTrigger = null;
function openProperty(key, trigger) {
  const property = properties[key];
  if (!property) return;
  lastDialogTrigger = trigger;
  document.querySelector('#dialog-title').textContent = property.title;
  document.querySelector('#dialog-type').textContent = property.type;
  document.querySelector('#dialog-price').textContent = property.price;
  document.querySelector('#dialog-description').textContent = property.description;
  const list = document.querySelector('#dialog-features');
  list.replaceChildren(...property.features.map((feature) => {
    const item = document.createElement('li');
    item.textContent = feature;
    return item;
  }));
  dialogArt.className = `dialog-art art ${property.art} photo-art`;
  const photo = document.createElement('img');
  photo.src = property.image;
  photo.alt = '';
  photo.width = 1536;
  photo.height = 1024;
  photo.decoding = 'async';
  dialogArt.replaceChildren(photo);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
document.querySelectorAll('[data-property]').forEach((trigger) => trigger.addEventListener('click', () => openProperty(trigger.dataset.property, trigger)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) dialog.close();
});
dialog.addEventListener('close', () => {
  document.body.classList.remove('dialog-open');
  if (lastDialogTrigger?.isConnected) lastDialogTrigger.focus();
});
document.querySelector('#dialog-interest').addEventListener('click', () => {
  const title = document.querySelector('#dialog-title').textContent;
  dialog.close();
  document.querySelector('#interest').value = title;
  document.querySelector('#contato').scrollIntoView({ behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  window.setTimeout(() => document.querySelector('#name').focus({ preventScroll: true }), reducedMotion.matches ? 0 : 450);
});

const typeFilter = document.querySelector('#type-filter');
const priceFilter = document.querySelector('#price-filter');
const propertyCards = [...document.querySelectorAll('.property-card')];
function filterProperties() {
  const type = typeFilter.value;
  const maxPrice = priceFilter.value === 'todos' ? Infinity : Number(priceFilter.value);
  let visible = 0;
  propertyCards.forEach((card) => {
    const matches = (type === 'todos' || card.dataset.type === type) && Number(card.dataset.price) <= maxPrice;
    card.hidden = !matches;
    if (matches) visible += 1;
  });
  document.querySelector('#filter-count').textContent = `${visible} ${visible === 1 ? 'imóvel' : 'imóveis'}`;
}
typeFilter.addEventListener('change', filterProperties);
priceFilter.addEventListener('change', filterProperties);
document.querySelector('#filters').addEventListener('reset', () => window.setTimeout(filterProperties, 0));

document.querySelector('#interest-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('#form-status');
  status.textContent = 'Nada foi enviado. Seus dados continuam nesta página para você copiar.';
});
