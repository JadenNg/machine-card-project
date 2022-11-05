<template>
<CHeader fixed with-subheader light>
    <CToggler in-header class="ml-3 d-lg-none" @click="toggleSidebarMobile()" />
    <CToggler in-header class="ml-3 d-md-down-none" @click="toggleSidebarDesktop()" />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
    </CHeaderNav>
    <CHeaderNav class="mr-4">
        <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3">
        <CBreadcrumbRouter class="border-0 mb-0" />
    </CSubheader>
</CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import {
    mapActions,
    mapState
} from 'vuex'

export default {
    name: 'TheHeader',
    components: {
        TheHeaderDropdownAccnt
    },
    computed: {
        ...mapState({
            sidebar: state => state.sidebar
        })
    },
    methods: {
        ...mapActions('sidebar', {
            toggleSidebarDesktop: 'toggleSidebarDesktop',
            toggleSidebarMobile: 'toggleSidebarMobile'
        })
    }
}
</script>
