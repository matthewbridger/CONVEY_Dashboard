<template>
    <BaseBreadcrumb
        :title="title"
        :breadcrumbs="breadcrumbs"
    ></BaseBreadcrumb>

    <div v-if="product">
        {{ productVariations }}
        <v-card>
            <v-tabs
                v-model="tab"
                color="info"
                center-active
            >
                <v-tab value="overview">Overview</v-tab>
                <v-tab value="variations">Variations</v-tab>
                <v-tab value="notes">Notes</v-tab>
            </v-tabs>

            <v-window v-model="tab">
                <!-- Overview Tab -->
                <v-window-item value="overview">
                    <v-row class="pa-4">
                        <v-col sm="12" md="3">
                            <!-- <v-img
                                src="/assets/placeholder/products/MBRim.jpg"
                                alt="Product Image"
                                max-width="250px"
                                max-height="250px"
                            ></v-img> -->
                        </v-col>

                        <v-col sm="12`" md="9">
                            <v-label class="mb-2 font-weight-medium">Product Title</v-label>
                            <v-text-field v-model="product.title" variant="outlined" placeholder="Product Title" color="primary"></v-text-field>

                            <v-switch v-model="product.isDeleted" color="error" label="Disabled" inset></v-switch>

                            <div class="text-center">
                                <v-btn @click="editProduct(product)" color="info" variant="outlined">save product</v-btn>
                            </div>
                        </v-col>
                    </v-row>
                </v-window-item>

                <!-- Variations Tab -->
                <v-window-item value="variations">
                    <v-row class="pa-4">
                        <v-col sm="12">
                            <table class="mt-2" style="width: 100%;">
                                <thead>
                                    <tr class="text-left">
                                        <th width="10%"></th>
                                        <th width="20%">Size</th>
                                        <th width="20%">Colour</th>
                                        <th width="15%">Stock</th>
                                        <th width="15%">Price</th>
                                        <th width="10%">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(productVariation, index) in product.productVariations"
                                        :key="index"
                                    >
                                        <!-- Cover Image -->
                                        <td class="py-1">
                                            <!-- <v-img
                                                src="/assets/placeholder/products/MBRim.jpg"
                                                alt="Product Image"
                                                max-width="60px"
                                                max-height="60px"
                                            ></v-img> -->
                                        </td>
                                        <!-- Size -->
                                        <td class="py-1">{{ productVariation?.title || 'N/A' }}</td>
                                        <!-- Colour -->
                                        <td class="py-1">{{ productVariation?.colour || 'N/A' }}</td>
                                        <!-- Stock -->
                                        <td class="py-1">{{ productVariation?.amountOfStock || 0 }}</td>
                                        <!-- Price -->
                                        <td class="py-1">R{{ productVariation?.price || 0 }}</td>
                                        <!-- Actions -->
                                        <td class="py-1">
                                            <!-- TODO Add @click  -->

                                            <v-icon
                                                size="small"
                                                color="red"
                                            >mdi-pencil</v-icon>
                                            <!-- TODO Add @click  -->

                                            <v-icon
                                                v-if="productVariation.isDeleted == false"
                                                size="small"
                                                color="error"
                                                class="ml-2"
                                            >mdi-delete</v-icon>
                                            <!-- TODO Add @click  -->
                                            <v-icon
                                                v-else-if="productVariation.isDeleted == true" 
                                                size="small"
                                                color="info"
                                                class="ml-2"
                                            >mdi-restore</v-icon>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="py-1">
                                            <!-- <v-img
                                                src="/assets/placeholder/products/MBRim.jpg"
                                                alt="Product Image"
                                                max-width="60px"
                                                max-height="60px"
                                            ></v-img> -->
                                        </td>
                                        <td class="pr-2 pt-5">
                                            <v-text-field v-model="productVariation.sizeId" variant="outlined" placeholder="Size" color="primary"></v-text-field>
                                        </td>
                                        <td class="pr-2 pt-5">
                                            <v-text-field v-model="productVariation.colour" variant="outlined" placeholder="Colour" color="primary"></v-text-field>
                                        </td>
                                        <td class="pr-2 pt-5">
                                            <v-text-field v-model="productVariation.amountOfStock" variant="outlined" placeholder="Stock" color="primary"></v-text-field>
                                        </td>
                                        <td class="pr-2 pt-5">
                                            <v-text-field v-model="productVariation.price" variant="outlined" placeholder="Price" color="primary"></v-text-field>
                                        </td>
                                        <td>
                                            <!-- TODO Add @click  -->
                                            <v-icon
                                                size="large"
                                                class="ml-2"
                                                @click="addProductVariation(index)"
                                            >mdi-plus-circle-outline</v-icon>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </v-col>
                    </v-row>
                </v-window-item>

                <!-- Notes Tab -->
                <v-window-item value="notes">
                    <v-row class="pa-4">
                        <v-col cols="12" sm="12">
                            Notes
                        </v-col>
                    </v-row>
                </v-window-item>
            </v-window>
        </v-card>

        
    </div>
</template>

<script lang="ts">
//@ts-ignore
import { defineComponent } from 'vue';
import BaseBreadcrumb from '../..//components/_theme/shared/BaseBreadcrumb.vue';
import ProductController from '../../api/controllers/product'
import ProductVaricationController from '../../api/controllers/productVariation'


export default defineComponent({
    components: {
        BaseBreadcrumb
    },

    data() {
        return {
            title: 'Product' as string,
            tab: 'overview' as string,
            product: null as any,
            productVariation: {} as any,
            errorMessage: null as any,
        }
    },

    computed: {
        //@ts-ignore
        breadcrumbs(){
            return [
                {
                    text: 'Dashboard',
                    disabled: false,
                    href: '/'
                },
                {
                    text: 'Products',
                    disabled: false,
                    href: '/products'
                },
                {
                    text: 'Edit',
                    disabled: true,
                    href: '#'
                },
                {
                    //@ts-ignore
                    text: `${this.$route.params.id}`,
                    disabled: true,
                    href: '#'
                }
            ];
        },
    },

    async created() {
        await this.getProduct();
    },

    methods: {
        async getProduct(): Promise<void> {
            try {
                //@ts-ignore
                const id: any = this.$route.params.id;

                const response = await ProductController.get(id);
                //@ts-ignore
                this.product = response.data;
            }
            catch(error) {
                //@ts-ignore
                this.errorMessage = error;
            }
        },

        async editProduct(product: any): Promise<void> {
            try {
                await ProductController.edit(product);

                await this.getProduct();
            }
            catch(error) {
                //@ts-ignore#
                this.errorMessage = error;
            }
        },

        async deleteProduct(product: any): Promise<void> {
            try {
                await ProductController.soft_delete(product.id);

                await this.getProduct();
            }
            catch(error) {
                    //@ts-ignore
                this.errorMessage = error;
            }
        },

        async restoreProduct(product: any): Promise<void> {
            try {
                await ProductController.restore(product.id);

                await this.getProduct();
            }
            catch(error) {
                    //@ts-ignore
                this.errorMessage = error;
            }
        },

        async addProductVariation(): Promise<void> {
            try {
                //@ts-ignore
                const id: any = this.$route.params.id;
                //@ts-ignore
                const response = await ProductVaricationController.add({ ...this.productVariation, productId: id });
                //@ts-ignore
                this.product = response.data;
            }
            catch(error) {
                //@ts-ignore
                this.errorMessage = error;
            }
        },
    }
});
</script>
