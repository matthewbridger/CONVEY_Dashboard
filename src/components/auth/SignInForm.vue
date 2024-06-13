<template>
    <v-form @submit.prevent="PostUserSignInAttempt(email, password)" class="mt-5">
        <!-- Email Address -->
        <v-label class="text-subtitle-1 font-weight-semibold pb-2 text-lightText">Email Address</v-label>
        <v-text-field
            v-model="email"
            required
            hide-details="auto"
        />

        <!-- Password -->
        <v-label class="mt-4 text-subtitle-1 font-weight-semibold pb-2 text-lightText">Password</v-label>
        <v-text-field
            v-model="password"
            required
            hide-details="auto"
            type="password"
            class="pwdInput"
        />

        <!-- Error Message -->
        <div class="text-error text-center mt-1" v-if="sign_in_failed_error_message">
            {{ sign_in_failed_error_message }}
        </div>

        <!-- Forgot Password -->
        <div class="d-flex flex-wrap align-center my-3 ml-n2">
            <div class="mx-auto" v-if="sign_in_failed_error_message">
                <RouterLink
                    to=""
                    class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
                >Forgot Password ?</RouterLink>
            </div>
        </div>

        <!-- Submit  -->
        <v-btn
            type="submit"
            :disabled="!email || !password"
            size="large"
            color="info"
            variant="outlined"
            block
            class="mt-6"
        >SIGN IN</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../store/user';

export default defineComponent({
  name: 'DashboardView',

  data() {
    return {
        checkbox: false as boolean,
        valid: false as boolean,
        show1: false as boolean,
        email: "" as string,
        password: "" as string,
        sign_in_failed_error_message: null as any
    }
  },

  methods: {
    async PostUserSignInAttempt(email: string, password: string) {
        const { sign_in } = useUserStore();
        const response = await sign_in(email, password);
    
        if(response.success == true) {
            this.$router.push({ name: 'Dashboard' });
        }
        else {
            this.sign_in_failed_error_message = response.error_message;
        }
    }
  }
});
</script>