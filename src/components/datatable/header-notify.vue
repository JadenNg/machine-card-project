<template>
    <b-dropdown ref="modal_toggle"  menu-class="dropdown-menu-lg p-0 mt-5 style-position"
        toggle-class="header-item noti-icon" variant="black">
        <template v-slot:button-content>
            <i class="bx bx-bell style-relative margin-top">
                <span v-show="notSeen > 0" class="badge badge-danger badge-pill absolute">{{ notSeen }}</span>
            </i>
        </template>
        <div>
            <div class="p-3 padding">
                <div class="row align-items-center disable-event">
                    <div class="col padding">
                        <h5 class="m-0 disable-event py-1">Thông báo</h5>
                        <div class="btn-style">
                            <button :class="{styleBgr: saw==1}" @click="getListNotifications">Tất cả</button>
                            <button :disabled="listNotifications.length < 1" :class="{styleBgr: saw==2}" @click="getNotifications">Chưa đọc</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scroll-class">
                <div v-show="listNotifications.length > 0" @click="remove_show()" class="p-2 border-top" v-for="item in listNotifications" :key="item.id">
                    <span :class="{styleOpacity: item.daXem == true}" @click="changeStatus(item.id,item.daXem)">
                        <router-link class="btn btn-sm btn-block text-left style-hover"
                            :to="{ name: 'admin.sentiments.edit', params: { id: item.idPhanAnh } }">
                            <b-media tag="li">
                                <template #aside>
                                    <img :src="addPrefixImage(item.thumb)" class="image-sentiment style-mt" />
                                </template>
                                <span class="check-notify">
                                    <span class="style-bold">{{getName(item.noiDung)}}</span>
                                    {{ formatHtml(item.noiDung) }}
                                </span>
                                <div class="style-sub-title margin-top">{{ item.thoiGian | formatDateTime }}</div>
                            </b-media>
                        </router-link>
                    </span>
                </div>
            </div>
            <div v-show="listNotifications.length == 0" class="showNoNotify">
                <img class="style-img" src="../../assets/icons/bell-notify.png" alt="">
                <span>Bạn không có thông báo nào</span>
            </div>
        </div>
    </b-dropdown>
</template>

<script>
import {
    httpClient
} from "../../_utils/httpClient";
import { httpPreview } from "../../_utils/httpPreview";

export default {
    name: 'header-notify',
    data: () => ({
        show: false,
        userId: "",
        listNotifications: [],
        notSeen: 0,
        total: 0,
        saw: 1
    }),
    methods: {
        remove_show() {
            this.$refs['modal_toggle'].hide()
        },
        addPrefixImage(src) {
            if (src && src.startsWith(`http`)) return src
            return httpPreview + src
        },
        formatHtml(str) {
            let regex = /(<([^>]+)>)/ig;
            str = str.replace(regex, "")
            if (str.length > 100) {
                str = str.substr(0, 100) + '...'
            }
            return str.slice(str.indexOf(":")+1)
        },
        getName(str){
            return str.slice(0, str.indexOf(":")+1)
        },
        async changeStatus(id,seen) {
            if(seen == true) return;
            await httpClient.patch(`notification/change-seen?id=${id}`);
            this.getListNotifications();
        },
        async getListNotifications() {
            this.saw = 1;
            let response = await httpClient.get(`notification`, {})
            this.notSeen = response.data.notSeen;
            this.total = response.data.notSeen;
            let data = response.data.data ? response.data.data.map((item) => {
                for (let i = 0; i < item.media.length; i++) {
                    return {
                        ...item,
                        thumb: item.media[i]
                    }
                }
                return {
                    ...item
                }
            }) : []
            this.listNotifications = data;
            if (this.total > 0) {
                for (let i = 0; i < this.listNotifications.length; i++) {
                    if (this.listNotifications[i].nguoiNhan == this.userId)
                        this.show = true;
                }
            }
        },
        async getNotifications() {
            this.saw = 2;
            let response = await httpClient.get(`notification`, {
                params: {
                    daXem: false
                }
            })
            this.notSeen = response.data.notSeen;
            this.total = response.data.notSeen;
            let data = response.data.data ? response.data.data.map((item) => {
                for (let i = 0; i < item.media.length; i++) {
                    return {
                        ...item,
                        thumb: item.media[i]
                    }
                }
                return {
                    ...item
                }
            }) : []
            this.listNotifications = data;
            if (this.total > 0) {
                for (let i = 0; i < this.listNotifications.length; i++) {
                    if (this.listNotifications[i].nguoiNhan == this.userId)
                        this.show = true;
                }
            }
        }
    },
    created() {
        this.userId = localStorage.getItem('user');
        this.getListNotifications();
    }
};
</script>

<style>

.noti-icon .badge {
    position: absolute;
    top: -10px;
    right: -17px;
    font-size: 12px;
}

.scroll-class {
    max-height: 70vh;
    min-height: 0px;
    overflow-x: hidden;
    overflow-y: auto;
}

.image-sentiment {
    width: 60px;
    height: 60px;
    object-fit: cover;
}

.style-sub-title {
    font-size: 12px;
    color: rgb(0, 143, 251)
}

.margin-top {
    margin-top: 6px;
}

.margin-left {
    margin-left: 10px
}

.show-all {
    float: right;
    margin-top: -20px;
    font-size: 14px;
    color: rgb(0, 143, 251);
    padding: 8px;
}

.padding {
    padding-bottom: 16px;
}

.style-relative {
    position: relative;
}

.style-mt {
    margin-top: 14px;
}

.style-position {
    margin-top: -6px !important;
    transform: none !important;
    left: -260px !important;
}

.style-hover:hover {
    background-color: rgba(132, 136, 139, 0.2);
}

.check-notify {
    color: rgb(20, 19, 19);
}
.styleOpacity span{
    color: #a9a8a8 !important;
}
.style-bold {
    font-weight: 500 !important;
}
.btn-style button{
    font-weight: 600 !important;
    border: none;
    border-radius: 20px;
    padding: 8px 14px;
    min-width: 92px;
    margin-right: 10px;
    transform: translateY(12px);
    background-color: transparent;
    transition: 0.1s;
    font-size: 14px;
}

.btn-style button:hover {
    background-color: rgba(0, 0, 0, 0.08);
}
.styleBgr {
    background-color: rgba(52, 95, 168, 0.08) !important;
    color: #1877F2;
}
.style-img {
    width: 32%;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-bottom: 20px;
    display: block;
}
.showNoNotify span {
    display: block;
    text-align: center;
    font-weight: 700;
    color: #65676B;
    margin-bottom: 20px;
    font-size: 18px;
}
/* width */
.scroll-class::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.scroll-class::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.scroll-class::-webkit-scrollbar-thumb {
  background: #888;
}

/* Handle on hover */
.scroll-class::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
