import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeInfo from '../components/HomeInfo'
import TrainInfo from '../components/TrainInfo'
import InputView from '../views/LoginView'
import RegisterView from '../views/RegisterView'
import StationsInfo from '../components/StationsInfo'
import StationInfo from '../components/StationInfo'
import AdminLoginView from '../views/AdminLoginView'
import TrainManageView from '../views/TrainManageView'
import TrainLikeView from '../views/TrainLikeView'
Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    {
      path: '/trainLikeView',
      name: 'trainLikeView',
      component: TrainLikeView
    },
    {
      path: '/trainManage',
      name: 'trainManage',
      component: TrainManageView
    },
    {
      path: '/adminLogin',
      name: 'adminLogin',
      component: AdminLoginView
    },
    {
      path: '/stationInfo',
      name: 'stationInfo',
      component: StationInfo
    },
    {
      path: '/stationsInfo',
      name: 'stationsInfo',
      component: StationsInfo
    },
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