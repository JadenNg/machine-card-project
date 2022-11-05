<template>
<b-button @click.prevent="exportData" class="btn btn-warning mb-2 mr-2" :disabled="disabled">
    Xuất excel
</b-button>
</template>

<script>
// import api from '@/api'
import cookie from '../../plugins/cookie'
import Vue from 'vue';
export default {
    name: 'export-button',
    props: {
        query: {
            type: Object,
            default: null
        }
    },
    data: function () {
        return {
            disabled: false,
        }
    },
    methods: {
        exportData() {
            this.disabled = true
            console.log(this.query)
            let self = this
            // check if time too big
            const requestHeaders = {
                'Accept-Language': 'vi-VN',
            };
            if (cookie.get('token')) {
                requestHeaders.Authorization = cookie.get('token');
            }
            let data = {
                ...this.query,
                ...this.$route.query
            };
            let url = api._exportArticles
            url = new URL(url)
            Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
            return fetch(url, {
                    headers: requestHeaders,
                    method: 'GET',
                    // credentials: "same-origin",
                    // ...options,
                }).then(async function (response) {
                    let res = response.clone()
                    try {
                        let body = await res.json()
                        console.log(body && body.code !== 200)
                        if (body && body.code !== 200) {
                            return Promise.reject(body.message)
                        }
                    } catch (e) {
                        return response.body.getReader()
                    }

                }).then(response => {
                    return new ReadableStream({
                        start(controller) {
                            return pump();

                            function pump() {
                                return response.read().then(({
                                    done,
                                    value
                                }) => {
                                    // When no more data needs to be consumed, close the stream
                                    if (done) {
                                        controller.close();
                                        return;
                                    }
                                    // Enqueue the next data chunk into our target stream
                                    controller.enqueue(value);
                                    return pump();
                                });
                            }
                        }
                    })
                })
                .then(stream => new Response(stream))
                .then(response => response.blob())
                .then(blob => URL.createObjectURL(blob))
                .then(url => {
                    let fileLink = document.createElement('a');
                    let now = new Date().toISOString().split("T")[0]
                    fileLink.href = url;
                    let from = self.$route.query.from ? self.$route.query.from : ""
                    let to = self.$route.query.to ? self.$route.query.to : now
                    fileLink.setAttribute('download', `stats${from}_${to}.xlsx`);
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    setTimeout(() => {
                        self.disabled = false
                    }, 3000)
                })
                .catch(err => {
                    Vue.notify({
                        type: 'error',
                        text: err,
                    });
                    setTimeout(() => {
                        self.disabled = false
                    }, 3000)
                });
        },
    }
}
</script>

<style>

</style>
