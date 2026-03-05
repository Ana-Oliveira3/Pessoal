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

   // 2. Interatividade RSVP com Envio de E-mail
    const rsvpForm = document.getElementById('rsvp-form');
    const btnSim = document.getElementById('btn-sim');
    const btnTalvez = document.getElementById('btn-talvez');
    const respostaInput = document.getElementById('resposta-input');
    const rsvpMessageContainer = document.getElementById('rsvp-message');
    const successMessage = rsvpMessageContainer.querySelector('.success-message');

    if (rsvpForm) {
        // Define o valor da resposta dependendo de qual botão foi clicado
        btnSim.addEventListener('click', () => { respostaInput.value = 'Confirmado'; });
        btnTalvez.addEventListener('click', () => { respostaInput.value = 'Talvez / Não sabe'; });

        rsvpForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Evita que a página recarregue

            // Pega os dados do formulário
            const formData = new FormData(rsvpForm);

            try {
                // Envia os dados para o Formspree
                const response = await fetch(rsvpForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    // Esconde o formulário e mostra a mensagem
                    rsvpForm.classList.add('hidden');
                    rsvpMessageContainer.classList.remove('hidden');

                    // Personaliza a mensagem baseada na escolha
                    if (respostaInput.value === 'Confirmado') {
                        successMessage.textContent = "Uau! Ficamos muito felizes em saber! ❤️ Sua presença está confirmada.";
                        successMessage.style.color = "#b08d57";
                    } else {
                        successMessage.textContent = "Mensagem enviada! Quando souber, por favor, avise-nos! Vamos adorar ter você.";
                        successMessage.style.color = "#888";
                    }
                } else {
                    alert("Ops! Houve um problema ao enviar sua confirmação. Tente novamente.");
                }
            } catch (error) {
                alert("Ops! Houve um erro de conexão. Tente novamente.");
            }
        });
    }
});