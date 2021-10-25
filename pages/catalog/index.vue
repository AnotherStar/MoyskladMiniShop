<template>
    <div>
        <ApiList v-slot="{ items: products }" collection="Product">
            <div v-for="(product, productIndex) in products" :key="`product_${productIndex}`">
                {{ product }}
            </div>
        </ApiList>
    </div>
</template>

<script>
export default {
    props: {},

    data() {
        return {
            products: [],
        };
    },

    computed: {},

    watch: {},

    methods: {},

    mounted() {},
};
</script>

<style></style>
