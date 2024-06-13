<template>
    <div id="authentication">
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0  mx-auto" max-width="450">
                        <v-card-item class="pa-sm-8">
                            <div class="d-flex justify-center py-4 mb-5">
                                <v-img max-height="250px" src="/assets/images/logo/full.png" alt="Logo"></v-img>
                            </div>
                            
                            <SignInForm> </SignInForm>

                            <h6 class="text-h6 text-medium-emphasis d-flex justify-center align-center mt-5">
                                <v-btn 
                                    class="pl-0 text-primary text-body-1 opacity-1 pl-2"
                                    height="auto"
                                    to="/signup"
                                    variant="plain"
                                >Create an account</v-btn>
                            </h6>
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import SignInForm from '../../components/auth/SignInForm.vue';
</script>
