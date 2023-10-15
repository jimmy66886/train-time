import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeInfo from '../components/HomeInfo'
import TrainInfo from '../components/TrainInfo'
import InputView from '../views/LoginView'
import RegisterView from '../views/RegisterView'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '/trainInfo',
      name: 'trainInfo',
      component: TrainInfo
    },
    {
      path: '/',
      name: 'enter',
      component: InputView
    },
    {
      path: '/homeInfo',
      name: 'home',
      component: HomeInfo
    },
    {
      path: '/register',
      name: 'regist',
      component: RegisterView
    }
  ]
})