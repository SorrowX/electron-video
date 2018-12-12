<template>
	<div class="nav-panel-list">
		<transition-group name="list" tag="ul">
			<li 
			    v-for="(nav, index) in renderTagList" 
			    :key="nav.tag"
			    v-finger:single-tap="tapNav(nav)"
			    v-finger:double-tap="doubleTapNav(nav)"
			>
				<span>{{ nav.tag }}</span>
			</li>
		</transition-group>
	</div>
</template>

<script>
	import { NAV_LIST } from '@/common/js/constants/index'

	export default {
		name: 'NavPanelList',
		props: {
			list: {
				type: Array,
				default: function() { return NAV_LIST }
			},
			type: [ String, Number ]
		},
		computed: {
			renderTagList() {
				return this.list.slice(0)
			}
		},
		methods: {
            tapNav(nav) {
            	return () => {
            		this.$emit('tap-nav', nav, this.type)
            	}
            },
            doubleTapNav(nav) {
            	return () => {
            		this.$emit('double-tap-nav', nav, this.type)
            	}
            }
		}
	}
</script>

<style scoped>
	.nav-panel-list {

	}

	.nav-panel-list ul li {
	    transition: all 1s;
	}
	
	.list-enter, .list-leave-to {
	    opacity: 0;
	    transform: translateY(0.68rem);
	}
	.list-leave-active {
	    position: absolute;
	} 

    .nav-panel-list ul {
    	width: 100%;
    	display: flex;
    	flex-wrap: wrap;
    }

    .nav-panel-list ul li {
    	width: 33.33%;
    	height: 0.68rem;
    	display: flex;
    	justify-content: center;
    	align-items: center;
    	margin-bottom: 12px;
    }

    .nav-panel-list ul li span {
    	display: block;
    	width: 78%;
    	height: 0.68rem;
    	line-height: 0.68rem;
    	text-align: center;
    	border: 1px solid #ccc;
    	border-radius: 3px;
    	font-size: 13px;
    	color: rgb(102, 102, 102);
    	overflow: hidden;
    	text-overflow: ellipsis;
    	white-space: nowrap;
    }
</style>