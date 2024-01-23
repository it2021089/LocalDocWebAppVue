<template>
  <div>
    <ul class="navbar-nav">
      <li class="nav-item">
        <router-link v-if="hasRole('CLIENT')" to="/client/new" class="nav-link">Add Client</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="hasRole('DOCTOR')" to="/doctor/new" class="nav-link">Add Doctor</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="hasRole('CLIENT')" to="/doctor/list" class="nav-link">Show Doctors</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="hasRole('CLIENT')" to="/client/list" class="nav-link">Show Clients</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="hasRole('DOCTOR')" to="/pending/show" class="nav-link">Show Pending</router-link>
      </li>
      <li class="nav-item">
        <router-link v-if="hasRole('ADMIN')" to="/users" class="nav-link">Users</router-link>
      </li>
      <li class="nav-item" v-if="isAuthenticated">
        <form @submit.prevent="logout" class="nav-link">
          <button type="submit" class="btn btn-primary rounded-3">Sign Out</button>
        </form>
      </li>
      <li class="nav-item" v-if="!isAuthenticated">
        <router-link to="/login" class="btn btn-primary rounded-3">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const isAuthenticated = ref(false); // Set this based on your authentication status
const userRoles = ref(['CLIENT']); // Set this based on the user's roles

const hasRole = (role) => {
  const { isAuthenticated } = useApplicationStore();

  return isAuthenticated && userRoles.value.includes(role);
};

const router = useRouter();

const logout = () => {
  isAuthenticated.value = false;
  router.push('/login');
};
</script>

<style scoped>
/* Customize the styling based on your preferences */
.navbar-nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #fff; /* Set your preferred text color */
}

.btn-primary {
  background-color: #007bff; /* Set your preferred primary button color */
  border-color: #007bff;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3; /* Set your preferred primary button hover color */
  border-color: #0056b3;
}
</style>