<template>
	<div class="home-list">
		<ul>
			<li>
				<div class="cover">
                    <img src="http://r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F" alt="">
                    <div class="vip">VIP</div>
                    <div class="message">更新至第40集</div>         
                </div>
                <p class="title">回到明朝当王爷之杨凌传回到明朝当王爷之杨凌传</p>
                <p class="info">播放6.8亿 · 评论13.2万</p>
			</li>
			<li>
                <div class="cover">
                    <img src="http://r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F" alt="">
                    <div class="vip">VIP</div>
                    <div class="message">更新至第40集</div>         
                </div>
                <p class="title">回到明朝当王爷之杨凌传回到明朝当王爷之杨凌传</p>
                <p class="info">播放6.8亿 · 评论13.2万</p>
            </li>
            <li>
                <div class="cover">
                    <img src="http://r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F" alt="">
                    <div class="vip">VIP</div>
                    <div class="message">更新至第40集</div>         
                </div>
                <p class="title">回到明朝当王爷之杨凌传回到明朝当王爷之杨凌传</p>
                <p class="info">播放6.8亿 · 评论13.2万</p>
            </li>
            <li>
                <div class="cover">
                    <img src="http://r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F" alt="">
                    <div class="vip">VIP</div>
                    <div class="message">更新至第40集</div>         
                </div>
                <p class="title">回到明朝当王爷之杨凌传回到明朝当王爷之杨凌传</p>
                <p class="info">播放6.8亿 · 评论13.2万</p>
            </li>
            <li>
                <div class="cover">
                    <img src="http://r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F" alt="">
                    <div class="vip">VIP</div>
                    <div class="message">更新至第40集</div>         
                </div>
                <p class="title">回到明朝当王爷之杨凌传回到明朝当王爷之杨凌传</p>
                <p class="info">播放6.8亿 · 评论13.2万</p>
            </li>
            <li>
                <div class="cover">
                    <img src="http://r1.ykimg.com/050C00005BFE61C8ADA80C3FB0005C6F" alt="">
                    <div class="vip">VIP</div>
                    <div class="message">更新至第40集</div>         
                </div>
                <p class="title">回到明朝当王爷之杨凌传回到明朝当王爷之杨凌传</p>
                <p class="info">播放6.8亿 · 评论13.2万</p>
            </li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'HomeList'
	}
</script>

<style scoped>
    .home-list {

    }

    .home-list ul {
    	width: 100%;
    	display: flex;
    	flex-wrap: wrap;
    	/*border: 1px solid #ccc;*/
    }

    .home-list ul li {
    	width: 50%;
    	background: #FAFAFA;
    	overflow: hidden;
    }

    .home-list ul li>.cover {
        width: 3.72rem;
        height: 2.1rem;
        background: #FAFAFA;
        overflow: hidden;
        position: relative;
    }

    .home-list ul li>.cover>img {
        width: 100%;
        height: 100%;
    }

    .home-list ul li>.title,
    .home-list ul li>.info {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 0.12rem;
    }

    .home-list ul li>.title {
        margin-top: 0.2rem;
        font-size: 14px;
        color: #000;
    }

    .home-list ul li>.info {
        margin-bottom: 0.4rem;
        font-size: 12px;
        color: #999999;
    }

     /* 奇数 */
    .home-list ul li:nth-child(odd) .cover {
    	padding-right: 0.03rem;
    }

    /* 偶数 */
    .home-list ul li:nth-child(even) .cover {
    	padding-left: 0.03rem;
    }

    .vip {
        width: 28px;
        height: 16px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 5px;
        top: 5px;
        color: #fff;
        font-size: 12px;
        background-image: linear-gradient(46deg,rgba(255,147,19,0.8) 0%, rgba(255,102,00,0.8) 100%);
        box-shadow: 0 0 8px 0 rgba(255,110,0,0.20);
    }

    .message {
        position: absolute;
        right: 0px;
        bottom: 2px;
        font-size: 10px;
        color: #F2F2F2;
    }
</style>