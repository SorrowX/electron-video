<template>
	<div class="recommend-film">
		<div class="tag">推荐</div>
		<div class="content">
			<div class="film">
				<div class="film-cover">
					<img src="https://r1.ykimg.com/051600005962E794859B5D0534003306">
				</div>
				<div class="film-info">
					<div class="information">
						<span class="title">我的少女时代</span> 
						<span class="performer">小王八小王八小王八小王八小王八</span>
					</div>
					<div class="introduce">
						<p>
							神经大条且长相平凡的林真心（宋芸桦饰），每天眼珠都是跟着校内风云人物欧阳非凡（李玉玺饰）转动，而徐太宇（王大陆饰）身为学校头号痞子，则一心要把上亮丽的校花陶敏敏（简廷芮饰）。林真心偶然发现欧阳和陶敏敏交往的秘密；在喜欢敏敏的流氓学生徐太宇的胁迫下，两人组成“失恋阵线联盟”，誓言拆散这对金童玉女，帮彼此倒追心上人。一个是LOSER壁花想要走到白马王子身边，一个是地痞混混想追到圣女校花，两人一路跌跌撞撞、笑料百出，却万万没想到对彼此动了心。
						</p>
					</div>
				</div>
			</div>

			<div class="film">
				<div class="film-cover">
					<img src="https://r1.ykimg.com/051600005962E794859B5D0534003306">
				</div>
				<div class="film-info">
					<div class="information">
						<span class="title">我的少女时代</span> 
						<span class="performer">小王八</span>
					</div>
					<div class="introduce">
						<p>
							神经大条且长相平凡的林真心（宋芸桦饰），每天眼珠都是跟着校内风云人物欧阳非凡（李玉玺饰）转动，而徐太宇（王大陆饰）身为学校头号痞子，则一心要把上亮丽的校花陶敏敏（简廷芮饰）。
						</p>
					</div>
				</div>
			</div>

			<div class="film">
				<div class="film-cover">
					<img src="https://r1.ykimg.com/051600005962E794859B5D0534003306">
				</div>
				<div class="film-info">
					<div class="information">
						<span class="title">我的少女时代我的少女时代我的少女时代我的少女时代我的少女时代我的少女时代</span> 
						<span class="performer">小王八</span>
					</div>
					<div class="introduce">
						<p>
							神经大条且长相平凡的林真心（宋芸桦饰），每天眼珠都是跟着校内风云人物欧阳非凡（李玉玺饰）转动，而徐太宇（王大陆饰）身为学校头号痞子，则一心要把上亮丽的校花陶敏敏（简廷芮饰）。林真心偶然发现欧阳和陶敏敏交往的秘密；在喜欢敏敏的流氓学生徐太宇的胁迫下，两人组成“失恋阵线联盟”
						</p>
					</div>
				</div>
			</div>

			<div class="film">
				<div class="film-cover">
					<img src="https://r1.ykimg.com/051600005962E794859B5D0534003306">
				</div>
				<div class="film-info">
					<div class="information">
						<span class="title">我的少女时代我的少女时代我的少女时代我的少女时代我的少女时代我的少女时代</span> 
						<span class="performer">小王八</span>
					</div>
					<div class="introduce">
						<p>
							神经大条且长相平凡的林真心（宋芸桦饰），每天眼珠都是跟着校内风云人物欧阳非凡（李玉玺饰）转动，而徐太宇（王大陆饰）身为学校头号痞子，则一心要把上亮丽的校花陶敏敏（简廷芮饰）。
						</p>
					</div>
				</div>
			</div>

			<div class="film">
				<div class="film-cover">
					<img src="https://r1.ykimg.com/051600005962E794859B5D0534003306">
				</div>
				<div class="film-info">
					<div class="information">
						<span class="title">我的少女时代我的少女时代我的少女时代我的少女时代我的少女时代我的少女时代</span> 
						<span class="performer">小王八</span>
					</div>
					<div class="introduce">
						<p>
							神经大条且长相平凡的林真心（宋芸桦饰）
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'MediaRecommendInfoDetailsFilm'
	}
</script>

<style scoped>
	.recommend-film {
		width: 100%;
		display: flex;
		flex-direction: column;
		padding: 16px 0 0 20px;
	}

	/* tag 样式 */
	.tag {
		height: 40px;
		margin-bottom: 12px;
		color: #fff;
		font-size: 21px;
		line-height: 40px;
	}

	.content {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}

	.content .film:nth-child(even) {
		padding-left: 4%;
	}

	/* 推荐电影 样式 */
	.film {
		width: 50%;
		height: 170px;
		display: flex;
		margin-bottom: 25px;
		/*border: 1px solid green;*/
	}

	/* 推荐电影封面 样式 */
	.film-cover {
		flex: none;
		width: 114px;
		height: 100%;
		overflow: hidden;
	}

	.film-cover>img {
		width: 100%;
		height: 100%;
	}

	/* 推荐电影信息 样式 */
	.film-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 0 15px 0px 15px;
		overflow: hidden;
	}

	.information {
		display: flex;
		align-items: center;
		margin-bottom: 8px;
	}

	.information span:nth-child(1) {
		display: block;
		min-width: 35%;
		padding-right: 8%;
	}

	.information span:nth-child(2) {
		display: block;
		align-self: flex-end;
	}

	.information span {
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}

	.title {
		color: #fff;
		font-size: 14px;
	}

	.performer {
		color: rgba(135,135,135,1);
		font-size: 10px;
	}

	/* 推荐电影介绍 样式 */
	.introduce {
		flex: 1;
		overflow: auto;
	}

	.introduce p {
		text-indent: 20px;
		color: rgba(135,135,135,1);
		font-size: 11px;
	}

	/* 隐藏滚动条 样式 */
	.introduce::-webkit-scrollbar {
		display: none;
	}
</style>