<template>
    <v-container class="auth-container" max-width="400">
      <v-card>
        <v-card-title>Sign In</v-card-title>
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
            <v-btn type="submit" color="primary" block>Sign In</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const email = ref('');
  const password = ref('');
  
  const handleSubmit = () => {
    console.log('Sign In:', { email: email.value, password: password.value });
    // Add your sign-in logic here
  };
  </script>
  
  <style scoped>
  .auth-container {
    margin: 0 auto;
    padding: 1rem;
  }
  </style>
  