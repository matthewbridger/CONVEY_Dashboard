<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :search="search"
    >
        <template v-slot:item._actions_="{ item }">
            <v-icon
                @click="$emit('editHandler', item)"
                size="small"
            >mdi-pencil</v-icon>

            <v-icon
                v-if="item&& item.isDeleted === false"
                @click="$emit('deleteHandler', item)"
                size="small"
                color="error"
                class="ml-2"
            >mdi-delete</v-icon>

            <v-icon
                v-else-if="item && item.isDeleted === true"
                @click="$emit('restoreHandler', item)"
                size="small"
                color="info"
                class="ml-2"
            >mdi-restore</v-icon>
        </template>
    </v-data-table>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        headers: {
            type: Array,
            required: true,
        },

        items: {
            type: Array,
            required: true,
        },

        title: {
            type: String,
            required: false,
        },

        errorMessage: {
            type: String,
            required: false,
        },
    },

    data() {
        return {
            search: '' as string,
        }
    },
});
</script>