<template lang="vi">
<div>
    <page-header :title="`Chi tiết phản ánh`" :items="breadcrumbs" />
    <div>
        <b-row>
            <div :class="{'col-lg-12': isShow, 'col-lg-8': !isShow}">
                <Detail @show="show" />
            </div>
        </b-row>
    </div>
</div>
</template>

<script>
import PageHeader from '../../../components/page-header';
import Detail from "./partials/detail.vue"
import SentimentFiles from "./partials/sentiment-files.vue";
import LightBox from 'vue-it-bigger'
export default {
    name: 'create',
    components: {
        SentimentFiles,
        PageHeader,
        LightBox,
        Detail,
    },
    data: function () {
        return {
            breadcrumbs: [{
                text: 'Trang chủ',
                to: '/admin/home',
            }, {
                text: 'Phản ánh',
                to: '/admin/sentiments',
            }, {
                text: 'Chi tiết',
                to: '#',
                active: true,
            },],
            componentName: '',
            isShow: false
        }
    },
    watch: {
        '$route.name': {
            handler() {
                this.checkPage()
            }
        },
        '$route.params.id': {
            handler() {
                this.componentName = ""
                setTimeout(() => {
                    this.checkPage()
                }, 0);
            }
        },
    },
    methods: {
        show(value) {
            this.isShow = value
        },
    },
    created() {
        window.scrollTo(0, 0);
        console.log(this.$route.name);
        this.checkPage()
    }
}
</script>

<style>
.text-sm {
    font-weight: 600;
}

.vib-open {
    overflow: hidden;
}

.no-scroll {
    overflow-y: hidden;
}

.vib-hideable {
    transition: opacity .5s ease;
}

.vib-hidden {
    opacity: 0;
}

/* elements styling */

.vib-container {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.85);
    box-sizing: border-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0px;
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 2000;
    -webkit-align-items: center;
    -moz-box-sizing: border-box;
    -webkit-justify-content: center;
    -ms-flex-align: center;
    -webkit-box-align: center;
    -ms-flex-pack: center;
    -webkit-box-pack: center;
}

.vib-content {
    position: relative;
    margin: 0;
    display: block;
}

.vib-image {
    cursor: pointer;
    max-height: calc(100vh);
    cursor: pointer;
    display: block;
    height: auto;
    margin: 0 auto;
    max-width: 100%;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

.vib-thumbnail-wrapper {
    background: rgba(0, 0, 0, 0.2);
    padding: 10px 12px;
    text-align: center;
    white-space: nowrap;
    position: fixed;
    display: inline-block;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    top: 0px;
}

.vib-thumbnail {
    background-position: center;
    background-size: cover;
    border-radius: 4px;
    box-shadow: inset 0 0 0 1px hsla(0, 0%, 100%, .2);
    cursor: pointer;
    display: inline-block;
    height: 50px;
    margin: 2px 2px 0 2px;
    overflow: hidden;
    width: 50px;
}

.vib-thumbnail-active {
    background-position: center;
    background-size: cover;
    border-radius: 4px;
    box-shadow: inset 0 0 0 2px white;
    cursor: pointer;
    display: inline-block;
    height: 50px;
    margin: 2px 2px 0 2px;
    overflow: hidden;
    width: 50px;
}

.vib-footer {
    box-sizing: border-box;
    color: white;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    line-height: 1.3;
    padding: 10px;
    justify-content: space-between;
    text-align: left;
    position: fixed;
    bottom: 0;
    width: 100%;
}

.vib-footer-count {
    flex-shrink: 0;
    padding-left: 1em;
}

.vib-close {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
    outline: none;
    position: fixed;
    top: 0;
    right: 0;
    vertical-align: bottom;
    height: 65px;
    width: 60px;
    padding: 15px 12px 15px 20px;
    border-bottom-left-radius: 50%;
}

.vib-arrow {
    background: rgba(0, 0, 0, 0.2);
    border: none;
    cursor: pointer;
    outline: none;
    padding: 10px;
    position: absolute;
    top: 50%;
    user-select: none;
    height: 65px;
    margin-top: -60px;
    width: 60px;
}

.vib-arrow-left {
    left: 0;
    padding-right: 20px;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;
}

.vib-arrow-right {
    right: 0;
    padding-left: 20px;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;
}

@media (min-width: 500px) {
    .vib-thumbnail-arrow {
        width: 40px;
    }
}

@media (min-width: 768px) {
    .vib-arrow {
        width: 60px;
    }
}

/* image transitions */

.vib-image-transition-enter-active,
.vib-image-transition-leave-active {
    transition: opacity .2s ease;
}

.vib-image-transition-enter,
.vib-image-transition-leave-to {
    opacity: 0;
}

.vib-image-no-transition-enter-active,
.vib-image-no-transition-leave-active {
    transition: none;
}

.vib-image-no-transition-enter,
.vib-image-no-transition-leave-to {
    opacity: 0;
}

/* container transitions */

.vib-container-transition-enter-active,
.vib-container-transition-leave-active {
    transition: opacity .3s ease;
}

.vib-container-transition-enter,
.vib-container-transition-leave-to {
    opacity: 0;
}

.video-background {
    position: relative;
    padding-bottom: 56.25%;
    /* 16:9 */
    height: 0;
    width: calc(90vw);
    height: calc(90vh);
}

.video-background iframe {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 50.25vw;
    max-height: 100vh;
    max-width: 182.78vh;
}
</style><style lang="scss" scoped>
.action-column {
    width: 120px;
    text-align: center;
}
</style><style>
.red {
    color: red;
}
</style>
