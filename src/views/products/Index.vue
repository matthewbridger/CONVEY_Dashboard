<template>
    <BaseBreadcrumb
        :title="title"
        :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>
    <div v-if="!gettingData">
        <v-card>
            <v-card-text>
                <v-text-field
                    v-model="search"
                    label="Search"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    hide-details
                    single-line
                ></v-text-field>

                <div class="mt-3 d-flex justify-start">
                    <v-btn @click="goToProductAddView()" color="info" variant="outlined">add new product</v-btn>
                </div>

                <DataTable
                    :headers="headers"
                    :items="productList"
                    :error-message="errorMessage"
                    :search="search"
                    @editHandler="goToProductEditView($event)"
                    @deleteHandler="deleteUser($event)"
                    @restoreHandler="restoreUser($event)"
                    :hover="true"
                ></DataTable>
            </v-card-text>

            <v-card-actions v-if="errorMessage">
                error: {{ errorMessage }}
            </v-card-actions>
        </v-card>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseBreadcrumb from '../../components/_theme/shared/BaseBreadcrumb.vue';
import DataTable from '../../components/_theme/ui-components/data/Table.vue';
import ProductController from '../../api/controllers/product';


export default defineComponent({
    components: {
        BaseBreadcrumb,
        DataTable
    },

    data() {
        return {
            title: 'Products',
            errorMessage: '' as string,
            productList: [] as object[],
            search: '' as string,
            gettingData: false as Boolean,
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

        headers() {
            return [
                { align: 'start', key: 'id', title: 'id' },
                { key: 'title', title: 'Title' },
                { key: 'productVariationCount', title: 'Variations' },
                { key: '_actions_', title: 'Actions' },
            ]
        }
    },

    async created() {
        await this.getProductList();
    },

    methods: {
        async getProductList(): Promise<void> {
            this.gettingData = true;
            try {
                const response = await ProductController.get_list();

                this.productList = response.data;
            }
            catch(error) {
                this.errorMessage = error;
            }
            finally{
                this.gettingData = false;
            }
        },

        async goToProductAddView(): Promise<void> {
           this.$router.push({
                name: 'ProductAdd',
           });
        },

        async deleteProduct(product: any): Promise<void> {
            try {
                await ProductController.soft_delete(product.id);

                await this.getProductList();
            }
            catch(error) {
                this.errorMessage = error;
            }
        },

        async restoreProduct(product: any): Promise<void> {
            try {
                await ProductController.restore(product.id);

                await this.getProductList();
            }
            catch(error) {
                this.errorMessage = error;
            }
        },

        async goToProductEditView(product: any): Promise<void> {          
           this.$router.push({
                name: 'ProductEdit',
                params: { id: product.id }
           });
        },
    }
});
</script>
