
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'lista-clientes', name: 'ListaClientes', component: () => import('pages/Clientes/ListaClientes.vue'), props: true },
      { path: 'cadastro-cliente', name: 'CadCliente', component: () => import('pages/Clientes/CadCliente.vue') },
      { path: 'lista-produtos', name: 'ListaProdutos', component: () => import('pages/Produtos/ListaProdutos.vue') },
      { path: 'cadastro-produto', name: 'CadProduto', component: () => import('pages/Produtos/CadProduto.vue') },
      { path: 'lista-usuarios', name: 'ListaUsuarios', component: () => import('pages/Usuarios/ListaUsuarios.vue') },
      { path: 'cadastro-usuario', name: 'CadUsuario', component: () => import('pages/Usuarios/CadUsuario.vue') },
      { path: 'liberar-sistema', name: 'Liberar', component: () => import('pages/Licencas/Liberar.vue') },
      { path: 'contas-receber', name: 'ContasReceber', component: () => import('pages/ContasReceber/ContasReceber.vue'), props: true },
      { path: 'liberacoes-sistema', name: 'Liberacoes', component: () => import('pages/Licencas/Liberacoes.vue'), props: true }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
