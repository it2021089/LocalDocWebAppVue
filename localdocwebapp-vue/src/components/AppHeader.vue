<template>
  <div class="header-box">
    <div class="zoomInUp">
      <ul class="navbar-nav">
      <li >
        <a href="/home" class="nav-link box">Home</a>
      </li>
      <li v-if="hasRole('CLIENT')">
        <a href="/client/new" class="nav-link box">Add Client</a>
      </li> 
      <li v-if="hasRole('DOCTOR')">
        <a href="/doctor/new" class="nav-link box">Add Doctor</a>
      </li>
      <li v-if="hasRole('CLIENT')">
        <a href="/client/list" class="nav-link box">Show Clients</a>
      </li>
      <li v-if="hasRole('DOCTOR')">
        <a href="/pending/show" class="nav-link box">Show Pending</a>
      </li>
      <li v-if="hasRole('ADMIN')">
        <a href="/users" class="nav-link box">Users</a>
      </li>
      <li v-if="isAuthenticated">
    <a href="#" @click.prevent="handleLogout" class="nav-link box">Log Out</a>
</li>
      <li v-if="!isAuthenticated">
        <a href="/login" class="nav-link box">Login</a>
      </li>
    </ul>
    </div>
    
  </div>
</template> 

<script setup>
import { onBeforeMount } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const { loadUserData,isAuthenticated,logout } = useApplicationStore();
const userData = loadUserData();

const handleLogout = () => {
  logout();
};

const hasRole = (role) => {
  return isAuthenticated && userData.roles[0].includes(role);
};

onBeforeMount(async () => {
});

</script>
<style scoped>
.header-box {
  position: sticky;
  top: 0; 
  z-index: 100; 
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding: 1rem;
  background-color: transparent; 
  border-radius: 8px;
}


.navbar-nav {
  display: flex;
  gap: 1rem;
  list-style: none;
}

.nav-link {
  color: #fff; 
  text-decoration: none;
  padding: 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #4c5155;
}

.box {
  background-color: #202933; 
}

.zoomInUp {
  animation: zoomInUp 1s ease;
}

@keyframes zoomInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>