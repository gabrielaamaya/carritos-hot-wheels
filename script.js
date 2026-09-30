(function () {
  'use strict';

  // ============================================================
  // 1. Contenedores
  // ============================================================
  const sparksContainer = document.getElementById('sparks-container');
  const heartsContainer = document.getElementById('hearts-container');

  // ============================================================
  // 2. Función para crear una chispa (partícula brillante)
  // ============================================================
  function crearChispa(duracionPersonalizada) {
    const spark = document.createElement('div');
    spark.classList.add('spark');

    spark.style.left = Math.random() * 100 + '%';
    spark.style.top = Math.random() * 100 + '%';

    const size = 4 + Math.random() * 8;
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';

    // Mezcla rosa/naranja para ambiente romántico
    const hue = Math.random() > 0.5 ? 330 + Math.random() * 20 : 20 + Math.random() * 30;
    spark.style.background = `hsl(${hue}, 100%, 65%)`;
    spark.style.boxShadow = `0 0 15px hsl(${hue}, 100%, 55%), 0 0 30px hsl(${hue}, 100%, 55%)`;

    if (duracionPersonalizada) {
      spark.style.animationDuration = duracionPersonalizada;
    } else {
      spark.style.animationDuration = 4 + Math.random() * 8 + 's';
      spark.style.animationDelay = Math.random() * 5 + 's';
    }

    return spark;
  }

  // Chispas iniciales
  for (let i = 0; i < 25; i++) {
    sparksContainer.appendChild(crearChispa());
  }

  // ============================================================
  // 3. Función para crear un corazón flotante 💖
  // ============================================================
  const corazones = ['💖', '💕', '💗', '💓', '❤️', '💘', '💝', '🏎️', '💞'];

  function crearCorazon() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = corazones[Math.floor(Math.random() * corazones.length)];

    // Posición horizontal aleatoria
    heart.style.left = Math.random() * 100 + '%';

    // Tamaño aleatorio
    const size = 20 + Math.random() * 25;
    heart.style.fontSize = size + 'px';

    // Duración aleatoria entre 6 y 12 segundos
    const duracion = 6 + Math.random() * 6;
    heart.style.animationDuration = duracion + 's';

    // Retraso aleatorio pequeño
    heart.style.animationDelay = Math.random() * 2 + 's';

    return heart;
  }

  // Corazones flotantes continuos
  setInterval(() => {
    if (document.hidden) return;
    const heart = crearCorazon();
    heartsContainer.appendChild(heart);

    // Eliminar después de que termine su animación
    setTimeout(() => {
      if (heart.parentNode) heart.remove();
    }, 14000);
  }, 600);

  // Corazones iniciales
  for (let i = 0; i < 8; i++) {
    const heart = crearCorazon();
    heart.style.animationDelay = Math.random() * 8 + 's';
    heartsContainer.appendChild(heart);
  }

  // ============================================================
  // 4. Botón "¡TE AMO!" — sacudida + explosión de corazones y chispas
  // ============================================================
  const revBtn = document.getElementById('revBtn');

  revBtn.addEventListener('click', () => {
    // Sacudir la página
    document.body.style.animation = 'none';
    void document.body.offsetWidth;
    document.body.style.animation = 'shake 0.4s ease-in-out';

    // Explosión de corazones desde el centro
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.classList.add('heart');
      heart.textContent = corazones[Math.floor(Math.random() * corazones.length)];
      heart.style.left = 50 + (Math.random() * 40 - 20) + '%';
      heart.style.fontSize = (25 + Math.random() * 30) + 'px';
      heart.style.animationDuration = (3 + Math.random() * 3) + 's';
      heart.style.animationDelay = '0s';
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 7000);
    }

    // Chispas extra
    for (let i = 0; i < 20; i++) {
      const extraSpark = document.createElement('div');
      extraSpark.classList.add('spark');
      extraSpark.style.left = Math.random() * 100 + '%';
      extraSpark.style.top = Math.random() * 100 + '%';

      const size = 6 + Math.random() * 12;
      extraSpark.style.width = size + 'px';
      extraSpark.style.height = size + 'px';

      const hue = 330 + Math.random() * 30;
      extraSpark.style.background = `hsl(${hue}, 100%, 65%)`;
      extraSpark.style.boxShadow = '0 0 20px #ff87b0, 0 0 40px #ff3366';

      extraSpark.style.animationDuration = '1.2s';
      extraSpark.style.animationIterationCount = '1';
      extraSpark.style.animationName = 'floatSpark';
      extraSpark.style.animationTimingFunction = 'ease-out';

      document.body.appendChild(extraSpark);

      setTimeout(() => extraSpark.remove(), 1500);
    }

    // Cambiar texto del botón temporalmente
    const textoOriginal = revBtn.textContent;
    revBtn.textContent = '¡TE AMO MÁS! 💖🏎️';
    setTimeout(() => {
      revBtn.textContent = textoOriginal;
    }, 1500);

    // Rebote del botón
    revBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      revBtn.style.transform = '';
    }, 150);
  });

  // ============================================================
  // 5. Efecto extra en las tarjetas (hover del icono)
  // ============================================================
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    const icon = card.querySelector('.car-icon');
    if (!icon) return;

    card.addEventListener('mouseenter', () => {
      icon.style.transform = 'scale(1.2) rotate(5deg)';
      icon.style.transition = 'transform 0.3s';
    });

    card.addEventListener('mouseleave', () => {
      icon.style.transform = '';
    });
  });

  // ============================================================
  // 6. Generar más chispas periódicamente para mantener el ambiente
  // ============================================================
  setInterval(() => {
    if (document.hidden) return;
    if (sparksContainer.children.length > 40) return;

    const spark = crearChispa();
    sparksContainer.appendChild(spark);

    setTimeout(() => {
      if (spark.parentNode) spark.remove();
    }, 12000);
  }, 2000);

})();