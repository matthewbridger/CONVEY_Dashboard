<template>
    <BaseBreadcrumb
        :title="title"
        :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>

    <div v-if="product">
        <v-card class="pa-4">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-label class="mb-2 font-weight-medium">Name</v-label>
                    <v-text-field v-model="product.title" variant="outlined" placeholder="Product Name" color="primary"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-label class="mb-2 font-weight-medium">Amount Of Stock</v-label>
                    <v-text-field v-model="product.size" variant="outlined" placeholder="Product Stock" color="primary"></v-text-field>
                </v-col>

                


                <v-col cols="12" sm="12">
                    <v-switch v-model="product.isDeleted" color="error" label="Product Disabled" inset></v-switch>
                </v-col>

                <v-col cols="12" sm="12" class="text-center">
                    <v-btn @click="addProduct(product)" color="info" variant="outlined">create product</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </div>
</template>

<script lang="ts">
//@ts-ignore
import { defineComponent } from 'vue';
import BaseBreadcrumb from '../..//components/_theme/shared/BaseBreadcrumb.vue';
import ProductController from '../../api/controllers/product'

export default defineComponent({
    components: {
        BaseBreadcrumb,
    },

    data() {
        return {
            title: 'Product',
            product: {} as any,
            errorMessage: null as any,
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
                    disabled: false,
                    href: '/product'
                },
                {
                    text: 'Add',
                    disabled: true,
                    href: '#'
                }
            ];
        },
    },

    methods: {
        async addProduct(product: any): Promise<void> {
            try {
                const response = await ProductController.add(product);

                await this.goToProductEditView(response.data);
            }
            catch(error) {
                //@ts-ignore
                this.errorMessage = error;
            }
        },

        async goToProductEditView(product: any): Promise<void> {
            //@ts-ignore
           this.$router.push({
                name: 'ProductEdit',
                params: { id: product.id }
           });
        }
    }
});
</script>
