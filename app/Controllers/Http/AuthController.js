'use strict'

const User = use('App/Models/User')

class AuthController {
  async postLogin({ request, auth, response}) {
        try {
            await auth.logout()
        }
        catch (e) {
            console.log('ok');
        }
        await auth.attempt(request.input('email'), request.input('password'))
        return response.route('/admin/dashboard')
    }
    async postRegister({ request, session, response }) {
        const user = await User.create({
            username: request.input('username'),
            email: request.input('email'),
            password: request.input('password')
        })
        session.flash({ successmessage: 'User have been created successfully'})
        return response.route('/admin');
    }
    async logout ({ auth, response }) {
        await auth.logout()
        return response.route('/')
    }
}

module.exports = AuthController
