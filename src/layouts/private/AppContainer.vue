<template>
    <v-locale-provider>
        <v-app>
            <NavBar class="pb-14"/>

            <v-main>
                <v-container fluid class="page-wrapper pb-sm-15 pb-10">
                    <div class="maxWidth">
                        <RouterView />
                    </div>
                </v-container>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>

<script setup lang="ts">
    import { RouterView } from 'vue-router';
    import NavBar from '../../components/navigation/NavBar.vue'
</script>
