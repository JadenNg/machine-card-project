<template>
<!-- start page title -->
<div class="row">
    <div class="col-12">
        <div class="page-title-box d-flex align-items-center justify-content-between row px-3 pb-2">
            <h4 class="mb-0 font-size-18 col-xs-12">{{ title }}</h4>
            <div class="page-title-right col-xs-12 mt-1">
                <b-breadcrumb :items="items" class="m-0"></b-breadcrumb>
            </div>
        </div>
    </div>
</div>
<!-- end page title -->
</template>

<script>
export default {
    components: {},
    props: {
        title: {
            type: String,
            default: '',
        },
        items: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
}
</script>
