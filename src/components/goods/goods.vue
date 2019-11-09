<template>
  <div class="goods">
      <div class="menu-warpper" ref="menuWrapper" >
        <ul >
          <li class="menu-item border-1px" v-for="(good,index) of goods" :key="index"
            :class="{'current':currentIndex===index}"
            v-on:click="handleMenuClick(index,$event)"
          >
            <span class="text">
              <span class="icon" v-show="good.type>0" :class="classGroup[good.type]"></span>
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="goods-wrapper" ref="goodsWarpper">
        <ul  >
          <li class="goods-list good-lists-hook"
            v-for="(item,index ) in goods" 
            :key="index"
          >
            <h1 class="title">{{item.name}}</h1>
            <ul class="food-detail border-1px">
              <li class="goods-item" 
                v-for="(good,index) in item.foods" 
                :key="index"
                v-on:click="selectFood(good)"
              >
                <div class="icon">
                  <img :src="good.icon" class="icon-image" />
                </div>
                <div class="detail">
                  <h2 class="name">{{good.name}}</h2>
                  <h3 class="description" v-show="good.description">{{good.description}}</h3>
                  <div class="text">
                    <span class="sellCount">月售{{good.sellCount}}份</span><span class="rating">{{good.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="newPrice">
                      <span>￥</span>{{good.price}}</span><span class="oldPrice border-1px" v-show="good.oldPrice">￥{{good.oldPrice}}</span>
                  </div>
                  <div class="cartWrapper">
                    <cart-control :food='good'></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart v-bind:deliveryPrice="seller.deliveryPrice"
        v-bind:minPrice="seller.minPrice"
        v-bind:goodsArray='selectFoods'
      ></shop-cart>
      <food v-bind:food="selectedFood"  v-show="toggleShow" v-on:hiddenShow="hiddenShow"></food>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import Bscroll from "better-scroll";
import "../../common/stylus/mixin.styl";
import ShopCart from "../shopcart/shopcart"
import CartControl from "../cartControl/cartControl"
import food from "../food/food"
export default {
  props:{
    seller:Object
  },
  name: "Goods",
  data() {
    return {
      classGroup: ["decrease", "discount", "special", "invoice", "guarantee"],
      goods: [],
      heightList: [],
      ScrollY: 0 ,
      selectedFood:{},
      toggleShow: false
    };
  },
  created() {
        this.getAllData();
  },
  computed:{
    currentIndex(){
        for(let i=0;i<this.heightList.length;i++){
            let height1 = this.heightList[i];
            let height2 = this.heightList[i+1];
            if (!height2 || (this.ScrollY>=height1&&this.ScrollY<height2)) {
                return i;
            }
        }
        return 0;
    },
    selectFoods(){
      let foods = [];
      this.goods.forEach((good)=>{
        good.foods.forEach((food)=>{
          if(food.count){
            foods.push(food);
          }
        })
      })
      return foods;
    }
  },
  methods: {
      handleSroll(){
          this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
              mouseWheel: true,
              click:true
          });
          this.goodScroll = new Bscroll(this.$refs.goodsWarpper, {
              mouseWheel: true,
              probeType: 3,  //时刻监控位置的变化
              click:true
          });
          this.goodScroll.on('scroll',(pos)=>{
              this.ScrollY = Math.abs( Math.round(pos.y))
          })
      },
      getAllData() {
          axios.get("/api/goods.json").then(this.getAllDataSucc);
      },
      getAllDataSucc(res) {
          const data = res.data;
          this.goods = data.goods;
          this.$nextTick(()=>{
              this.handleSroll();
              this.calculateHeight();
          })
      },
      calculateHeight(){
          let goodList = document.getElementsByClassName('good-lists-hook');
          let height = 0;
          this.heightList.push(height);
          for(let i=0;i<goodList.length;i++){
              let item = goodList[i];
              height+=item.clientHeight;
              this.heightList.push(height);
          }
      },
      handleMenuClick(index){
          let foodList = document.getElementsByClassName('good-lists-hook');
          let el = foodList[index];
          this.goodScroll.scrollToElement(el,300)
      },
      selectFood(food){
        this.selectedFood = food;
        this.toggleShow = true;
      },
      hiddenShow(){
        this.toggleShow = false;
      }
  },
  components:{
    ShopCart,
    CartControl,
    food
  }
};
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 64px;
  width: 100%;
  overflow: hidden;
  .menu-warpper {
    flex: 0 0 74px;
    width: 74px;
    background-color: #f3f5f7;

    .menu-item {
      display: flex;
      align-items: center;
      width: 54px;
      height: 56px;
      padding: 0 12px;
      &.current{
        position relative;
        margin-top -1px;
        z-index 10;
        background-color #fff;
        font-weight 700;
        .text{
            border-none();
        }   
      }
      .text {
        font-size: 12px;

        .icon {
          display: inline-block;
          width: 12px;
          height: 12px;
          background-size: 12px 12px;

          &.decrease {
            bg-image('decrease_3');
          }

          &.discount {
            bg-image('discount_3');
          }

          &.guarantee {
            bg-image('guarantee_3');
          }

          &.invoice {
            bg-image('invoice_3');
          }

          &.special {
            bg-image('special_3');
          }
        }
      }
    }
  }

  .goods-wrapper {
      flex 1
    .goods-list {
      .title {
        height: 26px;
        padding-left: 14px;
        background-color: #f3f5f7;
        font-size: 14px;
        color: rgb(147, 153, 159);
        line-height: 26px;
        border-left: 2px solid #d9dde1;
      }

      .food-detail {
        .goods-item {
          display: flex;
          padding: 18px;
          border-1px: rgba(7, 17, 27, 0.2);

          .icon {
            width: 57px;
            height: 57px;
            margin-right: 10px;

            .icon-image {
              width: 100%;
              height: 100%;
            }
          }

          .detail {
            font-size: 10px;
            color: rgb(147, 153, 159);
            line-height: 10px;

            .name {
              font-size: 14px;
              line-height: 14px;
              color: rgb(7, 17, 27);
              margin: 2px 0 8px 0;
            }

            .description {
              margin-bottom: 8px;
              line-height: 16px
            }

            .text {
              .sellCount {
                margin-right: 12px;
              }
            }

            .price {
              .newPrice {
                font-size: 14px;
                color: rgb(240, 20, 20);
                font-weight: 700;
                line-height: 24px;

                span {
                  font-weight: normal;
                  font-size: 10px;
                }
              }

              .oldPrice {
                margin-left 8px;
                font-size: 10px;
                color: rgb(147, 153, 159);
                font-weight: 700;
                line-height: 24px;
                text-decoration :line-through;
              }
            }

            .cartWrapper{
              position absolute;
              right 0;
              bottom 8px;
            }
          }
        }
      }
    }
  }
}
</style>