<template lang="vi">
    <div>
        <page-header :title="`Create new machine`" :items="breadcrumbs" />
        <div v-if="!loading">
            <b-row>
                <b-col class="col-lg-8">
                    <b-card>
                        <b-form-group>
                            <label>Workstation <span class="red">*</span></label>
                            <multiselect
                            :clear-on-select="false" 
                            :close-on-select="true" 
                            :hide-selected="false" 
                            :show-labels="false" 
                            :internal-search="false"
                            v-model="form.validate.workstation"
                            placeholder="Choose a workstation"
                            :options="listWorkstations"
                            :multiple="false"
                            :taggable="true"
                        ></multiselect>
                        </b-form-group>
                        <b-form-group>
                            <label>CPU data <span class="red">*</span></label>
                            <b-input v-model="form.validate.CPUData" placeholder="Enter CPU data" />
                        </b-form-group>
                        <b-form-group>
                            <label>Application <span class="red">*</span></label>
                            <b-input v-model="form.validate.application" placeholder="Enter application" />
                        </b-form-group>
                        <b-form-group>
                            <label>Profinet infomation <span class="red">*</span></label>
                            <b-input v-model="form.validate.profinetInfomation" placeholder="Enter profinet infomation" />
                        </b-form-group>
                        <b-form-group>
                            <label>Profibus address <span class="red">*</span></label>
                            <b-input v-model="form.validate.profibusAddress" placeholder="Enter profibus address" />
                        </b-form-group>
                        <b-form-group>
                            <label>Analog input <span class="red">*</span></label>
                            <b-input v-model="form.validate.analogInput" placeholder="Enter analog input" />
                        </b-form-group>
                        <b-form-group>
                            <label>Analog output <span class="red">*</span></label>
                            <b-input v-model="form.validate.analogOutput" placeholder="Enter analog output" />
                        </b-form-group>
                        <b-form-group>
                            <label>Digital input <span class="red">*</span></label>
                            <b-input v-model="form.validate.digitalInput" placeholder="Enter digital output" />
                        </b-form-group>
                        <b-form-group>
                            <label>Digital output <span class="red">*</span></label>
                            <b-input v-model="form.validate.digitalOutput" placeholder="Enter digital output" />
                        </b-form-group>
                        <b-form-group>
                            <label>Other info</label>
                            <b-input v-model="form.validate.otherInfo" placeholder="Enter other info" />
                        </b-form-group>
                        <b-form-group>
                            <div v-if="showAddErrorMessage" class="alert alert-danger mt-3" role="alert">
                                {{addErrorMessage}}
                            </div>
                            <b-button variant="success" class="mr-2 mt-3" @click.prevent="create">
                                Lưu
                            </b-button>
                            <b-button variant="danger" class="mt-3" @click.prevent="toListView">
                                Huỷ
                            </b-button>
                        </b-form-group>
                    </b-card>
                </b-col>
            </b-row>
        </div>
    </div>
    </template>
    
<script>
import PageHeader from '../../../components/page-header';
import Multiselect from 'vue-multiselect';
import {
    httpClient
} from "../../../_utils/httpClient";
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {
    quillEditor
} from 'vue-quill-editor'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/locale/vi';
import Swal from 'sweetalert2';
export default {
    name: 'create',
    components: {
        PageHeader,
        Multiselect,
        quillEditor,
        DatePicker
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
                text: 'Create',
                to: '#',
                active: true,
            },],
            showAddErrorMessage: false,
            addErrorMessage: '',
            form: {
                validate: {
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
            },
            listWorkstations: ['A1', 'A2','A3', 'A4'],
            loading: false,
        };
    },
    methods: {
        async toListView() {
            await this.$router.push({
                name: 'admin.orders.list'
            })
        },
        validator() {
            let mappingErrorName = {
                workstation: 'Workstation',
                CPUData: 'CPU data',
                application: 'Application',
                profinetInfomation: 'Profinet infomation',
                profibusAddress: 'Profibus address',
                analogInput: 'Analog input',
                analogOutput: 'Analog output',
                digitalInput: 'Digital input',
                digitalOutput: 'Digital output',
            }
            for (let key in mappingErrorName) {
                if (!this.form.validate[key]) {
                    this.showAddErrorMessage = true
                    this.addErrorMessage = mappingErrorName[key] + ` can't be empty.`
                    return false
                }
            }
            return true
        },
        async create() {
            if (!this.validator()) return;
            await Swal.queue([{
                title: 'Create this new machine?',
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#f46a6a',
                confirmButtonColor: '#34c38f',
                showCancelButton: true,
                showconfirmButton: true,
                preConfirm: async () => {
                    this.showAddErrorMessage = false
                    let payload = {
                        ...this.form.validate
                    }
                    let response = await httpClient.post(`machine/create`, payload)
                    if (response.data.code === 0) {
                        Swal.insertQueueStep({
                            title: 'Create successful'
                        }),
                            await this.$router.push({
                                name: 'admin.machines.list'
                            });
                    } else {
                        this.showAddErrorMessage = true
                        this.addErrorMessage = response.data
                    }
                    return true;
                }

            },]);
        },
        async getListWorkstations() {
            let response = await httpClient.get(`workstation/find`)
            this.listWorkstations = response.data.data.map(item => item.name)
        },
    },
    async created() {
        await this.getListWorkstations();
    },
};
</script>
    
<style lang="scss" scoped>
.action-column {
    width: 120px;
    text-align: center;
}

.ql-editor.ql-blank::before {
    content: "Nhập nội dung " !important;
}

.red {
    color: red;
}

.style-poiter {
    cursor: pointer;
}

.style-height {
    height: 41px;
}

.ql-container {
    min-height: 300px;
    max-height: 500px;
    overflow: auto;
}
</style>
    