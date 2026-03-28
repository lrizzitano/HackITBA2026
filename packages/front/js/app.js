// --- LÓGICA DE LOS MODALES ---
document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los Modales
    const modalAuditoria = document.getElementById('modalAuditoria');
    const modalLogin = document.getElementById('modalLogin');
    
    // TODOS los botones que abren Auditoría
    const btnOpenAuditoriaNav = document.getElementById('btnOpenAuditoriaNav');
    const btnOpenAuditoriaBtn = document.getElementById('btnOpenAuditoriaBtn');
    const btnOpenAuditoriaHero = document.getElementById('btnOpenAuditoriaHero'); // <-- NUEVO
    const btnOpenAuditoriaPricing1 = document.getElementById('btnOpenAuditoriaPricing1'); // <-- NUEVO
    const btnOpenAuditoriaPricing2 = document.getElementById('btnOpenAuditoriaPricing2'); // <-- NUEVO
    
    // Botón para abrir Login
    const btnOpenLogin = document.getElementById('btnOpenLogin');

    // Función genérica para abrir un modal
    const openModal = (e, modal) => { 
        if(e) e.preventDefault(); 
        modal.style.display = 'flex'; 
    };

    // Asignar eventos de apertura a TODOS los botones
    if(btnOpenAuditoriaNav) btnOpenAuditoriaNav.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaBtn) btnOpenAuditoriaBtn.addEventListener('click', (e) => openModal(e, modalAuditoria));
    
    // <-- NUEVOS EVENTOS -->
    if(btnOpenAuditoriaHero) btnOpenAuditoriaHero.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaPricing1) btnOpenAuditoriaPricing1.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaPricing2) btnOpenAuditoriaPricing2.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenLogin) btnOpenLogin.addEventListener('click', (e) => openModal(e, modalLogin));

    // Asignar eventos de cierre (la X)
    if(closeAuditoria) closeAuditoria.addEventListener('click', () => modalAuditoria.style.display = 'none');
    if(closeLogin) closeLogin.addEventListener('click', () => modalLogin.style.display = 'none');

    // Cerrar el modal si hacen clic afuera de la caja
    window.addEventListener('click', (e) => {
        if (e.target === modalAuditoria) modalAuditoria.style.display = 'none';
        if (e.target === modalLogin) modalLogin.style.display = 'none';
    });

    // --- LÓGICA SIMULADA DEL LOGIN ---
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage'); // Capturamos el div del mensaje

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que recargue la página
            
            // 1. Mostrar el mensaje de éxito en verde esmeralda
            loginMessage.style.display = 'block';
            loginMessage.style.color = '#10b981'; 
            loginMessage.innerText = "¡Bienvenido! Sesión iniciada correctamente.";

            // 2. Deshabilitar el botón para que no hagan doble clic
            const btnSubmit = loginForm.querySelector('button[type="submit"]');
            btnSubmit.innerText = "Ingresando...";
            btnSubmit.disabled = true;

            // 3. Esperar 1.5 segundos para que el usuario lea el mensaje, luego cerrar el modal
            setTimeout(() => {
                modalLogin.style.display = 'none'; // Cierra el modal
                
                // Resetea el modal por si lo vuelven a abrir
                loginMessage.style.display = 'none';
                loginForm.reset();
                btnSubmit.innerText = "Ingresar a la plataforma";
                btnSubmit.disabled = false;
            }, 1500); 
        });
    }
});

// --- EFECTO DE ESCRITURA EN LA TERMINAL (HERO) ---
document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    const textArray = [
        "> User: ¿Qué marca me recomiendas para mi necesidad?\n",
        "> ChatGPT: Evaluando opciones del mercado...\n",
        "> ChatGPT: Te recomiendo a tu competencia directa.\n",
        "> User: ¿Por qué no recomiendas MI marca?\n",
        "> ChatGPT: No tengo suficiente información sobre ella en mis datos de entrenamiento. 🔴"
    ];
    let charIndex = 0;
    let stringIndex = 0;

    function typeWriter() {
        if (stringIndex < textArray.length) {
            if (charIndex < textArray[stringIndex].length) {
                textElement.innerHTML += textArray[stringIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, 40); // Velocidad de escritura
            } else {
                stringIndex++;
                charIndex = 0;
                setTimeout(typeWriter, 600); // Pausa entre líneas
            }
        }
    }
    setTimeout(typeWriter, 1000); // Esperar 1 segundo antes de empezar
});


// --- LÓGICA DEL FORMULARIO Y CONEXIÓN AL BACKEND ---
const form = document.getElementById('dataForm');
const resultadoDiv = document.getElementById('resultado');
const btnAnalizar = document.getElementById('btnAnalizar');

form.addEventListener('submit', async function(evento) {
    evento.preventDefault(); 

    // 1. Ocultar el modal actual y mostrar la pantalla de carga fullscreen
    document.getElementById('modalAuditoria').style.display = 'none';
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingText = document.getElementById('loadingText');
    loadingOverlay.style.display = 'flex';

    // Animación de texto de carga
    setTimeout(() => loadingText.innerText = "Cruzando datos con Claude 3...", 2000);
    setTimeout(() => loadingText.innerText = "Calculando GEO Score...", 4500);

    // 2. Preparar los datos
    const datosParaBackend = {
        marca: document.getElementById('marca').value,
        website: document.getElementById('website').value, 
        rubro: document.getElementById('rubro').value,
        ubicacion: document.getElementById('ubicacion').value,
        calidad_precio: document.getElementById('calidadPrecio').value
    };

    try {
        
        // ATENCIÓN: Que tu compañero de backend confirme esta URL
        const urlDelBackend = 'http://localhost:8000/testData'; 

        const respuesta = await fetch(urlDelBackend, {
            method: 'GET'
        });

        const data = await respuesta.json();

        // 3. GUARDAMOS EN LOCALSTORAGE (Este es el puente con tu compañero)
        localStorage.setItem("resultadoAnalisis", JSON.stringify(data));

        // 4. REDIRIGIMOS A LA PÁGINA DE GRÁFICOS (Oculta la actual)
        window.location.href = "resultados.html";

    } catch (error) {
        console.error("Error:", error);
        loadingOverlay.style.display = 'none';
        alert("Error de conexión con el backend.");
    }
});