import Vue from 'vue'
import App from './App.vue'
import {router} from './router';
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import { Base64 } from 'js-base64'
Vue.component('apexchart', VueApexCharts)
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.config.performance = true

Vue.prototype.$confirmationResult = window.confirmationResult;
Vue.mixin({
    methods: {
        b64DecodeUnicode: function (str) {
            // Going backwards: from bytestream, to percent-encoding, to original string.
            return decodeURIComponent(Base64.decode(str).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
    },
})

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    render: h => h(App),
    components: {
        App
    }
})