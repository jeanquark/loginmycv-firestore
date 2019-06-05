export default function({ store, redirect }) {
    console.log('Entering auth-check')
    if (!store.getters['users/loadedUser']) {
        console.log('Unauthenticated, redirect to homepage!')
        return redirect('/')
    }
}