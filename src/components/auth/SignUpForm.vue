<template>
    <v-form 
        @submit.prevent="PostUserSignUpAttempt({ 
            username,
            email,
            password,
            location_full_name,
            currency_code
        })" 
        class="mt-5"
    >
        <v-label class="text-subtitle-1 font-weight-medium pb-2">User Name</v-label>
        <v-text-field v-model="username" required />

        <v-label class="text-subtitle-1 font-weight-medium pb-2">Email Address</v-label>
        <v-text-field v-model="email" required />

        <v-label class="text-subtitle-1 font-weight-medium pb-2">Location</v-label>
        <v-select
            v-model="location_full_name"
            :items="LocationSelectOptions"
            required
            item-title="state"
            item-value="abbr"
            label="Select"
            return-object
            single-line
            variant="outlined"
        />

        <v-label class="text-subtitle-1 font-weight-medium pb-2">Currency</v-label>
        <v-select
            v-model="currency_code"
            :items="CurrencySelectOptions"
            required
            item-title="state"
            item-value="abbr"
            label="Select"
            return-object
            single-line
            variant="outlined"
        />
        
        <v-label class="text-subtitle-1 font-weight-medium pb-2">Password</v-label>
        <v-text-field
            v-model="password"
            required
            variant="outlined"
            type="password"
            color="primary"
        />

        <div class="text-error text-center mt-1" v-if="sign_up_failed_error_message">
            {{ sign_up_failed_error_message }}
        </div>

        <v-btn
            type="submit"
            size="large"
            block
            color="info"
            variant="outlined"
            class="mt-2"
        >SIGN UP</v-btn>
    </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../store/user';

export default defineComponent({
  name: 'SignUpForm',

  components: {
  },

  data() {
    return {
        checkbox: false as boolean,
        valid: false as boolean,
        show1: false as boolean,
        username: "" as string,
        email: "" as string,
        location_full_name: "" as string,
        currency_code: "" as string,
        password: "" as string,
        sign_up_failed_error_message: null as any,
        LocationSelectOptions: ['United Kingdom', 'United States'] as string[], 
        CurrencySelectOptions: ['GBP', 'USD'] as string[],
    }
  },

  methods: {
    async PostUserSignUpAttempt(user: { 
        username: string,
        email: string,
        password: string,
        location_full_name: string,
        currency_code: string,
    }) {
        const { sign_up } = useUserStore();
        const response = await sign_up(user);
    
        if(response.success == true) {
            this.$router.push({ name: 'Dashboard' });
        }
        else {
            this.sign_up_failed_error_message = response.error_message;
        }
    }
  }
});
</script>