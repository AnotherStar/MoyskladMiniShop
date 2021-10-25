<template>
    <div>
        <slot :items="items" :is-loading="isLoading"></slot>
    </div>
</template>

<script>
export default {
    props: {
        collection: {
            type: String,
        },
    },

    data() {
        return {
            items: null,
        };
    },

    computed: {},

    watch: {},

    methods: {
        async getItems() {
            this.isLoading = true;
            this.$axios(`/api/${this.collection}`)
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
        this.getItems();
    },
};
</script>

<style></style>
