<template>
    <div>
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <div>{{ product.code }}</div>
    </div>
</template>

<script>
export default {
    props: {
        product: null,
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
