<template>
	<div id="app" ref="app">
        <!-- <transition>
            <div class="preview-bg" v-show="showBg">
                <img :src="defaultBg" v-show="defaultBg">
            </div>
        </transition> -->
        <template>
            <window-bar></window-bar>
            <container></container>
        </template>
	</div>
</template>

<script>
    const fs = require('fs')
    import CommonMixin from '@/mixin/common-mixin'
    import WindowBar from '@/components/window-bar/window-bar'
    import Container from '@/components/container/container'
    import fu from '../file-server/fu'
    import { 
        SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE 
    } from '@/constant/index'

    const imgDirName = '缩略图'
    const defaultBg = require('./assets/bg/DefaultImage/Assets/Dark/Scale-200/home_item_default_cover.png')

    const components = { WindowBar, Container }

    function parseDragFile(file) {
        let p = file.path
        let stat = fs.statSync(p)
        let isFile = stat.isFile()
        let isDirectory = stat.isDirectory()

        let ret = {
            available: false,
            isFile: false,
            isDirectory: false,
            path: '',
            file: null
        }

        if (
            (isFile && file.type === 'video/mp4') || 
            isDirectory
        ) {
            ret.available = true
            ret.isFile = isFile
            ret.isDirectory = isDirectory
            ret.path = p
            ret.file = file
        }

        return ret
    }

	export default {
	    name: 'ElectronVideo',
        components,
        mixins: [ CommonMixin ],
        data() {
            return {
                defaultBg: '',
                showBg: true
            }
        },
        methods: {
            bindEvt() {
                let self = this
                let dom = this.$refs.app
                dom.addEventListener('drop', function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                    self.handlerDragFile(e.dataTransfer.files[0])
                })
                dom.addEventListener('dragover', function (e) {
                    e.preventDefault()
                    e.stopPropagation()
                })
            },
            handlerDragFile(file) {
                let parseRet = parseDragFile(file)
                if (parseRet.available) {
                    if (parseRet.isFile) {
                        this.handlerDragMp4Video(file)
                    } else {
                        this.handlerDragDir(file)
                    }
                }
            },
            handlerDragMp4Video(file) {
                this.playVideo({
                    dragPlay: true,
                    videoUrl: file.path,
                    videoPoster: ''
                })
            },
            handlerDragDir(file) {
                let imgPath = this.genImagePath(file)
                let navCfgArr = this.parseDirPath(file, imgPath)
                let selfNav = this.parseSelfDirPath(file, imgPath)
                if (navCfgArr.length === 0) {
                    navCfgArr = navCfgArr.concat(selfNav)
                }
                // console.log('navCfgArr: ', navCfgArr)
                // 1.添加导航
                navCfgArr.forEach((nav) => {
                    this.addNavToNavArr(nav)
                })
                // 2.跳转到快速查看页面
                this.insideSwitchNav('QuickView')
                // 3.选中第一个导航,加载数据
                this.$root.$emit(SWITCH_QUICK_VIEW_NAV_DATA_MESSAGE, this.navArr[0])
            },
            genImagePath(file) {
                let imgPath = file.path + `\\${imgDirName}`
                if (!fu.exist(imgPath)) {
                    fu.mkdir(imgPath)
                }
                return imgPath
            },
            parseDirPath(file, imgPath) {
                let allDirPath = []
                fu.each(file.path, function(item){
                    if (item.directory && item.filename !== imgDirName) {
                        allDirPath.push({
                            tag: item.filename,
                            videoDirPath: item.name,
                            imgDirPath: imgPath
                        })
                    }
                })
                return allDirPath
            },
            parseSelfDirPath(file, imgPath) {
                return {
                    tag: file.name,
                    videoDirPath: file.path,
                    imgDirPath: imgPath
                }
            },
            hiddenBg() {
                setTimeout(() => {
                    this.showBg = false
                }, 2500)
            }
        },
        created() {
            /*this.getRandomVideoData((arr) => {
                if (arr.length > 0) {
                    this.defaultBg = arr[0]['genImgPath']
                } else {
                    this.defaultBg = defaultBg
                }
            }, false)*/
        },
        mounted() {
            this.bindEvt()
            // this.hiddenBg()
        }
	}
</script>

<style>
    @import url('./static/css/common-variable.css');
    @import url('./static/css/common.css');

    #app {
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 1px solid var(--app-border-color);
    }

    .preview-bg {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999999;
        background: rgba(27,34,38,1);
    }

    .preview-bg>img {
        width: 100%;
        height: 100%;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
