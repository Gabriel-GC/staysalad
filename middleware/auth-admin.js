export default async function ({ $axios, redirect, route, req }) {
  if (route.path === '/admin/login') return

  try {
    // No SSR, precisamos passar os cookies manualmente para o Axios
    const config = {}
    if (process.server && req.headers.cookie) {
      config.headers = {
        cookie: req.headers.cookie
      }
    }

    const { data } = await $axios.get('/api/auth/me', config)
    if (!data.success) {
      return redirect('/admin/login')
    }
  } catch (e) {
    return redirect('/admin/login')
  }
}
