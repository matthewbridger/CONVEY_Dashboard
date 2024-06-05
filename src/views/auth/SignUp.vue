<template>
    <v-container class="auth-container" max-width="400">
      <v-card>
        <v-card-title>Sign Up</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              required
            ></v-text-field>
            <v-btn type="submit" color="success" block>Sign Up</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  const confirmPassword = ref('');
  
  const handleSubmit = () => {
    if (password.value !== confirmPassword.value) {
      alert('Passwords do not match');
      return;
    }
    console.log('Sign Up:', { email: email.value, password: password.value });
    // Add your sign-up logic here
  };
  </script>
  
  <style scoped>
  .auth-container {
    margin: 0 auto;
    padding: 1rem;
  }
  </style>
  