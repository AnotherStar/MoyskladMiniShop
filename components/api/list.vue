<template>
    <div>
        <slot :items="items" :is-loading="isLoading"></slot>
    </div>
</template>

<script>
export default {
    props: {
        collection: String,
        limit: {
            type: Number,
            default: 10,
        },
        skip: {
            type: Number,
            default: 0,
        },
        immediate: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            items: null,
            isLoading: false,
        };
    },

    computed: {
        filter() {
            return {
                limit: this.limit,
                skip: this.skip,
            };
        },
    },

    watch: {
        filter() {
            this.getItems();
        },
    },

    methods: {
        async getItems() {
            this.isLoading = true;
            this.$axios(`/api/${this.collection}`, {
                params: this.filter,
            })
                .then(response => response.data)
                .then(data => {
                    this.items = data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },

    mounted() {
        if (this.immediate) this.getItems();
    },
};
</script>

<style></style>
