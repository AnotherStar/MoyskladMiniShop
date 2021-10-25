<template>
    <div>
        <div v-for="(product, productIndex) in products" :key="`product_${productIndex}`">
            <ProductListRow :product="product" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        products: null,
    },

    data() {
        return {};
    },

    computed: {},

    watch: {},

    methods: {},

    mounted() {},
};
</script>

<style></style>
