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
            title: 'Products',
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
                    text: 'Products',
                    disabled: true,
                    href: '#'
                }
            ];
        },
    },

});
</script>
