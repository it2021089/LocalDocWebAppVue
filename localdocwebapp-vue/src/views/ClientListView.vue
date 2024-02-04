<template>
    <div class="client-list-view white-text ">
      <div v-if="clients && clients.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>City</th>
              <th>Postal Code</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="client in paginatedClients" :key="client.id">
              <td>{{ client.firstName }}</td>
              <td>{{ client.lastName }}</td>
              <td>{{ client.email }}</td>
              <td>{{ client.phone }}</td>
              <td>{{ client.address }}</td>
              <td>{{ client.city }}</td>
              <td>{{ client.postalCode }}</td>
              <td v-if="!client.doctor" class="btn-container">
    <a class="btn btn-info" @click="showNearDoctors(client.postalCode, client.id,client.firstName,client.lastName)">
                Show near Doctors
    </a>
    
    <a class="btn btn-success" @click="showFamily(client.id)">
                 Show family
    </a>
  </td>
              <td v-else>
                <form @submit.prevent="removeCurrentDoctor(client.id, client.doctor.id)">
                  <button type="submit" class="btn btn-info">
                     Remove Current Doctor
                  </button>
                  <a class="btn btn-info" @click="showFamily(client.id)">
                    <i class="fas fa-eye"></i> Show family
                  </a>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div class="pagination white-text">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          Page {{ currentPage }} of {{ totalPages }}
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <div v-else>
        <h3>No Clients</h3>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useApplicationStore } from '@/stores/application.js';
  import { useRouter } from 'vue-router';

  const { loadUserData } = useApplicationStore();
  const userData = loadUserData();
  const router = useRouter();

  const clients = ref([]);
  const itemsPerPage = 5;
  const currentPage = ref(1);
  
  onMounted(() => {
    fetch('http://localhost:9090/api/client/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`, 
      },
    })
      .then(response => response.json())
      .then(data => {
        clients.value = data;
      })
      .catch(error => console.error('Error fetching clients:', error));
  });
  
  const paginatedClients = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return clients.value.slice(start, end);
  });
  
  const totalPages = computed(() => Math.ceil(clients.value.length / itemsPerPage));
  
  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
    }
  };
  
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
    }
  };
  
  const showNearDoctors = (postalCode, clientId,firstName,lastName) => {
    console.log('Show near doctors for client:', clientId, 'in postal code:', postalCode, ' and name ' ,firstName);
    router.push({
    name: 'near-doctors', 
    query: {
firstName:firstName,
lastName:lastName,
postalCode: postalCode,
clientId:clientId
    },
  });  };
  
  const showFamily = (clientId) => {
    console.log('Show family for client:', clientId);
  };
  
  const removeCurrentDoctor = (clientId, doctorId) => {
    console.log('Remove current doctor for client:', clientId, 'doctor:', doctorId);
  };
  </script>
  
  <style scoped>
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .pagination button {
    background-color: #4f5054;
    color: #fff;
    padding: 8px 16px; /* Adjust the padding for buttons */
    cursor: pointer;
    border: none;
  }

  .client-list-view {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #333332;
    border: none;
    border: 1px solid #000000;
    margin-top: 10px; /* Add margin to the table */
  }

  th, td {
    padding: 12px;
    text-align: left;
    border: 1px solid #000000;
  }

  th {
    background-color: #4f5054;
    color: #fff;
  }

  .btn-container {
    display: flex;
    flex-wrap: wrap;
  }

  .btn-container a {
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .btn-container .btn {
    padding: 10px 20px !important;
    border-radius: 5px;
    text-decoration: none;
    color: #fff;
    cursor: pointer;
    transition: background-color 0.3s ease;
    background-color: #4e565c !important;
    border: none;
    display: inline-block;
  }

  .btn-container .btn:hover {
    background-color: #2c3e50;
  }

  .btn-info {
    background-color: #3498db;
  }

  .btn-info:hover {
    background-color: #2980b9;
  }

  .btn-success {
    background-color: #191919;
  }

  h3 {
    margin-top: 20px;
    color: #2c3e50;
  }

  .white-text {
    color: #fff;
  }
</style>
