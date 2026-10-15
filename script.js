// Inicialização do AOS (Animações ao rolar a página)
AOS.init({
  duration: 800,
  once: true
});

// 1. Alternador de Tema Escuro / Claro (Dark / Light Mode)
const themeToggleBtn = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  if (currentTheme === 'dark' && themeToggleBtn) {
    themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }
  });
}

// 2. Filtro de Projetos
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hide');
      } else {
        card.classList.add('hide');
      }
    });
  });
});

// 3. Modais dos Projetos (Estudos de Caso)
const openModalBtns = document.querySelectorAll('.btn-open-modal');
const closeModalBtns = document.querySelectorAll('.close-modal');
const modals = document.querySelectorAll('.modal');

openModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.getAttribute('data-modal');
    const modalTarget = document.getElementById(modalId);
    if (modalTarget) {
      modalTarget.style.display = 'flex';
    }
  });
});

closeModalBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const parentModal = btn.closest('.modal');
    if (parentModal) {
      parentModal.style.display = 'none';
    }
  });
});

window.addEventListener('click', (e) => {
  modals.forEach(modal => {
    if (e.target === modal) modal.style.display = 'none';
  });
});

// 4. Contador de Métricas (KPIs)
const counters = document.querySelectorAll('.counter');
let counterStarted = false;

window.addEventListener('scroll', () => {
  const kpiSection = document.querySelector('.kpi-section');
  if (!kpiSection) return;
  const sectionPos = kpiSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos && !counterStarted) {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    counterStarted = true;
  }
});

// 5. Botão Voltar ao Topo e Destaque do Menu Ativo no Scroll
const backToTopBtn = document.getElementById('back-to-top');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  // Exibir/ocultar botão voltar ao topo
  if (backToTopBtn) {
    if (window.scrollY > 300) {
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.style.display = 'none';
    }
  }

  // Destaque do link de navegação ativo
  let currentSection = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.pageYOffset >= sectionTop - 100) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
});

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// 6. Formulário de Contato com Envio Assíncrono (Fetch)
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    if (formStatus) formStatus.innerText = 'Enviando...';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (response.ok) {
        if (formStatus) formStatus.innerText = 'Mensagem enviada com sucesso!';
        contactForm.reset();
      } else {
        if (formStatus) formStatus.innerText = 'Erro ao enviar. Tente novamente.';
      }
    } catch (error) {
      if (formStatus) formStatus.innerText = 'Erro ao conectar. Tente novamente.';
    }
  });
}

// --- ANIMAÇÃO TYPEWRITER (EFEITO DIGITAÇÃO) ---
const typewriterText = document.getElementById('typewriter');
const words = ["Especialista em Suporte TI", "Gestão de Infraestrutura", "Desenvolvedor de Automações"];
let wordIndex = 0; 
let charIndex = 0; 
let isDeleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];
  if (isDeleting) {
    typewriterText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  let typingSpeed = isDeleting ? 50 : 100;
  if (!isDeleting && charIndex === currentWord.length) {
    typingSpeed = 2000; // Pausa com a palavra completa
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    typingSpeed = 500; // Pausa antes de começar a próxima palavra
  }
  setTimeout(typeEffect, typingSpeed);
}

// Iniciar o efeito de digitação se o elemento existir
if (typewriterText) typeEffect();
