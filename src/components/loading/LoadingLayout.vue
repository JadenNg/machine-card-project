<template>
<div class='loader-container' :class='{"show": loading, "hidden": !loading}'>
    <div class="curved-div">
        <div class="colour-magic">
            <i class='fa fa-circle-o-notch rotate'></i>
        </div>
        <div class="loading">
            <span aria-hidden="true" class="m-2 spinner-border text-dark"></span>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapGetters
} from 'vuex'

export default {
    data() {
        return {
            message: 'Đang tải...',
            loading: false,
        }
    },
    watch: {
        "getLoading": {
            handler: function (current) {
                this.loading = current.loading
            },
            deep: true
        }
    },
    computed: {
        ...mapGetters('loading', ['getLoading']),
    },
    created() {}
}
</script>

<style scoped>
.loader-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
}

.curved-div {
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: .3rem;
    width: 20rem;
    padding: 1rem;
    background: #000;
    box-shadow: 0 0 .1rem #fefefe;
}

.curved-div>* {
    display: inline-block;
}

.rotate {
    border-radius: 50%;
    padding: .5rem;
    animation-name: rotate;
    animation-duration: .7s;
    animation-iteration-count: infinite;
    animation-delay: 0s;
}

.loading {
    text-align: center;
    width: 100%;
    font-size: 1.8rem;
}

.show {
    visibility: visible;
    opacity: 0.7;
    z-index: 2000;
    transition: opacity 0.5s ease-out, visibility 0.5s ease-out, z-index 0.5s ease-out;
}

.hidden {
    opacity: 0;
    visibility: hidden;
    z-index: 0;
    transition: opacity 0.5s ease-out, visibility 0.5s ease-out, z-index 0.5s ease-out;
}

@keyframes rotate {
    0% {
        transform: rotateZ(0deg);
    }

    100% {
        transform: rotateZ(360deg);
    }
}

.colour-magic {
    animation-name: colorMagic;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-delay: 0s;
}

@keyframes colorMagic {
    0% {
        color: rgb(179, 10, 10);
    }

    10% {
        color: rgb(227, 132, 22);
    }

    20% {
        color: rgb(164, 153, 7);
    }

    30% {
        color: rgb(26, 171, 19);
    }

    40% {
        color: rgb(19, 144, 177);
    }

    50% {
        color: rgb(14, 16, 221);
    }

    60% {
        color: rgb(27, 9, 98);
    }

    70% {
        color: rgb(58, 11, 111);
    }

    80% {
        color: rgb(126, 14, 129);
    }

    90% {
        color: rgb(208, 19, 121);
    }

    100% {
        color: rgb(198, 18, 18);
    }
}
</style>
