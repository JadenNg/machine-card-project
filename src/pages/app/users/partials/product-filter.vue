<template>
    <div>
        <div class="row">
            <div class="col-lg-7">
                <div class="row">
                    <div class="col-lg-4">
                        <b-form-group>
                            <input type="text" class="form-control" v-model="search"
                                placeholder="Enter name" />
                        </b-form-group>
                    </div>
                    <div class="col-lg-4">
                        <b-button variant="light" class="btn-refresh" @click="refresh">
                            <i class="fas fa-sync"></i>
                        </b-button>
                    </div>
                </div>
            </div>
            <div class="col-lg-5">

            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-filter',
    data() {
        return {
            search: "",
        };
    },
    watch: {
        search: {
            handler: function () {
                let query = {
                    ...this.$route.query,
                };
                if (this.search == '') {
                    delete query.search
                    this.$router.push({
                        name: this.$route.name,
                        query: query,
                    });
                }
                if (this.search.length > 0) {
                    query.search = this.search;
                    setTimeout(() => {
                        if (query.search == this.search || (this.search.length < query.search.length && query.search.length == this.search.length)) {
                            this.$router.push({
                                name: this.$route.name,
                                query: query,
                            });
                        }
                    }, 800);
                } else {
                    delete query.search;
                }
            },
            deep: true,
        },
    },
    methods: {
        async refresh() {
            Object.assign(this.$data, this.$options.data.apply(this))
        },
        getData() {
            let query = this.$route.query
            if (query.search) {
                this.search = query.search
            }
        }
    },
    created() {
        this.getData()
    },
};
</script>

<style scoped>
/* .style-width {
    width: 600px !important;
} */
</style>
