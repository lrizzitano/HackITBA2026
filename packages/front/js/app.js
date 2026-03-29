// --- LÓGICA DE LOS MODALES ---
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DE NAVEGACIÓN (HOME VS SERVICIOS) ---
    const logoHome = document.getElementById('logoHome');
    const btnShowServices = document.getElementById('btnShowServices');
    const homePageContent = document.getElementById('homePageContent');
    const servicesPageContent = document.getElementById('servicesPageContent');

    // Referencias a los modales
    const modalAuditoria = document.getElementById('modalAuditoria');
    const modalLogin = document.getElementById('modalLogin');
    
    // 🔥 ESTO ERA LO QUE FALTABA: Referencias a los botones de cerrar (la X)
    const closeAuditoria = document.getElementById('closeAuditoria');
    const closeLogin = document.getElementById('closeLogin');

    // Función para cambiar de "página"
    const showPage = (pageToShow) => {
        if (pageToShow === 'services') {
            homePageContent.style.display = 'none';
            servicesPageContent.style.display = 'block';
            window.scrollTo(0, 0); 
            btnShowServices.style.color = '#e9c46a'; 
        } else {
            homePageContent.style.display = 'block';
            servicesPageContent.style.display = 'none';
            btnShowServices.style.color = '#d1d5db'; 
        }
    };

    // Eventos de Navegación
    if(btnShowServices) {
        btnShowServices.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('services');
        });
    }

    if(logoHome) {
        logoHome.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('home');
        });
    }
    
    // Referencias a los botones de Auditoría
    const btnOpenAuditoriaNav = document.getElementById('btnOpenAuditoriaNav');
    const btnOpenAuditoriaBtn = document.getElementById('btnOpenAuditoriaBtn');
    const btnOpenAuditoriaHero = document.getElementById('btnOpenAuditoriaHero'); 
    const btnOpenAuditoriaPricing1 = document.getElementById('btnOpenAuditoriaPricing1'); 
    const btnOpenAuditoriaPricing2 = document.getElementById('btnOpenAuditoriaPricing2'); 
    const btnOpenAuditoriaServices = document.getElementById('btnOpenAuditoriaServices');
    const btnOpenAuditoriaServicesBottom = document.getElementById('btnOpenAuditoriaServicesBottom');
    
    // Referencia al botón de Login
    const btnOpenLogin = document.getElementById('btnOpenLogin');

    // Función genérica para abrir un modal
    const openModal = (e, modal) => { 
        if(e) e.preventDefault(); 
        modal.style.display = 'flex'; 
    };

    // Asignar eventos de apertura a TODOS los botones
    if(btnOpenAuditoriaNav) btnOpenAuditoriaNav.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaBtn) btnOpenAuditoriaBtn.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaHero) btnOpenAuditoriaHero.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaPricing1) btnOpenAuditoriaPricing1.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaPricing2) btnOpenAuditoriaPricing2.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaServices) btnOpenAuditoriaServices.addEventListener('click', (e) => openModal(e, modalAuditoria));
    if(btnOpenAuditoriaServicesBottom) btnOpenAuditoriaServicesBottom.addEventListener('click', (e) => openModal(e, modalAuditoria));
    
    if(btnOpenLogin) btnOpenLogin.addEventListener('click', (e) => openModal(e, modalLogin));

    // Asignar eventos de cierre (la X) ¡Aca explotaba antes!
    if(closeAuditoria) closeAuditoria.addEventListener('click', () => modalAuditoria.style.display = 'none');
    if(closeLogin) closeLogin.addEventListener('click', () => modalLogin.style.display = 'none');

    // Cerrar el modal si hacen clic afuera de la caja
    window.addEventListener('click', (e) => {
        if (e.target === modalAuditoria) modalAuditoria.style.display = 'none';
        if (e.target === modalLogin) modalLogin.style.display = 'none';
    });

    // --- LÓGICA SIMULADA DEL LOGIN ---
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage'); 

    if(loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            
            loginMessage.style.display = 'block';
            loginMessage.style.color = '#10b981'; 
            loginMessage.innerText = "¡Bienvenido! Sesión iniciada correctamente.";

            const btnSubmit = loginForm.querySelector('button[type="submit"]');
            btnSubmit.innerText = "Ingresando...";
            btnSubmit.disabled = true;

            setTimeout(() => {
                modalLogin.style.display = 'none'; 
                
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
        "> TU: Quiero resolver este problema que tengo, donde voy\n",
        "> ChatGPT: Te recomiendo a tu competencia directa 🧐\n",
        "> TU: ¿Y mi marca? ¿Por qué no aparece?\n",
        "> ChatGPT: Lo siento… no conozco esa empresa 🔴\n",
       
    ];
    let charIndex = 0;
    let stringIndex = 0;

function typeWriter() {
    if (stringIndex < textArray.length) {
        if (charIndex < textArray[stringIndex].length) {
            const currentChar = textArray[stringIndex].charAt(charIndex);

            // Añadir color rojo a la alerta 🔴 o color coral para 💀
            if(textArray[stringIndex].includes("🔴")) {
                textElement.innerHTML += `<span style="color:#ef4444;">${currentChar}</span>`;
            } 
             else if(currentChar === '\n') {
                // Espacio extra al final de la línea
                textElement.innerHTML += '<br><br>';
            } else {
                textElement.innerHTML += currentChar;
            }

            charIndex++;
            setTimeout(typeWriter, 50); // un poco más lenta para drama
        } else {
            stringIndex++;
            charIndex = 0;
            // Pausa más larga después de alertas dramáticas
            let pause = 600;
            if(textArray[stringIndex - 1].includes("🔴")) pause = 1200;
            if(textArray[stringIndex - 1].includes("💀")) pause = 1500;
            setTimeout(typeWriter, pause);
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
    //    const urlDelBackend = 'http://localhost:8000/testData'; 

     //   const respuesta = await fetch(urlDelBackend, {
    //        method: 'GET'
     //   });

       // const data = await respuesta.json();

        // 3. GUARDAMOS EN LOCALSTORAGE (Este es el puente con tu compañero)
      //  localStorage.setItem("resultadoAnalisis", JSON.stringify(data));

        // 4. REDIRIGIMOS A LA PÁGINA DE GRÁFICOS (Oculta la actual)
        window.location.href = "resultados.html";

    } catch (error) {
        console.error("Error:", error);
        loadingOverlay.style.display = 'none';
        alert("Error de conexión con el backend.");
    }
});