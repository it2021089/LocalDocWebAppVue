<template>
    <div class="overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="text-center mb-4">
            <h1 class="fs-3">Add Client</h1>
          </div>
  
          <div class="mb-2">
            <label for="firstNameFormControl" class="form-label mb-1">First Name</label>
            <div class="col-sm-4">
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
  
          <button type="button" class="btn btn-primary btn-lg rounded-3 font-bold" @click.prevent="onFormSubmit">Submit</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useApplicationStore } from '@/stores/application.js';

const { loadUserData} = useApplicationStore();
const userData = loadUserData();
  const client = ref({
    id:`${userData.id}`,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: ''
  });
  
  const onFormSubmit = () => {
  fetch('http://localhost:9090/api/client/saveClient', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client.value)
  })
    .then((response) => {
      if (response.ok) {
        console.log('Client saved successfully!');
      } else {
        console.error('Failed to save client.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};
  </script>
  
  <style scoped>
  .overlay {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%; /* Adjust the width as needed */
    max-width: 600px;
    background-color: #b1cfed; /* Set background color to #b1cfed */
    padding: 20px; /* Adjust padding as needed */
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .modal-container {
    width: 100%;
  }
  
  .modal-content {
    padding: 20px;
    border-radius: 8px;
    background-color: #ffffff; /* Set background color to #ffffff */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .form-control {
    width: calc(100% - 20px); /* Adjust the width considering padding */
    margin-bottom: 15px; /* Adjust margin-bottom */
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
  }
  
  .btn:hover {
    box-shadow: 0 0 10px rgba(80, 173, 240, 0.5);
  }
  </style>