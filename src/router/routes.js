
const routes = [
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'classes', component: () => import('pages/Classes.vue') },
      { path: 'students', component: () => import('pages/Students.vue') },
    ]
  },
  {
    path:'/',
    redirect:'/account',
    component: () => import('layouts/RegisterLayout.vue'),
    children:[
      { path: 'register', component: () => import('pages/Register.vue') },
      { path: 'account', component: () => import('pages/Account.vue') },
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
