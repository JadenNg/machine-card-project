<template>
<!-- ========== Left Sidebar Start ========== -->

<!--- Sidemenu -->
<div id="sidebar-menu">
    <!-- Left Menu Start -->
    <ul id="side-menu" class="metismenu list-unstyled">
        <template v-for="(item, index) in menu">
            <template v-if="item.type === 'header'">
                <!-- <li :key="index" class="menu-title" style="color: #fff">
                    {{ item.title }}
                </li> -->
            </template>
            <template v-else-if="hasPermission(item)">
                <li v-if="!item.hasOwnProperty('children')" :key="index">
                    <router-link exact :to="item.to" class="side-nav-link-ref" active-class="mm-active">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </router-link>
                </li>
                <!--level 1-->
                <li :key="index" v-else-if="isShow(item)" :class="isActive(item.active)">
                    <a href="javascript: void(0);" class="has-arrow" :class="isActive(item.active)">
                        <i :class="item.icon"></i>
                        <span>{{ item.title }}</span>
                    </a>
                    <ul aria-expanded="false" class="sub-menu mm-collapse" :class="{'mm-show': item.active}">
                        <template v-for="(child, child_index) in item.children">
                            <template v-if="isShow(child)">
                                <li :key="child_index" v-if="!child.hasOwnProperty('children')">
                                    <router-link  exact :to="{name: child.name}" class="side-nav-link-ref">
                                        {{child.title}} <span v-if="child && child.key_number_articles" class="badge badge-pill badge-success float-right" :id="child.key_number_articles + '_' + child.count_type">0</span>
                                    </router-link>
                                </li>
                                <!--level 2-->
                                <li :key="child_index" v-else :class="isActive(child.active)">
                                    <a href="javascript: void(0);" class="has-arrow" aria-expanded="true" :class="isActive(child.active)">
                                        {{child.title}}
                                    </a>
                                    <ul aria-expanded="true" class="sub-menu mm-collapse" :class="{'mm-show': child.active}" style="">
                                        <template v-for="(child2, child2_index) in child.children">
                                            <li v-if="hasPermission(child2)" :key="child2_index">
                                                <router-link exact :to="child2.to" active-class="mm-active">
                                                    {{ child2.title }}
                                                </router-link>
                                            </li>
                                        </template>
                                    </ul>
                                </li>
                            </template>
                        </template>
                    </ul>
                </li>
            </template>
        </template>
    </ul>
</div>
<!-- Sidebar -->
</template>

<script>
import MetisMenu from "metismenujs/dist/metismenujs";
import menu from '@/config/data/menu.json'

export default {
    components: {},
    data: () => ({
        menu: menu,
        count: {
            article: {},
            video: {},
            timer: null,
        }
    }),
    watch: {
        "$route.name": {
            handler: async function () {
                await this.checkActive(this.$router.currentRoute, this.menu)
            }
        }
    },
    async created() {
        this.count = this.getCount
        await this.checkActive(this.$router.currentRoute, this.menu);
    },
    mounted: function () {
        document.body.setAttribute("data-sidebar", "dark");
        // eslint-disable-next-line no-unused-vars
        let menuRef = new MetisMenu("#side-menu");
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    methods: {
        checkActive(current, menu) {
            let self = this
            let is_active = false;
            menu.map((item) => {
                item.active = false
                if (item.hasOwnProperty('children')) {
                    item.active = self.checkActive(current, item.children)
                    if (item.active) is_active = true
                }
                if (item.to === current.path) {
                    item.active = true
                    is_active = true
                }
            })
            return is_active
        },

        isActive(active) {
            return {
                'mm-active': active
            }
        },
        hasPermission(item) {
            console.log(item);
            return true
        },
        showNumber(count) {
            if (count) {
                for (let status in count) {
                    let badge = document.getElementById(status + "_article")
                    if (badge) badge.innerHTML = count[status]
                }
            }
        },
        isShow(item) {
            let role = Number(localStorage.getItem('position'))
            if(!item.role) {
                return true
            }
            return item.role.includes(role);
        }
    },
};
</script>
<style>
a.side-nav-link-ref {
    font-size: 15px!important;
}
.color-white {
    color: #fff !important;
}
</style>
