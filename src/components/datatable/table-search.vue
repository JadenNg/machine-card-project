<template>
<div class="search-box mr-2 mb-2 d-inline-block">
    <div class="position-relative">
        <input type="text" class="form-control" v-model="keyword" :placeholder="placeholder" />
    </div>
</div>
</template>

<script>
import debounce from 'debounce';

export default {
    name: 'table-search',
    props: {
        placeholder: {
            default: "Tìm kiếm...",
        },
        pagination: {
            type: Object,
            default: () => ({
                search: '',
            }),
        },
    },
    watch: {
        keyword: {
            handler: function () {
                if (this.loaded) this.debouncedSearch();
            },
        },
    },
    methods: {
        runSearch() {
            let query = {
                ...this.$route.query
            };
            if (this.keyword) {
                query.search = this.keyword;
            } else {
                delete(query.search);
            }
            this.$router.push({
                name: this.$route.name,
                query: query
            });
        },
    },
    data: function () {
        return {
            keyword: '',
            debouncedSearch: debounce(this.runSearch, 1000),
            loaded: false,
        };
    },
    created() {
        if (this.$route.query.search) this.keyword = this.$route.query.search;
        else this.keyword = this.pagination ? this.pagination.search : '';

        let self = this;
        setTimeout(function () {
            self.loaded = true;
        }, 1000);
    },
    mounted() {},
};
</script>

<style scoped>

</style>
