'use strict'
const Post = use('App/Models/Post')
class AdminController {
  async getPosts( { view, auth, params } ) {

        const posts = await Post.all();

        return view.render('dashboard/posts', {
            title: 'Latest Posts',
            posts: posts.toJSON(),
            id: params.id
        })
    }
    async newPost({ auth,request, response, session}){
      
        const post = new Post();

        post.title = request.input('title')
        post.text = request.input('text')


        await post.save()

        session.flash({ notification: 'You create new post!' })

        return response.redirect('/admin/dashboard/posts')
    }
    async deletePost({ params, response }) {
        if (!params.id) {
            return response.badRequest('Произошла ошибка, попробуйте позже.');
        }
        const post = await Post.find(params.id)

        if(!post) return response.redirect('/')

        await post.delete();
       return response.redirect('/admin/dashboard/posts')
    }
}

module.exports = AdminController
