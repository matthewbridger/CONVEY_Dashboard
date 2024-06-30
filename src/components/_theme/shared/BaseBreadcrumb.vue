<script setup lang="ts">
const props = defineProps({
    title: String,
    breadcrumbs: Array as any,
    icon: String
});
</script>

<template>
    <v-card class="bg-primary">
        <div class="px-8 py-5">
            <h3 class="text-h3 mb-2">{{ title }}</h3>
            <v-breadcrumbs :items="breadcrumbs" class="pa-0 ml-n1">
                <template v-slot:divider>
                    <div class="text-h3 mt-n4">.</div>
                </template>
                <template v-slot:title="{ item }">
                    <h6 class="text-subtitle-1">{{ item.text }}</h6>
                </template>
            </v-breadcrumbs>
        </div>
    </v-card>
</template>

<style lang="scss">
.page-breadcrumb {
    .v-toolbar {
        background: transparent;
    }
}
</style>
