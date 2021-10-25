<template>
    <div>
        <ApiList v-slot="{ items }" collection="Product" :skip="skip" :limit="limit">
            <ProductList :products="items" />
            <b-button @click="skip -= limit">–</b-button>
            {{ skip }}
            <b-button @click="skip += limit">+</b-button>
        </ApiList>
    </div>
</template>

<script>
export default {
    props: {},

    data() {
        return {
            skip: 0,
            limit: 15,
        };
    },

    computed: {},

    watch: {},

    methods: {},

    mounted() {},
};
</script>

<style></style>
