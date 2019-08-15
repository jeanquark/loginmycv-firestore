// import VuexPersistence from 'vuex-persist'

// export default ({ store }) => {
//   	window.onNuxtReady(() => {
// 	    new VuexPersistence({
//       	/* your options */
//     	}).plugin(store)
//   	})
// }


import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  	window.onNuxtReady(() => {
	    new VuexPersistence({
			// reducer: state => ({
			//  resumes: state.resumes
			// 	app_parameters: state.app_parameters,
			//  user: state.user,
				// userResumes: state.userResumes,
			// 	newResume: state.newResume,
			// 	lastVisible: state.lastVisible,
				// user_received_authorizations_array: state.user_received_authorizations_array,
				// user_given_authorizations_array: state.authorizations.user_given_authorizations_array
			// })
			reducer: state => ({
				users: {
					user: state.users.user
				},
				resumes: {
					userResumes: state.resumes.userResumes
				},
				authorizations: {
					user_received_authorizations_array: state.authorizations.user_received_authorizations_array,
					user_given_authorizations_array: state.authorizations.user_given_authorizations_array
				}
			})
			// modules: ['users', 'resumes', 'authorizations']
    	}).plugin(store)
  	})
}