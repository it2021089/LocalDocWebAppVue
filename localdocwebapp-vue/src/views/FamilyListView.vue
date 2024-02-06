<template>
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" />
      
      <div v-if="families.length > 0">
        <table class="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Relation</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="family in families" :key="family.id">
              <td>{{ family.firstName }}</td>
              <td>{{ family.lastName }}</td>
              <td>{{ family.relation }}</td>
              <td>{{ family.birthDate }}</td>
              <td>{{ family.gender }}</td>
              <td v-if="family.id">
                <button class="btn btn-warning">
                  <i class="fas fa-edit"></i> Edit
                </button>
                <form style="display: inline-block" @submit.prevent="removeFamily(family.id)">
                  <button type="submit" class="btn btn-danger"><i class="fas fa-trash-alt"></i> Remove</button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else>
        <h3> No Family Members </h3>
      </div>
      
      <button @click="addFamily" class="btn stylish-btn">
         Add family
      </button>
      
  <modal v-if="showAddFamilyForm" @close="showAddFamilyForm = false">
    <form @submit.prevent="createFamily">
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="newFamily.firstName">
      </div>
      <button type="submit" class="btn btn-primary">Create</button>
    </form>
  </modal>
    </div>
  </template>
  
  <script setup> 
    import {ref, onMounted,getCurrentInstance } from 'vue';
    import { useApplicationStore } from '@/stores/application.js';
    const { loadUserData } = useApplicationStore();
    const families =  ref([]);
    const userData = loadUserData();
    const instance = getCurrentInstance();
    const clientId = instance.proxy.$route.query.clientId;
    onMounted (()=>
    {
    fetch(`http://localhost:9090/api/family/list/${clientId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userData.accessToken}`, 
    },
  })
    .then(response => response.json())
    .then(data => {
      families.value = data;
    })
    .catch(error => console.error('Error fetching families:', error));
});
const addFamily = () => {
 
};

  </script>
  
  <style>
.stylish-btn {
  padding: 12px 24px !important;
  border-radius: 25px;
  text-decoration: none;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  background-color: #4e565c !important;
  border: none;
  display: inline-block;
  overflow: hidden;
  position: relative;
}

.stylish-btn:hover {
  background-color: #2c3e50;
  transform: scale(1.05);
}

.stylish-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #11212b, #133145);
  z-index: -1;
  transition: transform 0.3s ease;
  transform: scaleX(0);
  transform-origin: right;
}

.stylish-btn:hover::before {
  transform: scaleX(1);
  transform-origin: left;
}
  </style>
  