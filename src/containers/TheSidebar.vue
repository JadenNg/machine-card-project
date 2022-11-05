<template>
<CSidebar fixed :minimize="minimize" :show="show" @update:show="(value) => set(['sidebarShow', value])">
    <CSidebarBrand class="d-md-down-none" to="/">
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="$options.nav" />
    <CSidebarMinimizer class="d-md-down-none" @click.native="set(['sidebarMinimize', !minimize])" />
</CSidebar>
</template>

<script>
import nav from './_nav'
import {
    mapActions,
    mapState
} from "vuex";

export default {
    name: 'TheSidebar',
    nav,
    computed: {
        ...mapState({
            sidebar: state => state.sidebar
        }),
        show() {
            return this.sidebar.sidebarShow
        },
        minimize() {
            return this.sidebar.sidebarMinimize
        }
    },
    methods: {
        ...mapActions('sidebar', {
            set: 'set',
            toggleSidebarMobile: 'toggleSidebarMobile'
        })
    }
}
</script>
