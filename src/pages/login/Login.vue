<template>
    <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
            <div class="card overflow-hidden">
                <div class="bg-soft-primary">
                    <div class="row bg-soft-primary">
                        <div class="col-7">
                            <div class="text-primary p-4">
                                <h5 class="text-primary">Please login</h5>
                            </div>
                        </div>
                        <div class="col-5 align-self-end">
                            <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
                        </div>
                    </div>
                </div>
                <div class="card-body pt-0">
                    <b-form class="p-2" @submit.prevent="login">
                        <div id="alert" v-if="isShow" class="alert alert-danger" display="none" role="alert">
                            {{ statusMessage }}
                        </div>
                        <b-form-group id="input-group-1" label="Phone number" label-for="input-1">
                            <b-form-input id="input-1" v-model="phone" type="text" placeholder="Enter phone number">
                            </b-form-input>
                        </b-form-group>
                        <b-form-group id="input-group-2" label="Password" label-for="input-2">
                            <b-form-input id="input-2" v-model="password" type="password" placeholder="Enter password">
                            </b-form-input>
                        </b-form-group>
                        <div class="mt-3">
                            <b-button type="submit" variant="primary" class="btn-block">Login</b-button>
                        </div>
                    </b-form>
                </div>
                <!-- end card-body -->
            </div>
            <!-- end card -->

            <!-- <div class="mt-5 text-center">
            <p>
                © Bản quyền
            </p>
        </div> -->
            <!-- end row -->
        </div>
        <!-- end col -->
    </div>
</template>

<script>
import { httpClient } from '../../_utils/httpClient';

export default {
    name: 'Login',
    data() {
        return {
            phone: '',
            password: '',
            isShow: false,
            statusMessage: '',
        }
    },
    methods: {
        setPassBase64(pass) {
            localStorage.setItem('pass', pass)
        },
        validator() {
            let validate = {
                phone: 'Phone number',
                password: 'Password',
            }
            for (let key in validate) {
                if (!this[key]) {
                    this.isShow = true;
                    this.statusMessage = validate[key] + ` can't be empty.`
                    return false
                }
            }
            if (this.password.length < 6) {
                this.isShow = true;
                this.statusMessage = 'Password must not be less than 6 characters.'
                return false
            }
            return true
        },
        async login() {
            if(!this.validator()) return;
            let response = await httpClient.post(`user/login`, {
                phone: this.phone,
                password: this.password
            })
            if (response.data.code == 0) {
                localStorage.setItem('id', response.data.token.id)
                localStorage.setItem('name', response.data.token.name)
                localStorage.setItem('position', response.data.token.position)
                this.$router.push({ name: 'admin.home' })
            }
            else {
                this.isShow = true;
                this.statusMessage = response.data.message;
            }
        }
    }
}
</script>

<style lang="scss" module>

</style>
