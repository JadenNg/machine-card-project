<template>
    <div>
        <page-header :title="`Machine`" :items="breadcrumbs" />
        <div class="card">
            <div class="card-body">
                <div class="mb-2" style="width:100%">
                    <div class="col-mr-3">
                        <div class="text-sm-right">
                            <product-filter />
                        </div>
                    </div>
                </div>
                <div class="table-responsive">
                    <table class="table table-hover table-centered table-nowrap">
                        <thead class="thead-light">
                            <tr>
                                <th scope="col" class="text-center">Workstation</th>
                                <th scope="col" class="text-center" style="width: 210px !important; min-width: 210px;">
                                    CPU data</th>
                                <th scope="col" style="width: 190px">Application</th>
                                <th scope="col" style="width: 210px !important; min-width: 210px;">Profinet infomation
                                </th>
                                <th scope="col" style="width: 80px;">Profibus address</th>
                                <th scope="col" style="width: 160px;">Other info</th>
                                <th scope="col" class="text-center">Status</th>
                                <th scope="col" style="width: 30px;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="entry in entries" :key="entry.id">
                                <td class="text-center">
                                    {{ entry.workstation }}
                                </td>
                                <td v-html="formatHtml(entry.CPUData)">
                                </td>
                                <td>
                                    {{ entry.application }}
                                </td>
                                <td v-html="formatHtml(entry.profinetInfomation)">
                                </td>
                                <td class="text-center">
                                    {{ entry.profibusAddress }}
                                </td>
                                <td>
                                    {{ entry.otherInfo }}
                                </td>
                                <td class="text-center">
                                    <b-button :disabled="!isShow" v-if="entry.status == 1" @click="updateStatus(entry)"
                                        variant="outline-success">Opening
                                    </b-button>
                                    <b-button :disabled="!isShow" v-else @click="updateStatus(entry)"
                                        variant="outline-danger">Closing
                                    </b-button>
                                </td>
                                <td class="text-center" style="font-size: 16px">
                                    <router-link v-show="isShow" v-b-tooltip.hover :title="`Statistics`" class="text-warning"
                                        :to="{
                                            name: 'admin.machines.statistic',
                                            params: { id: entry._id },
                                        }">
                                        <i class='bx bx-right-arrow-circle'></i>
                                    </router-link>
                                    <a href="javascript: void(0);" v-b-tooltip.hover :title="`Detail`" class="text-dark"
                                        @click.prevent="openModal(entry)"><i class="bx bx-poll"></i></a>
                                    <router-link v-show="isShow" v-b-tooltip.hover :title="`Edit`" class="text-primary"
                                        :to="{
                                            name: 'admin.machines.edit',
                                            params: { id: entry._id },
                                        }">
                                        <i class="bx bx-edit"></i>
                                    </router-link>
                                    <a v-show="isShow" href="javascript: void(0);" v-b-tooltip.hover :title="`Delete`"
                                        class="text-danger" @click.prevent="remove(entry)"><i
                                            class="bx bx-trash"></i></a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Modal -->
                <div>
                    <b-modal title="Infomation machine" ref="my-modal" :hide-header="true" :hide-footer="true" centered
                        cancel-title>
                        <div class="container position-relative py-3 px-5"
                            style="border: 4px solid #069eea; border-radius: 8px;">
                            <span style="top: -18px; right: -18px;" class="position-absolute pointer"><i
                                    @click="hideModal()" style="font-size: 20px;" class="bx bx-x"></i></span>
                            <div class="row">
                                <div class="col-sm-6 col-xs-12 text-center">
                                    <h5 class="style-h5">Analog input</h5>
                                    <div v-html="formatHtml(dataModal.analogInput)"></div>
                                </div>
                                <div class="col-sm-6 col-xs-12 text-center">
                                    <h5 class="style-h5">Analog output</h5>
                                    <div v-html="formatHtml(dataModal.analogOutput)"></div>
                                </div>
                            </div>
                            <hr style="border-color: #069eea; border-width: 3px;" />
                            <div class="row">
                                <div class="col-sm-6 col-xs-12 text-center">
                                    <h5 class="style-h5">Digital input</h5>
                                    <div v-html="formatHtml(dataModal.digitalInput)"></div>
                                </div>
                                <div class="col-sm-6 col-xs-12 text-center">
                                    <h5 class="style-h5">Digital output</h5>
                                    <div v-html="formatHtml(dataModal.digitalOutput)"></div>
                                </div>
                            </div>
                        </div>
                    </b-modal>
                </div>
                <!-- End modal -->
                <!-- loading -->
                <!-- <div v-show="loading" class="text-center mt-5">
                <b-spinner  variant="primary" label="Text Centered"></b-spinner>
            </div> -->
                <!-- table information-->
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
import {
    httpClient
} from "../../../_utils/httpClient";
import ProductFilter from './partials/product-filter.vue';
export default {
    name: 'list',
    components: {
        TablePagination,
        TableInfo,
        PageHeader,
        ProductFilter
    },
    data: () => ({
        breadcrumbs: [{
            text: 'Home',
            to: '/admin/home',
        }, {
            text: 'Machines',
            to: '/admin/machines',
            active: true,
        },],
        dataModal: {
            analogInput: '',
            analogOutput: '',
            digitalInput: '',
            digitalOutput: '',
        },
        entries: [],
        pagination: {
            limit: 10,
            skip: 0,
            total: 0,
            page: 1,
        },
        userName: "",
        roleLevel: "",
    }),
    computed: {
        isShow() {
            let role = Number(localStorage.getItem('position'))
            return role == 1
        },
    },
    watch: {
        '$route.query': {
            handler: function () {
                this.getData((this.$route.query.page - 1) * this.pagination.limit, this.$route.query);
            },
        },
    },
    methods: {
        openModal(entry) {
            this.dataModal = entry;
            this.$refs['my-modal'].show()
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        formatHtml(data) {
            if (!data.includes(',')) return data;
            let htmlFormat = "";
            data.split(',').forEach(element => {
                htmlFormat += element + "<br />";
            });
            return htmlFormat
        },
        async getData(skip = 0, payload = {}) {
            if (isNaN(skip)) {
                skip = 0;
            }
            this.pagination.skip = skip
            let response = await httpClient.get(`machine/find`, {
                params: {
                    ...payload,
                    ...this.pagination,
                }
            })
            if (response.status === 200 && response.data.code === 0) {
                this.entries = response.data.data
                if (this.entries.length == 0) {
                    this.firstPage();
                }
            }
            if (response.data.total <= 10) {
                this.pagination = {
                    limit: 10,
                    total: response.data.total,
                    page: 1,
                    skip: 0
                }
            } else {
                this.pagination = {
                    ...this.pagination,
                    total: response.data.total,
                    page: Math.ceil(skip / this.pagination.limit) + 1
                }
            }
        },
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
        replaceBrokenImage(event) {
            event.target.src = require('@/assets/images/no-image.png');
        },
        async remove(entry) {
            await Swal.queue([{
                title: 'Delete this machine?',
                confirmButtonText: 'Confirm',
                confirmButtonColor: '#34c38f',
                showCancelButton: true,
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#f46a6a',
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    let response = await httpClient.post(`machine/delete`, {
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
        async updateStatus(entry) {
            let label = (entry.status == 1) ? "Close" : "Open"
            await Swal.queue([
                {
                    title: `Change machine ${entry.CPUData} to <b>${label}</b>?`,
                    confirmButtonText: "Confirm",
                    cancelButtonText: "Cancel",
                    confirmButtonColor: "#34c38f",
                    cancelButtonColor: "#f46a6a",
                    showCancelButton: true,
                    showconfirmButton: true,
                    preConfirm: async () => {
                        let response = await httpClient.post(`machine/change-status`, {
                            id: entry._id,
                            status: (entry.status == 1) ? 2 : 1
                        });
                        if (response.data.code === 0) {
                            Swal.insertQueueStep({
                                title: `Change successful`,
                            });
                            await this.getData(
                                (this.$route.query.page - 1) * this.pagination.limit,
                                this.$route.query
                            );
                        } else {
                            Swal.insertQueueStep({
                                title: `Change failed`,
                            });
                        }
                        return true;
                    },
                },
            ]);
        },
    },
    created() {
        this.getData((this.$route.query.page - 1) * this.pagination.limit, this.$route.query);
    },
};
</script>

<style scoped>
.style-width {
    min-width: 160px;
}

.pointer:hover {
    cursor: pointer;
}

.style-h5 {
    color: #0e71d3;
    text-shadow: 1px 1px #6044c8;
    font-weight: 700;
    text-decoration: underline;
}
</style>
