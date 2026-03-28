    
document.addEventListener("DOMContentLoaded", () => {
    //const data = JSON.parse(localStorage.getItem("resultadoAnalisis"));
    // TODO tu código acá

const data = {
        marca: "Mi Empresa",

    rubro:"ropa",
    descripcion: "Marca confiable con enfoque en innovación",
    identidad: "Tecnológica, moderna y accesible",
    ubicacion:"la plata",
    pais:"argentina",
    relacion_precio:"",
    urlWebPage:"",

    adjetivos: ["Innovadora", "Confiable", "Ágil"],

    publico_objetivo: "Jóvenes profesionales interesados en tecnología",

    competidores: ["Empresa A", "Empresa B", "Empresa C"],

    problemas: "Falta de presencia digital consistente",

    servicios: ["Desarrollo web", "Marketing digital", "Consultoría"],

    menciones_competencia: [
        { nombre: "Mi Empresa", porcentaje: 21 },
        { nombre: "Empresa A", porcentaje: 25 },
        { nombre: "Empresa B", porcentaje: 80 },
        { nombre: "Empresa C", porcentaje: 100 },
        { nombre: "Empresa D", porcentaje: 50 },
        { nombre: "Empresa E", porcentaje: 10 }
    ],

    ranking_empresas: [
        { nombre: "Mi Empresa", score: 50 },
        { nombre: "Empresa A", score: 80 },
        { nombre: "Empresa B", score: 65 },
        { nombre: "Empresa C", score: 90 },
        { nombre: "Empresa D", score: 40 },
        { nombre: "Empresa E", score: 30 }
    ],
        preguntas: {
            pregunta_bien_rankeado: "Quiero conocer las 10 mejores marcas en el rubro",
            pregunta_sin_aparicion: "Quiero conocer las 10 mejores marcas en el rubro que tengan mejores recomendaciones"
        },

    percepcion_scores: {
        calidad: 8,
        confianza: 7,
        riesgo: 3,
        incertidumbre: 4
    }
};

const conclusiones_plan = {
  resumen_ejecutivo: "La marca presenta una percepción general positiva en términos de calidad y confianza, pero su visibilidad en resultados de IA es limitada frente a competidores más posicionados. Existe una brecha clara en posicionamiento digital y consistencia de contenido.",

  score_general: 62,

  veredicto: "Marca con buen potencial pero subexplotada en visibilidad y posicionamiento en IA.",

  hallazgos_clave: [
    "Alta valoración en calidad y confianza",
    "Baja aparición en rankings relevantes de IA",
    "Competidores dominan el share of voice",
    "Falta de consistencia en la comunicación digital"
  ],

  evidencias_clave: [
    "Score de calidad: 8/10 y confianza: 7/10",
    "Share of voice inferior al 25% frente a competidores con >50%",
    "Ranking promedio por debajo de competidores principales",
    "Sitio web con contenido limitado y poco optimizado"
  ],

  brechas_detectadas: {
    visibilidad: [
      "Baja presencia en respuestas generadas por IA",
      "Poca indexación semántica del contenido web"
    ],
    posicionamiento: [
      "No aparece en top 3 de rankings clave",
      "Competidores dominan keywords del rubro"
    ],
    diferenciacion: [
      "Propuesta de valor poco clara",
      "Mensajes similares a la competencia"
    ],
    confianza: [
      "Falta de testimonios o validación social",
      "Poca autoridad percibida en el contenido"
    ],
    claridad_oferta: [
      "Servicios poco explicados",
      "No se destacan beneficios concretos"
    ],
    contenido_web: [
      "Contenido escaso y poco optimizado para IA",
      "Falta de estructura semántica clara"
    ],
    consistencia_marca: [
      "Diferencias entre mensaje web y percepción IA",
      "Identidad no consolidada en todos los canales"
    ]
  },

  fortalezas: [
    "Alta percepción de calidad del servicio",
    "Buena base de confianza inicial",
    "Identidad de marca moderna y tecnológica"
  ],

  debilidades: [
    "Baja visibilidad en motores de IA",
    "Falta de contenido estratégico",
    "Escasa diferenciación frente a competidores"
  ],

  riesgos: [
    "Pérdida de oportunidades frente a competidores mejor posicionados",
    "Desconexión entre percepción real y digital",
    "Quedar fuera de decisiones de usuarios que usan IA para elegir"
  ],

  oportunidades: [
    "Optimizar contenido para aparecer en respuestas de IA",
    "Reforzar propuesta de valor",
    "Aumentar autoridad mediante contenido educativo",
    "Aprovechar ventaja en percepción de calidad"
  ],

  comparacion_vs_competidor: {
    competidor_referencia: "Empresa C",
    ventaja_de_mi_empresa: [
      "Mayor percepción de calidad",
      "Mejor identidad de marca"
    ],
    desventaja_de_mi_empresa: [
      "Menor visibilidad en IA",
      "Peor posicionamiento en rankings",
      "Menor volumen de menciones"
    ],
    gap_principal: "La principal brecha está en visibilidad y presencia digital, no en calidad del producto."
  },

  recomendaciones: {
    inmediatas: [
      "Optimizar contenido web con foco en SEO semántico",
      "Definir claramente propuesta de valor en homepage",
      "Agregar testimonios y casos de éxito"
    ],
    corto_plazo: [
      "Crear contenido orientado a preguntas frecuentes del rubro",
      "Mejorar estructura del sitio (headings, keywords, FAQs)",
      "Publicar comparativas con competidores"
    ],
    mediano_plazo: [
      "Desarrollar estrategia de contenido continua",
      "Construir autoridad en el rubro (blog, guías, recursos)",
      "Optimizar presencia en múltiples canales digitales"
    ]
  },

  plan_de_accion: [
    {
      tarea: "Optimizar homepage con propuesta de valor clara",
      prioridad: "alta",
      impacto: "Alto impacto en conversión y claridad",
      esfuerzo: "Medio",
      justificacion: "Actualmente no comunica claramente qué problema resuelve"
    },
    {
      tarea: "Crear sección de FAQs orientadas a IA",
      prioridad: "alta",
      impacto: "Aumenta visibilidad en respuestas de IA",
      esfuerzo: "Bajo",
      justificacion: "Las IA priorizan contenido estructurado y directo"
    },
    {
      tarea: "Generar artículos comparativos con competidores",
      prioridad: "media",
      impacto: "Mejora posicionamiento y diferenciación",
      esfuerzo: "Medio",
      justificacion: "Permite capturar búsquedas de intención comparativa"
    }
  ],

  confianza_del_analisis: 0.82,

  cobertura_de_fuentes: {
    website: 0.9,
    menciones: 0.85,
    ranking: 0.8,
    preguntas: 0.75
  }
  ,
  impacto_estimado: {
  visibilidad: "+35%",
  ranking: "+20 posiciones",
  conversion: "+15%"
}
};
// =======================
// MENCIONES
// =======================

const canvas = document.getElementById('mencionesChart');

// Ordenar
const ordenadoMenciones = [...data.menciones_competencia]
    .sort((a, b) => b.porcentaje - a.porcentaje);

// Colores
const colores = ordenadoMenciones.map(e =>
    e.nombre === data.marca ? '#22c55e' : '#64748b'
);

// Crear gráfico
new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ordenadoMenciones.map(e => e.nombre),
        datasets: [{
            label: '% de menciones',
            data: ordenadoMenciones.map(e => e.porcentaje),
            backgroundColor: colores
        }]
    },
    options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,

        scales: {
            x: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => value + "%"
                }
            }
        },

        plugins: {
            legend: { display: false }
        }
    }
});
// =======================
// RANKING POR SCORE (EMPRESAS)
// =======================

const contenedorPreguntas = document.querySelector('.preguntas-ranking');

contenedorPreguntas.innerHTML = `
    <div class="pregunta-card ok">
        <span class="badge">✔ Aparecés muy bien rankeado</span>
        <p>${data.preguntas.pregunta_bien_rankeado}</p>
    </div>

    <div class="pregunta-card bad">
        <span class="badge">✖ No aparecés nunca </span>
        <p>${data.preguntas.pregunta_sin_aparicion}</p>
    </div>
`;


// 1. Ordenar de mayor a menor score
const rankingOrdenado = [...data.ranking_empresas]
    .sort((a, b) => b.score - a.score);

// 2. Colores (tu empresa destacada)
const coloresRanking = rankingOrdenado.map(e =>
    e.nombre === data.marca ? '#22c55e' : '#64748b'
);

// 3. Crear gráfico
new Chart(document.getElementById('rankingChart'), {
    type: 'bar',
    data: {
        labels: rankingOrdenado.map(e => e.nombre),
        datasets: [{
            label: 'Score',
            data: rankingOrdenado.map(e => e.score),
            backgroundColor: coloresRanking,
            borderRadius: 6
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            title: {
                display: true,
                text: 'Ranking de empresas (Score IA)'
            },
            legend: {
                display: false
            }
        },

        scales: {
            y: {
                beginAtZero: true,
                max: 100
            }
        }
    }
});

//Percepcion
new Chart(document.getElementById('radarChart'), {
    type: 'bar',
    data: {
        labels: ['Calidad', 'Confianza', 'Riesgo', 'Incertidumbre'],
        datasets: [{
            label: 'Percepción IA',
            data: [
                data.percepcion_scores.calidad,
                data.percepcion_scores.confianza,
                data.percepcion_scores.riesgo,
                data.percepcion_scores.incertidumbre
            ]
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 10 // 🔥 importante porque tu escala es 1-10
            }
        }
    }
});


//RESULTADOS PERCEPCION
const contenedor = document.getElementById("resultado");

contenedor.innerHTML = `
    <h2>${data.marca}</h2>

    <div class="grid">

        <div class="card">
            <h3>Descripción</h3>
            <p>${data.descripcion}</p>
        </div>

        <div class="card">
            <h3>Identidad</h3>
            <p>${data.identidad}</p>
        </div>

        <div class="card">
            <h3>Público objetivo</h3>
            <p>${data.publico_objetivo}</p>
        </div>

        <div class="card">
            <h3>Problemas que resuelve</h3>
            <p>${data.problemas}</p>
        </div>

        <div class="card">
            <h3>Adjetivos</h3>
            <ul>
                ${data.adjetivos.map(a => `<span class="tag">${a}</span>`).join("")}
            </ul>
        </div>

        <div class="card">
            <h3>Competidores</h3>
            <ul>
                ${data.competidores.map(c => `<li>${c}</li>`).join("")}
            </ul>
        </div>

        <div class="card">
            <h3>Servicios</h3>
            <ul>
                ${data.servicios.map(s => `<li>${s}</li>`).join("")}
            </ul>
        </div>

    </div>
`;

//ANALISIS FINAL



const d = conclusiones_plan;

// helpers
const lista = (arr) => arr.map(i => `<li>${i}</li>`).join("");
const tags = (arr) => arr.map(i => `<span class="tag">${i}</span>`).join("");

// =======================
// TEXTO
// =======================
document.getElementById("resumen").innerText = d.resumen_ejecutivo;
document.getElementById("score").innerText = d.score_general;
document.getElementById("veredicto").innerText = d.veredicto;

// =======================
// LISTAS
// =======================
document.getElementById("hallazgos").innerHTML = lista(d.hallazgos_clave);
document.getElementById("oportunidades").innerHTML = lista(d.oportunidades);
document.getElementById("riesgos").innerHTML = lista(d.riesgos);

// =======================
// TAGS
// =======================
document.getElementById("fortalezas").innerHTML = tags(d.fortalezas);
document.getElementById("debilidades").innerHTML = tags(d.debilidades);

// =======================
// COMPARACION
// =======================
document.getElementById("competidor").innerText = d.comparacion_vs_competidor.competidor_referencia;
document.getElementById("ventajas").innerHTML = lista(d.comparacion_vs_competidor.ventaja_de_mi_empresa);
document.getElementById("desventajas").innerHTML = lista(d.comparacion_vs_competidor.desventaja_de_mi_empresa);
document.getElementById("gap").innerText = d.comparacion_vs_competidor.gap_principal;

// =======================
// RECOMENDACIONES
// =======================
document.getElementById("rec-inmediatas").innerHTML = lista(d.recomendaciones.inmediatas);
document.getElementById("rec-corto").innerHTML = lista(d.recomendaciones.corto_plazo);
document.getElementById("rec-mediano").innerHTML = lista(d.recomendaciones.mediano_plazo);

// =======================
// PLAN
// =======================
document.getElementById("plan").innerHTML = d.plan_de_accion.map(t => `
    <div class="plan-item">
        <strong>${t.tarea}</strong>
        <p>Prioridad: ${t.prioridad}</p>
        <p>Impacto: ${t.impacto}</p>
        <p>Esfuerzo: ${t.esfuerzo}</p>
        <p>${t.justificacion}</p>
    </div>
`).join("");

// =======================
// BARRAS
// =======================
document.getElementById("confianza-bar").style.width = (d.confianza_del_analisis * 100) + "%";

document.getElementById("cov-web").style.width = (d.cobertura_de_fuentes.website * 100) + "%";
document.getElementById("cov-men").style.width = (d.cobertura_de_fuentes.menciones * 100) + "%";
document.getElementById("cov-rank").style.width = (d.cobertura_de_fuentes.ranking * 100) + "%";
document.getElementById("cov-pre").style.width = (d.cobertura_de_fuentes.preguntas * 100) + "%";

// =======================
// IMPACTO
// =======================
document.getElementById("impacto").innerHTML = `
📈 Visibilidad: ${d.impacto_estimado.visibilidad} <br>
🏆 Ranking: ${d.impacto_estimado.ranking} <br>
💰 Conversión: ${d.impacto_estimado.conversion}
`;



});