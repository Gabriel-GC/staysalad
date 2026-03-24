<template>
  <div class="contact-page">
    <section class="section">
      <div class="container fade-in-up">
        <div class="grid align-items-center">
          <div class="col-12 col-6">
            <h1 class="mb-4">Diga Oi! 👋</h1>
            <p class="mb-4 text-large">
              Tem alguma dúvida, elogio ou quer apenas bater um papo sobre alimentação saudável? Estamos prontos para te ouvir e transformar sua rotina.
            </p>
            
            <a href="https://wa.me/5500000000000" class="btn btn--primary d-none-mobile">
              Falar no WhatsApp
            </a>
          </div>

          <div class="col-12 col-6">
            <div class="contact-grid">
              <div class="info-card">
                <h4>📍 Onde estamos</h4>
                <p>Rua das Saladas, 123 - Bairro Verde<br>Cidade Saudável, UF</p>
              </div>
              
              <div class="info-card mt-4">
                <h4>⏰ Horário de Funcionamento</h4>
                <p>Segunda a Sexta: 10:00 - 21:00<br>Sábado: 11:00 - 18:00</p>
              </div>

              <div class="social-links mt-4">
                <h4>📱 Redes Sociais</h4>
                <div class="social-grid">
                  <a href="#" class="social-item">Instagram</a>
                  <a href="#" class="social-item">Facebook</a>
                  <a href="#" class="social-item">LinkedIn</a>
                </div>
              </div>
            </div>
            
            <a href="https://wa.me/5500000000000" class="btn btn--primary btn--full mt-4 d-none-desktop">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.text-large {
  font-size: 18px;
  line-height: 1.8;
  color: var(--text-muted);
}

.info-card {
  background: var(--white);
  padding: 20px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.info-card h4 {
  margin-bottom: 5px;
}

.social-grid {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.social-item {
  background: var(--primary);
  color: white;
  padding: 8px 15px;
  border-radius: 50px;
  font-size: 13px;
  font-weight: 600;
}

.btn--full {
  width: 100%;
}
</style>
