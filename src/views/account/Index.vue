<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

    <v-row class="justify-center">
        <v-col cols="12" md="12">
            <AccountTab/>
        </v-col>
    </v-row>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '../../components/_theme/shared/BaseBreadcrumb.vue';
import AccountTab from '../../components/account/AccountTab.vue';

const page = ref({ title: 'Account Settings' });

const breadcrumbs = ref([
    {
        text: 'Dashboard',
        disabled: false,
        href: '/'
    },
    {
        text: 'Account',
        disabled: true,
        href: '#'
    }
]);
</script>