<template>
	<div class="search-record">
		<div class="record-operat">
			<p>最近搜索</p>
			<div class="operat">
				<i class="clear"></i>
				清空
			</div>
		</div>
		<div class="record-list">
			<span>寻梦环游记</span>
			<span>我能说</span>
			<span>三块广告牌</span>
			<span>至暗时刻</span>
			<span>相爱相亲</span>
			<span>勇往直前</span>
			<span>釜山行</span>
			<span>铁雨</span>
			<span>华盛顿邮报</span>
			<span>天才少女</span>
			<span>西虹市首富</span>
			<span>我不是药神</span>
			<span>熊出没之雪岭熊风</span>
			<span>欢乐喜剧人</span>
			<span>唐伯虎冲上云霄</span>
            <span>寻梦环游记</span>
            <span>我能说</span>
            <span>三块广告牌</span>
            <span>至暗时刻</span>
            <span>相爱相亲</span>
            <span>勇往直前</span>
            <span>釜山行</span>
            <span>铁雨</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'SearchRecord'
	}
</script>

<style scoped>
    .search-record {
        flex: 1;
    	padding: 30px 32px 0 32px;
    	font-family:"Microsoft YaHei";
        overflow: auto;
    	/*border: 1px solid red;*/
    }

    .record-operat {
    	display: flex;
    }

    .record-operat>p {
    	margin-right: 30px;
    	color: #fff;
    	font-size: 18px;
    	font-weight: 500;
    }

    .operat {
    	display: flex;
    	align-items: center;
    	color: rgba(153,153,153,1);
    	font-size: 13px;
    }

    .clear {
    	display: block;
    	width: 21px;
    	height: 21px;
    	background-image: url(../../../../assets/Delete1.png);
    	background-size: contain;
    }

    .record-list {
    	padding-top: 20px;
    }

    .record-list>span {
    	display: inline-block;
    	padding: 4px 15px; 
    	margin-bottom: 15px;
    	margin-right: 15px;
    	border: 1px solid rgba(60,60,65,1);
    	border-radius: 25px;
    	background-color: rgba(60,60,65,1);
    	font-size: 13px;
    	color: rgba(204,204,204,1);
    }
</style>