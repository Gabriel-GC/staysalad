<template>
  <div class="admin-layout">
    <aside class="admin-sidebar shadow-lg">
      <div class="sidebar-header">
        <h2 class="logo">Stay<span>Salad</span> Admin</h2>
      </div>
      <nav class="sidebar-nav">
        <NuxtLink to="/admin" class="nav-item" exact-active-class="is-active">Dashboard</NuxtLink>
        <NuxtLink to="/admin/produtos" class="nav-item" active-class="is-active">Produtos</NuxtLink>
        <NuxtLink to="/admin/categorias" class="nav-item" active-class="is-active">Categorias</NuxtLink>
        <NuxtLink to="/admin/configuracoes" class="nav-item" active-class="is-active">Configurações</NuxtLink>
        <NuxtLink to="/" class="nav-item mt-auto">Ver Site Público ↗</NuxtLink>
        <button @click="logout" class="nav-item text-danger">Sair</button>
      </nav>
    </aside>
    
    <main class="admin-main">
      <header class="admin-topbar">
        <div class="welcome">Olá, <strong>Administrador</strong></div>
      </header>
      <div class="admin-content">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script>
export default {
  middleware: 'auth-admin',
  methods: {
    async logout() {
      try {
        await this.$axios.post('/api/auth/logout')
        this.$router.push('/admin/login')
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background: #f8f9fa;
}

.admin-sidebar {
  width: 280px;
  background: #1a1a1a;
  color: #fff;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 30px 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.logo {
  font-size: 20px;
  font-weight: 800;
}

.logo span {
  color: var(--primary);
}

.sidebar-nav {
  padding: 20px 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.nav-item {
  padding: 15px 25px;
  color: rgba(255,255,255,0.7);
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav-item:hover, .nav-item.is-active {
  background: rgba(255,255,255,0.05);
  color: var(--primary);
}

.admin-main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.admin-topbar {
  background: #fff;
  padding: 20px 40px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
}

.admin-content {
  padding: 40px;
}

.mt-auto {
  margin-top: auto;
}

.text-danger {
  color: #ff4757 !important;
  border: none;
  background: transparent;
  width: 100%;
  text-align: left;
  cursor: pointer;
}
</style>
