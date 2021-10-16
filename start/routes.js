'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', 'PostController.index')
Route.on('/admin').render('admin/index')
Route.on('/reg').render('admin/register')
Route.post('/api/login','AuthController.postLogin').as('login.store')
Route.get('/post/:id', 'PostController.details')
Route.post('/api/register','AuthController.postRegister').as('register.store')
Route.group(() => {
    Route.on('/admin/dashboard').render('dashboard/index')
    Route.get('/admin/dashboard/posts', 'AdminController.getPosts')
    Route.on('/admin/dashboard/posts/new').render('dashboard/new')
    Route.post('/api/admin/newPost','AdminController.newPost').as('create.post')
}).middleware(['auth'])
