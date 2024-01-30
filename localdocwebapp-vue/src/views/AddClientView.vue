<template>
  <div class="overlay">
    <div class="form-container">

      <div class="text-center mb-4">
        <h1 class="fs-3">Add Client</h1>
      </div>

      <form @submit.prevent="onFormSubmit">

        <div class="mb-2">
          <label for="firstNameFormControl" class="form-label mb-1">First Name</label>
          <div class="col-sm-8">
            <input v-model="client.firstName" type="text" class="form-control" id="firstNameFormControl" pattern="[A-Za-z]+" title="Please enter only letters" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="lastNameFormControl" class="form-label mb-1">Last Name</label>
          <div class="col-sm-4">
            <input v-model="client.lastName" type="text" class="form-control" id="lastNameFormControl" pattern="[A-Za-z]+" title="Please enter only letters" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="emailFormControl" class="form-label mb-1">Email</label>
          <div class="col-sm-4">
            <input v-model="client.email" type="email" class="form-control" id="emailFormControl" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="phoneFormControl" class="form-label mb-1">Phone</label>
          <div class="col-sm-4">
            <input v-model="client.phone" type="text" class="form-control" id="phoneFormControl" pattern="[0-9]{10}" title="Please enter only 10 numbers" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="addressFormControl" class="form-label mb-1">Address</label>
          <div class="col-sm-4">
            <input v-model="client.address" type="text" class="form-control" id="addressFormControl" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="cityFormControl" class="form-label mb-1">City</label>
          <div class="col-sm-4">
            <input v-model="client.city" type="text" class="form-control" id="cityFormControl" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="stateFormControl" class="form-label mb-1">State</label>
          <div class="col-sm-4">
            <input v-model="client.state" type="text" class="form-control" id="stateFormControl" required />
          </div>
        </div>

        <div class="mb-2">
          <label for="postalCodeFormControl" class="form-label mb-1">Postal Code</label>
          <div class="col-sm-4">
            <input v-model="client.postalCode" type="text" class="form-control" id="postalCodeFormControl" pattern="[0-9]{5}" title="Please enter only 5 numbers" required />
          </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg rounded-3 font-bold">Submit</button>
      </form>

      <div v-if="successMessage" class="popup success-popup">
        <span class="icon">✔</span> {{ successMessage }}
      </div>

      <div v-if="failureMessage" class="popup failure-popup">
        <span class="icon">✘</span> {{ failureMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useApplicationStore } from '@/stores/application.js';

const { loadUserData } = useApplicationStore();
const userData = loadUserData();

const client = ref({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  postal_code: ''
});

const successMessage = ref('');
const failureMessage = ref('');

const onFormSubmit = () => {
  fetch('http://localhost:9090/api/client/saveClient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`,
    },
    body: JSON.stringify(client.value),
  })
    .then((response) => {
      if (response.ok) {
        successMessage.value = 'Client saved successfully!';
        clearForm();
      } else {
        failureMessage.value = 'Failed to save client.';
      }
    })
    .catch((error) => {
      failureMessage.value = `Error: ${error}`;
    });
};

const clearForm = () => {
  client.value = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: ''
  };

  setTimeout(() => {
    successMessage.value = '';
    failureMessage.value = '';
  }, 3000); 
};
</script>

<style scoped>
body, html {
  margin: 0;
}

.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
  background-color: #b1cfed;
}

.form-container {
  height: 100%;
  width: 100%;
  max-width: 500px;
  text-align: center;
}

.mb-2 {
  width: 100%;
}

.form-control {
  width: 100%;
  padding: 2px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  background: linear-gradient(to right, #9efadd, #60f0ee, #a8e0ff);
  color: #000000;
  transition: background 0.3s ease;
  border: none;
  outline: none;
  margin-top: 20px;
}

.btn:hover {
  box-shadow: 0 0 10px rgba(80, 173, 240, 0.5);
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.success-popup {
  color: green;
  border: 2px solid green;
}

.failure-popup {
  color: red;
  border: 2px solid red;
}

.popup .icon {
  margin-right: 5px;
}
</style>