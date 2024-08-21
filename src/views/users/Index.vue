<template>
    <BaseBreadcrumb
        :title="title"
        :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <div v-if="!gettingData">
        <v-card>
            <v-card-text>
                <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                ></v-text-field>

                <DataTable
                    :headers="headers"
                    :items="userList"
                    :error-message="errorMessage"
                    :search="search"
                    @deleteHandler="deleteUser($event)"
                    @restoreHandler="restoreUser($event)"

                ></DataTable>
            </v-card-text>

            <v-card-actions v-if="errorMessage">
                error: {{ errorMessage }}
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseBreadcrumb from '../../components/_theme/shared/BaseBreadcrumb.vue';
import DataTable from '../../components/_theme/ui-components/data/Table.vue';
import UserController from '../../api/controllers/user';
import { User } from '../../api/models/user.ts';


export default defineComponent({
    components: {
        BaseBreadcrumb,
        DataTable
    },

    data() {
        return {
            title: 'User Accounts',
            errorMessage: '' as string,
            userList: [] as User[],
            search: '' as string,
            gettingData: false as Boolean,
        }
    },

    computed: {
        breadcrumbs() {
            return [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/'
                },
                {
                    text: 'Users',
                    disabled: true,
                    href: '#'
                }
            ];
        },
        headers() {
            return [
                { align: 'start', key: 'id', title: 'id' },
                { key: 'firstName', title: 'First Name' },
                { key: 'lastName', title: 'Last Name' },
                { key: '_actions_', title: 'Actions' },
            ]
        }
    },

    methods: {
        async getUserList(): Promise<void> {
            this.gettingData = true;
            try {
                const response = await UserController.get_list();
                this.userList = response.data as User[];
            } catch (error: any) {
                this.errorMessage = error.message || 'Failed to fetch users';
            }
            finally{
                this.gettingData = false;
            }
        },

        async deleteUser(user: User): Promise<void> {
            try {
                await UserController.soft_delete(user.id);
                await this.getUserList();
            } catch (error: any) {
                this.errorMessage = error.message || 'Failed to delete user';
            }
        },

        async restoreUser(user: User): Promise<void> {
            try {
                await UserController.restore(user.id);
                await this.getUserList();
            } catch (error: any) {
                this.errorMessage = error.message || 'Failed to restore user';
            }
        }
    },

    mounted() {
        this.getUserList();
    }
});
</script>
