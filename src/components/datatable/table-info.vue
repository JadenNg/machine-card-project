<template>
<span class="style-margin" >
    Từ {{ from }} -> {{to}} trong tổng {{ pagination.total }}
</span>
</template>

<script>
export default {
    name: 'table-info',
    props: {
        pagination: Object,
    },
    computed: {
        from() {
            return this.pagination.total ? (this.pagination.page - 1) * this.pagination.limit + 1 : 0;
        },
        to() {
            return this.pagination.total < this.pagination.page * this.pagination.limit ? this.pagination.total : this.pagination.page * this.pagination.limit;
        },
    },
    mounted() {}
};
</script>

<style scoped>
.style-margin {
    margin-top: 0px;
    transform: translateX(-20px);
    display: inline-block;
    font-size: 14px; 
    margin-right: 60px
}
@media (max-width: 375px) {
    .style-margin {
        margin-top: 40px;
        display: inline-block;
        transform: translateX(15px);
        width: 200px;
    }
}
</style>
