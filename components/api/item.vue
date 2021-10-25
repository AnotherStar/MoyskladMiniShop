<template>
    <div>
        <slot :item="item" :is-loading="isLoading"></slot>
    </div>
</template>

<script>
export default {
    props: {
        collection: String,
        itemId: String,
    },

    data() {
        return {
            item: null,
            isLoading: false,
        };
    },

    computed: {},

    watch: {},

    methods: {
        async getItem() {
            this.isLoading = true;
            this.$axios(`/api/${this.collection}/${this.itemId}`)
                .then(response => response.data)
                .then(data => {
                    this.item = data;
                })
                .finally(() => {
                    this.isLoading = false;
                });
        },
    },

    mounted() {
        this.getItem();
    },
};
</script>

<style></style>
