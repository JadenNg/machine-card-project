<template>
    <div>
        <page-header :title="`Change password`" :items="breadcrumbs" />
        <b-card>
            <div class="container">
                <b-row>
                    <b-col md="2"></b-col>
                    <b-col md="10">
                        <b-col lg="6" sm="12">
                            <b-form-group>
                                <label>Current password <span class="red">*</span></label>
                                <div class="position-relative">
                                    <b-input v-model="form.oldPassword"
                                        :type="form.shows.oldPassword ? 'text' : 'password'"
                                        placeholder="Enter current password" ref="oldPassword" v-on:blur="
                                            checkPassword($event, 'oldPassword', 'errorOldPassword')
                                        " />
                                    <i :class="
                                        form.shows.oldPassword
                                            ? 'fa fa-eye position-absolute'
                                            : 'fa fa-eye-slash position-absolute'
                                    " style="
                  color: #666;
                  cursor: pointer;
                  right: 2.2em;
                  top: 0.75em;
                  z-index: 999;
                " @click="togglePassword('oldPassword')"></i>
                                    <div class="invalid-feedback" ref="errorOldPassword"></div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6" sm="12">
                            <b-form-group>
                                <label>New password <span class="red">*</span></label>
                                <div class="position-relative">
                                    <b-input v-model="form.newPassword"
                                        :type="form.shows.newPassword ? 'text' : 'password'"
                                        placeholder="Enter new password" ref="newPassword" v-on:blur="
                                            checkPassword($event, 'newPassword', 'errorNewPassword')
                                        " v-on:change="checkNewPassword($event)" />
                                    <i :class="
                                        form.shows.newPassword
                                            ? 'fa fa-eye position-absolute'
                                            : 'fa fa-eye-slash position-absolute'
                                    " @click="togglePassword('newPassword')" style="
                  color: #666;
                  cursor: pointer;
                  right: 2.2em;
                  top: 0.75em;
                  z-index: 999;
                "></i>
                                    <div class="invalid-feedback" ref="errorNewPassword"></div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6" sm="12">
                            <b-form-group>
                                <label>Enter again new password <span class="red">*</span></label>
                                <div class="position-relative">
                                    <b-input v-model="form.confirmPassword"
                                        :type="form.shows.confirmPassword ? 'text' : 'password'"
                                        placeholder="Enter again new password" class="" ref="confirmPassword" v-on:blur="
                                            checkPassword(
                                                $event,
                                                'confirmPassword',
                                                'errorConfirmPassword'
                                            )
                                        " v-on:change="checkConfirmPassword($event)" />
                                    <i :class="
                                        form.shows.confirmPassword
                                            ? 'fa fa-eye position-absolute'
                                            : 'fa fa-eye-slash position-absolute'
                                    " @click="togglePassword('confirmPassword')" style="
                  color: #666;
                  cursor: pointer;
                  right: 2.2em;
                  top: 0.75em;
                  z-index: 999;
                "></i>
                                    <div class="invalid-feedback" ref="errorConfirmPassword"></div>
                                </div>
                            </b-form-group>
                        </b-col>
                        <b-col lg="6" sm="12">
                            <b-form-group>
                                <div v-if="showAddErrorMessage" class="alert alert-danger" role="alert">
                                    {{ errorMessage }}
                                </div>
                                <b-button variant="success" class="mr-2" @click.prevent="update">
                                    Lưu
                                </b-button>
                                <b-button variant="danger" @click.prevent="toHomeView">
                                    Huỷ
                                </b-button>
                            </b-form-group>
                        </b-col>
                    </b-col>
                </b-row>

            </div>
        </b-card>
    </div>
</template>

<script>
import PageHeader from "../../../components/page-header";
import {
    httpClient
} from "../../../_utils/httpClient";
export default {
    name: "update",
    components: {
        PageHeader,
    },
    data: function () {
        return {
            breadcrumbs: [{
                text: "Home",
                to: "/admin/home",
            },
            {
                text: "Change password",
                to: "/admin/change-password",
                active: true,
            },
            ],
            loading: false,
            form: {
                oldPassword: "",
                newPassword: "",
                confirmPassword: "",
                names: {
                    oldPassword: "Current password",
                    newPassword: "New password",
                    confirmPassword: "Confirm password",
                },
                shows: {
                    oldPassword: false,
                    newPassword: false,
                    confirmPassword: false,
                },
            },
            errorMessage: "",
            showAddErrorMessage: false,
        };
    },
    watch: {
        "form.confirmPassword": {
            handler: function () {
                this.checkConfirmPassword();
            },
            deep: true,
        },
        "form.newPassword": {
            handler: function () {
                this.checkNewPassword();
                this.checkConfirmPassword(false);
            },
            deep: true,
        },
        "form.oldPassword": {
            handler: function () {
                this.checkNewPassword(false);
            },
            deep: true,
        },
        form: {
            handler: function () {
                this.showAddErrorMessage = false;
            },
            deep: true,
        },
    },
    methods: {
        async toHomeView() {
            await this.$router.push({
                name: "admin.home",
            });
        },
        validator() {
            let mappingErrorName = {
                oldPassword: "Current password",
                newPassword: "New password",
                confirmPassword: "Confirm password",
            };
            for (let key in this.form) {
                // check required
                if (this.form[key] !== null && this.form[key].length === 0) {
                    this.showAddErrorMessage = true;
                    this.$refs[key].focus();
                    this.errorMessage = mappingErrorName[key] + ` can't be empty.`;
                    return false;
                }
                // check min length
                if (this.form[key].length < 6) {
                    this.showAddErrorMessage = true;
                    this.$refs[key].focus();
                    this.errorMessage =
                        mappingErrorName[key] + ` must have at least 6 characters.`;
                    return false;
                }
            }
            // check newPassword and confirmPassword are the same
            if (this.form.oldPassword == this.form.newPassword) {
                this.showAddErrorMessage = true;
                this.$refs.newPassword.focus();
                this.errorMessage = "Please enter a new password that is different from the old password.";
                return false;
            }
            if (this.form.newPassword !== this.form.confirmPassword) {
                this.showAddErrorMessage = true;
                this.$refs.confirmPassword.focus();
                this.errorMessage = "Confirmation password does not match.";
                return false;
            }
            return true;
        },
        checkPassword(e, refName, errorRefName) {
            let val = e.target.value;
            e.target.classList.remove("is-invalid");
            this.$refs[errorRefName].innerHTML = "";
            // check required
            if (!val || val.trim().length === 0) {
                e.target.classList.add("is-invalid");
                this.$refs[
                    errorRefName
                ].innerHTML = `${this._data.form.names[refName]} can't be empty.`;
                return;
            }
            // check length > 6 characters
            if (val.length < 6) {
                e.target.classList.add("is-invalid");
                this.$refs[
                    errorRefName
                ].innerHTML = `${this._data.form.names[refName]} must have at least 6 characters.`;
                return;
            }
            // check confirmPassword
            if (refName === "confirmPassword") {
                this.checkConfirmPassword();
            }
        },
        checkNewPassword(isNew) {
            // check if is new password input so don't check the confirm password matches.
            if (!isNew && this.form.newPassword.length === 0) {
                return;
            }
            // resete everything
            let val = this._data.form.newPassword;
            this.$refs["newPassword"].$el.classList.remove("is-invalid");
            this.$refs["newPassword"].$el.classList.remove("is-valid");
            this.$refs["errorNewPassword"].innerHTML = ``;
            // check passwords are not matches
            if (val == this._data.form.oldPassword) {
                this.$refs["newPassword"].$el.classList.add("is-invalid");
                this.$refs[
                    "errorNewPassword"
                ].innerHTML = `${this._data.form.names["newPassword"]} match.`;
            } else {
                this.$refs["newPassword"].$el.classList.add("is-valid");
            }
        },
        checkConfirmPassword(isConfirm) {
            // check if is new password input so don't check the confirm password matches.
            if (!isConfirm && this.form.confirmPassword.length === 0) {
                return;
            }
            // resete everything
            let val = this._data.form.confirmPassword;
            this.$refs["confirmPassword"].$el.classList.remove("is-invalid");
            this.$refs["confirmPassword"].$el.classList.remove("is-valid");
            this.$refs["errorConfirmPassword"].innerHTML = ``;
            // check passwords are matches
            if (val !== this._data.form.newPassword) {
                this.$refs["confirmPassword"].$el.classList.add("is-invalid");
                this.$refs[
                    "errorConfirmPassword"
                ].innerHTML = `${this._data.form.names["confirmPassword"]} mismatched.`;
            } else {
                this.$refs["confirmPassword"].$el.classList.add("is-valid");
            }
        },
        togglePassword(name) {
            this._data.form.shows[name] = !this._data.form.shows[name];
        },
        makeToast() {
            this.$bvToast.toast('Change password successful.', {
                title: `Password change notification`,
                variant: 'success',
                solid: true,
                autoHideDelay: 1500
            })
        },
        async update() {
            this.showAddErrorMessage = false;
            if (!this.validator()) return;
            if (this.form.newPassword != this.form.confirmPassword) {
                this.errorMessage =
                    "New password and confirm new password do not match";
                this.showAddErrorMessage = true;
                return;
            }
            if (this.form.oldPassword == this.form.newPassword) {
                this.errorMessage =
                    "Old password and new password match";
                this.showAddErrorMessage = true;
                return;
            }
            this.loading = true;
            let response = await httpClient.post(`user/change-password`, {
                id: localStorage.getItem('id'),
                password: this.form.oldPassword,
                newPassword: this.form.newPassword,
            });
            this.loading = false;

            if (response.status == 200) {
                if (response.data.code == 1) {
                    this.errorMessage = response.data.message || "Password change failed";
                    this.showAddErrorMessage = true;
                    return;
                }
                else {
                    this.makeToast();
                    this.form.oldPassword = "";
                    this.form.newPassword = "";
                    this.form.confirmPassword = "";
                }
            } else {
                this.showAddErrorMessage = true;
                this.errorMessage = "Password change failed";
            }
            return response.data.data;
        },
    },
    created() { },
};
</script>

<style>
.red {
    color: red;
}
</style>
