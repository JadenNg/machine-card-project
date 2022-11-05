<template>
<ul class="pagination pagination-rounded justify-content-end my-2">
    <li v-if="pagination.page > 2" class="page-item">
        <a class="page-link" href="javascript: void(0);" aria-label="Previous" @click="firstPage">
            <i class="mdi mdi-chevron-double-left"></i>
        </a>
    </li>
    <li v-if="pagination.page > 1" class="page-item">
        <a class="page-link" href="javascript: void(0);" aria-label="Previous" @click="prevPage">
            <i class="mdi mdi-chevron-left"></i>
        </a>
    </li>
    <li class="page-item">
        <a class="page-link" href="javascript: void(0);">{{ pagination.page }}</a>
    </li>
    <!-- <li class="page-item" :class="{ active: index === 0 }" v-for="(page, index) in pagination.pages" :key="index">
            <a class="page-link" href="javascript: void(0);">{{ page }}</a>
        </li> -->
    <li class="page-item" :class="{ disabled: !(pagination.total - pagination.skip > pagination.limit) }">
        <a class="page-link" href="javascript: void(0);" aria-label="Next" @click="nextPage">
            <i class="mdi mdi-chevron-right"></i>
        </a>
    </li>
    <li v-if="pagination.page > 0" class="page-item">
        <a class="page-link" href="javascript: void(0);" aria-label="Previous" @click="lastPage">
            <i class="mdi mdi-chevron-double-right"></i>
        </a>
    </li>
</ul>
</template>

<script>
export default {
    name: 'table-pagination',
    props: {
        allowedExport: {
            type: Boolean,
            default: false
        },
        pagination: {
            type: Object,
            default: function () {
                return {};
            },
        },
    },
    methods: {
        scrollTop() {
            window.scrollTo(0, 0);
        },
        firstPage() {
            let query = {
                ...this.$route.query
            };
            delete(query.page);
            this.$router.replace({
                name: this.$route.name,
                query: query
            });
            this.scrollTop()
        },
        nextPage() {
            let canNext = (this.pagination.total - this.pagination.skip) > this.pagination.limit;
            if (canNext) {
                let query = {
                    ...this.$route.query
                };
                query.page = 1 + this.pagination.page;
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                });
                this.scrollTop()
            }
        },
        lastPage() {
            let canNext = (this.pagination.total - this.pagination.skip) > this.pagination.limit;
            if (canNext) {
                let query = {
                    ...this.$route.query
                };
                query.page = Math.ceil(this.pagination.total / this.pagination.limit);
                this.$router.replace({
                    name: this.$route.name,
                    query: query
                });
                this.scrollTop()
            }
        },
        prevPage() {
            let query = {
                ...this.$route.query
            };
            query.page = this.pagination.page - 1;
            this.$router.replace({
                name: this.$route.name,
                query: query
            });
            this.scrollTop()
        },
    },
};
</script>
