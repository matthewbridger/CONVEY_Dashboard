<template>
    <BaseBreadcrumb :title="page.title" :breadcrumbs="breadcrumbs"></BaseBreadcrumb>

</template>

<script setup lang="ts">
import { ref } from 'vue';

import BaseBreadcrumb from '../../components/_theme/shared/BaseBreadcrumb.vue';

const page = ref({ title: 'Account Settings' });

const breadcrumbs = ref([
    {
        text: 'Home',
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