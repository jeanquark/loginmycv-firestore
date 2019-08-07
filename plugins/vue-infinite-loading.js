import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.use(InfiniteLoading, {
	props: {
		spinner: 'spiral',
		/* other props need to configure */
	},
	system: {
		throttleLimit: 2,
		/* other settings need to configure */
	},
	slots: {
		noMore: 'No more resumes to load. You\'ve reached the end!', // you can pass a string value
		// error: InfiniteError, // you also can pass a Vue component as a slot
	},
})