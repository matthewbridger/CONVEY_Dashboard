<template>
    <v-card @click="clickGoToList()" dark class="card-hover">
        <v-card-title class="d-flex justify-between align-center">
            <div class="w-75">
                {{ title }}
            </div>

            <div class="w-25 d-flex justify-end">
                <v-chip class="pa-3" color="info" label>
                    {{ total }}
                </v-chip>
            </div>
        </v-card-title>

        <v-card-text>
            <div v-if="items">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    @click.stop="clickGoToItem(item)"
                    class="d-flex justify-between py-1"
                    :style="{ backgroundColor: $vuetify.theme.themes.light.colors.primary}"
                >
                    <div class="w-50">{{ index+1 }}) {{ item[label] }}</div>
                    <div class="w-50 text-end">{{ parseDate(item.updatedAt) }}</div>
                </div>
            </div>
            <div v-else>
                no recent updates...
            </div>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StatisticController from '../../api/controllers/statistic';
import { format, parseISO } from 'date-fns';

export default defineComponent({
    props: {
        target: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        label: {
            type: String,
            required: true,
        },

        goToEdit: {
            type: String,
            required: true,
        },

        goToList: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            items: null as any,
            total: 0,
            errorMessage: null as any,
        }
    },

    created() {
        this.getTargetData();
        this.getLatestUpdatedItems();
    },

    methods: {
        async getTargetData(): Promise<void> {
            try {
                this.total = 0;

                const response = await StatisticController.get_table_count(this.target);

                if(response?.data?.total > 0) {
                    this.total = response.data.total;
                }
            }
            catch(error) {
                this.errorMessage = error;
            }
        },

        async getLatestUpdatedItems(): Promise<void> {
            try {
                this.total = 0;

                const response = await StatisticController.get_latest_updated_items(this.target, 5);

                this.items = response.data;
            }
            catch(error) {
                this.errorMessage = error;
            }
        },


        parseDate(date) {
            
            // Check if the date is undefined or not a string
            if (typeof date !== 'string' || date.trim() === '') {
                return 0;
            }         
            // Parse the date string into a Date object
            const parsedDate = parseISO(date);
            return format(parsedDate, 'dd-MM-yyyy HH:mm');
        },

        // parseDate(date: any) {
        //     return format(parseISO(date), 'dd-MM-yyyy HH:mm');
        // },

        clickGoToList() {
            this.$router.push({
                name: this.goToList,
           });
        },

        clickGoToItem(item: any) {
            this.$router.push({
                name: this.goToEdit,
                params: { id: item.id }
           });
        },
    }
});
</script>

<style scoped>
.card-hover {
    transition: transform 0.3s;
}

.card-hover:hover {
    transform: scale(1.01);
}

.item-hover {
    transition: transform 0.3s;
}

.item-hover:hover {
    background: #eee !important;
    cursor: pointer;
}
</style>
