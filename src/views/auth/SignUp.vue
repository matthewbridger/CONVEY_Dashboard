<template>
    <div class="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0  mx-auto" max-width="450">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4 mb-5">
                                <v-img max-height="250px" src="../../assets/logo.png" alt="Logo"></v-img>
                            </div>
                            
                            <SignUpForm />

                            <h6 class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-3">
                                Already have an Account?
                                <v-btn
                                    variant="plain"
                                    to="/signin"
                                    class="text-primary text-body-1 opacity-1 pl-2"
                                >Sign In</v-btn>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import SignUpForm from '../../components/auth/SignUpForm.vue';
</script>