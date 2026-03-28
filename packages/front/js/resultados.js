    //const data = JSON.parse(localStorage.getItem("resultadoAnalisis"));
document.addEventListener("DOMContentLoaded", () => {
    // TODO tu código acá

    const data = {
    marca: "Mi Empresa",
    percepcion: "Marca confiable pero con cierta incertidumbre en el mercado",
    errores: "Falta de presencia digital consistente",

    menciones: {
        positivas: 60,
        negativas: 25,
        neutras: 15
    },

    ranking: 7,

    percepcion_scores: {
        calidad: 8,
        confianza: 7,
        riesgo: 3,
        incertidumbre: 4
    }
    };

    //const contenedor = document.getElementById("resultado");
/*
    if (data) {
        contenedor.innerHTML = `
            <h2>Análisis de ${data.marca}</h2>
            <p><strong>Percepción IA:</strong> ${data.percepcion}</p>
            <p><strong>Errores:</strong> ${data.errores}</p>
        `;
    } else {
        contenedor.innerText = "No hay datos para mostrar";
    }
*/
    //Menciones
    const ctx = document.getElementById('mencionesChart');

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Positivas', 'Negativas', 'Neutras'],
            datasets: [{
                data: [
                data.menciones.positivas,
                data.menciones.negativas,
                data.menciones.neutras
]
            }]
        }
    });

    //ranking barras

    new Chart(document.getElementById('rankingChart'), {
    type: 'bar',
    data: {
        labels: ['Ranking General'],
        datasets: [{
            label: 'Posición',
            data: [data.ranking]
        }]
    }
});

//Percepcion
new Chart(document.getElementById('bar'), {
    type: 'radar',
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
    }
});

});