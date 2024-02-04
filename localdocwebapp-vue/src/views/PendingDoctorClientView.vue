<template>
  <div>
    <div v-if="pendingApprovalsClients.length > 0">
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
                <button @click="showOptions(pending.id)" class="btn btn-info">
                  Show Options
                </button>
              </template>
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
      <h3>No Doctors</h3>
    </div>
  </div>
</template>

<script>
import { useApplicationStore } from '@/stores/application.js';
import { onMounted, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
const { loadUserData } = useApplicationStore();
const userData = loadUserData();

export default {
  
  setup() {
    const router = useRouter();
    const pendingApprovalsClients = ref([]);
    const itemsPerPage = 5;
    const currentPage = ref(1);
    const showOptionsModal = ref(false);
    const selectedDoctorName = ref('');

    const showOptions = (doctorId) => {
  router.push({
    path: `/pending/show/results`,
    query: { doctorId: doctorId }
  });
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
      console.log(data)
      pendingApprovalsClients.value = data || [];
    })
    .catch(error => {
      console.error('Error sending GET request:', error);
    });
});
    const paginatedClients = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return pendingApprovalsClients.value.slice(start, end);
    });

    const totalPages = computed(() => Math.ceil(pendingApprovalsClients.value.length / itemsPerPage));

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
      pendingApprovalsClients,
      showOptions,
      showOptionsModal,
      selectedDoctorName,
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

.btn-info {
  background-color: #3498db;
  color: #fff;
  border: none;
}

.btn-info:hover {
  background-color: #217dbb;
}
.pagination {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h3 {
  color: #333;
  font-size: 18px;
}
</style>
