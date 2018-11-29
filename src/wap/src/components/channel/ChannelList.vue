<template>
    <div class="page has-navbar" v-nav="{ title: '频道列表', showBackButton: true, onBackButtonClick: back}">
        <div class="page-content text-center">
            <h2 class="padding">频道列表</h2>
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
