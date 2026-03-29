    
document.addEventListener("DOMContentLoaded", () => {
//    const data = JSON.parse(localStorage.getItem("resultadoAnalisis"));
   // --- LÓGICA DE LAS PESTAÑAS (El efecto "PPT Web") ---
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Sacar active de todos
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Poner active al clickeado
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

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

    servicios: ["Desarrollo web", "Marketing digital", "Consultoría","pizzas"],

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
  "percepcion": 5,
  "confianza": 10,
  "Relacion calidad precio": 3,
  "popularidad": 6,
  "diferenciacion": 8,
  "innovacion": 4,
  "propuesta de valor": 8,
  "publico objetivo": 4,
  "aspiracion": 1,
  "riesgo": 1

    },

    // =======================
    // PERCEPCIÓN (COMPETIDOR)
    // =======================
    principal_competidor:"Empresa C",
    percepcion_scores_competidor: {
  "percepcion": 9,
  "confianza": 10,
  "Relacion calidad precio": 6,
  "popularidad": 7,
  "diferenciacion": 5,
  "innovacion": 7,
  "propuesta de valor": 10,
  "publico objetivo": 9,
  "aspiracion": 2,
  "riesgo": 3

    },

    conclusionJuez:{
        
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
    "Identidad de marca moderna y tecnológica",
    "queso"
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
    }

};

const conclusiones_plan = data.conclusionJuez;
console.log("Conclusiones del análisis:", conclusiones_plan

    
);
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
new Chart(canvas, {
    type: 'bar',
    data: {
        labels: ordenadoMenciones.map(e => e.nombre),
        datasets: [{
            label: '% de menciones',
            data: ordenadoMenciones.map(e => e.porcentaje),
            backgroundColor: colores,
            borderRadius: 6 // Mantiene el estilo redondeado y moderno
        }]
    },
    options: {
        indexAxis: 'y', // <--- Barras horizontales
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            // Te agregué el título con el mismo formato para mantener consistencia
            title: {
                display: true,
                text: 'Porcentaje de Menciones por Marca',
                color: '#ffffff',
                font: {
                    size: 20,
                    weight: 'bold'
                },
                padding: { bottom: 20 }
            },
            legend: { 
                display: false // Oculto, ya que los colores hablan por sí solos
            }
        },

        scales: {
            x: { // <--- EJE X (Los números con %)
                beginAtZero: true,
                max: 100,
                ticks: {
                    callback: (value) => value + "%", // Tu función original (¡muy buena!)
                    color: '#ffffff', // Números en blanco
                    font: {
                        size: 14,
                        weight: 'bold' // Negrita para destacar el %
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.15)', // Líneas verticales sutiles de guía
                    tickColor: 'transparent'
                }
            },
            y: { // <--- EJE Y (Los nombres de las empresas)
                ticks: {
                    color: '#e2e8f0', // Nombres en gris claro
                    font: {
                        size: 14
                    }
                },
                grid: {
                    display: false // Apagamos las líneas horizontales para que el diseño respire
                }
            }
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
            borderRadius: 6 // Mantenemos tus bordes redondeados que quedan muy bien
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            // 1. MEJORA DEL TÍTULO
            title: {
                display: true,
                text: 'Ranking de empresas (Score IA)',
                color: '#ffffff', // Título en blanco
                font: {
                    size: 20, // Más grande
                    weight: 'bold'
                },
                padding: { bottom: 20 }
            },
            legend: {
                display: false // Mantenemos esto apagado ya que el color explica la barra
            }
        },

        scales: {
            x: { // <--- EJE X (Nombres de las empresas)
                ticks: {
                    color: '#e2e8f0', // Nombres en gris claro
                    font: {
                        size: 14 // Texto más legible
                    }
                },
                grid: {
                    display: false // Ocultamos las líneas verticales para limpiar el diseño
                }
            },
            y: { // <--- EJE Y (Números 0 - 100)
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: '#ffffff', // Números en blanco puro
                    font: {
                        size: 14,
                        weight: 'bold' // Negrita para el score
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.15)', // Líneas horizontales sutiles
                    tickColor: 'transparent' // Quitamos la pequeña rayita que une el número con la línea
                }
            }
        }
    }
});


// =======================
// SCATTER - MAPA COMPETITIVO PRO
// =======================

// paleta simple (puedes ampliarla)
const palette = [
    '#3b82f6', '#ef4444', '#f59e0b',
    '#10b981', '#8b5cf6', '#ec4899',
    '#22c55e'
];

// unir data
const empresas = data.menciones_competencia.map((m, index) => {
    const ranking = data.ranking_empresas.find(r => r.nombre === m.nombre);

    return {
        nombre: m.nombre,
        x: m.porcentaje,
        y: ranking ? ranking.score : 0,
        color: m.nombre === data.marca
            ? '#22c55e' // 👈 tu empresa destacada
            : palette[index % palette.length]
    };
});

// 👉 crear UN dataset por empresa
const datasets = empresas.map(e => ({
    label: e.nombre,
    data: [{ x: e.x, y: e.y, nombre: e.nombre }],
    backgroundColor: e.color,
    borderColor: e.color,
    pointRadius: e.nombre === data.marca ? 10 : 6,
    pointHoverRadius: 12
}));

new Chart(document.getElementById('scatterChart'), {
    type: 'scatter',
    data: {
        datasets: datasets
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            // 1. MEJORA DEL TÍTULO
            title: {
                display: true,
                text: 'Mapa Competitivo: Visibilidad vs Ranking',
                color: '#ffffff', // Título en blanco puro
                font: {
                    size: 20,     // Mismo tamaño que los demás gráficos
                    weight: 'bold'
                },
                padding: { bottom: 20 }
            },
            
            // 2. MEJORA DE LA LEYENDA (Abajo)
            legend: {
                position: 'bottom',
                labels: {
                    color: '#e2e8f0', // Textos de la leyenda más claros
                    font: {
                        size: 13
                    },
                    padding: 20, // Más espacio entre la leyenda y el gráfico
                    usePointStyle: true // Hace que la leyenda muestre circulitos en vez de rectángulos (queda muy elegante)
                }
            },
            
            // 3. MEJORA DEL TOOLTIP (Al pasar el mouse)
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)', // Fondo más oscuro y sólido
                titleFont: { size: 14 },
                bodyFont: { size: 14 },
                padding: 12,
                callbacks: {
                    label: function(context) {
                        const d = context.raw;
                        return `${d.nombre} → ${d.x}% menciones | score ${d.y}`;
                    }
                }
            }
        },

        scales: {
            x: {
                min: 0,
                max: 100,
                // 4. MEJORA DE TÍTULOS Y NÚMEROS DEL EJE X
                title: {
                    display: true,
                    text: '% Menciones (Visibilidad)',
                    color: '#94a3b8', // Título del eje en un gris intermedio
                    font: { size: 14, weight: 'bold' },
                    padding: { top: 10 }
                },
                ticks: {
                    color: '#e2e8f0', // Números claros
                    font: { size: 13 }
                },
                grid: {
                    // Mantengo tu excelente lógica para el cuadrante central, 
                    // solo ajusté los colores para que resalte la cruz central (50)
                    color: (ctx) => ctx.tick.value === 50 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    tickColor: 'transparent'
                }
            },
            y: {
                min: 0,
                max: 100,
                // 5. MEJORA DE TÍTULOS Y NÚMEROS DEL EJE Y
                title: {
                    display: true,
                    text: 'Score Ranking',
                    color: '#94a3b8', // Título del eje en un gris intermedio
                    font: { size: 14, weight: 'bold' },
                    padding: { bottom: 10 }
                },
                ticks: {
                    color: '#e2e8f0', // Números claros
                    font: { size: 13 }
                },
                grid: {
                    // Misma lógica de color que en el eje X para la cruz central
                    color: (ctx) => ctx.tick.value === 50 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                    tickColor: 'transparent'
                }
            }
        }
    }
});


// =======================
// RADAR - PERCEPCIÓN COMPLETA
// =======================

new Chart(document.getElementById('comparacionChart'), {
    type: 'radar',
    data: {
        labels: [
            "Percepción",
            "Confianza",
            "Relación calidad-precio",
            "Popularidad",
            "Diferenciación",
            "Innovación",
            "Propuesta de valor",
            "Público objetivo",
            "Aspiración",
            "Riesgo"
        ],
        datasets: [
            {
                label: data.marca, // Tu marca
                data: [
                    data.percepcion_scores.percepcion,
                    data.percepcion_scores.confianza,
                    data.percepcion_scores["Relacion calidad precio"],
                    data.percepcion_scores.popularidad,
                    data.percepcion_scores.diferenciacion,
                    data.percepcion_scores.innovacion,
                    data.percepcion_scores["propuesta de valor"],
                    data.percepcion_scores["publico objetivo"],
                    data.percepcion_scores.aspiracion,
                    data.percepcion_scores.riesgo
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)'
            },
            {
                label: data.principal_competidor, // Competidor
                data: [
                    data.percepcion_scores_competidor.percepcion,
                    data.percepcion_scores_competidor.confianza,
                    data.percepcion_scores_competidor["Relacion calidad precio"],
                    data.percepcion_scores_competidor.popularidad,
                    data.percepcion_scores_competidor.diferenciacion,
                    data.percepcion_scores_competidor.innovacion,
                    data.percepcion_scores_competidor["propuesta de valor"],
                    data.percepcion_scores_competidor["publico objetivo"],
                    data.percepcion_scores_competidor.aspiracion,
                    data.percepcion_scores_competidor.riesgo
                ],
                backgroundColor: 'rgba(220, 38, 38, 0.2)',
                borderColor: 'rgba(220, 38, 38, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(220, 38, 38, 1)'
            }
        ]
    },
    options: {
    responsive: true,
    maintainAspectRatio: false,
    // (Opcional) Mejoramos también el texto de la leyenda superior
    plugins: {
        legend: {
            labels: {
                color: '#e2e8f0', // Un gris clarito
                font: { size: 14 }
            }
        }
    },
    scales: {
        r: {
            min: 0,
            max: 10,
            
            // 1. LOS NÚMEROS DEL CENTRO (Ticks)
            ticks: {
                stepSize: 2,
                color: '#e9c46a', // Color del número (blanco)
                backdropColor: 'rgba(30, 41, 59, 0.8)', // Un fondo oscuro detrás de cada número para que no se mezcle con las líneas rojas/azules
                font: {
                    size: 14,     // Tamaño más grande
                    weight: 'bold' // Negrita para mayor legibilidad
                },
                backdropPadding: 4 // Un poco de aire alrededor del número
            },

            // 2. LAS CATEGORÍAS ALREDEDOR (Point Labels)
            pointLabels: {
                color: '#e2e8f0', // Letra clara para contrastar con tu fondo oscuro
                font: {
                    size: 14 // Aumentamos el tamaño de "Percepción", "Confianza", etc.
                }
            },

            // 3. LA TELARAÑA: Círculos concéntricos
            grid: {
                color: 'rgba(255, 255, 255, 0.15)', // Hacemos las líneas de la red más visibles (blanco semitransparente)
            },

            // 4. LA TELARAÑA: Líneas que van del centro hacia afuera
            angleLines: {
                color: 'rgba(255, 255, 255, 0.15)', // Mismo color que la red para que coincida
            }
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



new Chart(document.getElementById('radarChart'), {
    type: 'radar',
    data: {
        labels: [
            "Percepción",
            "Confianza",
            "Relación calidad-precio",
            "Popularidad",
            "Diferenciación",
            "Innovación",
            "Propuesta de valor",
            "Público objetivo",
            "Aspiración",
            "Riesgo"
        ],
        datasets: [
            {
                label: data.marca, // Tu marca
                data: [
                    data.percepcion_scores.percepcion,
                    data.percepcion_scores.confianza,
                    data.percepcion_scores["Relacion calidad precio"],
                    data.percepcion_scores.popularidad,
                    data.percepcion_scores.diferenciacion,
                    data.percepcion_scores.innovacion,
                    data.percepcion_scores["propuesta de valor"],
                    data.percepcion_scores["publico objetivo"],
                    data.percepcion_scores.aspiracion,
                    data.percepcion_scores.riesgo
                ],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)'
            }
        ]
    },
options: {
    responsive: true,
    maintainAspectRatio: false,
    // (Opcional) Mejoramos también el texto de la leyenda superior
    plugins: {
        legend: {
            labels: {
                color: '#e2e8f0', // Un gris clarito
                font: { size: 14 }
            }
        }
    },
    scales: {
        r: {
            min: 0,
            max: 10,
            
            // 1. LOS NÚMEROS DEL CENTRO (Ticks)
            ticks: {
                stepSize: 2,
                color: '#e9c46a', // Color del número (blanco)
                backdropColor: 'rgba(30, 41, 59, 0.8)', // Un fondo oscuro detrás de cada número para que no se mezcle con las líneas rojas/azules
                font: {
                    size: 14,     // Tamaño más grande
                    weight: 'bold' // Negrita para mayor legibilidad
                },
                backdropPadding: 4 // Un poco de aire alrededor del número
            },

            // 2. LAS CATEGORÍAS ALREDEDOR (Point Labels)
            pointLabels: {
                color: '#e2e8f0', // Letra clara para contrastar con tu fondo oscuro
                font: {
                    size: 14 // Aumentamos el tamaño de "Percepción", "Confianza", etc.
                }
            },

            // 3. LA TELARAÑA: Círculos concéntricos
            grid: {
                color: 'rgba(255, 255, 255, 0.15)', // Hacemos las líneas de la red más visibles (blanco semitransparente)
            },

            // 4. LA TELARAÑA: Líneas que van del centro hacia afuera
            angleLines: {
                color: 'rgba(255, 255, 255, 0.15)', // Mismo color que la red para que coincida
            }
        }
    }
}
});// =======================
// HEATMAP DE GAPS
// =======================
const categoriasHeat = [
    "percepcion", "confianza", "Relacion calidad precio", "popularidad",
    "diferenciacion", "innovacion", "propuesta de valor", "publico objetivo",
    "aspiracion", "riesgo"
];

const labelsHeat = [
    "Percepción", "Confianza", "Relación calidad-precio", "Popularidad",
    "Diferenciación", "Innovación", "Propuesta de valor", "Público objetivo",
    "Aspiración", "Riesgo"
];

// Extraemos los puntajes crudos en lugar del gap
const scoresMios = categoriasHeat.map(k => data.percepcion_scores[k]);
const scoresCompetidor = categoriasHeat.map(k => data.percepcion_scores_competidor[k]);

new Chart(document.getElementById('heatmapChart'), {
    type: 'bar',
    data: {
        labels: labelsHeat,
        datasets: [
            {
                label: 'Mi Empresa',
                data: scoresMios,
                // Mantenemos tus colores originales para las barras
                backgroundColor: '#2e7245' // Verde
            },
            {
                label: 'Competidor',
                data: scoresCompetidor,
                backgroundColor: '#9ca3af' // Gris
            }
        ]
    },
    options: {
        indexAxis: 'y', // <--- Gira el gráfico
        responsive: true,
        maintainAspectRatio: false, // Importante para que ocupe todo su contenedor
        
        plugins: {
            // 1. MEJORA DE TÍTULO
            title: {
                display: true,
                text: 'Mi Empresa vs Competidor por Categoría',
                color: '#ffffff', // Título en blanco puro
                font: {
                    size: 20, // Título más grande
                    weight: 'bold'
                },
                padding: { bottom: 20 }
            },
            // 2. MEJORA DE LA LEYENDA (Los cuadraditos superiores)
            legend: {
                labels: {
                    color: '#e2e8f0', // Texto de leyenda claro (gris clarito)
                    font: {
                        size: 16 // Leyenda más grande
                    }
                }
            }
        },
        scales: {
            x: { // <--- EJE DE NÚMEROS (0-10)
                min: 0,
                max: 10,
                beginAtZero: true,
                
                // 3. MEJORA DE LOS NÚMEROS (0-10)
                ticks: {
                    color: '#ffffff', // Números en blanco puro
                    font: {
                        size: 14, // Números más grandes
                        weight: 'bold'
                    }
                },
                
                // 4. MEJORA DE LA RED VERTICAL ("Telaraña")
                grid: {
                    color: 'rgba(255, 255, 255, 0.15)', // Líneas verticales claras pero sutiles
                    tickColor: 'transparent' // Limpiamos la línea base del eje
                }
            },
            y: { // <--- EJE DE CATEGORÍAS (Texto a la izquierda)
                
                // 5. MEJORA DE LAS ETIQUETAS DE TEXTO
                ticks: {
                    color: '#e2e8f0', // Texto de categorías claro (gris clarito)
                    font: {
                        size: 14 // Categorías más grandes
                    }
                },
                
                // 6. MEJORA DE LA RED HORIZONTAL ("Telaraña")
                grid: {
                    color: 'rgba(255, 255, 255, 0.15)', // Líneas horizontales claras pero sutiles
                    tickColor: 'transparent' // Limpiamos la línea base del eje
                }
            }
        }
    }
});
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
document.getElementById("score-mini").innerText = d.score_general;
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

    document.getElementById("impacto-sidebar").innerHTML = `
         Visibilidad: ${d.impacto_estimado.visibilidad} <br>
        Ranking: ${d.impacto_estimado.ranking} <br>
         Conversión: ${d.impacto_estimado.conversion}
    `;



});