<template>
    <div>
      <div v-if="!pendingAprovalsClients.isEmpty">
        <table class="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pending in paginatedClients" :key="pending.id">
              <td>{{ pending.firstName }}</td>
              <td>{{ pending.lastName }}</td>
              <td v-if="pending.id">
                <template v-if="pending.currentClients < pending.maxClients">
                  <form @submit.prevent="acceptClient(pending.id)" style="display: inline-block">
                    <button type="submit" class="btn btn-success"><i class="fas fa-check"></i> Accept Client</button>
                  </form>
                </template>
                <form @submit.prevent="declineClient(pending.id)" style="display: inline-block">
                  <button type="submit" class="btn btn-danger"><i class="fas fa-times"></i> Decline Client</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
  
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
          Page {{ currentPage }} of {{ totalPages }}
          <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
        </div>
      </div>
      <div v-else>
        <h3>No pending Clients</h3>
      </div>
    </div>
  </template>
  
  <script>
  import { useApplicationStore } from '@/stores/application.js';
  import { onMounted, ref, computed } from 'vue';
  
  const { loadUserData } = useApplicationStore();
  const userData = loadUserData();
  
  export default {
    setup() {
      const pendingAprovalsClients = ref([]);
      const itemsPerPage = 5;
      const currentPage = ref(1);
  
      const acceptClient = (clientId) => {
        console.log('Accepting client:', clientId);
      };
  
      const declineClient = (clientId) => {
        console.log('Declining client:', clientId);
      };
  
      onMounted(() => {
        fetch(`http://localhost:9090/api/pending/show`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userData.accessToken}`
          },
        })
          .then(response => {
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
          })
          .then(data => {
            console.log('GET request successful:', data);
            pendingAprovalsClients.value = data || [];
          })
          .catch(error => {
            console.error('Error sending GET request:', error);
          });
      });
  
      const paginatedClients = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return pendingAprovalsClients.value.slice(start, end);
      });
  
      const totalPages = computed(() => Math.ceil(pendingAprovalsClients.value.length / itemsPerPage));
  
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
  
      return {
        pendingAprovalsClients,
        acceptClient,
        declineClient,
        paginatedClients,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
      };
    },
  };
  </script>
  
  <style scoped>
  .table {
    width: 100%;
    border-collapse: collapse;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #333332;
    border: none;
    color: #fff;
    border: 1px solid #000000;
  }
  
  th, td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }
  
  th {
    background-color: #333;
    color: #fff;
  }
  
  .btn {
    padding: 8px 16px;
    border-radius: 5px;
    margin: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btn-success {
    background-color: #4caf50;
    color: #fff;
    border: none;
  }
  
  .btn-danger {
    background-color: #f44336;
    color: #fff;
    border: none;
  }
  
  .btn-success:hover {
    background-color: #357f39; 
  }
  
  .btn-danger:hover {
    background-color: #bc2323; 
  }
  
  h3 {
    color: #333;
    font-size: 18px;
  }
  </style>