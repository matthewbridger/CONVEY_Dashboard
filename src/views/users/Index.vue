<template>
    <BaseBreadcrumb
        :title="title"
        :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseBreadcrumb from '../../components/_theme/shared/BaseBreadcrumb.vue';

export default defineComponent({
    components: {
        BaseBreadcrumb
    },

    data() {
        return {
            title: 'User Accounts',
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
    },

});
</script>
