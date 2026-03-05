document.addEventListener('DOMContentLoaded', function() {

    // 1. Scroll Suave para links internos (#anchor)
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const href = this.getAttribute("href");
            const targetElement = document.querySelector(href);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop - 50, // Um pequeno offset para não colar no topo
                    behavior: "smooth"
                });
            }
        });
    }

    // 2. Interatividade RSVP
    const btnSim = document.getElementById('btn-sim');
    const btnTalvez = document.getElementById('btn-talvez');
    const rsvpMessageContainer = document.getElementById('rsvp-message');

    function showRsvpMessage(isComing) {
        // Esconde os botões e mostra a mensagem de sucesso
        btnSim.style.display = 'none';
        btnTalvez.style.display = 'none';
        rsvpMessageContainer.classList.remove('hidden');

        const successMessage = rsvpMessageContainer.querySelector('.success-message');
        
        if (isComing) {
            successMessage.textContent = "Uau! Ficamos muito felizes em saber! ❤️ Sua presença está confirmada.";
        } else {
            successMessage.textContent = "Entendemos! Quando souber, por favor, avise-nos! Vamos adorar ter você.";
            successMessage.style.color = "#888"; // Muda a cor para "talvez"
        }
    }

    if (btnSim) {
        btnSim.addEventListener('click', function() {
            showRsvpMessage(true);
        });
    }

    if (btnTalvez) {
        btnTalvez.addEventListener('click', function() {
            showRsvpMessage(false);
        });
    }
});