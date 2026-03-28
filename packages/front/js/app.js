
        const form = document.getElementById('dataForm');
        const resultadoDiv = document.getElementById('resultado');
        const btnAnalizar = document.getElementById('btnAnalizar');

        form.addEventListener('submit', async function(evento) {
            evento.preventDefault(); 

            btnAnalizar.innerText = "Analizando...";
            resultadoDiv.style.display = "block";
            resultadoDiv.innerText = "Conectando con el backend...";

            // JSON ACTUALIZADO PARA EL BACKEND CON LA MARCA
            const datosParaBackend = {
                marca: document.getElementById('marca').value,
                website: document.getElementById('website').value, // ✅ NUEVO
                rubro: document.getElementById('rubro').value,
                ubicacion: document.getElementById('ubicacion').value,
                empleados: document.getElementById('empleados').value, // ✅ NUEVO
                precio_min: Number(document.getElementById('precioMin').value),
                precio_max: Number(document.getElementById('precioMax').value)
            };

            try {
                const urlDelBackend = 'http://localhost:8000/evaluacion'; 

                const respuesta = await fetch(urlDelBackend, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'

                    },
                    body: JSON.stringify(datosParaBackend)
                });

                const datosRecibidos = await respuesta.json();

                // guardar datos para la otra página
                localStorage.setItem("resultadoAnalisis", JSON.stringify(datosRecibidos));

                // redirigir
                window.location.href = "resultados.html";

            } catch (error) {
                console.error("Error en la conexión:", error);
                resultadoDiv.innerText = "Error de conexión. ¿Está el backend encendido y en la URL correcta?";
            } finally {
                btnAnalizar.innerText = "Generar Análisis";
            }
        });
