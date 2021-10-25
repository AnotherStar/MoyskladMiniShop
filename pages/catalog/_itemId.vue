<template>
    <div>
        <ApiItem collection="Product" :item-id="itemId" v-slot="{ item }">
            <ProductCard :product="item" v-if="item" />
        </ApiItem>
    </div>
</template>

<script>
export default {
    props: {},

    data() {
        return {};
    },

    computed: {
        itemId() {
            return this.$route.params.itemId;
        },
    },

    watch: {},

    methods: {},

    mounted() {},
};
</script>

<style></style>
