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
        descripcion: "Marca confiable con enfoque en innovación",
        identidad: "Tecnológica, moderna y accesible",
        ubicacion: "la plata",
        pais: "argentina",
        relacion_precio: "",
        urlWebPage: "",
        adjetivos: ["Innovadora", "Confiable", "Ágil"],
        publico_objetivo: "Jóvenes profesionales interesados en tecnología",
        competidores: ["Empresa A", "Empresa B", "Empresa C"],
        problemas: "Falta de presencia digital consistente",
        servicios: ["Desarrollo web", "Marketing digital", "Consultoría"],
        menciones_competencia: [
            { nombre: datosEnviados.marca || "Mi Empresa", porcentaje: 21 },
            { nombre: "Empresa A", porcentaje: 25 },
            { nombre: "Empresa B", porcentaje: 80 },
            { nombre: "Empresa C", porcentaje: 100 },
            { nombre: "Empresa D", porcentaje: 50 },
            { nombre: "Empresa E", porcentaje: 10 }
        ],
        ranking_empresas: [
            { nombre: datosEnviados.marca || "Mi Empresa", score: 50 },
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
        percepcion_scores: { calidad: 8, confianza: 7, riesgo_e_incertidumbre: 3, atencion_al_cliente: 7, nivel_servicio: 6, presencia_en_la_web: 10 },
        principal_competidor: "Empresa C",
        percepcion_scores_competidor: { calidad: 7, confianza: 6, riesgo_e_incertidumbre: 6, atencion_al_cliente: 8, nivel_servicio: 5, presencia_en_la_web: 9 },
        conclusionJuez: {
            resumen_ejecutivo: "La marca presenta una percepción general positiva en términos de calidad y confianza, pero su visibilidad en resultados de IA es limitada frente a competidores más posicionados. Existe una brecha clara en posicionamiento digital y consistencia de contenido.",
            score_general: 62,
            veredicto: "Marca con buen potencial pero subexplotada en visibilidad y posicionamiento en IA.",
            hallazgos_clave: ["Alta valoración en calidad y confianza", "Baja aparición en rankings relevantes de IA", "Competidores dominan el share of voice", "Falta de consistencia en la comunicación digital"],
            fortalezas: ["Alta percepción de calidad del servicio", "Buena base de confianza inicial", "Identidad de marca moderna y tecnológica"],
            debilidades: ["Baja visibilidad en motores de IA", "Falta de contenido estratégico", "Escasa diferenciación frente a competidores"],
            riesgos: ["Pérdida de oportunidades frente a competidores mejor posicionados", "Desconexión entre percepción real y digital", "Quedar fuera de decisiones de usuarios que usan IA para elegir"],
            oportunidades: ["Optimizar contenido para aparecer en respuestas de IA", "Reforzar propuesta de valor", "Aumentar autoridad mediante contenido educativo", "Aprovechar ventaja en percepción de calidad"],
            comparacion_vs_competidor: {
                competidor_referencia: "Empresa C",
                ventaja_de_mi_empresa: ["Mayor percepción de calidad", "Mejor identidad de marca"],
                desventaja_de_mi_empresa: ["Menor visibilidad en IA", "Peor posicionamiento en rankings", "Menor volumen de menciones"],
                gap_principal: "La principal brecha está en visibilidad y presencia digital, no en calidad del producto."
            },
            recomendaciones: {
                inmediatas: ["Optimizar contenido web con foco en SEO semántico", "Definir claramente propuesta de valor en homepage", "Agregar testimonios y casos de éxito"],
                corto_plazo: ["Crear contenido orientado a preguntas frecuentes del rubro", "Mejorar estructura del sitio (headings, keywords, FAQs)", "Publicar comparativas con competidores"],
                mediano_plazo: ["Desarrollar estrategia de contenido continua", "Construir autoridad en el rubro (blog, guías, recursos)", "Optimizar presencia en múltiples canales digitales"]
            },
            plan_de_accion: [
                { tarea: "Optimizar homepage con propuesta de valor clara", prioridad: "alta", impacto: "Alto impacto en conversión y claridad", esfuerzo: "Medio", justificacion: "Actualmente no comunica claramente qué problema resuelve" },
                { tarea: "Crear sección de FAQs orientadas a IA", prioridad: "alta", impacto: "Aumenta visibilidad en respuestas de IA", esfuerzo: "Bajo", justificacion: "Las IA priorizan contenido estructurado y directo" },
                { tarea: "Generar artículos comparativos con competidores", prioridad: "media", impacto: "Mejora posicionamiento y diferenciación", esfuerzo: "Medio", justificacion: "Permite capturar búsquedas de intención comparativa" }
            ],
            confianza_del_analisis: 0.82,
            cobertura_de_fuentes: { website: 0.9, menciones: 0.85, ranking: 0.8, preguntas: 0.75 },
            impacto_estimado: { visibilidad: "+35%", ranking: "+20 posiciones", conversion: "+15%" }
        }
    };

    try {
        //const urlDelBackend = 'http://localhost:8000/evaluacion'; // CONFIRMAR URL
        //const respuesta = await fetch(urlDelBackend, {
        //    method: 'POST',
        //    headers: { 'Content-Type': 'application/json' },
        //    body: JSON.stringify(datosEnviados)
        //});

        //if (!respuesta.ok) throw new Error("Fallo en el servidor");
        //data = await respuesta.json(); 
        throw new Error("Modo de prueba activado (Sin Backend)");

    } catch (error) {
        console.warn("⚠️ Usando datos de respaldo. Error:", error);
        data = fallbackData; // Si falla, usamos la data de tu compañero
    }

    // ==========================================
    // 3. APAGAR SKELETON Y DIBUJAR GRÁFICOS
    // ==========================================
    setTimeout(() => {
        if(skeletonLoader) skeletonLoader.style.display = 'none'; 
        
        // Mostrar la pestaña Resumen (o la primera que tengas configurada)
        const tabActiva = document.querySelector('.tab-panel');
        if(tabActiva) tabActiva.classList.add('active');
        
        // 🔥 LLAMAMOS A LA FUNCIÓN CON LOS GRÁFICOS INTACTOS DE TU COMPAÑERO 🔥
        renderizarDashboard(data);
    }, 1500); // 1.5s extra para que la animación se vea bien

});

// ==========================================
// 4. TODO EL CÓDIGO ORIGINAL DE TU COMPAÑERO (Aislado y Protegido)
// ==========================================
function renderizarDashboard(data) {

    const conclusiones_plan = data.conclusionJuez;

    // =======================
    // MENCIONES
    // =======================
    const canvas = document.getElementById('mencionesChart');
    if(canvas) {
        const ordenadoMenciones = [...data.menciones_competencia]
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
                        ticks: { callback: (value) => value + "%" }
                    }
                },
                plugins: { legend: { display: false } }
            }
        });
    }

    // =======================
    // RANKING POR SCORE (EMPRESAS)
    // =======================
    const contenedorPreguntas = document.querySelector('.preguntas-ranking');
    if(contenedorPreguntas) {
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
    }

    const rankingCanvas = document.getElementById('rankingChart');
    if(rankingCanvas) {
        const rankingOrdenado = [...data.ranking_empresas].sort((a, b) => b.score - a.score);
        const coloresRanking = rankingOrdenado.map(e => e.nombre === data.marca ? '#22c55e' : '#64748b');

        new Chart(rankingCanvas, {
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
                plugins: { title: { display: true, text: 'Ranking de empresas (Score IA)' }, legend: { display: false } },
                scales: { y: { beginAtZero: true, max: 100 } }
            }
        });
    }

    // =======================
    // SCATTER - MAPA COMPETITIVO PRO
    // =======================
    const scatterCanvas = document.getElementById('scatterChart');
    if(scatterCanvas) {
        const palette = ['#3b82f6', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6', '#ec4899', '#22c55e'];
        const empresas = data.menciones_competencia.map((m, index) => {
            const ranking = data.ranking_empresas.find(r => r.nombre === m.nombre);
            return {
                nombre: m.nombre,
                x: m.porcentaje,
                y: ranking ? ranking.score : 0,
                color: m.nombre === data.marca ? '#22c55e' : palette[index % palette.length]
            };
        });

        const datasets = empresas.map(e => ({
            label: e.nombre,
            data: [{ x: e.x, y: e.y, nombre: e.nombre }],
            backgroundColor: e.color,
            borderColor: e.color,
            pointRadius: e.nombre === data.marca ? 10 : 6,
            pointHoverRadius: 12
        }));

        new Chart(scatterCanvas, {
            type: 'scatter',
            data: { datasets: datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    title: { display: true, text: 'Mapa competitivo: Visibilidad vs Ranking' },
                    legend: { position: 'bottom' },
                    tooltip: { callbacks: { label: function(context) { const d = context.raw; return `${d.nombre} → ${d.x}% menciones | score ${d.y}`; } } }
                },
                scales: {
                    x: { min: 0, max: 100, title: { display: true, text: '% Menciones (Visibilidad)' }, grid: { color: (ctx) => ctx.tick.value === 50 ? '#64748b' : '#334155' } },
                    y: { min: 0, max: 100, title: { display: true, text: 'Score Ranking' }, grid: { color: (ctx) => ctx.tick.value === 50 ? '#64748b' : '#334155' } }
                }
            }
        });
    }

    // =======================
    // RADAR - PERCEPCIÓN COMPLETA
    // =======================
    const radarCanvas = document.getElementById('radarChart');
    if(radarCanvas) {
        new Chart(radarCanvas, {
            type: 'radar',
            data: {
                labels: ['Calidad', 'Confianza', 'Riesgo e Incertidumbre', 'Atención al cliente', 'Nivel de servicio', 'Presencia en la web'],
                datasets: [{
                    label: data.marca,
                    data: [data.percepcion_scores.calidad, data.percepcion_scores.confianza, data.percepcion_scores.riesgo_e_incertidumbre, data.percepcion_scores.atencion_al_cliente, data.percepcion_scores.nivel_servicio, data.percepcion_scores.presencia_en_la_web]
                }]
            },
            options: { responsive: true, maintainAspectRatio: false, scales: { r: { min: 0, max: 10, ticks: { stepSize: 2 } } } }
        });
    }

    // =======================
    // RESULTADOS PERCEPCION INJECT
    // =======================
    const contenedor = document.getElementById("resultado");
    if(contenedor) {
        contenedor.innerHTML = `
            <h2>${data.marca}</h2>
            <div class="grid">
                <div class="card"><h3>Descripción</h3><p>${data.descripcion}</p></div>
                <div class="card"><h3>Identidad</h3><p>${data.identidad}</p></div>
                <div class="card"><h3>Público objetivo</h3><p>${data.publico_objetivo}</p></div>
                <div class="card"><h3>Problemas que resuelve</h3><p>${data.problemas}</p></div>
                <div class="card"><h3>Adjetivos</h3><ul>${data.adjetivos.map(a => `<span class="tag">${a}</span>`).join("")}</ul></div>
                <div class="card"><h3>Competidores</h3><ul>${data.competidores.map(c => `<li>${c}</li>`).join("")}</ul></div>
                <div class="card"><h3>Servicios</h3><ul>${data.servicios.map(s => `<li>${s}</li>`).join("")}</ul></div>
            </div>
        `;
    }

    // =======================
    // DUMBBELL CHART (PRO)
    // =======================
    const compCanvas = document.getElementById('comparacionChart');
    if(compCanvas) {
        const categorias = ['Calidad', 'Confianza', 'Riesgo', 'Atención', 'Servicio', 'Presencia Web'];
        const keys = ["calidad", "confianza", "riesgo_e_incertidumbre", "atencion_al_cliente", "nivel_servicio", "presencia_en_la_web"];
        
        const puntosMiMarca = categorias.map((cat, i) => ({ x: data.percepcion_scores[keys[i]], y: cat }));
        const puntosCompetidor = categorias.map((cat, i) => ({ x: data.percepcion_scores_competidor[keys[i]], y: cat }));

        new Chart(compCanvas, {
            type: 'bar',
            data: {
                labels: categorias,
                datasets: [
                    {
                        label: 'Diferencia',
                        data: categorias.map((_, i) => [Math.min(data.percepcion_scores[keys[i]], data.percepcion_scores_competidor[keys[i]]), Math.max(data.percepcion_scores[keys[i]], data.percepcion_scores_competidor[keys[i]])]),
                        backgroundColor: '#c9a85b', borderSkipped: false, barThickness: 6
                    },
                    { type: 'scatter', label: data.marca, data: puntosMiMarca, pointRadius: 6 },
                    { type: 'scatter', label: data.principal_competidor, data: puntosCompetidor, pointRadius: 6 }
                ]
            },
            options: { indexAxis: 'y', responsive: true, maintainAspectRatio: false, plugins: { title: { display: true, text: `Comparación vs ${data.principal_competidor}` } }, scales: { x: { min: 0, max: 10 } } }
        });
    }

    // =======================
    // HEATMAP DE GAPS
    // =======================
    const heatmapCanvas = document.getElementById('heatmapChart');
    if(heatmapCanvas) {
        const categoriasHeat = ["calidad", "confianza", "riesgo_e_incertidumbre", "atencion_al_cliente", "nivel_servicio", "presencia_en_la_web"];
        const labelsHeat = ["Calidad", "Confianza", "Riesgo", "Atención", "Servicio", "Web"];
        const gaps = categoriasHeat.map(k => data.percepcion_scores[k] - data.percepcion_scores_competidor[k]);

        new Chart(heatmapCanvas, {
            type: 'bar',
            data: {
                labels: labelsHeat,
                datasets: [{
                    label: 'Gap vs competidor',
                    data: gaps,
                    backgroundColor: gaps.map(v => v > 0 ? '#22c55e' : '#ef4444')
                }]
            },
            options: { plugins: { title: { display: true, text: 'Dónde ganás vs dónde perdés' } }, scales: { y: { min: -10, max: 10 } } }
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