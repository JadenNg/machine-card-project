import axios from 'axios';

var protocol = window.location.protocol;
var currentHost = "";
var api = "/api/";

if(process.env.NODE_ENV == "development") {
    currentHost = process.env.VUE_APP_HOST_DEVELOPMENT
} else {
    currentHost = `${protocol}//${window.location.hostname}`
}

export const httpClient = axios.create({
    baseURL: currentHost + api,
})

httpClient.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

httpClient.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        localStorage.clear()
        window.location.href = "/";

    }
    return error;
});