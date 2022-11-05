<template>
<div>
    <div class="rightbar-title px-3 py-4 border-bottom ">
        <a href="javascript:void(0);" class="right-bar-toggle float-right" @click="hide">
            <i class="mdi mdi-close noti-icon"></i>
        </a>
        <h5 class="m-0">Lịch sử hệ thống</h5>
    </div>
    <b-card body-class="overflow-auto pb-5 px-3" style="max-height: 90vh">
        <ul class="verti-timeline list-unstyled">

            <li v-for="entry in rows" :key="entry.id" class="event-list">
                <div class="event-timeline-dot">
                    <i class="bx bx-right-arrow-circle font-size-18"></i>
                </div>
                <div>
                    <h5 class="font-size-14">
                        {{ moment(entry.created_at) }}
                    </h5>
                    <div>
                        <div>
                            {{ entry.user }} - {{ $t(entry.group + '.' + entry.action) }}
                            <span v-if="entry.group == 'article'">
                                <router-link replace :to="{name:'admin.articles.update', params: {'id': entry.collection_id}}">
                                    {{ entry.collection_id }}
                                </router-link>
                            </span>
                            <span v-else-if="entry.group == 'redirect'">
                                <router-link replace :to="{name:'admin.redirect.edit', params: {'id': entry.collection_id}}">
                                    {{ entry.collection_id }}
                                </router-link>
                            </span>
                            <span v-else>
                                {{ entry.collection_id }}
                            </span>

                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div class="text-center mt-4">
            <a href="javascript: void(0);" class="btn btn-primary btn-sm" @click="loadmore">Tải thêm</a>
        </div>
    </b-card>
</div>
</template>

<script>
// import http from '@/core/http';
// import api from '@/api';
import moment from 'moment';

export default {
    name: 'system-logs',
    data: () => ({
        pagination: {
            page: 1,
        },
        rows: [],
    }),
    methods: {
        hide() {
            this.$parent.hide();
        },
        moment(data, format = 'DD/MM/YYYY HH:mm:ss') {
            if (moment(data).isValid()) {
                return moment(data).utc().format(format);
            }
            return data;
        },
        async getData() {
            let response = [] //await http('GET', api._getSystemLog, {data: {page: this.pagination.page}});
            this.rows.push(...response.logs);
        },
        loadmore() {
            this.pagination.page++;
            this.getData();
        },
    },
    created() {
        this.getData();
    },
};
</script>

<style scoped>

</style>
