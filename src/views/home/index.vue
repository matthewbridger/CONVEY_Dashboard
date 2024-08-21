<template>
    <v-row class="pa-4">
        <v-col
            v-for="(statisticCardWidget, index) in statisticCardWidgets"
            :key="index"
            cols="12"
            sm="4"
            class="d-flex justify-between align-center"
        >
            <StatisticCardWidget
                :title="statisticCardWidget.title"
                :target="statisticCardWidget.target"
                :label="statisticCardWidget.label"
                :goToEdit="statisticCardWidget.goToEdit"
                :goToList="statisticCardWidget.goToList"
            />
        </v-col>
    </v-row>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatisticCardWidget from '../../components/widget/StatisticCard.vue'

export default defineComponent({
    components: {
        StatisticCardWidget
    },

    data() {
        return {
            statisticCardWidgets: [
                { 
                    title: 'Customers',
                    target: 'customers',
                    label: 'name',
                    goToEdit: 'CustomerEdit',
                    goToList: 'Customers'
                },
                {
                    title: 'Products',
                    target: 'products',
                    label: 'title',
                    goToEdit: 'ProductEdit',
                    goToList: 'Products'
                },
                {
                    title: 'Users',
                    target: 'users',
                    label: 'subject',
                    goToEdit: 'UserEdit',
                    goToList: 'Users'
                },
            ] as { title: string, target: string, label: string, goToList: string, goToEdit: string }[],
        }
    },
});
</script>

