<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logoWrapper">
            <div class="logo" :class="{changeStyle:totalCount>0}">
              <i class="icon-shopping_cart"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{changeStyle:totalCount>0}">￥{{totalPrice}}</div>
          <div class="desc">
            <span class="text">另需配送费￥{{deliveryPrice}}元</span>
          </div>
        </div>
        <div class="content-right" :class="selectStyle" @click.stop="submit">
          <span class="text">{{selectText}}</span>
        </div>
      </div>
      <transition name="fold">
        <div class="shoplist" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="handleEmpty">清空</span>
          </div>
          <div class="list-content" ref="listScroll">
            <ul>
              <li class="food" v-for="(good,index) of goodsArray" :key="index">
                <span class="name">{{good.name}}</span>
                <div class="right">
                  <div class="price">
                    <span>￥{{good.price*good.count}}</span>
                  </div>
                  <div class="cartCon">
                    <cart-control :food="good"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <transition name="mask">
        <div class="mask" v-show="listShow"></div>
      </transition>
    </div>
  </div>
</template>

<script>
import CartControl from "../cartControl/cartControl";
import Bscroll from "better-scroll";
export default {
  name: "ShopCart",
  components: {
    CartControl
  },
  data() {
    return {
      fold: true
    };
  },
  props: {
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    },
    goodsArray: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    totalPrice() {
      let total = 0;
      this.goodsArray.forEach(good => {
        total += good.price * good.count;
      });
      return total;
    },
    totalCount() {
      let count = 0;
      this.goodsArray.forEach(good => {
        count += good.count;
      });
      return count;
    },
    selectStyle() {
      if (this.totalPrice < this.minPrice) {
        return "no-enough";
      } else {
        return "enough";
      }
    },
    selectText() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}起送`;
      } else if (this.totalPrice < this.minPrice) {
        let dis = this.minPrice - this.totalPrice;
        return `还差￥${dis}起送`;
      } else {
        return `请结算`;
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      }
      let show = !this.fold;
      if (show) {
        if (!this.listScroll) {
          //保证不是每次show改变就重现构建实例
          this.listScroll = new Bscroll(this.$refs.listScroll, {
            mouseWheel: true,
            click: true
          });
        } else {
          this.listScroll.refresh();
        }
      }
      return show;
    }
  },
  methods: {
    toggleList() {
      if (!this.totalCount) {
        return;
      }
      this.fold = !this.fold;
    },
    submit() {
        if (!this.totalPrice) {
            return;
        }
      window.alert(`￥${this.totalPrice}元`);
    },
    handleEmpty() {
      this.goodsArray.forEach(food => {
        food.count = 0;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';

.shopcart {
  position: fixed;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 700;
  left: 0;
  bottom: 0;
  z-index: 200;
  width: 100%;
  height: 48px;
  background-color: #141d27;

  .content {
    display: flex;
    height: 100%;
    font-size: 0;

    .content-left {
      flex: 1;

      .logoWrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        left: 0;
        margin: 0 18px 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background-color: #141d27;
        box-sizing: border-box;

        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #2b343c;
          text-align: center;

          &.changeStyle {
            background-color: rgb(0, 160, 220);
            color: #fff;
          }

          .icon-shopping_cart {
            font-size: 24px;
            line-height: 44px;
          }
        }

        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          border-radius: 6px;
          background-color: rgb(240, 20, 20);
          line-height: 16px;
          text-align: center;
          font-size: 9px;
          color: #fff;
        }
      }

      .price {
        display: inline-block;
        margin-top: 12px;
        margin-right: 12px;
        padding-right: 12px;
        line-height: 24px;
        vertical-align: top;
        font-size: 16px;
        border-right: 1px solid rgba(255, 255, 255, 0.1);

        &.changeStyle {
          color: #fff;
        }
      }

      .desc {
        display: inline-block;

        .text {
          font-size: 10px;
          line-height: 24px;
          vertical-align: bottom;
        }
      }
    }

    .content-right {
      width: 105px;
      height: 100%;
      text-align: center;
      background-color: rgb(43, 51, 59);

      &.no-enough {
        background-color: rgb(43, 51, 59);
      }

      &.enough {
        background-color: green;
        color: #fff;
      }

      .text {
        line-height: 48px;
        font-size: 12px;
      }
    }
  }

  .shoplist {
    position: fixed;
    bottom: 48px;
    left: 0;
    z-index: -1;
    width: 100%;

    &.fold-enter, &.fold-leave-to {
      opacity: 0;
    }

    &.fold-enter-active, &.fold-leave-active {
      transition: opacity 1s;
    }

    .list-header {
      width: 100%;
      height: 40px;
      background-color: #f3f5f7;
      border: 1px solid rgba(7, 17, 27, 0.1);

      .title {
        float: left;
        margin-left: 18px;
        font-size: 14px;
        font-weight: 200;
        line-height: 40px;
        color: rgb(7, 17, 27);
      }

      .empty {
        float: right;
        margin-right: 18px;
        line-height: 40px;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }

    .list-content {
      max-height: 217px;
      overflow: hidden;

      .food {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 24px;
        padding: 12px 18px;
        border-1px(rgba(7, 17, 27, 0.1));
        line-height: 24px;
        background-color: #fff;
        font-size: 0;

        .name {
          margin-left: 18px;
          // display inline-block
          font-size: 14px;
          color: rgb(7, 17, 27);
          line-height: 24px;
        }

        .right {
          display: flex;

          .price {
            margin-right: 12px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .cartCon {
            margin-right: 54px;
          }
        }
      }
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    width 100%;
    height 100%;
    background-color: rgba(7, 17, 27, 0.6);
    &.mask-enter-to {
      opacity: 1;
      background-color: rgba(7, 17, 27, 0.6);
    }

    &.mask-enter, &.mask-leave-to {
      background-color: rgba(7, 17, 27, 0);
      opacity: 0;
    }

    &.mask-enter-active, &.mask-leave-active {
      transition: all 1s;
    }
  }
}
</style>