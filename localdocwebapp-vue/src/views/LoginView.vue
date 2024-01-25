<template>
  <div class="overlay">
    <div class="modal-container">
      <div class="modal-content">
        <div class="text-center mb-4">
          <h1 class="fs-3">Login</h1>
        </div>

        <div class="mb-2" v-if="authenticationFailed">
          <div class="alert alert-danger" role="alert">
            Authentication failed!
          </div>
        </div>
        <div class="mb-2">
          <label for="usernameFormControl" class="form-label mb-1">User Name</label>
          <div class="col-sm-4">
            <input v-model="credentials.username" type="text" class="form-control" id="usernameFormControl" />
          </div>
        </div>
        <div class="mb-2">
          <label for="passwordFormControl" class="form-label mb-1">Password</label>
          <div class="col-sm-4">
            <input v-model="credentials.password" type="password" class="form-control" id="passwordFormControl" />
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-primary btn-lg rounded-3 font-bold" @click.prevent="onFormSubmit">Sign In</button>
        </div>
        <div>
          Not registered User? <a href="/register">Register</a>
        </div>
      </div>
    </div>
  </div>

</template>


<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useApplicationStore } from '@/stores/application.js';

const router = useRouter();
const { setUserData, persistUserData, isAuthenticated, checkJWT } = useApplicationStore();

const loading = ref(false);
const credentials = ref({
  username: '',
  password: ''
});
const authenticationFailed = ref(false);

const onFormSubmit = () => {
  loading.value = true;
  authenticationFailed.value = false;

  const formData = new FormData();
  formData.append('username', credentials.value.username);
  formData.append('password', credentials.value.password);

  fetch('http://localhost:9090/login', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        console.error('Login failed. Server returned non-OK status:', response.status);
        throw new Error('Login failed');
      }

      return response.json();
    })
    .then((data) => {
      console.log('JSON data:', data);

      if (checkJWT(data)) {
        setUserData(data); // Ensure this sets the user data correctly
        persistUserData(); // Ensure this persists the user data correctly
        router.replace({ name: 'home' });

        setTimeout(() => {
          location.reload();
        }, 500);
      } else {
        console.warn('Login failed:', data.error);
        authenticationFailed.value = true;
      }
    })
    .catch((err) => {
      console.error('Error during login:', err);
      authenticationFailed.value = true;
    })
    .finally(() => {
      loading.value = false;
    });
};

onBeforeMount(() => {
  if (isAuthenticated.value === true) {
    router.replace({ name: 'home' });

    setTimeout(() => {
      location.reload();
    }, 500);
  }
});

</script>


<style scoped>
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #b1cfed;
}

.modal-container {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}

.modal-content {
  padding: 20px;
  border-radius: 8px;
  background-color: #dfeaf0;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
}

.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(to right, #9efadd, #60f0ee, #a8e0ff);
  color: #000000;
  transition: background 0.3s ease;
  border: none; /* Remove border property */
  outline: none; /* Remove outline */
}

.btn:hover {
  box-shadow: 0 0 10px rgba(80, 173, 240, 0.5);
}
</style>