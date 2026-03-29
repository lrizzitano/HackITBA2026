document.addEventListener("DOMContentLoaded", async () => {
    
    // ==========================================
    // 1. LÓGICA DE LAS PESTAÑAS Y SKELETON
    // ==========================================
    const tabs = document.querySelectorAll('.tab-btn');
    const panels = document.querySelectorAll('.tab-panel');
    const skeletonLoader = document.getElementById('skeleton-loader');
    const skeletonText = document.getElementById('skeleton-text');

    // Lógica de clics en pestañas
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            if(tab.classList.contains('active')) return;

            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');

            if(skeletonLoader) {
                skeletonLoader.classList.add('active');
                setTimeout(() => {
                    skeletonLoader.classList.remove('active');
                    const targetId = tab.getAttribute('data-target');
                    const targetPanel = document.getElementById(targetId);
                    if(targetPanel) targetPanel.classList.add('active');
                }, 600);
            } else {
                const targetId = tab.getAttribute('data-target');
                const targetPanel = document.getElementById(targetId);
                if(targetPanel) targetPanel.classList.add('active');
            }
        });
    });

    // Forzar inicio en el skeleton
    panels.forEach(p => p.classList.remove('active'));
    if(skeletonLoader) skeletonLoader.classList.add('active');

    // Efecto hacker en el texto de carga
    setTimeout(() => { if(skeletonText) skeletonText.innerText = "Consultando a GPT-4o y Claude 3..."; }, 1500);
    
    setTimeout(() => { if(skeletonText) skeletonText.innerText = "Midiendo Share of Voice y armando gráficos..."; }, 3500);
    setTimeout(() => { if(skeletonText) skeletonText.innerText = "Esto puede tomar un momento, por favor espere..."; }, 2000);
    setTimeout(() => { if(skeletonText) skeletonText.innerText = "Consultando a DeepSeek..."; }, 1500);
    setTimeout(() => { if(skeletonText) skeletonText.innerText = "Esperando respuesta de Gemini..."; }, 2000);
    setTimeout(() => { if(skeletonText) skeletonText.innerText = "Esto puede tomar un momento, por favor espere..."; }, 2000);

    // ==========================================
    // 2. RECUPERAR DATOS DEL FORMULARIO Y LLAMAR AL BACKEND
    // ==========================================
    const rawInputs = localStorage.getItem("geoInputs");
    let datosEnviados = rawInputs ? JSON.parse(rawInputs) : { marca: "Tu Empresa" };


    let data; // Acá guardaremos la respuesta
    

    // ESTOS SON LOS DATOS EXACTOS DE TU COMPAÑERO COMO RESPALDO (Plan B)
        const fallbackData = {
        marca: datosEnviados.marca || "Mi Empresa",
        rubro: "ropa",
        descripcion: "el centro del círculo se ubica justo sobre la última línea de la cuadrícula. Como tu punto tiene un radio (de 6 o 10 píxeles), la mitad del círculo queda fuera del  permitida y el canvas lo recorta",
        identidad: "Tecnológica, moderna y accesible",
        ubicacion: "la plata",
        relacion_precio: "",
        adjetivos: ["Innovadora", "Confiable", "Tecnologica"],
        publico_objetivo: "Jóvenes profesionales interesados en tecnología",
        problematica_que_resuelve: "Falta de presencia digital consistente", // NUEVO NOMBRE
        servicios: ["Desarrollo web", "Marketing digital", "Consultoría", "pizzas"],
        
        // NUEVO ARREGLO UNIFICADO
        kpis_empresas: [
            { nombre: datosEnviados.marca || "Mi Empresa", porcentaje: 21, ranking_promedio: 12 },
            { nombre: "Empresa A", porcentaje: 25, ranking_promedio: 10 },
            { nombre: "Empresa B", porcentaje: 80, ranking_promedio: 3 },
            { nombre: "Empresa C", porcentaje: 100, ranking_promedio: 1 },
            { nombre: "Empresa D", porcentaje: 50, ranking_promedio: 5 },
            { nombre: "Empresa E", porcentaje: 10, ranking_promedio: 15 },
            { nombre: "Empresa K", porcentaje: 10, ranking_promedio: 25 },
            { nombre: "Empresa EDSA", porcentaje: 10, ranking_promedio: 15 },
                        { nombre: "Empresa D", porcentaje: 50, ranking_promedio: 5 },
            { nombre: "Empresa E", porcentaje: 10, ranking_promedio: 15 },
            { nombre: "Empresa K", porcentaje: 10, ranking_promedio: 25 },
            { nombre: "Empresa EDSA", porcentaje: 10, ranking_promedio: 15 },
                        { nombre: "Empresa A", porcentaje: 25, ranking_promedio: 10 },
            { nombre: "Empresa B", porcentaje: 80, ranking_promedio: 3 },
            { nombre: "Empresa C", porcentaje: 10, ranking_promedio: 1 },
            { nombre: "Empresa D", porcentaje: 50, ranking_promedio: 5 },
            { nombre: "Empresa E", porcentaje: 90, ranking_promedio: 15 },
            { nombre: "Empresa K", porcentaje: 10, ranking_promedio: 55 },
            { nombre: "Empresa EDSA", porcentaje: 10, ranking_promedio: 1 },
                        { nombre: "Empresa D", porcentaje: 5, ranking_promedio: 5 },
            { nombre: "Empresa E", porcentaje: 10, ranking_promedio: 15 },
            { nombre: "Empresa K", porcentaje: 10, ranking_promedio: 25 },
            { nombre: "Empresa EDSA", porcentaje: 10, ranking_promedio: 15 }
        ],

        // LA DATA DE LAS PREGUNTAS (Por si el backend se olvida de mandarla)
        preguntas: {
            pregunta_bien_rankeado: "Quiero conocer las 10 mejores marcas en el rubro",
            pregunta_sin_aparicion: "Marcas con mejores recomendaciones"
        },

        percepcion_scores: { "percepcion": 5, "confianza": 10, "Relacion calidad precio": 3, "popularidad": 6, "diferenciacion": 8, "innovacion": 4, "propuesta de valor": 8, "publico objetivo": 4, "aspiracion": 1, "riesgo": 1 },
        principal_competidor: "Empresa C",
        percepcion_scores_competidor: { "percepcion": 9, "confianza": 10, "Relacion calidad precio": 6, "popularidad": 7, "diferenciacion": 5, "innovacion": 7, "propuesta de valor": 10, "publico objetivo": 9, "aspiracion": 2, "riesgo": 3 },
        
        // NUEVO NOMBRE (Plural)
        conclusionesJuez: {
            resumen_ejecutivo: "La marca presenta una percepción general positiva en términos de calidad y confianza...",
            score_general: 62,
            veredicto: "Marca con buen potencial pero subexplotada en visibilidad y posicionamiento en IA.",
            hallazgos_clave: [ "Alta valoración en calidad y confianza", "Baja aparición en rankings relevantes de IA", "Competidores dominan el share of voice", "Falta de consistencia en la comunicación digital" ],
            evidencias_clave: [ "Score de calidad: 8/10 y confianza: 7/10", "Share of voice inferior al 25% frente a competidores con >50%", "Ranking promedio por debajo de competidores principales", "Sitio web con contenido limitado y poco optimizado" ],
            brechas_detectadas: { visibilidad: [ "Baja presencia en respuestas generadas por IA", "Poca indexación semántica del contenido web" ], posicionamiento: [ "No aparece en top 3 de rankings clave", "Competidores dominan keywords del rubro" ], diferenciacion: [ "Propuesta de valor poco clara", "Mensajes similares a la competencia" ], confianza: [ "Falta de testimonios o validación social", "Poca autoridad percibida en el contenido" ], claridad_oferta: [ "Servicios poco explicados", "No se destacan beneficios concretos" ], contenido_web: [ "Contenido escaso y poco optimizado para IA", "Falta de estructura semántica clara" ], consistencia_marca: [ "Diferencias entre mensaje web y percepción IA", "Identidad no consolidada en todos los canales" ] },
            fortalezas: [ "Alta percepción de calidad del servicio", "Buena base de confianza inicial", "Identidad de marca moderna y tecnológica", "queso" ],
            debilidades: [ "Baja visibilidad en motores de IA", "Falta de contenido estratégico", "Escasa diferenciación frente a competidores" ],
            riesgos: [ "Pérdida de oportunidades frente a competidores mejor posicionados", "Desconexión entre percepción real y digital", "Quedar fuera de decisiones de usuarios que usan IA para elegir" ],
            oportunidades: [ "Optimizar contenido para aparecer en respuestas de IA", "Reforzar propuesta de valor", "Aumentar autoridad mediante contenido educativo", "Aprovechar ventaja en percepción de calidad" ],
            comparacion_vs_competidor: { competidor_referencia: "Empresa C", ventaja_de_mi_empresa: [ "Mayor percepción de calidad", "Mejor identidad de marca" ], desventaja_de_mi_empresa: [ "Menor visibilidad en IA", "Peor posicionamiento en rankings", "Menor volumen de menciones" ], gap_principal: "La principal brecha está en visibilidad y presencia digital, no en calidad del producto." },
            recomendaciones: { inmediatas: [ "Optimizar contenido web con foco en SEO semántico", "Definir claramente propuesta de valor en homepage", "Agregar testimonios y casos de éxito" ], corto_plazo: [ "Crear contenido orientado a preguntas frecuentes del rubro", "Mejorar estructura del sitio (headings, keywords, FAQs)", "Publicar comparativas con competidores" ], mediano_plazo: [ "Desarrollar estrategia de contenido continua", "Construir autoridad en el rubro (blog, guías, recursos)", "Optimizar presencia en múltiples canales digitales" ] },
            plan_de_accion: [ { tarea: "Optimizar homepage con propuesta de valor clara", prioridad: "alta", impacto: "Alto impacto en conversión y claridad", esfuerzo: "Medio", justificacion: "Actualmente no comunica claramente qué problema resuelve" }, { tarea: "Crear sección de FAQs orientadas a IA", prioridad: "alta", impacto: "Aumenta visibilidad en respuestas de IA", esfuerzo: "Bajo", justificacion: "Las IA priorizan contenido estructurado y directo" }, { tarea: "Generar artículos comparativos con competidores", prioridad: "media", impacto: "Mejora posicionamiento y diferenciación", esfuerzo: "Medio", justificacion: "Permite capturar búsquedas de intención comparativa" } ],
            confianza_del_analisis: 0.82,
            cobertura_de_fuentes: { website: 0.9, menciones: 0.85, ranking: 0.8, preguntas: 0.75 },
            impacto_estimado: { visibilidad: "+35%", ranking: "+20 posiciones", conversion: "+15%" }
        }
    };

    try {
        // 🔥 ATENCIÓN: Esta línea fuerza el modo prueba (Skeleton -> Gráficos sin backend)
        // BORREN O COMENTEN ESTA LÍNEA MAÑANA CUANDO EL BACKEND ESTÉ ANDANDO.
        throw new Error("Modo de prueba activado (Sin Backend)");
        console.log(datosEnviados);

        const urlDelBackend = 'http://localhost:8000/evaluacion';

        const parametros = new URLSearchParams(datosEnviados).toString();

        const urlFinal = `${urlDelBackend}?${parametros}`;

        const respuesta = await fetch(urlFinal, {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json' // Opcional en GET, pero no hace daño dejarlo
            }
        });
        
        data = await respuesta.json(); 

    } catch (error) {
        console.warn("⚠️ Usando datos de respaldo. Error:", error);
        data = fallbackData; // Si falla, usamos la data de tu compañero
        console.log(error);
    }

    // ==========================================
    // 3. APAGAR SKELETON Y MOSTRAR GRÁFICOS
    // ==========================================
    setTimeout(() => {
        if(skeletonLoader) skeletonLoader.style.display = 'none'; 
        
        // Mostrar la primera pestaña
        const tabActiva = document.querySelector('.tab-panel');
        if(tabActiva) tabActiva.classList.add('active');
        
        // LLAMAMOS A LA FUNCIÓN CON TODO EL CÓDIGO DE TU COMPAÑERO INTACTO
        renderizarDashboard(data);
    }, 4500); // Le doy 4.5s para que se luzca toda la lectura hacker verde

});

// ==========================================
// 4. EL CÓDIGO DE TU COMPAÑERO (Aislado y Seguro)
// ==========================================
// ==========================================
// 4. EL CÓDIGO DE TU COMPAÑERO ADAPTADO AL NUEVO JSON
// ==========================================
function renderizarDashboard(data) {

    // SOPORTE: Aceptamos "conclusionesJuez" (nuevo) o "conclusionJuez" (viejo)
    const conclusiones_plan = data.conclusionesJuez || data.conclusionJuez;
    console.log("Conclusiones del análisis:", conclusiones_plan);

    // =======================
    // MENCIONES (Usa kpis_empresas)
    // =======================
    const canvas = document.getElementById('mencionesChart');
    if(canvas && data.kpis_empresas) {
        // Ordenar por porcentaje
        const ordenadoMenciones = [...data.kpis_empresas]
            .sort((a, b) => b.porcentaje - a.porcentaje);

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
                    borderRadius: 6
                }]
            },
            options: {
                indexAxis: 'y', 
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: { display: true, color: '#ffffff', font: { size: 20, weight: 'bold' }, padding: { bottom: 20 } },
                    legend: { display: false }
                },
                scales: {
                    x: { beginAtZero: true, max: 100, ticks: { callback: (value) => value + "%", color: '#ffffff', font: { size: 14, weight: 'bold' } }, grid: { color: 'rgba(255, 255, 255, 0.15)', tickColor: 'transparent' } },
                    y: { ticks: { color: '#e2e8f0', font: { size: 14 } }, grid: { display: false } }
                }
            }
        });
    }

    // =======================
    // RANKING (Usa kpis_empresas)
    // =======================
    const rankingCanvas = document.getElementById('rankingChart');
    if(rankingCanvas && data.kpis_empresas) {
        // Ordenar por ranking promedio (si 1 es mejor, ordenamos de menor a mayor)
        const rankingOrdenado = [...data.kpis_empresas].sort((a, b) => a.ranking_promedio - b.ranking_promedio);
        const coloresRanking = rankingOrdenado.map(e => e.nombre === data.marca ? '#22c55e' : '#64748b');

        new Chart(rankingCanvas, {
            type: 'bar',
            data: {
                labels: rankingOrdenado.map(e => e.nombre),
                datasets: [{ label: 'Ranking Promedio', data: rankingOrdenado.map(e => e.ranking_promedio), backgroundColor: coloresRanking, borderRadius: 6 }]
            },
            plugins: [{
                id: 'numerosEnBarras',
                afterDatasetsDraw(chart) {
                    const { ctx } = chart;
                    chart.data.datasets.forEach((dataset, i) => {
                        chart.getDatasetMeta(i).data.forEach((bar, index) => {
                            const valor = dataset.data[index];
                            ctx.fillStyle = '#ffffff'; 
                            ctx.font = 'bold 13px sans-serif';
                            ctx.textAlign = 'left';
                            ctx.textBaseline = 'middle';
                            ctx.fillText(valor, bar.x + 8, bar.y);
                        });
                    });
                }
            }],
            options: {
                indexAxis: 'y', 
                responsive: true,
                maintainAspectRatio: false,
                layout: { padding: { right: 30 } },
                plugins: { title: { display: true, color: '#ffffff', font: { size: 20, weight: 'bold' }, padding: { bottom: 20 } }, legend: { display: false } },
                scales: {
                    x: { beginAtZero: true, ticks: { color: '#ffffff', font: { size: 14, weight: 'bold' } }, grid: { color: 'rgba(255, 255, 255, 0.15)', tickColor: 'transparent' } },
                    y: { ticks: { color: '#e2e8f0', font: { size: 14 } }, grid: { display: false } }
                }
            }
        });
    }

    // =======================
    // SCATTER - MAPA COMPETITIVO PRO (Unificado)
    // =======================
    const scatterCanvas = document.getElementById('scatterChart');
    if(scatterCanvas && data.kpis_empresas) {
        const palette = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#22c55e'];
        
        // Al estar en el mismo arreglo (kpis_empresas), es mucho más fácil mapear
        const empresas = data.kpis_empresas.map((m, index) => {
            return {
                nombre: m.nombre, 
                x: m.porcentaje, 
                y: m.ranking_promedio,
                color: m.nombre === data.marca ? '#22c55e' : palette[index % palette.length]
            };
        });

        const datasets = empresas.map(e => ({
            label: e.nombre, data: [{ x: e.x, y: e.y, nombre: e.nombre }],
            backgroundColor: e.color, borderColor: e.color, pointRadius: e.nombre === data.marca ? 10 : 6, pointHoverRadius: 12
        }));

        new Chart(scatterCanvas, {
            type: 'scatter',
            data: { datasets: datasets },
            options: {
                responsive: true, 
                maintainAspectRatio: false,
                
                // 🔥 LA MAGIA ESTÁ AQUÍ 🔥
                clip: false, // Evita que Chart.js "corte" los elementos que sobresalen del borde
                layout: {
                    padding: {
                        top: 20,    // Da aire arriba para que no se corte el punto más alto
                        right: 25,  // Da aire a la derecha para los puntos que llegan a 100%
                        left: 10,
                        bottom: 10
                    }
                },

                plugins: {
                    title: { display: true, color: '#ffffff', font: { size: 20, weight: 'bold' }, padding: { bottom: 20 } },
                    legend: { position: 'bottom', labels: { color: '#e2e8f0', font: { size: 13 }, padding: 20, usePointStyle: true } },
                    tooltip: { backgroundColor: 'rgba(15, 23, 42, 0.9)', titleFont: { size: 14 }, bodyFont: { size: 14 }, padding: 12, callbacks: { label: function(context) { const d = context.raw; return `${d.nombre} → ${d.x}% menciones | ranking ${d.y}`; } } }
                },
                scales: {
                    x: { 
                        min: 0, 
                        max: 100, 
                        title: { 
                            display: true, 
                            text: "% Visibilidad", // 🔥 ESTO ES LO QUE FALTABA 🔥
                            color: '#94a3b8', 
                            font: { size: 14, weight: 'bold' }, 
                            padding: { top: 10 } 
                        }, 
                        ticks: { color: '#e2e8f0', font: { size: 13 } }, 
                        grid: { color: (ctx) => ctx.tick.value === 50 ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.05)', tickColor: 'transparent' } 
                    },
                    y: { 
                        beginAtZero: true, 
                        title: { 
                            display: true, 
                            text: "Ranking Promedio", 
                            color: '#94a3b8', 
                            font: { size: 14, weight: 'bold' }, 
                            padding: { bottom: 10 } 
                        }, 
                        ticks: { color: '#e2e8f0', font: { size: 13 } }, 
                        grid: { color: 'rgba(255, 255, 255, 0.05)', tickColor: 'transparent' } 
                    }
                }
            }
        });
    }
    // =======================
    // RADAR - PERCEPCIÓN COMPLETA Y HEATMAP (Iguales)
    // =======================
    const compCanvas = document.getElementById('comparacionChart');
    if(compCanvas) {
        new Chart(compCanvas, {
            type: 'radar',
            data: {
                labels: [ "Percepción", "Confianza", "Relación calidad-precio", "Popularidad", "Diferenciación", "Innovación", "Propuesta de valor", "Público objetivo", "Aspiración", "Riesgo" ],
                datasets: [
                    { label: data.marca, data: [ data.percepcion_scores.percepcion, data.percepcion_scores.confianza, data.percepcion_scores["Relacion calidad precio"], data.percepcion_scores.popularidad, data.percepcion_scores.diferenciacion, data.percepcion_scores.innovacion, data.percepcion_scores["propuesta de valor"], data.percepcion_scores["publico objetivo"], data.percepcion_scores.aspiracion, data.percepcion_scores.riesgo ], backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 2, pointBackgroundColor: 'rgba(59, 130, 246, 1)' },
                    { label: data.principal_competidor, data: [ data.percepcion_scores_competidor.percepcion, data.percepcion_scores_competidor.confianza, data.percepcion_scores_competidor["Relacion calidad precio"], data.percepcion_scores_competidor.popularidad, data.percepcion_scores_competidor.diferenciacion, data.percepcion_scores_competidor.innovacion, data.percepcion_scores_competidor["propuesta de valor"], data.percepcion_scores_competidor["publico objetivo"], data.percepcion_scores_competidor.aspiracion, data.percepcion_scores_competidor.riesgo ], backgroundColor: 'rgba(220, 38, 38, 0.2)', borderColor: 'rgba(220, 38, 38, 1)', borderWidth: 2, pointBackgroundColor: 'rgba(220, 38, 38, 1)' }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#e2e8f0', font: { size: 14 } } } }, scales: { r: { min: 0, max: 10, ticks: { stepSize: 2, color: '#e9c46a', backdropColor: 'rgba(30, 41, 59, 0.8)', font: { size: 14, weight: 'bold' }, backdropPadding: 4 }, pointLabels: { color: '#e2e8f0', font: { size: 14 } }, grid: { color: 'rgba(255, 255, 255, 0.15)' }, angleLines: { color: 'rgba(255, 255, 255, 0.15)' } } } }
        });
    }

    const radarPuntajeCanvas = document.getElementById('radarChart');
    if(radarPuntajeCanvas) {
        new Chart(radarPuntajeCanvas, {
            type: 'radar',
            data: { labels: [ "Percepción", "Confianza", "Relación calidad-precio", "Popularidad", "Diferenciación", "Innovación", "Propuesta de valor", "Público objetivo", "Aspiración", "Riesgo" ], datasets: [ { label: data.marca, data: [ data.percepcion_scores.percepcion, data.percepcion_scores.confianza, data.percepcion_scores["Relacion calidad precio"], data.percepcion_scores.popularidad, data.percepcion_scores.diferenciacion, data.percepcion_scores.innovacion, data.percepcion_scores["propuesta de valor"], data.percepcion_scores["publico objetivo"], data.percepcion_scores.aspiracion, data.percepcion_scores.riesgo ], backgroundColor: 'rgba(59, 130, 246, 0.2)', borderColor: 'rgba(59, 130, 246, 1)', borderWidth: 2, pointBackgroundColor: 'rgba(59, 130, 246, 1)' } ] },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#e2e8f0', font: { size: 14 } } } }, scales: { r: { min: 0, max: 10, ticks: { stepSize: 2, color: '#e9c46a', backdropColor: 'rgba(30, 41, 59, 0.8)', font: { size: 14, weight: 'bold' }, backdropPadding: 4 }, pointLabels: { color: '#e2e8f0', font: { size: 14 } }, grid: { color: 'rgba(255, 255, 255, 0.15)' }, angleLines: { color: 'rgba(255, 255, 255, 0.15)' } } } }
        });
    }

    const heatmapCanvas = document.getElementById('heatmapChart');
    if(heatmapCanvas) {
        const categoriasHeat = [ "percepcion", "confianza", "Relacion calidad precio", "popularidad", "diferenciacion", "innovacion", "propuesta de valor", "publico objetivo", "aspiracion", "riesgo" ];
        const labelsHeat = [ "Percepción", "Confianza", "Relación calidad-precio", "Popularidad", "Diferenciación", "Innovación", "Propuesta de valor", "Público objetivo", "Aspiración", "Riesgo" ];
        const scoresMios = categoriasHeat.map(k => data.percepcion_scores[k]);
        const scoresCompetidor = categoriasHeat.map(k => data.percepcion_scores_competidor[k]);

        new Chart(heatmapCanvas, {
            type: 'bar',
            data: { labels: labelsHeat, datasets: [ { label: 'Mi Empresa', data: scoresMios, backgroundColor: '#2e7245', categoryPercentage: 0.5, barPercentage: 0.9 }, { label: 'Competidor', data: scoresCompetidor, backgroundColor: '#9ca3af', categoryPercentage: 0.5, barPercentage: 0.9 } ] },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, color: '#ffffff', font: { size: 20, weight: 'bold' }, padding: { bottom: 20 } }, legend: { labels: { color: '#e2f0e4', font: { size: 16 } } } }, scales: { x: { min: 0, max: 10, beginAtZero: true, ticks: { color: '#ffffff', font: { size: 14, weight: 'bold' } }, grid: { color: 'rgba(255, 255, 255, 0.15)', tickColor: 'transparent' } }, y: { ticks: { color: '#e9c46a', font: { size: 14 } }, grid: { color: 'rgba(255, 255, 255, 0.15)', tickColor: 'transparent' } } } }
        });
    }

    // =======================
    // ANALISIS FINAL DOM MANIPULATION
    // =======================
    const d = conclusiones_plan;
    const lista = (arr) => arr ? arr.map(i => `<li>${i}</li>`).join("") : "";
    const tags = (arr) => arr ? arr.map(i => `<span class="tag">${i}</span>`).join("") : "";

    const setTxt = (id, txt) => { const el = document.getElementById(id); if(el) el.innerText = txt; };
    const setHtml = (id, html) => { const el = document.getElementById(id); if(el) el.innerHTML = html; };

    // Inyectar HTML Dinámico adaptado
    const contenedor = document.getElementById("resultado");
    if(contenedor) {
        contenedor.innerHTML = `
            <h2 style="text-align: center; padding: 1px;"><span style="color:#e9c46a;"> ${data.marca} </span>A traves de los ojos de la IA</h2>
            <p style="margin: 5px;">Así es como los motores de Inteligencia Artificial entienden y catalogan a tu empresa actualmente. Revisá qué adjetivos asocian con tu nombre, qué problemas creen que resolvés y contra quiénes te están comparando orgánicamente<p>
            <div class="gridResultado">
                <div class="card"><h3>Descripción</h3><p>${data.descripcion}</p></div>
                <div class="card"><h3>Identidad</h3><p>${data.identidad}</p></div>
                <div class="card"><h3>Público objetivo</h3><p>${data.publico_objetivo}</p></div>
                <div class="card"><h3>Problemas que resuelve</h3><p>${data.problematica_que_resuelve || "N/A"}</p></div>
                <div class="card"><h3>Adjetivos</h3><ul>${tags(data.adjetivos)}</ul></div>
                
                <div class="card"><h3>Servicios</h3><ul>${lista(data.servicios)}</ul></div>
            </div>
        `;
    }

    // Llenar el resto de la página
    setTxt("resumen", d.resumen_ejecutivo);
    setTxt("score", d.score_general);
    setTxt("score-mini", d.score_general);
    setTxt("veredicto", d.veredicto);
    
    setHtml("hallazgos", lista(d.hallazgos_clave));
    setHtml("oportunidades", lista(d.oportunidades));
    setHtml("riesgos", lista(d.riesgos));
    setHtml("fortalezas", tags(d.fortalezas));
    setHtml("debilidades", tags(d.debilidades));

    if(d.comparacion_vs_competidor) {
        setTxt("competidor", d.comparacion_vs_competidor.competidor_referencia);
        setHtml("ventajas", lista(d.comparacion_vs_competidor.ventaja_de_mi_empresa));
        setHtml("desventajas", lista(d.comparacion_vs_competidor.desventaja_de_mi_empresa));
        setTxt("gap", d.comparacion_vs_competidor.gap_principal);
    }

    if(d.recomendaciones) {
        setHtml("rec-inmediatas", lista(d.recomendaciones.inmediatas));
        setHtml("rec-corto", lista(d.recomendaciones.corto_plazo));
        setHtml("rec-mediano", lista(d.recomendaciones.mediano_plazo));
    }

    if(d.plan_de_accion) {
        setHtml("plan", d.plan_de_accion.map(t => `
            <div class="plan-item">
                <strong>${t.tarea}</strong>
                <p>Prioridad: ${t.prioridad}</p>
                <p>Impacto: ${t.impacto}</p>
                <p>Esfuerzo: ${t.esfuerzo}</p>
                <p>${t.justificacion}</p>
            </div>
        `).join(""));
    }

    if(d.confianza_del_analisis) {
        const confBar = document.getElementById("confianza-bar");
        if(confBar) confBar.style.width = (d.confianza_del_analisis * 100) + "%";
    }

    if(d.cobertura_de_fuentes) {
        const covWeb = document.getElementById("cov-web");
        const covMen = document.getElementById("cov-men");
        const covRank = document.getElementById("cov-rank");
        const covPre = document.getElementById("cov-pre");
        
        if(covWeb) covWeb.style.width = (d.cobertura_de_fuentes.website * 100) + "%";
        if(covMen) covMen.style.width = (d.cobertura_de_fuentes.menciones * 100) + "%";
        if(covRank) covRank.style.width = (d.cobertura_de_fuentes.ranking * 100) + "%";
        if(covPre) covPre.style.width = (d.cobertura_de_fuentes.preguntas * 100) + "%";
    }

    if(d.impacto_estimado) {
        setHtml("impacto", `📈 Visibilidad: ${d.impacto_estimado.visibilidad} <br>🏆 Ranking: ${d.impacto_estimado.ranking} <br>💰 Conversión: ${d.impacto_estimado.conversion}`);
        setHtml("impacto-sidebar", `Visibilidad: ${d.impacto_estimado.visibilidad} <br>Ranking: ${d.impacto_estimado.ranking} <br>Conversión: ${d.impacto_estimado.conversion}`);
    }
}