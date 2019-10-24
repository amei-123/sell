import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Goods from 'components/goods/goods.vue'
import Ratings from 'components/ratings/ratings.vue'
import Seller from 'components/seller/seller.vue'
import 'common/stylus/index.styl'
Vue.use(Router)
Vue.use(VueResource)
let router =  new Router({
  routes: [
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'Ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'Seller',
      component: Seller
    }
  ],
  linkExactActiveClass:'acitve'
})
router.push('/goods');//首页打开之后跳转到指定的页面
export default router


