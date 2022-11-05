<template>
    <header id="page-topbar">
        <div class="navbar-header">
            <div class="d-flex">
                <!-- LOGO -->
                <div class="navbar-brand-box  style-bgr">
                    <router-link tag="a" to="/admin/home" class="logo logo-dark">
                        <span class="logo-sm">
                            <img src="@/assets/images/logo-sm.png" alt width="60" />
                        </span>
                        <span class="logo-lg">
                            <img src="@/assets/images/logo.png" alt height="17" />
                        </span>
                    </router-link>

                    <router-link tag="a" to="/admin/home" class="logo logo-light">
                        <span class="logo-sm">
                            <img src="@/assets/images/logo-sm.png" alt :width="widthWindow" />
                        </span>
                        <span class="logo-lg">
                            <img src="@/assets/images/logo.png" alt height="35" />
                            <span class="ml-2" style="color: #fff; font-size: 17px; cursor: pointer;">Manage workstations</span>
                        </span>
                    </router-link>
                </div>
                <button id="vertical-menu-btn" type="button" class="btn btn-sm px-3 font-size-16 header-item"
                    @click="toggleMenu">
                    <i class="fa fa-fw fa-bars"></i>
                </button>
            </div>

            <div class="d-flex">
                <b-dropdown ref="hide" right variant="black" toggle-class="header-item">
                    <template v-slot:button-content>
                        <img v-if="!getAvatar" class="rounded-circle header-profile-user"
                            src="../assets/images/no-image.png" />
                        <img v-else :src="getAvatar" class="rounded-circle header-profile-user">
                        <span class="d-none d-xl-inline-block ml-1">{{ getUser ? getUser : 'Admin' }}</span>
                        <i class="mdi mdi-chevron-down d-none d-xl-inline-block"></i>
                    </template>
                    <span @click="hide_dropdown">
                        <a class="dropdown-item" href="javascript: void(0);" @click="goToProfile">
                            <i class="bx bx-user font-size-16 align-middle mr-1"></i>Information
                        </a>
                    </span>
                    <span @click="hide_dropdown">
                        <a class="dropdown-item" href="javascript: void(0);" @click="goToChangePassword">
                            <i class="bx bx-edit font-size-16 align-middle mr-1"></i>Change password
                        </a>
                    </span>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item text-danger" href="javascript: void(0);" @click="tryToLogout">
                        <i class="bx bx-power-off font-size-16 align-middle mr-1 text-danger"></i>Log out
                    </a>
                </b-dropdown>
            </div>
        </div>
    </header>
</template>

<script>
import {
mapMutations,
    mapState
} from "vuex";
/**
 * Nav-bar Component
 */
export default {
    components: {
    },
    data() {
        return {
            widthWindow: 40
        }
    },
    computed: {
        getUser() {
            return localStorage.getItem('name');
        },
        getAvatar() {
            return ''
        }
    },
    methods: {
        ...mapMutations('user', ['setName', 'setAvatar']),
        hide_dropdown() {
            this.$refs.hide.hide();
        },
        toggleMenu() {
            this.$parent.toggleMenu();
        },
        initFullScreen() {
            document.body.classList.toggle('fullscreen-enable');
            if (
                !document.fullscreenElement &&
                /* alternative standard method */
                !document.mozFullScreenElement &&
                !document.webkitFullscreenElement
            ) {
                // current working methods
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestFullscreen(
                        Element.ALLOW_KEYBOARD_INPUT,
                    );
                }
            } else {
                if (document.cancelFullScreen) {
                    document.cancelFullScreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
            }
        },
        async goToProfile() {
            await this.$router.push({
                name: 'admin.users.edit', params: {
                    id: localStorage.getItem('id'),
                }
            })
        },
        async goToChangePassword() {
            await this.$router.push({
                name: 'admin.change-password'
            }).catch(err=>err)
        },
        ...mapState('account', ['status']),
        async tryToLogout() {
            localStorage.clear()
            await this.$router.push({
                name: 'auth.login'
            })
            var result = document.getElementById('alert');
            if (result) {
                if (result.classList.includes("alert")) {
                    result.classList.remove("alert");
                }
            }
        },
        windowSize() {
            let widthScreen = window.innerWidth;
            if(widthScreen <= 992) {
                this.widthWindow = 0
            }
            else {
                this.widthWindow = 40
            }
        }
    },
    created() {
        this.windowSize();
        window.addEventListener('resize', this.windowSize);
    }
};
</script>

<style scoped>
.style-bgr {
    background-color: #292848 !important;
    padding: 0 !important;
    height: 52px;
}
.logo img {
    border-radius: 4px;
}
</style>
