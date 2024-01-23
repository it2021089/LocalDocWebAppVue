import { createRouter, createWebHistory } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/add-client',
      name: 'add-client',
      component: () => import('../views/AddClientView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/add-doctor',
      name: 'add-doctor',
      component: () => import('../views/AddDoctorView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/add-family',
      name: 'add-family',
      component: () => import('../views/AddFamilyView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/client-list',
      name: 'client-list',
      component: () => import('../views/ClientListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/doctor-list',
      name: 'doctor-list',
      component: () => import('../views/DoctorListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/edit-user',
      name: 'edit-user',
      component: () => import('../views/EditUserView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/family-list',
      name: 'family-list',
      component: () => import('../views/FamilyListView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/pending-doctor-client',
      name: 'pending-doctor-client',
      component: () => import('../views/PendingDoctorClientView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegistrationView.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useApplicationStore();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  console.log('Route:', to.path);
  console.log('Requires Auth:', requiresAuth);
  console.log('Is Authenticated:', isAuthenticated);

  if (requiresAuth && !isAuthenticated) {
    console.log('User not authenticated. Redirecting to /login');
    next('/login');
  } else {
    console.log('User authenticated or route does not require auth. Proceeding.');
    next();
  }
});

export default router;