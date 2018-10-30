<template>
	<div class="collection-header">
	    <base-logo :title="'我的收藏'"></base-logo>
	    <div class="collection-operation">
	    	<span @click="$emit('delete-collection')" v-show="showSelectUI">
	    		<i class="delete"></i>
	    	</span>
	    	<span @click="openSelectUI">
	    		<i class="select"></i>
	    	</span>
	    </div>
	</div>
</template>

<script>
    import BaseLogo from '@/components/base/base-logo'

    const components = { BaseLogo }

	export default {
		name: 'CollectionHeader',
		components,
		data() {
			return {
				showSelectUI: false
			}
		},
		methods: {
			openSelectUI() {
				this.showSelectUI = !this.showSelectUI
				this.$emit('open-select-collection', this.showSelectUI)
			}
		}
	}
</script>

<style scoped>
	.collection-header{
	    flex: none;
	    display: flex;
	    justify-content: space-between;
		width: 100%;
		height: 39px;
		background-color: var(--common-header-bg-color);
	}

	.collection-operation {
		display: flex;
	}

	.collection-operation span {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 50px;
		height: 100%;
	}

	.collection-operation span:hover {
		background-color: rgba(60,66,68,1);
		cursor: pointer;
	}

	.collection-operation span i {
		display: block;
		width: 18px;
		height: 18px;
	}

	.delete {
		background-image: url(../../../../assets/Delete.png);
		background-size: contain;
	}

	.select {
		background-image: url(../../../../assets/thumbnail.png);
		background-size: contain;
	}
</style>