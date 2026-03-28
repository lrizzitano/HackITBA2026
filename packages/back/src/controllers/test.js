export default function getTestData(req,res)
{
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
        riesgo_e_incertidumbre: 3,
        atencion_al_cliente: 7,
        nivel_servicio: 6,
        presencia_en_la_web: 10
    },

    // =======================
    // PERCEPCIÓN (COMPETIDOR)
    // =======================
    principal_competidor:"Empresa C",
    percepcion_scores_competidor: {
        calidad: 7,
        confianza: 6,
        riesgo_e_incertidumbre: 6,
        atencion_al_cliente: 8,
        nivel_servicio: 5,
        presencia_en_la_web: 9
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
    }

};

    res.status(200).json(data)
}