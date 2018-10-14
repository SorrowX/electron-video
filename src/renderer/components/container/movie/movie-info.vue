<template>
	<div class="info">
		<header>
			<div class="title">猪笼</div>
			<div class="operation">
				<span>
					<i class="magnet"></i>
					磁铁
				</span>

				<span>
					<i class="sync-see"></i>
					同步看
				</span>

				<span>
					<i class="share"></i>
					分享
				</span>

				<span>
					<i class="collection"></i>
					收藏
				</span>

				<span>
					<i class="down"></i>
					下载
				</span>
			</div>
		</header>
		<main>
			<div class="summary">
				二十世纪六七十年代，香港由英国殖民，权势腐败、社会混乱。1963年，穷困潦倒的青年阿豪（甄子丹饰）偷渡至香港，抱着生死有命、富贵在天之心决意一搏人生。阿豪带着几个兄弟，从九龙城寨底层开始一路刀刃舔血，爬上香港毒品霸主之位，一手掌控香港十大黑帮，江湖人称跛豪。而雷洛（刘德华饰）则从一位普通探长一步步爬上华人总探长高位，统领全香港三万警察，手握香港治安潜规则。为垄断香港黄赌毒三大经济产业，跛豪与雷洛结拜为兄弟，两人一黑一白两手遮天，权势滔天，家财亿万，独霸香港岛 [2]  。
				《追龙》是导演王晶心心念念的情怀所在，看的出来也是非常认真去阐述电影的剧情。如果一个好的人物设定是电影成功的开始，那么全程起伏跌宕无尿点的情节、真实复古的场景服化和胶片感十足的镜头，则处处体现出导演的匠心，保障了影片的高完成度。非常值得一提的，是跛豪为救雷洛深入虎穴，豪气冲天诠释兄弟之情，还因此断了一条腿。导演娴熟地运用戏剧化技巧，让这一段落成就了影片前半段的最大高潮，令观众为两人的手足情深动容的同时，也忍不住扼腕叹息。也许，这就是香港电影人在北上之后对往昔峥嵘岁月发出的激越回响和深沉缅怀。 [26]  （腾讯娱乐评）
			</div>
			<div class="information">
				<p class="information-title">猪笼</p>
				<p class="information-hot">热度: 3456</p>
				<p class="information-act">主演: 刘德华 徐冬冬 郑则仕 汤镇业 黄日华</p>
				<p class="information-show">上映: 2017-09-30</p>
			</div>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'MovieInfo'
	}
</script>

<style scoped>
	/* 电影信息 样式 */
	.info {
		flex: none;
		display: flex;
		flex-direction: column;
		padding: 10px 24px 10px 24px;
	}

	header {
		height: 60px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		/*border: 1px solid #ccc;*/
	}

	/* 标题 样式 */
	.title {
		font-size: 16px;
		color: #fff;
	}

	/* 操作样式 样式 */
	.operation {
		display: flex;
	}

	.operation>span {
		width: 38px;
		height: 42px;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 10px;
		color: #fff;
		font-size: 10px;
		border: .5px solid transparent;
	}

	.operation>span:hover {
		border: .5px solid #ccc;
		cursor: pointer;
	}

	.operation i {
		display: block;
		width: 22px;
		height: 22px;
		margin-bottom: 6px;
		background-size: contain;
		background-repeat: no-repeat;
	}

	.operation .magnet{
		background-image: url(../../../assets/play-page/pin.scale-200.png);
	}

	.operation .sync-see {
		background-image: url(../../../assets/play-page/mobilsync.scale-200.png);
	}

	.operation .share{
		background-image: url(../../../assets/play-page/share_normal.scale-200.png);
	}

	.operation .collection{
		background-image: url(../../../assets/play-page/favor_normal.scale-200.png);
	}

	.operation .down{
		background-image: url(../../../assets/play-page/download_normal.scale-200.png);
	}

	main {
		display: flex;
	}

	/* 电影介绍 样式 */
	.summary {
		padding-right: 20px;
		text-indent: 25px;
	}

	/* 电影信息 样式 */
	.information {
		width: 30%;
		flex: none;
	}

	.summary,
	.information p {
		font-size: 13px;
		line-height: 1.8em;
		color: rgba(255,255,255, .9);
	}
</style>