<template>
  <transition name="fade">
    <div class="food" ref="food">
      <div class="food-content">
        <span class="icon-arrow_lift" v-on:click="toggleShow"></span>
        <div class="food-header">
          <img :src="food.image" class="foodImg" />
        </div>
        <div class="food-detail">
          <div class="food-detail-left">
            <h1 class="name">{{food.name}}</h1>
            <div class="detail">
              <span class="sellCount">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="new">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
          </div>
          <div class="food-detail-right">
            <div class="buy" v-show="!food.count||food.count===0" v-on:click="addFood">加入购物车</div>
            <cart-control :food="food" v-show="food.count"></cart-control>
          </div>
        </div>
        <div class="line" v-show="food.info">
          <iterval-line></iterval-line>
        </div>
        <div class="fond-info" v-show="food.info">
          <h2 class="title">商品介绍</h2>
          <div class="info">{{food.info}}</div>
        </div>
        <div class="line">
          <iterval-line></iterval-line>
        </div>
        <div class="common">
          <h2 class="title">商品评价</h2>
          <rating-select
            v-bind:desc="desc"
            v-bind:ratings="food.ratings"
            v-bind:selectType="selectType"
            v-bind:onlyContent="onlyContent"
            v-on:changeType="changeType"
            v-on:changeOnly="changeOnly"
          ></rating-select>
          <div class="ratings">
            <ul v-show="food.ratings && food.ratings.length>0">
              <li 
                class="rating" 
                v-for="(rating,index) of food.ratings" 
                v-bind:key="index"
                v-show="handleShow(rating.rateType,rating.text)"
              >
                <div class="rating-left">
                  <div class="rateTime">{{rating.rateTime | handleTime}}</div>
                  <div class="rating-detail">
                    <span
                      class="icon-thumb"
                      :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"
                    ></span>
                    <span class="text">{{rating.text}}</span>
                  </div>
                </div>
                <div class="rating-right">
                  <span class="username">{{rating.username}}</span>
                  <img :src="rating.avatar" class="avatar" />
                </div>
              </li>
            </ul>
            <div v-show="!food.ratings ||food.ratings.length===0">暂无评论!</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
import {formatTime} from '../../common/js/time'
import CartControl from "../cartControl/cartControl";
import ItervalLine from "../line/line";
import RatingSelect from "../ratingselect/ratingSelect";
import Vue from "vue";
import Bscroll from "better-scroll";
const POSITIVE = 0;
const NAGITIVE = 1;
const ALL = 2;
export default {
  name: "food",
  components: {
    CartControl,
    ItervalLine,
    RatingSelect
  },
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {
      desc: {
        all: "全部",
        positive: "推荐",
        nagitive: "吐槽"
      },
      selectType: ALL,
      onlyContent: true
    };
  },
  mounted() {
    this.foodScroll = new Bscroll(this.$refs.food, {
      mouseWheel: true,
      click: true
    });
  },
  methods: {
    toggleShow() {
      this.$emit("hiddenShow");
    },
    addFood() {
      if (!this.food.count) {
        Vue.set(this.food, "count", 1);
      } else {
        this.food.count++;
      }
    },
    changeType(type) {
      this.selectType = type;
    },
    changeOnly() {
      this.onlyContent = !this.onlyContent;
    },
    handleShow(type,text){
      if (this.onlyContent && !text) {
         return false;
      }
      if (this.selectType === ALL) {
        return true;
      }else{
        return this.selectType === type
      }
    }
  },
  filters:{
    handleTime(time){
      let newTime = new Date(time);
      
      return formatTime(newTime,'yyyy-MM-dd hh:mm');
    }
  }
};
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';

.food {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 48px;
  width: 100%;
  z-index: 40;
  background-color: #fff;

  &.fade-enter-active, &.fade-leave-active {
    transition: all 1s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
  }

  .icon-arrow_lift {
    position: absolute;
    left: 10px;
    top: 10px;
    font-size: 20px;
    font-weight: lighter;
    color: #fff;
    z-index: 1;
  }

  .food-header {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 100%;

    .foodImg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  .food-detail {
    position: relative;

    .food-detail-left {
      padding: 18px 0 18px 18px;
    }

    .name {
      font-size: 14px;
      font-weight: 700;
      color: rgb(7, 17, 27);
      line-height: 14px;
    }

    .detail {
      margin: 8px 0 18px;
      font-size: 10px;
      color: rgb(147, 153, 159);

      .sellCount {
        margin-right: 12px;
      }
    }

    .price {
      .new {
        font-size: 14px;
        font-weight: 700;
        color: rgb(240, 20, 20);
        line-height: 24px;
      }

      .old {
        font-size: 10px;
        font-weight: normal;
        color: rgb(147, 153, 159);
        line-height: 24px;
      }
    }

    .food-detail-right {
      position: absolute;
      right: 18px;
      bottom: 18px;

      .buy {
        width: 74px;
        height: 24px;
        background-color: rgb(0, 160, 220);
        border-radius: 12px;
        color: #fff;
        font-size: 10px;
        text-align: center;
        line-height: 24px;
      }
    }
  }

  .fond-info {
    padding: 18px;

    .title {
      font-size: 15px;
      color: #000;
      margin-bottom: 6px;
    }

    .info {
      padding-left: 8px;
      font-size: 12px;
      color: rgb(77, 85, 93);
      line-height: 24px;
    }
  }

  .common {
    .title {
      margin: 18px;
      font-size: 15px;
      color: #000;
    }

    .ratings {
      .rating {
        position: relative;
        margin: 0px 18px;
        padding: 16px 0;
        border-1px(rgba(7, 17, 27, 0.1));
        font-size: 0px;
        color: rgb(147, 153, 159);

        .rating-left {
          .rateTime {
            margin-bottom: 6px;
            font-size: 10px;
          }

          .rating-detail {
            font-size: 12px;

            .icon-thumb {
              margin-right: 4px;
              line-height: 24px;
              &.icon-thumb_up{
                color:rgb(0,160,220)
              }
            }

            .text {
              color: rgb(7, 17, 27);
              line-height: 16px;
            }
          }
        }

        .rating-right {
          position absolute;
          right 0;
          top 16px;
          .username {
            font-size: 10px;
            line-height: 12px;
            margin-right: 6px;
            vertical-align middle;
          }

          .avatar {
            width: 12px;
            height: 12px;
            vertical-align middle
            border-radius 50%;
          }
        }
      }
    }
  }
}
</style>