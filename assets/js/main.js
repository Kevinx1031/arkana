// main.js para Arkana

document.addEventListener('DOMContentLoaded', () => {
  // Variables
  const missionsCarousel = document.getElementById('missions-carousel');
  const switcherButtons = document.querySelectorAll('.missions-switcher button');
  const userAvatar = document.getElementById('user-avatar');
  const userLevel = document.getElementById('user-level');
  const userCoins = document.getElementById('user-coins');

  // Modal
  const modal = document.getElementById('mission-modal');
  const closeModalBtn = document.getElementById('close-mission-modal');
  const modalTitle = document.getElementById('modal-mission-title');
  const modalImage = document.getElementById('modal-mission-image');
  const modalLore = document.getElementById('modal-mission-lore');
  const modalReqs = document.getElementById('modal-mission-reqs');
  const difficultySelect = document.getElementById('difficulty-select');
  const startMissionBtn = document.getElementById('start-mission-btn');
// Ejemplo de progreso del usuario
let userProgress = 60; // Esto podrías traerlo de la base de datos

// Actualizar barra de progreso
const progressFill = document.querySelector('.progress-fill');
const progressPercentage = document.getElementById('progress-percentage');

progressFill.style.width = `${userProgress}%`;
progressPercentage.textContent = `${userProgress}%`;

  // Datos simulados del usuario (puedes conectar a Firestore en el futuro)
  let userData = {
    avatar: 'assets/images/avatar_default.png',
    level: 20,
    coins: 100,
    userClass: 'Guerrero' // Cambia a 'Explorador' para ver ese tipo de misiones
  };

  // Cargar datos del usuario (simulado)
  function loadUserData() {
    userAvatar.src = userData.avatar;
    userLevel.textContent = `Nivel ${userData.level}`;
    userCoins.textContent = `🪙 ${userData.coins}`;
  }

  // Misiones simuladas (puedes conectarlas a Firestore)
  const missions = {
    'main-missions-btn': [
      {
        title: 'Misión Principal A',
        description: 'Completa la misión principal A.',
        image: 'mision-principal-a.png',
        lore: 'En un rincón olvidado de Arkana, una nueva amenaza emerge...',
        requirements: ['Nivel 1', 'Espada básica'],
        difficulty: ['Fácil', 'Normal', 'Difícil']
      },
      {
        title: 'Misión Principal B',
        description: 'Supera el desafío B.',
        image: 'mision-principal-b.png',
        lore: 'El desafío B te pondrá a prueba como nunca antes...',
        requirements: ['Nivel 2', 'Escudo de protección'],
        difficulty: ['Fácil', 'Normal', 'Difícil']
      },
      {
        title: 'Misión Principal C',
        description: 'Derrota al jefe final.',
        image: 'mision-principal-c.png',
        lore: 'El jefe final ha despertado y busca venganza...',
        requirements: ['Nivel 3', 'Armadura completa'],
        difficulty: ['Fácil', 'Normal', 'Difícil']
      }
    ],
    'side-missions-btn': [
      {
        title: 'Misión Secundaria X',
        description: 'Ayuda a un compañero.',
        image: 'mision-secundaria-x.png',
        lore: 'Un compañero necesita tu ayuda en las Escuelas Fragmentadas...',
        requirements: ['Nivel 1'],
        difficulty: ['Fácil', 'Normal', 'Difícil']
      }
    ],
    'party-missions-btn': [
      {
        title: 'Misión de Party 1',
        description: 'Crea una campaña de reciclaje en el aula.',
        image: 'mision-party-1.png',
        lore: 'Juntos pueden marcar la diferencia en el medio ambiente...',
        requirements: ['Trabajo en equipo'],
        difficulty: ['Fácil', 'Normal', 'Difícil']
      }
    ],
    'explorer-missions-btn': [
      {
        title: 'Misión de Explorador',
        description: 'Explora el Lore oculto de Arkana.',
        image: 'mision-explorador.png',
        lore: 'El Lore de Arkana espera ser descubierto por mentes curiosas...',
        requirements: ['Ser Explorador'],
        difficulty: ['Fácil', 'Normal', 'Difícil']
      }
    ]
  };

  // Cargar misiones
  function loadMissions(missionType) {
    missionsCarousel.innerHTML = ''; // Limpia el carrusel
    const selectedMissions = missions[missionType];

    // Verificación de Explorador
    if (missionType === 'explorer-missions-btn' && userData.userClass !== 'Explorador') {
      missionsCarousel.innerHTML = '<p>Esta misión está bloqueada para tu clase.</p>';
      return;
    }

    if (selectedMissions && selectedMissions.length > 0) {
      selectedMissions.forEach(mission => {
        const card = document.createElement('div');
        card.classList.add('mission-card');
        card.innerHTML = `
          <img src="assets/images/misiones/${mission.image}" alt="${mission.title}" class="mission-image">
          <h3>${mission.title}</h3>
          <p>${mission.description}</p>
        `;
        card.addEventListener('click', () => openMissionModal(mission));
        missionsCarousel.appendChild(card);
      });
    } else {
      missionsCarousel.innerHTML = '<p>No hay misiones disponibles.</p>';
    }
  }

  // Modal: abrir misión
  function openMissionModal(mission) {
    modalTitle.textContent = mission.title;
    modalImage.src = `assets/images/misiones/${mission.image}`;
    modalLore.textContent = mission.lore;
    modalReqs.textContent = mission.requirements.join(', ');

    difficultySelect.innerHTML = '';
    mission.difficulty.forEach(level => {
      const option = document.createElement('option');
      option.value = level.toLowerCase();
      option.textContent = level;
      difficultySelect.appendChild(option);
    });

    modal.style.display = 'flex';
  }

  // Cerrar modal
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Switcher de misiones
  switcherButtons.forEach(button => {
    // Ocultar Explorador si no eres Explorador
    if (button.id === 'explorer-missions-btn' && userData.userClass !== 'Explorador') {
      button.style.display = 'none';
    }

    button.addEventListener('click', () => {
      switcherButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      loadMissions(button.id);
    });
  });

  // Inicialización
  loadUserData();
  loadMissions('main-missions-btn');
});
// Aplica el entorno al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const userHeader = document.getElementById('user-header');
  const entornoGuardado = localStorage.getItem('entornoActual') || 'entorno-default.png';
  userHeader.style.backgroundImage = `url('assets/images/entornos/${entornoGuardado}')`;
});

// Cambiar entorno desde la tienda o perfil
function cambiarEntorno(nuevoEntorno) {
  const userHeader = document.getElementById('user-header');
  userHeader.style.backgroundImage = `url('assets/images/entornos/${nuevoEntorno}')`;
  localStorage.setItem('entornoActual', nuevoEntorno);

  // Si usas base de datos, aquí iría la llamada para actualizar el entorno del usuario:
  // updateUserEntornoInDatabase(nuevoEntorno);
}
