<template>
    <div>
        <page-header :title="`Thông tin cá nhân`" :items="breadcrumbs" />
        <div>
            <b-card>
                <b-row>
                    <b-col lg="6" sm="12">
                        <b-form-group col-lg="6">
                            <label>Tên </label>
                            <b-input v-model="form.ten" placeholder="Nhập tên hiển thị" />
                        </b-form-group>
                    </b-col>
                    <b-col lg="6" sm="12">
                        <b-form-group>
                            <label>Số điện thoại/email:</label>
                            <b-input style="background-color: #eee;" v-model="form.phone" disabled />
                        </b-form-group>
                    </b-col>
                    <b-col lg="6" sm="12">
                        <b-form-group>
                            <label>Địa chỉ <span class="red">*</span></label>
                            <b-input v-model="form.diaChi" />
                        </b-form-group>
                    </b-col>
                    <b-col lg="12">
                        <b-form-group>
                            <div v-if="showAddErrorMessage" class="alert alert-danger" role="alert">
                                {{ addErrorMessage }}
                            </div>
                            <b-button variant="success" class="mr-2" @click.prevent="update">
                                Lưu
                            </b-button>
                            <b-button variant="danger" @click.prevent="toHomeView">
                                Huỷ
                            </b-button>
                        </b-form-group>
                    </b-col>
                </b-row>
            </b-card>
        </div>
    </div>
</template>

<script>
import PageHeader from "../../../components/page-header";
import {
    httpClient
} from "../../../_utils/httpClient";
import { mapMutations } from "vuex";
import Swal from "sweetalert2";

export default {
    name: "update",
    components: {
        PageHeader
    },
    data: function () {
        return {
            breadcrumbs: [{
                text: "Home",
                to: "/admin/home",
            },
            {
                text: "Profile",
                to: "/admin/profile",
                active: true,
            },
            ],
            form: {
                id: '',
                ten: '',
                phone: '',
                diaChi: '',
                anh: '',
                position: ''
            },
            errorMessage: "",
            showAddErrorMessage: false,
        };
    },
    methods: {
        ...mapMutations('user', ['setName', 'setAvatar']),
        async getProfile() {
            let response = await httpClient.get(`auth/profile`, {
                id: 1
            })
            this.form = {
                ...response.data.data
            };
        },
        async toHomeView() {
            await this.$router.push({
                name: "admin.home",
            });
        },
        validator() {
            if (this.form.diaChi) {
                this.showAddErrorMessage = true
                this.addErrorMessage = `Địa chỉ không được trống.`
                return false
            }
            return true
        },
        async update() {
            this.showAddErrorMessage = false;
            if (!this.validator()) return;
            await Swal.queue([{
                title: 'Thay đổi thông tin cá nhân?',
                confirmButtonText: 'Xác nhận',
                confirmButtonColor: '#34c38f',
                showCancelButton: true,
                cancelButtonText: 'Hủy bỏ',
                cancelButtonColor: '#f46a6a',
                showLoaderOnConfirm: true,
                preConfirm: async () => {
                    let response = await httpClient.post(`auth/profile`, {
                        ...this.form
                    });
                    if (response.status === 200) {
                        localStorage.setItem("token", response.data.token);
                        this.setName(this.form.Name)
                        this.setAvatar(this.form.Avatar)
                        Swal.insertQueueStep({
                            title: 'Thay đổi thông tin cá nhân thành công',
                        });
                    } else {
                        Swal.insertQueueStep({
                            title: 'Thay đổi thông tin cá nhân không thành công',
                        });
                    }
                    return true;
                },
            },]);
        },
    },
    mounted() {
        document.querySelector('.my-pond').addEventListener('FilePond:removefile', () => {
            this.form.Avatar = ""
            console.log(this.form.anh);
        });
    },
    created() {
        this.getProfile();
    },
};
</script>

<style scoped>
.red {
    color: red;
}

.hide-img {
    height: 0px;
    overflow: hidden;
    pointer-events: none;
    visibility: hidden;
    opacity: 0;
}
</style>
