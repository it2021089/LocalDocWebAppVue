<template>
    <div v-if="doctors && doctors.length > 0">
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
            <th>Specialty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="doctor in paginatedDoctors" :key="doctor.id">
            <td>{{ doctor.firstName }}</td>
            <td>{{ doctor.lastName }}</td>
            <td>{{ doctor.email }}</td>
            <td>{{ doctor.phone }}</td>
            <td>{{ doctor.address }}</td>
            <td>{{ doctor.city }}</td>
            <td>{{ doctor.postalCode }}</td>
            <td>{{ doctor.speciality }}</td>
            <td v-if="doctor.id">
              <div>
                  <button @click="requestApproval(clientId,doctor.id)" type="submit" class="btn btn-info">
                    Request Approval for {{ firstName }} {{ lastName }}
                  </button>
              </div>
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
      <h3>No Doctors</h3>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, getCurrentInstance } from 'vue';
  import { useApplicationStore } from '@/stores/application.js';
  
  const { loadUserData } = useApplicationStore();
  const userData = loadUserData();
  const instance = getCurrentInstance();
  const postalCode = instance.proxy.$route.query.postalCode;
  const clientId = instance.proxy.$route.query.clientId;
  const firstName = instance.proxy.$route.query.firstName;
  const lastName = instance.proxy.$route.query.lastName;
  const doctors = ref([]);
  const itemsPerPage = 5;
  const currentPage = ref(1);
  
  onMounted(() => {
    fetch(`http://localhost:9090/api/client/list/doc/${postalCode}/${clientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        doctors.value = data;
      })
      .catch(error => console.error('Error fetching doctors:', error));
  });
  
  const paginatedDoctors = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return doctors.value.slice(start, end);
  });
  
  const totalPages = computed(() => Math.ceil(doctors.value.length / itemsPerPage));
  
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
  
  const requestApproval = (clientId, doctorId) => {
    const requestData = {
    clientId: clientId,
    doctorId: doctorId
  };
    fetch(`http://localhost:9090/api/pending/insert/${clientId}/${doctorId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userData.accessToken}`,
        body: JSON.stringify(requestData)
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Request approval successful:', data);
    })
    .catch(error => {
      console.error('Error requesting approval:', error);
    });
};  
  </script>
  
  <style scoped>
  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  button {
    background-color: #4f5054;
    color: #fff;
    cursor: pointer;
    padding: 8px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: #2c3e50; 
  }

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
    border: 1px solid #000000; /* Set the border color for lines and columns to black */
  }

  th {
    background-color: #4f5054;
    color: #fff;
  }

  .btn-info {
    background-color: #4e565c;
  }

  .white-text {
    color: #fff;
  }
</style>
  