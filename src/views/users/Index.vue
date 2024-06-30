<template>
    <BaseBreadcrumb
        :title="title"
        :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>

    <div>
        <DataTable
            :headers="headers"
            :items="userList"
            :error-message="errorMessage"
        ></DataTable>
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
            try {
                const response = await UserController.get_list();
                this.userList = response.data as User[];
            } catch (error: any) {
                this.errorMessage = error.message || 'Failed to fetch users';
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
