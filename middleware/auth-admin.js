export default async function ({ $axios, redirect, route }) {
  if (route.path === '/admin/login') return

  try {
    const { data } = await $axios.get('/api/auth/me')
    if (!data.success) {
      return redirect('/admin/login')
    }
  } catch (e) {
    return redirect('/admin/login')
  }
}
