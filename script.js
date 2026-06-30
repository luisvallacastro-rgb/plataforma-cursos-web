const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const filterButtons = document.querySelectorAll("[data-filter]");
const courseCards = document.querySelectorAll("[data-category]");
const detailRoot = document.querySelector("[data-course-detail]");
const classroomRoot = document.querySelector("[data-classroom]");
const loginForm = document.querySelector("[data-login-form]");
const loginLink = document.querySelector("[data-login-link]");

if (window.location.hash === "#cursos" && !window.location.pathname.endsWith("cursos.html")) {
  window.location.replace("cursos.html");
}

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 12);
}

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

if (navToggle && nav && header) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-visible");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    header.classList.toggle("is-open", isOpen);
  });

  nav.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      nav.classList.remove("is-visible");
      navToggle.setAttribute("aria-expanded", "false");
      header.classList.remove("is-open");
    }
  });
}

function applyCourseFilter(filter) {
  courseCards.forEach((card) => {
    card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter);
  });

  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.classList.contains("filter-option") && button.dataset.filter === filter);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => applyCourseFilter(button.dataset.filter));
});

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("campusUser") || "null");
  } catch {
    return null;
  }
}

function syncLoginState() {
  const user = getStoredUser();
  if (!loginLink || !user?.name) return;
  loginLink.textContent = `Hola, ${user.name}`;
  loginLink.href = "cursos.html";
  loginLink.setAttribute("aria-label", `Sesion iniciada como ${user.name}`);
}

function initLoginForm() {
  if (!loginForm) return;

  const message = document.querySelector("[data-login-message]");
  const params = new URLSearchParams(window.location.search);
  const courseId = params.get("curso");
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = String(loginForm.elements.user?.value || "").trim();
    const password = String(loginForm.elements.password?.value || "").trim();

    if (!name || !password) {
      if (message) message.textContent = "Completa usuario y contrasena.";
      return;
    }

    localStorage.setItem("campusUser", JSON.stringify({ name, signedAt: new Date().toISOString() }));
    if (message) message.textContent = "Acceso habilitado. Redirigiendo al campus...";
    setTimeout(() => {
      window.location.href = courseId ? `aula.html?curso=${courseId}` : "cursos.html";
    }, 650);
  });
}

const courseData = {
  "gestion-empresarial": {
    title: "Curso en Gestion Empresarial y Mejora de Procesos",
    shortTitle: "Curso en Gestion Empresarial",
    category: "Gestion empresarial",
    media: "media-gestion",
    price: "USD$44.99",
    oldPrice: "USD$124.99",
    students: "26",
    views: "8128",
    lessons: "40",
    duration: "12 semanas",
    level: "Avanzado",
    summary:
      "Aprende a diagnosticar operaciones, ordenar indicadores y convertir oportunidades de mejora en planes ejecutables para equipos reales.",
    overviewTitle: "Gestion con metodo, indicadores y accion",
    overview:
      "Este curso esta disenado para profesionales que necesitan dirigir procesos con claridad. Trabajaras planificacion, lectura financiera basica, mapas de proceso, tableros de control y decisiones de mejora continua.",
    objectives: [
      "Construir indicadores utiles para seguimiento gerencial.",
      "Detectar cuellos de botella y priorizar mejoras.",
      "Disenar rutinas de gestion para equipos operativos.",
      "Presentar resultados con argumentos y evidencia."
    ],
    modules: [
      ["Diagnostico empresarial", "Mapa de procesos, objetivos, problemas recurrentes y medicion inicial."],
      ["Indicadores y tableros", "KPI, metas, semaforos, frecuencia de revision y lectura ejecutiva."],
      ["Mejora de procesos", "Priorizacion, responsables, tiempos, riesgos y seguimiento."],
      ["Liderazgo de ejecucion", "Reuniones efectivas, acuerdos, comunicacion y cultura de cumplimiento."]
    ],
    benefits: [
      ["Decisiones mas claras", "Convierte datos dispersos en criterios de accion."],
      ["Herramientas editables", "Plantillas para diagnostico, tablero y plan de mejora."],
      ["Aplicacion inmediata", "Cada modulo deja una pieza usable en tu empresa."],
      ["Acompanamiento docente", "Retroalimentacion sobre tu proyecto final."]
    ],
    projectTitle: "Plan de mejora empresarial",
    project:
      "El cierre consiste en presentar un plan de mejora con diagnostico, indicadores, responsables y calendario de implementacion.",
    steps: ["Diagnostico inicial", "Tablero de indicadores", "Plan de accion", "Presentacion ejecutiva"]
  },
  "marketing-digital": {
    title: "Curso en Marketing Digital, Contenido y Embudos de Venta",
    shortTitle: "Curso en Marketing Digital",
    category: "Marketing y ventas",
    media: "media-marketing",
    price: "USD$54.99",
    oldPrice: "USD$189.99",
    students: "13",
    views: "5777",
    lessons: "128",
    duration: "8 semanas",
    level: "Avanzado",
    summary:
      "Disena campanas con mensaje claro, contenido util, pauta medible y seguimiento comercial para mejorar conversiones.",
    overviewTitle: "De la atencion a la conversion",
    overview:
      "Aprenderas a estructurar ofertas, construir embudos, calendarizar contenido y medir resultados sin depender de tacticas sueltas.",
    objectives: [
      "Definir audiencias, propuesta de valor y oferta.",
      "Crear piezas de contenido por etapa del embudo.",
      "Medir conversiones y optimizar presupuesto.",
      "Conectar marketing con seguimiento de ventas."
    ],
    modules: [
      ["Estrategia y oferta", "Cliente ideal, posicionamiento, promesa y oferta irresistible."],
      ["Contenido por embudo", "Atraccion, confianza, conversion y retencion."],
      ["Pauta y medicion", "Estructura de campanas, metricas y lectura de resultados."],
      ["Automatizacion comercial", "Seguimiento, mensajes, CRM simple y reportes."]
    ],
    benefits: [
      ["Sistema comercial", "Una ruta clara desde primer contacto hasta cierre."],
      ["Plantillas de campana", "Brief, calendario, copy y reporte de resultados."],
      ["Menos improvisacion", "Decisiones basadas en datos y objetivos."],
      ["Optimiza inversion", "Aprende a leer que mantener, pausar o escalar."]
    ],
    projectTitle: "Campana digital completa",
    project:
      "Construiras una campana con audiencia, oferta, piezas de contenido, pauta sugerida y tablero de seguimiento.",
    steps: ["Oferta", "Calendario", "Pauta", "Reporte"]
  },
  "analisis-datos": {
    title: "Curso en Analisis de Datos para Decisiones de Negocio",
    shortTitle: "Curso en Analisis de Datos",
    category: "Analisis de datos",
    media: "media-data",
    price: "USD$49.99",
    oldPrice: "USD$289.99",
    students: "27",
    views: "9414",
    lessons: "85",
    duration: "10 semanas",
    level: "Avanzado",
    summary:
      "Transforma informacion operativa en tableros, hallazgos y recomendaciones que ayuden a decidir con mas seguridad.",
    overviewTitle: "Datos claros para decisiones mejores",
    overview:
      "El curso combina limpieza de datos, metricas, visualizacion y storytelling ejecutivo para que puedas explicar lo que esta pasando y que hacer despues.",
    objectives: [
      "Preparar datos para analisis confiable.",
      "Crear metricas y visualizaciones legibles.",
      "Detectar patrones, alertas y oportunidades.",
      "Presentar hallazgos de forma ejecutiva."
    ],
    modules: [
      ["Datos y calidad", "Fuentes, limpieza, estructura y errores comunes."],
      ["Metricas de negocio", "Indicadores comerciales, operativos y financieros."],
      ["Visualizacion", "Graficos, tableros, jerarquia visual y lectura rapida."],
      ["Storytelling", "Hallazgos, recomendaciones y narrativa para decision."]
    ],
    benefits: [
      ["Tableros utiles", "Diseña vistas que responden preguntas concretas."],
      ["Criterio analitico", "Evita conclusiones debiles o datos mal leidos."],
      ["Reporte ejecutivo", "Comunica resultados sin saturar de informacion."],
      ["Proyecto aplicable", "Trabaja con un caso de negocio realista."]
    ],
    projectTitle: "Dashboard de decision",
    project:
      "Entregaras un tablero con metricas clave, lectura ejecutiva y recomendaciones accionables.",
    steps: ["Base limpia", "Metricas", "Visualizaciones", "Recomendaciones"]
  },
  "liderazgo-equipos": {
    title: "Curso en Liderazgo, Comunicacion y Gestion de Equipos",
    shortTitle: "Curso en Liderazgo de Equipos",
    category: "Liderazgo",
    media: "media-leadership",
    price: "USD$89.99",
    oldPrice: "",
    students: "34",
    views: "6840",
    lessons: "52",
    duration: "6 semanas",
    level: "Intermedio",
    summary:
      "Desarrolla conversaciones, acuerdos y rutinas de seguimiento para liderar equipos con mas claridad y menos friccion.",
    overviewTitle: "Liderar con acuerdos visibles",
    overview:
      "Aprenderas herramientas de comunicacion, delegacion, feedback y seguimiento para mejorar coordinacion y resultados.",
    objectives: [
      "Delegar con expectativas claras.",
      "Dar feedback accionable y oportuno.",
      "Manejar conversaciones dificiles.",
      "Crear rituales de seguimiento de equipo."
    ],
    modules: [
      ["Rol del lider", "Responsabilidades, enfoque y estilos de liderazgo."],
      ["Comunicacion efectiva", "Escucha, mensajes, acuerdos y feedback."],
      ["Gestion de desempeño", "Objetivos, seguimiento y conversaciones de avance."],
      ["Cultura de equipo", "Confianza, coordinacion y aprendizaje continuo."]
    ],
    benefits: [
      ["Menos ambiguedad", "Acuerdos claros para ejecutar mejor."],
      ["Mejores conversaciones", "Estructuras para hablar de desempeno sin tension."],
      ["Equipo alineado", "Rutinas simples para mantener foco."],
      ["Autodiagnostico", "Identifica fortalezas y puntos de mejora como lider."]
    ],
    projectTitle: "Sistema de liderazgo semanal",
    project:
      "Crearas una rutina de seguimiento con objetivos, tablero de acuerdos y guion de feedback.",
    steps: ["Diagnostico", "Objetivos", "Rutina semanal", "Feedback"]
  },
  "docentes-digitales": {
    title: "Curso en Diseno de Clases Virtuales y Evaluacion Digital",
    shortTitle: "Curso para Docentes Digitales",
    category: "Docentes",
    media: "media-teachers",
    price: "USD$39.99",
    oldPrice: "USD$149.99",
    students: "19",
    views: "4206",
    lessons: "64",
    duration: "7 semanas",
    level: "Intermedio",
    summary:
      "Convierte contenidos en experiencias virtuales claras, participativas y evaluables con recursos practicos para docentes.",
    overviewTitle: "Clases digitales que se entienden y se completan",
    overview:
      "El curso aborda planificacion, recursos visuales, actividades asincronicas, evaluaciones y retroalimentacion en entornos virtuales.",
    objectives: [
      "Diseñar clases con objetivos medibles.",
      "Crear actividades virtuales participativas.",
      "Evaluar con rubricas y evidencias.",
      "Mejorar retroalimentacion al estudiante."
    ],
    modules: [
      ["Diseno instruccional", "Objetivos, secuencia, recursos y carga cognitiva."],
      ["Actividades digitales", "Foros, tareas, quizzes y aprendizaje aplicado."],
      ["Evaluacion", "Rubricas, criterios, evidencias y retroalimentacion."],
      ["Facilitacion virtual", "Comunidad, acompanamiento y comunicacion."]
    ],
    benefits: [
      ["Clases mas claras", "Estructura para que el estudiante sepa que hacer."],
      ["Evaluacion practica", "Rubricas y criterios listos para adaptar."],
      ["Mejor participacion", "Actividades pensadas para entorno online."],
      ["Ahorro de tiempo", "Plantillas para planificar y retroalimentar."]
    ],
    projectTitle: "Modulo virtual completo",
    project:
      "Diseñaras un modulo con objetivos, clase, actividad, evaluacion y rubrica.",
    steps: ["Objetivos", "Clase", "Actividad", "Rubrica"]
  },
  "finanzas-practicas": {
    title: "Curso en Finanzas, Presupuestos e Indicadores Gerenciales",
    shortTitle: "Curso en Finanzas Practicas",
    category: "Gestion empresarial",
    media: "media-finance",
    price: "USD$44.99",
    oldPrice: "USD$189.99",
    students: "31",
    views: "7312",
    lessons: "72",
    duration: "9 semanas",
    level: "Avanzado",
    summary:
      "Aprende a leer numeros de negocio, preparar presupuestos y presentar indicadores financieros para tomar decisiones.",
    overviewTitle: "Finanzas explicadas para gestionar",
    overview:
      "Trabajaras presupuestos, costos, margenes, flujo de caja e indicadores gerenciales con ejemplos practicos y plantillas editables.",
    objectives: [
      "Leer estados e indicadores basicos.",
      "Preparar presupuestos y escenarios.",
      "Controlar costos, margenes y flujo.",
      "Explicar resultados a equipos no financieros."
    ],
    modules: [
      ["Fundamentos financieros", "Ingresos, costos, gastos, margen y utilidad."],
      ["Presupuesto", "Supuestos, escenarios, seguimiento y desviaciones."],
      ["Flujo de caja", "Entradas, salidas, liquidez y alertas."],
      ["Indicadores gerenciales", "Rentabilidad, eficiencia y tablero ejecutivo."]
    ],
    benefits: [
      ["Lectura financiera", "Entiende que significan los numeros clave."],
      ["Presupuesto accionable", "Controla desviaciones y escenarios."],
      ["Mejor conversacion", "Comunica finanzas con claridad."],
      ["Plantillas listas", "Modelos editables de presupuesto y tablero."]
    ],
    projectTitle: "Presupuesto y tablero financiero",
    project:
      "Entregaras un presupuesto con supuestos, escenario base y tablero de indicadores gerenciales.",
    steps: ["Supuestos", "Presupuesto", "Flujo", "Tablero"]
  }
};

function renderList(target, items, template) {
  if (!target) return;
  target.innerHTML = items.map(template).join("");
}

function initCourseDetail() {
  if (!detailRoot) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("curso") || "gestion-empresarial";
  const course = courseData[id] || courseData["gestion-empresarial"];
  document.title = `${course.shortTitle} | Academia`;

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value || "";
  };

  setText("[data-detail-title]", course.title);
  setText("[data-detail-short-title]", course.shortTitle);
  setText("[data-detail-summary]", course.summary);
  setText("[data-detail-category]", course.category);
  setText("[data-detail-category-label]", course.category);
  setText("[data-detail-students]", course.students);
  setText("[data-detail-rating]", "0.0");
  setText("[data-detail-old-price]", course.oldPrice);
  setText("[data-detail-price]", course.price);
  setText("[data-detail-duration]", course.duration);
  setText("[data-detail-lessons]", course.lessons);
  setText("[data-detail-level]", course.level);
  setText("[data-overview-title]", course.overviewTitle);
  setText("[data-overview-copy]", course.overview);
  setText("[data-project-title]", course.projectTitle);
  setText("[data-project-copy]", course.project);

  const media = document.querySelector("[data-detail-media]");
  if (media) {
    media.className = `course-media detail-media ${course.media}`;
  }

  const user = getStoredUser();
  const action = document.querySelector("[data-course-action]");
  const actionNote = document.querySelector("[data-course-action-note]");
  if (action && user?.name) {
    action.textContent = "Entrar al curso";
    action.href = `aula.html?curso=${id}`;
    if (actionNote) actionNote.textContent = "Curso comprado. Acceso habilitado.";
  } else if (action) {
    action.textContent = "Iniciar para acceder";
    action.href = `login.html?curso=${id}`;
    if (actionNote) actionNote.textContent = "Inicia sesion para entrar al aula.";
  }

  renderList(document.querySelector("[data-objectives]"), course.objectives, (item) => `<article>${item}</article>`);
  renderList(
    document.querySelector("[data-modules]"),
    course.modules,
    ([title, copy], index) => `
      <article>
        <span>${index + 1}</span>
        <div>
          <h3>${title}</h3>
          <p>${copy}</p>
        </div>
      </article>`
  );
  renderList(
    document.querySelector("[data-benefits]"),
    course.benefits,
    ([title, copy]) => `
      <article>
        <h3>${title}</h3>
        <p>${copy}</p>
      </article>`
  );
  renderList(
    document.querySelector("[data-project-steps]"),
    course.steps,
    (step, index) => `<span>${index + 1}. ${step}</span>`
  );

  const related = Object.entries(courseData)
    .filter(([key]) => key !== id)
    .slice(0, 3)
    .map(
      ([key, item]) => `
        <a class="related-course" href="curso-detalle.html?curso=${key}">
          <span class="related-thumb ${item.media}"></span>
          <strong>${item.shortTitle}</strong>
          <small>${item.price}</small>
        </a>`
    );
  renderList(document.querySelector("[data-related-courses]"), related, (item) => item);
}

function initClassroom() {
  if (!classroomRoot) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("curso") || "gestion-empresarial";
  const course = courseData[id] || courseData["gestion-empresarial"];
  document.title = `Aula | ${course.shortTitle}`;

  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = value || "";
  };

  const currentModule = course.modules[0] || ["Bienvenida", course.summary];
  const firstObjective = course.objectives[0] || course.summary;
  const progress = Math.min(68, Math.max(24, Number(course.students) + 10));

  setText("[data-classroom-category]", course.category);
  setText("[data-classroom-title]", course.title);
  setText("[data-classroom-summary]", course.summary);
  setText("[data-classroom-progress]", `${progress}%`);
  setText("[data-classroom-lessons]", `${course.lessons} clases`);
  setText("[data-classroom-next]", currentModule[0]);
  setText("[data-classroom-current-title]", currentModule[0]);
  setText("[data-classroom-current-copy]", currentModule[1]);
  setText("[data-classroom-objective]", firstObjective);
  setText("[data-classroom-project]", course.projectTitle);
  setText("[data-classroom-project-copy]", course.project);

  const progressBar = document.querySelector(".classroom-progress i");
  if (progressBar) progressBar.style.width = `${progress}%`;

  const detailLink = document.querySelector("[data-classroom-detail-link]");
  if (detailLink) detailLink.href = `curso-detalle.html?curso=${id}`;

  renderList(
    document.querySelector("[data-classroom-modules]"),
    course.modules,
    ([title, copy], index) => `
      <article class="${index === 0 ? "is-current" : ""}">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <div>
          <strong>${title}</strong>
          <p>${copy}</p>
        </div>
      </article>`
  );
}

function initTabs() {
  const tabButtons = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll("[data-panel]");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });

      panels.forEach((panel) => {
        const active = panel.dataset.panel === button.dataset.tab;
        panel.classList.toggle("is-active", active);
        if (active) {
          panel.querySelectorAll(".reveal").forEach((element) => {
            element.classList.remove("is-visible");
            requestAnimationFrame(() => element.classList.add("is-visible"));
          });
        }
      });
    });
  });
}

function initRevealAnimations() {
  const revealTargets = document.querySelectorAll(
    [
      ".section-heading",
      ".intro-panel",
      ".course-filters",
      ".course-card",
      ".steps article",
      ".benefit-list div",
      ".campus-panel",
      ".testimonial-grid figure",
      ".contact-copy",
      ".contact-form",
      ".detail-tabs-card",
      ".popular-card",
      ".learning-grid article",
      ".module-list article",
      ".benefit-detail-grid article",
      ".project-steps span",
      ".classroom-next",
      ".classroom-sidebar",
      ".lesson-stage",
      ".tool-card"
    ].join(",")
  );

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

function initTiltEffects() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const tiltTargets = document.querySelectorAll(".course-card, .detail-enroll-card");

  tiltTargets.forEach((target) => {
    target.addEventListener("pointermove", (event) => {
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      target.style.setProperty("--tilt-x", `${x * 7}deg`);
      target.style.setProperty("--tilt-y", `${y * -7}deg`);
    });

    target.addEventListener("pointerleave", () => {
      target.style.setProperty("--tilt-x", "0deg");
      target.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function initAnimatedExperience() {
  document.documentElement.classList.add("is-loaded");
  initRevealAnimations();
  initTiltEffects();
}

initCourseDetail();
initClassroom();
initTabs();
syncLoginState();
initLoginForm();
initAnimatedExperience();
