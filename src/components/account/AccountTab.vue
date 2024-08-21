<template>
    <div v-if="user">
        <v-row class="ma-sm-n2 ma-n1">
            <!-- Membership Section -->
            <v-col cols="12" sm="6">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5 text-capitalize">Current Membership Plan: Gold</h5>
                        <div class="text-center py-9">
                            <v-avatar size="120">
                                <img :src="`/assets/images/tiers/gold.png`" height="120" alt="image" />
                            </v-avatar>
                        </div>            
                        <div class="text-subtitle-1 text-medium-emphasis text-center my-sm-8 my-6 pt-1">Member since
                            December 2023</div>
                    </v-card-item>

                    <v-card-actions class="d-flex justify-center mt-5 mt-7">
                        <v-btn
                            color="primary"
                            class="mx-2"
                            variant="outlined"
                            flat
                        >Manage Membership</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Change Password Section -->
            <v-col cols="12" sm="6">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Change Password</h5>
                        <div class="mt-5">
                            <v-label class="mb-2 font-weight-medium">Current Password</v-label>
                            <v-text-field color="primary" variant="outlined" type="password" v-model="current_password" />
                            <v-label class="mb-2 font-weight-medium">New Password</v-label>
                            <v-text-field color="primary" variant="outlined" type="password" v-model="new_password" />
                            <v-label class="mb-2 font-weight-medium">Confirm Password</v-label>
                            <v-text-field color="primary" variant="outlined" type="password" v-model="confirm_new_password"
                                hide-details />
                        </div>
                    </v-card-item>

                    <v-card-actions class="d-flex justify-center mt-5">
                        <v-btn
                            @click="PostUserChangePasswordAttempt(user, current_password, new_password, confirm_new_password)"
                            :loading="updating_password" color="primary" class="mx-2" variant="outlined"
                            flat>Update Password
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <!-- Account Section -->
            <v-col cols="12">
                <v-card elevation="10">
                    <v-card-item>
                        <h5 class="text-h5">Account Details</h5>
                        <div class="text-subtitle-1 text-medium-emphasis mt-2">To change your account details, edit and
                            save from here</div>
                        <div class="mt-5">
                            <v-row>
                                <v-col cols="12" md="12">
                                    <v-label class="mb-2 font-weight-medium">Email</v-label>
                                    <v-text-field disabled color="primary" variant="outlined" type="email"
                                        v-model="user.email" hide-details />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium">First Name</v-label>
                                    <v-text-field color="primary" variant="outlined" type="text" v-model="user.firstName"
                                        hide-details />
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-label class="mb-2 font-weight-medium">Last Name</v-label>
                                    <v-text-field color="primary" variant="outlined" type="text" v-model="user.lastName"
                                        hide-details />
                                </v-col>
                            </v-row>
                        </div>
                    </v-card-item>

                    <v-card-actions class="d-flex justify-end mt-5">
                        <v-btn
                            @click="PostUserUpdateAttempt(user)"
                            color="primary"
                            class="mr-4"
                            variant="outlined"
                            flat
                            :loading="updating_user"
                        >Save Account Details</v-btn>

                        <v-btn @click="set_default_user()" color="error" variant="outlined" flat>Cancel</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useUserStore } from '../../store/user';

export default defineComponent({
    components: {
    },

    data() {
        return {
            user: null as any,
            LocationSelectOptions: ['United Kingdom', 'United States'] as string[],
            CurrencySelectOptions: ['GBP', 'USD'] as string[],

            current_password: '',
            new_password: '',
            confirm_new_password: '',

            updating_user: false as boolean,
            updating_password: false as boolean,
        }
    },

    created() {
        this.set_default_user();
    },

    methods: {
        set_default_user() {
            this.user = JSON.parse(JSON.stringify(useUserStore().user));
        },

        async PostUserUpdateAttempt(user: any) {
            this.updating_user = true;

            const { update_account_db } = useUserStore();
            const response = await update_account_db(user);

            this.updating_user = false;
        },

        async PostUserChangePasswordAttempt(
            user: any,
            current_password: string,
            new_password: string,
            confirm_new_password: string
        ) {
            this.updating_password = true;

            if (new_password != confirm_new_password) {
                return;
            }

            const { change_account_password_db } = useUserStore();

            const response = await change_account_password_db({ ...user, password: current_password, new_password });

            this.updating_password = false;
        },
    }
});
</script>