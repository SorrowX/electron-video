<template>
    <div class="page has-navbar" v-nav="{ title: '视频列表', showBackButton: true, onBackButtonClick: back}">
        <div class="page-content text-center">
            <h2 class="padding">视频列表</h2>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            back() {
                $router.back('/')
            }
        }
    }
</script>
