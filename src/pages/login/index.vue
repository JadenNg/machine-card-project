<template>
<div>
    <!-- <div class="home-btn d-none d-sm-block">
        <router-link tag="a" to="/admin/home" class="text-dark">
            <i class="fas fa-home h2"></i>
        </router-link>
    </div> -->
    <div class="account-pages my-5 pt-5">
        <div class="container">
            <!-- <vue-page-transition name="fade-in-right"> -->
            <router-view />
            <!-- </vue-page-transition> -->
        </div>
    </div>
</div>
</template>

<script>
import {
    router
} from "/src/router"

export default {
    components: {},
    async created() {
        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "") {
            await router.push({
                name: 'admin.home'
            })
        }
    },
};
</script>
