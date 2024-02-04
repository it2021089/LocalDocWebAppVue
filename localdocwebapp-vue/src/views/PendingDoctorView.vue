<template>
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
      />
      <div v-if="pendingApprovalsClients && pendingApprovalsClients.length">
        <table class="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="pending in pendingApprovalsClients" :key="pending.id">
  <td>{{ pending.firstName }}</td>
  <td>{{ pending.lastName }}</td>
  <td v-if="pending.id">
    <button @click="acceptClient(pending.id)" class="btn btn-info">
      <i class="fas fa-plus-square"></i> Accept Client
    </button>
    <button @click="declineClient(pending.id)" class="btn btn-danger">
      <i class="fas fa-times-circle"></i> Decline Client
    </button>
  </td>
</tr>
          </tbody>
        </table>
      </div>
      
      <div v-else>
        <h3>No pending Clients</h3>
      </div>
      <div v-if="showModal" class="modal">
      <div class="modal-content success">
        <span class="close" @click="closeModal">&times;</span>
        <p>Operation Success!</p>
      </div>
    </div>
    </div>
    
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useApplicationStore } from '@/stores/application.js';
  import { useRouter } from 'vue-router';


  export default {
    props: ['doctorId'],
    setup() {
const router = useRouter();
  const { loadUserData } = useApplicationStore();
const userData = loadUserData();
const doctorId =  router.currentRoute.value.query.doctorId
      const pendingApprovalsClients = ref([]);
      const showModal = ref(false);

      const acceptClient = (clientId) => {

  fetch(`http://localhost:9090/api/pending/show/${doctorId}/${clientId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`
    },
  })
    .then(response => {
      if (response.ok) {
        openModal();
      } else {
        console.error('Failed to accept client:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error accepting client:', error);
    });
};

const declineClient = (clientId) => {

  fetch(`http://localhost:9090/api/pending/show/${doctorId}/${clientId}/decline`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`
    },
  })
    .then(response => {
      if (response.ok) {
        openModal();
      } else {
        console.error('Failed to decline client:', response.statusText);
      }
    })
    .catch(error => {
      console.error('Error declining client:', error);
    });
};
    onMounted(() => {
  fetch(`http://localhost:9090/api/pending/show/${doctorId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`
    },
  })
    .then(response => response.json())
    .then(data => {
      pendingApprovalsClients.value = data || [];
    })
    .catch(error => {
      console.error('Error fetching pending requests:', error);
    });
});
const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};
  
      return {
        pendingApprovalsClients,
      acceptClient,
      declineClient,
      openModal,
      closeModal,
      showModal
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
  
  th,
  td {
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
  
  .btn-info {
    background-color: #2bc456;
    color: #fff;
    border: none;
  }
  
  .btn-danger {
    background-color: #f44336;
    color: #fff;
    border: none;
  }
  
  .btn-info:hover {
    background-color: #0c8139;
  }
  
  .btn-danger:hover {
    background-color: #bc2323;
  }
  
  h3 {
    color: #333;
    font-size: 18px;
  }
  .modal {
  display: none;
  position: fixed;
  z-index: 1001; /* Update this value to be higher than other elements */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
}


.modal-content {
  background-color: #fefefe;
  margin: 0 auto; /* Center the modal content */
  padding: 20px;
  border: 1px solid #888;
  width: 60%; /* Adjust the width as needed */
  max-width: 400px; /* Add max-width for responsiveness */
  z-index: 1002; /* Ensure the modal content has a higher z-index than the modal background */
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}
.close:hover,
.close:focus {
  color: rgb(255, 0, 0);
  text-decoration: none;
  cursor: pointer;
}
.success {
  color: #4CAF50; /* Green */
}

  </style>
  