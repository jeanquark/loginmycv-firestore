<template>
	<v-app>
		<div class="fullpage-container">
			<div class="button-group">
				<button type="button" :class="{active:index == 0}" @click="moveTo(0)">Presentation</button>
				<button type="button" :class="{active:index == 1}" @click="moveTo(1)">Education</button>
				<button type="button" :class="{active:index == 2}" @click="moveTo(2)">Work experience</button>
				<button type="button" :class="{active:index == 3}" @click="moveTo(3)">Files</button>
				<button type="button" :class="{active:index == 4}" @click="moveTo(4)">Contact</button>
			</div>
			<div class="fullpage-wp" v-fullpage="opts" ref="fullpage">
				<div class="page-1 page" style="background: yellow;">
					<p class="part-1" v-animate="{value: 'bounceInLeft'}">page-1 page</p>
				</div>
				<div class="page-2 page" style="border: 1px solid red;">
					<p class="part-2" v-animate="{value: 'bounceInRight'}">page-2 page</p>
				</div>
				<div class="page-3 page">
					<p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">page-3 page</p>
				</div>
				<div class="page-4 page" style="background: yellow;">
					<p class="part-4" v-animate="{value: 'bounceInLeft'}">page-4 page</p>
				</div>
				<div class="page-5 page" style="background: yellow;">
					<p class="part-5" v-animate="{value: 'bounceInLeft'}">page-5 page</p>
				</div>
			</div>
			<!-- <button @click="moveNext">next</button> -->
		</div>
	</v-app>
</template>

<script>

export default {
	data() {
		// var that = this
		return {
			index: 0,
			pageNum: 0,
			opts: {
				start: 0,
				dir: 'v',
				loop: false,
				duration: 300,
				beforeChange (ele, current, next) {
					// console.log('before', current, next)
					this.index = next;
				},
				afterChange (ele, current) {
					this.index = current;
					// console.log('after', current)
				}
			},
			image: 'https://picsum.photos/id/975/1024/900'
		}
	},
	computed: {
		cssProps() { 
			return {
				'--url': 'https://picsum.photos/id/975/1024/900',
			}
		}
	},
	methods: {
		moveTo: function(index) {
			this.$refs.fullpage.$fullpage.moveTo(index, true);
			this.index = index
		}
	}
}
</script>

<style scoped>
	* {
		-webkit-overflow-scrolling: touch;
	}
	body {
        margin: 0;
    }
	.fullpage-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	.fullpage-wp {
		display: flex;
		width: 100%;
		height: 100%;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.fullpage-wp.anim {
		transform: translate3d(0, 0, 0);
		-webkit-transition: all 500ms ease-out 0s;
		transition: all 500ms ease-out 0s;
	}
	.fullpage-wp.fullpage-wp-h {
		display: flex;
		flex-flow: row nowrap;
		justify-content: flex-start;
		align-items: center;
	}
	.page {
		box-sizing: border-box;
		display: block;
		position: relative;
		width: 100%;
		height: 100%;
		flex-shrink: 0;
		overflow: hidden;
	}
	.animated {
		opacity: 1;
	}


	
    .fullpage-container {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .page {
        display: block;
        text-align: center;
        font-size: 26px;
        color: #eee;
    }
    .page-1 {
        padding-top: 100px;
        background: #1bbc9b;
    }
    .page-2 {
        padding-top: 50px;
		/* background: url('https://picsum.photos/id/975/1024/900') no-repeat center center; */
		background: var(--url) no-repeat center center;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;
    }
    .page-3 {
        padding-top: 50px;
		background: url('https://picsum.photos/id/976/1024/900') no-repeat center center;
		-webkit-background-size: cover;
		-moz-background-size: cover;
		-o-background-size: cover;
		background-size: cover;

		/* background: url('https://picsum.photos/id/976/1024/900') no-repeat center center fixed;*/
    }


	.button-group {
        position: absolute;
        top: 30px;
        left: 30px;
        z-index: 9;
    }
    .button-group button {
        display: inline-block;
        margin: 10px;
        color: #000;
        background: #fff;
        background: rgba(255, 255, 255, .5);
        -webkit-border-radius: 10px;
        border-radius: 10px;
        padding: 9px 18px;
        border: none;
        outline: none;
	}
    .button-group button.active {
        background: rgba(0, 0, 0, .5);
        color: #fff;
    }
</style>