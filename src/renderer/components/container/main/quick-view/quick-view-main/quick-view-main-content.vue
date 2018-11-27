<template>
	<base-lazy-load-img 
	    mode="default"
        :time="300"
        :done="true"
        :position="{ top: 0, right: 0, bottom: 0, left: 0 }"
	    @success="handleImgSuccess" 
	    @error="handleImgError">
	    <transition-group 
	        v-if="arrMedia.length > 0"
	        class="ul-list" 
	        tag="ul" 
	        name="group-fade"
	    >
			<li 
			    v-for="(media, index) in arrMedia" 
			    @click="goPlayPage(media)"
			    :key="media['filename']"
			    @contextmenu="registerRightKeyMenu(media)"
			>
				<a href="#">
					<img :src="defaultBgImg" :data-src="media['genImgPath']" alt="">
				</a>
				<p>{{ media['filename'] }}</p>
			</li>
	    </transition-group>
	</base-lazy-load-img>
</template>

<script>
	import { remote } from 'electron'
	const { Menu, MenuItem } = remote
    import BaseLazyLoadImg from '../../../../base/base-lazy-load-img'
    import CommonMixin from '@/mixin/common-mixin'
    import fu from '../../../../../../file-server/fu'

	export default {
		name: 'QuickViewMainContent',
		components: { BaseLazyLoadImg },
		mixins: [ CommonMixin ],
		props: {
			arrMedia: { // 子组件修改会影响父组件(避免直接赋值arrMedia)
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
			}
		},
		methods: {
			goPlayPage(media) {
				this.playVideo(media)
			},
			registerRightKeyMenu(media) {
			    let self = this
			    let menuArr = [
				    {
				        label: '播放视频',
				        callback: function() {
				        	self.goPlayPage(media)
				        }
				    },
			        {
			            label: '永久删除',
			            callback: function() {
			            	let i = self.arrMedia.indexOf(media)
			            	if (i != -1) {
			            		fu.delete(media.name)
			            		fu.delete(media.genImgPath)
				            	self.arrMedia.splice(i, 1)
			            	}
			            }
			        },
			        {
			            label: '视频目录',
			            callback: function() {
			                self.openDir(media.name)
			            }
			        },
			        {
			            label: '图片目录',
			            callback: function() {
			                self.openDir(media.genImgPath)
			            }
			        }
			    ]
			    let menu = new Menu()
			    menuArr.forEach(item => {
			        let name = item['label']
			        let callback = item['callback']
			        menu.append(
			            new MenuItem({
			                label: name,
			                click() {
			                    callback()
			                }
			            })
			        )
			    })
			    menu.popup({ window: remote.getCurrentWindow() })
			},
			openDir(path) {
				const { shell } = require('electron')
				shell.showItemInFolder(path)
			}
		}
	}
</script>

<style scoped>

    .group-fade-enter, 
    .group-fade-leave-to {
        opacity: 0;
    }

    .group-fade-leave-active {
    	position: absolute;
    }

	.ul-list {
		display: flex;
		flex-wrap: wrap;
	}

	.ul-list li {
		display: block;
		width: 180px;
		margin-right: 1.5%;
		margin-bottom: 3%;
		transition: transform 1s;
	}

	.ul-list li a {
		display: block;
		width: 100%;
		height: 100px;
		overflow: hidden;
	}

	.ul-list li img {
		transition: all .35s;
		width: 100%;
		height: 100%;
	}
	
	.ul-list li img:hover {
		transform: scale(1.2);
	}

	.ul-list li p {
		width: 100%;
		max-height: 40px;
		font-size: 13px;
		color: rgba(204,204,204,1);

		overflow: hidden;
		text-overflow: ellipsis;

		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical; /* 多行溢出出现省略号 */

		/*white-space: nowrap;*/ /* 单行溢出出现省略号 */
	}
</style>