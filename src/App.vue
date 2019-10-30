<template>
  <div id="app">
      <home-header v-bind:seller='seller'></home-header>
      <div class="tab border-1px">
          <router-link class="tab-item" to="/goods">商品</router-link>
          <router-link class="tab-item" to="/ratings">评论</router-link>
          <router-link class="tab-item" to="/seller">商家</router-link>
      </div>
      <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import  HomeHeader from './components/header/header'
import axios from 'axios'
export default {
  name: 'App',
  components:{
    HomeHeader
  },
  data(){
    return {
      seller:{}
    }
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData(){
      axios.get('/api/seller.json')
        .then(this.getAllDataSucc)
    },
    getAllDataSucc(res){
      const data = res.data;
      this.seller = data.seller;
    }
  }
}
</script>

<style lang="stylus" scoped>
@import 'common/stylus/mixin.styl'
  #app
    .tab
      display :flex;
      height :40px;
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex :1;
        line-height :40px;
        text-align :center;
        color :rgb(77,85,93)
        font-size :14px;
        &.acitve
          color :rgb(240,20,20)
</style>