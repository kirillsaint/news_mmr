'use strict'
const Post = use('App/Models/Post')
class PostController {
  async index( { view, auth, params } ) {

        const posts = await Post.all();

        return view.render('index', {
            title: 'Latest Posts',
            posts: posts.toJSON(),
            id: params.id
        })
    }
    async details({ response, params, view }) {

        const post = await Post.find(params.id)

        if(!post) return response.redirect('/')

        post.body = post.body

        return view.render('post', {
            post: post,
            id: params.id,
        })

    }
}

module.exports = PostController
