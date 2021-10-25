<template>
    <div>
        <router-link :to="`${$route.fullPath}/${product._id}`">{{ product.name }}</router-link>
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
