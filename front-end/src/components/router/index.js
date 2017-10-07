import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import DashBoard from '@/components/DashBoard'
import Graphql from '@/components/Graphql'

Vue.use(Router)

const routes = [
	{
	  path: '/',
	  name: 'Home',
	  component: Home
	},
	{
	  path: '/signup',
	  name: 'Signup',
	  component: Signup
	},
	{
	  path: '/login',
	  name: 'Login',
	  component: Login
	},
	{
		path: '/dashboard',
		name: 'DashBoard',
		component: DashBoard
	},
	{
		path:'/graphbuild',
		name: 'Graphql',
		component: Graphql
	},
]


export default new Router({
	mode: 'history',
	routes: routes,
	linkActiveClass: 'active',
	scrollBehavior (to, from, savedPosition) {
  		return { x: 0, y: 0 }
	}
})
