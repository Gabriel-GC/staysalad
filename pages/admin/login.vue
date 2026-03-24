<template>
  <div class="login-page">
    <div class="login-card shadow-lg fade-in-up">
      <h2 class="mb-4 text-center">Login <span>Admin</span></h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group mb-3">
          <label>Usuário</label>
          <input v-model="form.username" type="text" class="form-control" required placeholder="admin">
        </div>
        <div class="form-group mb-4">
          <label>Senha</label>
          <input v-model="form.password" type="password" class="form-control" required placeholder="••••••••">
        </div>
        <button type="submit" class="btn btn--primary btn--full" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar no Painel' }}
        </button>
      </form>
      <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  data() {
    return {
      form: { username: '', password: '' },
      loading: false,
      error: null
    }
  },
  methods: {
    async handleLogin() {
      this.loading = true
      this.error = null
      try {
        const { data } = await this.$axios.post('/api/auth/login', this.form)
        if (data.success) {
          this.$noty.success('Bem-vindo ao painel administrativo!')
          this.$router.push('/admin')
        }
      } catch (e) {
        this.error = e.response?.data?.message || 'Erro ao fazer login'
        this.$noty.error(this.error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f0f2f5;
}

.login-card {
  background: #fff;
  padding: 40px;
  border-radius: 20px;
  width: 100%;
  max-width: 400px;
}

h2 span {
  color: var(--primary);
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  margin-top: 5px;
}

.text-danger {
  color: #ff4757;
  font-size: 14px;
}
</style>
