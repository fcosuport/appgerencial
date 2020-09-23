import { Notify } from 'quasar'
function tokenIsValid () {
  let token = {}
  if (sessionStorage.getItem('appgerencial_token')) {
    token = JSON.parse(atob(sessionStorage.getItem('appgerencial_token').split('.')[1]))
    if (token.exp < (Date.now() / 1000)) {
      sessionStorage.removeItem('appgerencial_token')
      Notify.create({
        color: 'negative',
        position: 'top',
        message: 'Token Expirado, por favor faça login novamente',
        icon: 'report_problem'
      })
      return false
    }
    return true
  }
  return false
}

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    if (requiresAuth && !tokenIsValid()) {
      next('/login')
    }
    next()
  })
}
