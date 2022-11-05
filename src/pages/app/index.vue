<template>
<div id="layout-wrapper" sticky-container>
    <NavBar />
    <SideBar :is-condensed="isMenuCondensed" />
    <!-- ============================================================== -->
    <!-- Start Page Content here -->
    <!-- ============================================================== -->

    <div class="main-content">
        <div class="page-content">
            <!-- Start Content-->
            <div class="container-fluid">
                <!-- <vue-page-transition name="fade-in-right"> -->
                <router-view />
                <!-- </vue-page-transition> -->
            </div>
        </div>
        <Footer />
    </div>
    <!--        <RightBar v-if="$can('role', 'root')"/>-->
    <RightBar />
</div>
</template>

<script>
import {
    router
} from '../../router';

import NavBar from '../../components/nav-bar';
import SideBar from '../../components/side-bar';
import RightBar from '../../components/right-bar';
import Footer from '../../components/footer';

export default {
    components: {
        NavBar,
        SideBar,
        RightBar,
        Footer
    },
    data() {
        return {
            isMenuCondensed: true,
            message: '',
            pass: '',
            confirmPass: '',
            pass_show: {
                pass: 'password',
                confirmPass: 'password'
            }
        };
    },
    created: () => {
        document.body.removeAttribute('data-layout', 'horizontal');
        document.body.removeAttribute('data-topbar', 'dark');
        document.body.removeAttribute('data-layout-size', 'boxed');
    },
    methods: {
        toggleMenu() {
            document.body.classList.toggle('sidebar-enable');

            if (window.screen.width >= 992) {
                // eslint-disable-next-line no-unused-vars
                router.afterEach((routeTo, routeFrom) => {
                    document.body.classList.remove('sidebar-enable');
                    document.body.classList.remove('vertical-collpsed');
                });
                document.body.classList.toggle('vertical-collpsed');
            } else {
                // eslint-disable-next-line no-unused-vars
                router.afterEach((routeTo, routeFrom) => {
                    document.body.classList.remove('sidebar-enable');
                });
                document.body.classList.remove('vertical-collpsed');
            }
            this.isMenuCondensed = !this.isMenuCondensed;
        },
        toggleRightSidebar() {
            document.body.classList.toggle('right-bar-enabled');
        },
        hideRightSidebar() {
            document.body.classList.remove('right-bar-enabled');
        },
        async logOutPass() {
            this.$bvModal.hide('success-modal-err')
            localStorage.clear()
            await this.$router.push({
                name: 'auth.login'
            })
            var result = document.getElementById('alert');
            if(result) {
                if(result.classList.includes("alert")){
                    result.classList.remove("alert");
                }
            }
        }
    },
};
</script>
<style scoped>
.color-warning {
    color: rgba(226, 2, 2, 0.956);
    font-weight: 500;
}
.eye {
    cursor: pointer;
    transform: translate(-40px, 8px);
}
#my-modal input {
    padding: 12px 50px 12px 12px !important;
}
.style-check {
    text-align: center;
}
.style-check span {
    font-size: 62px;
}
.style-check span i {
    color: #34c38f;
    border: 4px solid #34c38f;
    border-radius: 50%;
    transform: scale(1.1);
}
.style-mx {
    margin-left: 162px;
    margin-right: 162px;
}
</style>
