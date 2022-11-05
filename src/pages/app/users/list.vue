<template>
    <div>
        <page-header :title="`User`" :items="breadcrumbs" />
        <div class="card">
            <div class="card-body">
                <div class="mb-2">
                    <product-filter />
                    <div class="col-sm-2">
                        <div class="text-sm-right">
                        </div>
                    </div>
                </div>
                <!-- Table data -->
                <div class="table-responsive">
                    <table class="table table-hover table-centered table-nowrap">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th v-show="isShow" scope="col" style="width: 50px;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entry in entries" :key="entry._id">
                                <td>
                                    {{ entry.name }} 
                                <!-- name -->
                                </td>
                                <td>
                                    {{ entry.phone }} 
                                <!-- phone-email -->
                                </td>
                                <td v-show="isShow" class="text-right" style="font-size: 16px">
                                    <router-link v-b-tooltip.hover :title="`Edit`" class="text-primary"
                                        :to="{ name: 'admin.users.edit', params: { id: entry._id } }">
                                        <i class="bx bx-edit"></i>
                                    </router-link>
                                    <a href="javascript: void(0);" v-b-tooltip.hover :title="`Delete`" class="text-danger"
                                        @click.prevent="deleteEntry(entry)"> <i class="bx bx-trash"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <b-container>
                    <b-row class="text-right">
                        <b-col cols="10" style="margin-top: 13px">
                            <table-info :pagination="pagination" />
                        </b-col>
                        <b-col cols="2">
                            <table-pagination :pagination="pagination" />
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
import PageHeader from '../../../components/page-header';
import Swal from 'sweetalert2';
import TableInfo from '../../../components/datatable/table-info';
import TablePagination from '../../../components/datatable/table-pagination';
import ProductFilter from './partials/product-filter';
import {
    httpClient
} from "../../../_utils/httpClient";
import {
    httpPreview
} from "../../../_utils/httpPreview";

export default {
    name: 'list',
    components: {
        ProductFilter,
        TablePagination,
        TableInfo,
        PageHeader,
    },
    data: () => ({
        search: '',
        breadcrumbs: [{
            text: 'Home',
            to: '/admin/home',
        }, {
            text: 'Users',
            to: '/admin/users',
            active: true,
        },],
        entries: [],
        pagination: {
            limit: 10,
            skip: 0,
            total: 0,
            page: 1,
            search: '',
        },
        userName: "",
    }),
    computed: {
        isShow() {
            let role = Number(localStorage.getItem('position'));
            return role == 1;
        }
    },
    watch: {
        '$route.query': {
            handler: function () {
                this.getData((this.$route.query.page - 1) * this.pagination.limit, this.$route.query);
            },
        },
    },
    methods: {
        firstPage() {
            let query = {
                ...this.$route.query
            };
            delete (query.page);
            this.$router.replace({
                name: this.$route.name,
                query: query,
            }).catch(err => err);
        },
        async getData(skip = 0, payload = {}) {
            if (isNaN(skip)) {
                skip = 0
            }
            this.pagination.skip = skip
            let response = await httpClient.get(`user/find`, {
                params: {
                    ...this.pagination,
                    search: payload.search
                }
            }).catch(err => err)
            if (response.status === 200 && response.data.data) {
                this.entries = response.data.data

                this.pagination = {
                    ...this.pagination,
                    total: response.data.total,
                    page: Math.ceil(skip / this.pagination.limit) + 1
                }
            } else {
                this.entries = []
                this.pagination = {
                    ...this.pagination,
                    total: 0,
                    page: 1
                }
            }
            if (this.entries.length == 0) {
                this.firstPage();
                return true;
            }
        },
        replaceBrokenImage(event) {
            event.target.src = require('@/assets/images/no-image.png');
        },
        addPrefixImage(src) {
            if (src && src.startsWith(`http`)) return src
            return httpPreview + src
        },
        async deleteEntry(entry) {
            await Swal.queue([{
                title: 'Delete user: ' + entry.name,
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#34c38f',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#f46a6a',
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    let response = await httpClient.post(`user/delete`, {
                        id: entry._id
                    })
                    if (response.data.code === 0) {
                        Swal.insertQueueStep({
                            title: 'Delete successful',
                        });
                        await this.getData((this.$route.query.page - 1) * this.pagination.limit, this.$route.query);
                    } else {
                        Swal.insertQueueStep({
                            title: 'Delete failed',
                        });
                    }
                    return true;
                },
            },]);
        },
    },
    created() {
        this.getData((this.$route.query.page - 1) * this.pagination.limit, this.$route.query);
    },
};
</script>

<style scoped>
.style-width {
    min-width: 140px;
}

.style-top {
    transform: translateY(25vh);
}
</style>
