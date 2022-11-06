<template>
    <div>
        <page-header :title="`Statistic`" :items="breadcrumbs" />
        <div v-if="!loading">
            <div class="row">
                <div class="col-12">
                    <b-card>
                        <div class="style-info">
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Workstation:
                                </div>
                                <div class="col">{{ form.workstation }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    CPU data:
                                </div>
                                <div class="col">{{ form.CPUData }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Application:
                                </div>
                                <div class="col">{{ form.application }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Profinet infomation:
                                </div>
                                <div class="col">{{ form.profinetInfomation }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Profibus address:
                                </div>
                                <div class="col">{{ form.profibusAddress }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Analog input:
                                </div>
                                <div class="col">{{ form.analogInput }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Analog output:
                                </div>
                                <div class="col">{{ form.analogOutput }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Digital iInput:
                                </div>
                                <div class="col">{{ form.digitalInput }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Digital output:
                                </div>
                                <div class="col">{{ form.digitalOutput }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-3 col-md-4 col-sm-5 style-font">
                                    Other infomations:
                                </div>
                                <div class="col">{{ form.otherInfo }}</div>
                            </div>
                        </div>
                    </b-card>
                </div>
                <div class="col-12">
                    <b-card title="OTHER MACHINE">
                        <div class="row mt-3">
                            <div v-for="(item, index) in listMachine" :key="index" class="col-lg-3 col-md-4 col-xs-12">
                                <div :class="{ 'disabled-machine': form._id == item._id }"
                                    class="py-4 mb-4 d-flex justify-content-center style-machine"
                                    v-html="formatHtml(item.CPUData)"
                                    @click="updateForm(item)">
                                </div>
                            </div>
                        </div>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import PageHeader from '../../../components/page-header';
import {
    httpClient
} from "../../../_utils/httpClient";
import 'vue2-datepicker/locale/vi';
export default {
    name: 'create',
    components: {
        PageHeader,
    },
    data: function () {
        return {
            categories: [],
            breadcrumbs: [{
                text: 'Home',
                to: '/admin/home',
            }, {
                text: 'Machines',
                to: '/admin/machines',
            }, {
                text: 'Statistic',
                to: '#',
                active: true,
            },],
            pagination: {
                limit: 10,
                skip: 0,
                total: 0,
                page: 1,
            },
            listMachine: [],
            form: {
                _id: '',
                workstation: '',
                CPUData: '',
                application: '',
                profinetInfomation: '',
                profibusAddress: '',
                analogInput: '',
                analogOutput: '',
                digitalInput: '',
                digitalOutput: '',
                otherInfo: '',
            },
        };
    },
    methods: {
        formatHtml(data) {
            if (!data.includes(',')) return data;
            let htmlFormat = "";
            data.split(',').forEach(element => {
                htmlFormat += element + "<br />";
            });
            return htmlFormat
        },
        async getListMachine(skip = 0) {
            if (isNaN(skip)) {
                skip = 0;
            }
            this.pagination.skip = skip
            let response = await httpClient.get(`machine/find`, {
                params: {
                    ...this.pagination,
                }
            })
            this.listMachine = response.data.data;
            console.log(this.listMachine, "machi");
        },
        updateForm(entry) {
            if(this.form._id == entry._id) return;
            this.form = entry;
            window.scrollTo(0,0)
        },
        async getData() {
            let id = this.$route.params.id;
            let response = await httpClient.get(`machine`, {
                params: {
                    id,
                }
            })
            this.form = response.data.data
        }
    },
    created() {
        this.getListMachine();
        this.getData();
    },
};
</script>
    
<style lang="scss" scoped>
.style-machine {
    cursor: pointer;
    color: rgb(4, 30, 84);
    font-weight: 500;
    background-color: rgb(196, 215, 255);
    box-shadow: 1px 1px 1px 1px rgba(94, 105, 255, 0.2), 1px 1px 2px 1px rgba(111, 168, 254, 0.02);
    border: 5px solid transparent;
    border-radius: 8px;
    transition: 0.2s;
    min-height: 154px;
    align-items: center;
}

.disabled-machine {
    background-color: rgb(196, 215, 255);
    border: 5px solid rgb(25, 18, 213);
}

.style-info .row {
    margin: 8px 0;
}
.style-font {
    font-weight: 500;
}
</style>
    
