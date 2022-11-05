<template>
<CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0">
    <template #toggler>
        <CHeaderNavLink>
            <div class="c-avatar">
                <CIcon name="cil-user" />
            </div>
        </CHeaderNavLink>
    </template>
    <CDropdownItem v-on:click="logout">
        <CIcon name="cil-lock-locked" />
        Logout
    </CDropdownItem>
</CDropdown>
</template>

<script>
import {
    router
} from "../router";

export default {
    name: 'TheHeaderDropdownAccnt',
    data() {
        return {
            itemsCount: 42
        }
    },
    methods: {
        logout: () => {
            localStorage.removeItem('token')
            router.push('/', () => {})
        }
    }
}
</script>

<style scoped>
.c-icon {
    margin-right: 0.3rem;
}
</style>
