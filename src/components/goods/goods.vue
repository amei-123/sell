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
          <li class="goods-list good-lists-hook" v-for="(item,index ) in goods" :key="index">
            <h1 class="title">{{item.name}}</h1>
            <ul class="food-detail border-1px">
              <li class="goods-item" v-for="(good,index) in item.foods" :key="index">
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
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
  </div>
</template>

<script type="text/ecmascript-6">
import axios from "axios";
import Bscroll from "better-scroll";
import "../../common/stylus/mixin.styl";
export default {
  name: "Goods",
  data() {
    return {
      classGroup: ["decrease", "discount", "special", "invoice", "guarantee"],
      goods: [],
      heightList: [],
      ScrollY: 0 
    };
  },
  created() {
        console.group('------created创建完毕状态------');
        console.log("%c%s", "color:red", "el     : " + this.$el); //undefined
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化 
        console.log("%c%s", "color:red", "message: " + this.goods); //已被初始化
        console.log(`created阶段12`)
        this.getAllData();
    },
    beforeMount() {
        console.group('------beforeMount挂载前状态------');
        console.log("%c%s", "color:red", "el     : " + (this.$el)); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化  
        console.log("%c%s", "color:red", "message: " + this.goods); //已被初始化
        console.log(`beforeMount阶段13`)
    },
    mounted() {
        console.group('------mounted 挂载结束状态------');
        console.log("%c%s", "color:red", "el     : " + this.$el); //已被初始化
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data); //已被初始化
        console.log("%c%s", "color:red", "message: " + this.goods); //已被初始化
        console.log(`mounted阶段14`)
        console.log(1111,this.goods)
        console.log(document.getElementsByClassName('good-lists-hook'))
    },
    computed:{
        currentIndex(){
            for(let i=0;i<this.heightList.length;i++){
                let height1 = this.heightList[i];
                let height2 = this.heightList[i+1];
                if (!height2 || (this.ScrollY>=height1&&this.ScrollY<height2)) {
                    console.log(i);
                    return i;
                }
            }
            return 0;
        }
    },
    beforeUpdate() {
        console.group('beforeUpdate 更新前状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.goods);
        console.log(`beforeUpdate阶段15`)
    },
    updated() {
        console.group('updated 更新完成状态===============》');
        console.log("%c%s", "color:red", "el     : " + this.$el);
        console.log(this.$el);
        console.log("%c%s", "color:red", "data   : " + this.$data);
        console.log("%c%s", "color:red", "message: " + this.goods);
        console.log(`updated阶段16`)
        console.log(1111,this.goods)
    },
    methods: {
        handleSroll(){
            this.menuScroll = new Bscroll(this.$refs.menuWrapper, {
                mouseWheel: true,
                click:true
            });
            this.goodScroll = new Bscroll(this.$refs.goodsWarpper, {
                mouseWheel: true,
                probeType: 3  //时刻监控位置的变化
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
        }
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
          }
        }
      }
    }
  }
}
</style>