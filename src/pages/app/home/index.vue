<template>
    <div>
        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-flex align-items-center justify-content-between">
                    <h4 class="mb-0 font-size-18">Home</h4>
                </div>
            </div>
        </div>
        <!-- end page title -->
        <address-filter @change="getData" />
        <div class="row">
            <div class="col-xl-6">
                <div class="card overflow-hidden">
                    <div class="bg-primary bg-soft">
                        <div class="row">
                            <div class="col-12">
                                <div class="text-muted mb-0 p-3">
                                    <h5 class="style-size" style="color: white">Welcome to the admin page !</h5>
                                    <p style="color: white">Manage Workstations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="pt-4">
                                    <h5 class="font-size-15 text-truncate">{{ position == 1 ? "Administrators" : "User" }} </h5>
                                    <p class="text-muted mb-0 text-truncate">{{ name }}</p>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="pt-4">
                                    <div class="row">
                                        <div class="col-12">
                                            <p class="text-muted mb-0">Total Machine Closing</p>
                                            <h5 class="font-size-15">{{ totalMachineClosing }}</h5>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted mb-0">Total Machine Opening</p>
                                            <h5 class="font-size-15">{{ totalMachineOpening }}</h5>
                                        </div>
                                        <div class="col-12">
                                            <p class="text-muted mb-0">Total Machine</p>
                                            <h5 class="font-size-15">{{ totalMachine }}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="row style-height-total">
                    <div class="col-md-12">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <p class="text-muted fw-medium">Total Workstation</p>
                                        <h4 class="mb-0">{{ totalWorkstation }}</h4>
                                    </div>
                                    <div class="flex-shrink-0 align-self-center">
                                        <div class="mini-stat-icon avatar-sm rounded-circle bg-primary">
                                            <span class="avatar-title">
                                                <i class="bx bx-mail-send font-size-24"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row style-height-total">
                    <div class="col-md-12">
                        <div class="card mini-stats-wid">
                            <div class="card-body">
                                <div class="d-flex">
                                    <div class="flex-grow-1">
                                        <p class="text-muted fw-medium">Total User</p>
                                        <h4 class="mb-0">{{ totalUser }}</h4>
                                    </div>
                                    <div class="flex-shrink-0 align-self-center ">
                                        <div class="avatar-sm rounded-circle bg-primary mini-stat-icon">
                                            <span class="avatar-title rounded-circle bg-primary">
                                                <i class="bx bx-copy-alt font-size-24"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card col-12">
                <div class="card-title m-4">
                    <h5 class="text-muted fw-medium text-uppercase">Statistic workstation</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex">
                        <div class="col-12" id="chart">
                            <apexchart type="bar" height="450" :options="chartOptions" :series="series"></apexchart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    httpClient
} from "../../../_utils/httpClient";
import addressFilter from '../../../components/filter/address-filter'

export default {
    page: {
        title: "Dashboard",
        meta: [{
            name: "description",
            content: ""
        }]
    },
    computed: {
        name: () => localStorage.getItem('name'),
        position: () => localStorage.getItem('position'),
    },
    components: {
        addressFilter
    },
    data() {
        return {
            totalMachineClosing: 0,
            totalMachineOpening: 0,
            totalMachine: 0,
            userSentimentsNoProcessing: 0,
            totalWorkstation: 0,
            totalUser: 0,
            title: "Dashboard",
            chartOptions: {
                labels: [],
                chart: {
                    height: 450,
                    type: 'bar',
                    zoom: {
                        enabled: false
                    },
                    colors: ['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800', '#FF9800', '#FF9800', '#D35400', '#34495E', '#F08080'],
                },
                plotOptions: {
                    bar: {
                        distributed: true
                    }
                },
                legend: {
                    show: false
                }
            },
            series: [{
                name: 'Count',
                data: []
            }],
            countWorkstations: [{
                name: 'A1',
                count: 4,
            },
            {
                name: 'A2',
                count: 7,
            },
            {
                name: 'A3',
                count: 8,
            },
            {
                name: 'A4',
                count: 7,
            },
            {
                name: 'A5',
                count: 8,
            },
            {
                name: 'A6',
                count: 2,
            },
            {
                name: 'A7',
                count: 12,
            }]
        };
    },
    methods: {
        async getTotals() {
            let response = await httpClient.post(`statistic/total`)
            this.totalMachineClosing = response.data.totalMachineClosing || 0
            this.totalMachineOpening = response.data.totalMachineOpening || 0
            this.totalMachine = response.data.totalMachine || 0
            this.totalWorkstation = response.data.totalWorkstation || 0
            this.totalUser = response.data.totalUser || 0
        },
        async getCountWorkstations() {
            // let response = await httpClient.post(`statistic/count-workstations`);
            // this.countWorkstations = response.data.data;
            let series = [];
            let labels = [];
            this.countWorkstations.forEach(item => {
                series.push(item.count);
                labels.push(item.name);
            });
            this.series[0].data = series;
            this.chartOptions.labels = labels;
        },
        async getData() {
            // await this.getTotals();
            await this.getCountWorkstations();
        },
    },
    async created() {
        await this.getData()
    },
}
</script>

<style scoped>
.style-height-total {
    height: 50% !important;
}

.mini-stats-wid {
    height: calc(100% - 24px);
}

@media (max-width: 380px) {
    .style-size {
        font-size: 17px;
    }
}
</style>
