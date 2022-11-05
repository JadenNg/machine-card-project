<template lang="vi">
    <div>
        <page-header :title="`Edit workstation`" :items="breadcrumbs" />
        <div v-if="!loading">
            <b-row>
                <b-col class="col-lg-8">
                    <b-card>
                        <b-form-group>
                            <label>Name work station<span class="red"> *</span></label>
                            <b-input v-model="form.validate.name" placeholder="Enter name workstation" />
                        </b-form-group>
                        <b-form-group class="my-0">
                            <div v-if="showAddErrorMessage" class="alert alert-danger" role="alert">
                                {{addErrorMessage}}
                            </div>
                            <b-button variant="success" class="mr-2" @click.prevent="create">
                                Save
                            </b-button>
                            <b-button variant="danger" @click.prevent="toListView">
                                Cancel
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
import 'vue2-datepicker/locale/vi';
import {
    httpClient
} from "../../../_utils/httpClient";
import Swal from 'sweetalert2';

export default {
    name: 'create',
    components: {
        PageHeader,
    },
    data: function () {
        return {
            breadcrumbs: [{
                text: 'Home',
                to: '/admin/home',
            }, {
                text: 'Workstations',
                to: '/admin/workstations/list',
            }, {
                text: 'Update',
                to: '#',
                active: true,
            }],
            showAddErrorMessage: false,
            addErrorMessage: '',
            loading: false,
            form: {
                validate: {
                    name: '',
                },
            },
        };
    },
    methods: {
        async toListView() {
            await this.$router.push({
                name: 'admin.workstations.list'
            })
        },
        validator() {
            console.log(this.form.validate);
            let mappingErrorName = {
                name: 'Name workstation',
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
            if (!this.validator()) return
            await Swal.queue([{
                title: 'Update this workstation?',
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                cancelButtonColor: '#f46a6a',
                confirmButtonColor: '#34c38f',
                showCancelButton: true,
                showconfirmButton: true,
                preConfirm: async () => {
                    this.showAddErrorMessage = false
                    let payload = {
                        ...this.form.validate,
                    }
                    let response = await httpClient.post(`workstation/update`, payload)
                    if (response.data.code === 0) {
                        Swal.insertQueueStep({
                            title: 'Update successfully'
                        }),
                            await this.$router.push({
                                name: 'admin.workstations.list'
                            });
                    } else {
                        this.showAddErrorMessage = true
                        this.addErrorMessage = response.data
                    }
                    return true;
                }

            },]);
        },
        async getData() {
            let response = await httpClient.get(`workstation`, {
                params: {
                    id: this.$route.params.id
                }
            })
            this.form.validate = response.data.data
        },
    },
    created() {
        this.getData();
    }
};
</script>
    
<style lang="scss" scoped>
.action-column {
    width: 120px;
    text-align: center;
}

.red {
    color: red;
}

.pointer {
    cursor: pointer;
}

.style-line-height {
    display: inline-block;
    line-height: 41px;
}

.style-question {
    border-radius: 4px;
    background-color: rgb(252, 252, 252);
    border: 1px solid #ccc;
    padding: 14px;
}

.style-add {
    font-size: 20px;
    transform: translatey(3px);
}

.ql-container {
    min-height: 300px;
    max-height: 500px;
    overflow: auto;
}
</style>
    