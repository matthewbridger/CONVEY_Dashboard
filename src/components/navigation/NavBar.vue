<template>
   <div>
      <!-- Navigation Bar -->
      <v-app-bar 
         dark
         height="60px"
         fixed
      >
         <v-row class="py-1">
            <!-- LHS -->
             
            <v-col cols="2" class="d-flex align-center">
               <!-- Hamburger Menu for a slide out menu (only show if admin) -->
               <v-app-bar-nav-icon
                  @click="navDraw.show = !navDraw.show"
               />
            </v-col>
            
            <!-- Center -->
            <v-col cols="8" class="d-flex justify-center align-center">
               <!-- Logo / Home link -->
               <v-toolbar-title class="d-flex justify-center">
                  <router-link
                     to="/"
                     class="d-flex"
                     style="text-decoration: none;"
                  >
                     <v-img contain max-width="36px" src="../../../public/assets/images/logo/full.png" alt="Logo"></v-img>
                  </router-link>
               </v-toolbar-title>
            </v-col>
   
            <!-- RHS -->
            <v-col cols="2" class="d-flex justify-end align-center">
               <!-- Quick Actions -->
               <v-btn 
                  v-for="(action, index) in navBar.actions"
                  :key="`${action.title}-${index}`"
                  @click="task_handler(action.run)"
                  icon
               >
                  <v-icon>{{ action.icon }}</v-icon>
               </v-btn>
            </v-col>
         </v-row>
      </v-app-bar>
 
      <!-- Navigation Drawer -->
      <v-navigation-drawer
         v-model="navDraw.show"
         style="z-index: 9999;"
      >
         <!-- Profile Header -->
         <div class="py-6">
            <router-link
               :to="{ name: 'Home' }"
               class="d-flex flex-column align-center"
               style="text-decoration: none;"
            >
               <v-avatar size="100">
                  <v-img src="/assets/images/user/default.png" />
               </v-avatar>

               <h4 class="mt-1">{{ `${user?.firstName[0]} ${user?.lastName[0]}` }}</h4>
            </router-link>
         </div>
 
         <v-divider/>
 
         <!-- Navigation Links to dashboard -->
         <v-list dense>
            <v-list-item
               v-for="(route, index) in navDraw.routes"
               :key="`${route.title}-${index}`"
               link
               class="d-flex"
            >
               <v-icon class="mr-2 mt-n1">{{ route.icon }}</v-icon>

               <router-link
                  :to="{ name: route.to }"
                  style="text-decoration: none; color: black;"
               >{{ route.title }}</router-link>
            </v-list-item>
         </v-list>
      </v-navigation-drawer>
   </div>
</template>
 
<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../store/user';

export default defineComponent({
   data() {
      return {
         // Navigation Bar
         navBar: {
            actions: [
               { title: 'Home', icon: 'mdi-logout-variant', run: 'sign_out' },
            ],
         },

         // Navigation Drawer
         navDraw: {
            show: false,
            routes: [
               { title: 'Dashboard', icon: 'mdi-view-dashboard', to: 'Home' },
               { title: 'Customers', icon: 'mdi-account-cash', to: '' },
               { title: 'Products', icon: 'mdi-store', to: '' },
               { title: 'Users', icon: 'mdi-account-group', to: '' },
            ],
         },
      }
   },

   computed: {
      user() {
         const { user } = useUserStore();

         return user;
      },
   },

   methods: {
      task_handler(key: string) {
         switch (key) {
            case 'sign_out':
               this.PostUserSignOutAttempt();
               break;
         
            default:
               break;
         }
      },

      async PostUserSignOutAttempt() {
        const { sign_out } = useUserStore();
        const response = await sign_out();
    
        if(response.success == true) {
            this.$router.push({ name: 'SignIn' });
        }
    }
   }
})
</script>
 
<style scoped>
   .router-link-exact-active {
      color: var(--v-primary-base) !important;
      cursor: pointer !important;
   }
</style>
