import Vue from 'vue'
import Router from 'vue-router'

import AllCandidates from '../components/routes/AllCandidates'
import ViewCandidate from '../components/routes/ViewCandidate'
import CreateCandidate from '../components/routes/CreateCandidate'
import EditCandidate from '../components/routes/EditCandidate'
import WrongPage from '../components/routes/404'
import SetState from '../components/routes/State'
import Login from '../components/Login'

Vue.use(Router)

function isAuth() {
  let id_token = localStorage.getItem('id_token')
  let access_token = localStorage.getItem('access_token')

  if (id_token && access_token) {
    return true
  } else {
      return false
  }
}

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/',
      component: Login,
      redirect: isAuth() == true && '/home'
    },
    {
      name: 'all_candidates',
      path: '/home',
      component: AllCandidates,
      redirect: isAuth() == false && '/'
    },    
    {
      name: 'create_candidate',
      path: '/candidate/create',
      component: CreateCandidate,
      redirect: isAuth() == false && '/'
    },
    {
      name: 'edit_candidate',
      path: '/candidate/edit/:id',
      component: EditCandidate,
      redirect: isAuth() == false && '/'
    },
    {
      name: 'view_candidate',
      path: '/candidate/:id',
      component: ViewCandidate,
      redirect: isAuth() == false && '/'
    },
    {
      name: '404',
      path: '*',
      component: WrongPage
    },
    {
      name: 'setstate',
      path: '/state',
      component: SetState
    }
  ], mode: 'history'
})