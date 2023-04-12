import { createRouter, createWebHistory } from 'vue-router';
import vm from '../main';

const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes
  });
  
  router.beforeEach(async (to, from, next) => {
    if (to.query.session_token) {
      localStorage.setItem('session_token', to.query.session_token);
      router.replace({'query': null});
    }
  
    const token = localStorage.getItem('session_token') || null;
  
    if (to.matched.some(record => record.meta.requiresAuth)){
      if (token) {
  
        // Verify Token
        const response = await fetch('http://localhost:5000/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        }).then(res => res.json());
  
        if (!response.success) {
          localStorage.removeItem('session_token');
          vm.$toast.error('Noe gikk galt. Vennligst prøv igjen.');
          next('/login');
          return
        }
  
      } else {
        next('/login');
        return
      }
    } else if (to.matched.some(record => record.name === 'home')){
        if (token) {
  
          // Verify Token
          const response = await fetch('http://localhost:5000/api/auth/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
          }).then(res => res.json());
  
          if (response.success) {
            next('/dashboard');
            return
          }
        }
    }
    next();
  });

export default router
