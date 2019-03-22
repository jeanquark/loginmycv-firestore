import axios from 'axios'
export default async function({ req, res, store, redirect, error }) {
	if (process.client) {
    	console.log("Entering resume client-side middleware")
    	console.log('Should not be allowed to proceed because client-side')

    	// console.log('process: ', process)
    	const abc = await axios.post('check-user-authorization', { user_auth_id: 'OlxfESwPtlgzz4vcjiL4YKsIDZI2' })
    	console.log('abc: ', abc)
    	// return redirect('/')
    } else {
    	console.log("Entering resume server-side middleware")

    	// // console.log('req.url: ', req.url)
    	// // console.log('req.path: ', req.path)
    	// // console.log('req.resume: ', req.resume)
    	// console.log('res.resume: ', res.resume)
    	// // const username = req.url.substr(req.url.lastIndexOf('/') + 1)
    	// // console.log('username: ', username)
    	// // store.commit('setLoading', true)
    	// const resume = res.resume

    	// store.commit('resumes/setResume', resume)

    	const abc = await axios.post('check-user-authorization', { user_auth_id: 'OlxfESwPtlgzz4vcjiL4YKsIDZI2' })
    	// console.log('abc: ', abc)

    	// axios.post('check-user-authorization', { user_auth_id: 'OlxfESwPtlgzz4vcjiL4YKsIDZI2' }).then(function (response) {
    		// console.log('response: ', response)
    	// })
    	// console.log('abc: ', abc)
    	console.log('Exiting resume server-side middleware.')
    }
    // return redirect('/resume/1/jeanquak')
}
