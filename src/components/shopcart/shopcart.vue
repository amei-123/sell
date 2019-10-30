<template>
    <div class="shopcart">
        <div class="content">
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
            <div class="content-right" :class="selectStyle">
                <span class="text">{{selectText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'ShopCart',
    props:{
        deliveryPrice:{
            type:Number,
            default: 0
        },
        minPrice:{
            type:Number,
            default:0
        },
        goodsArray:{
            type:Array,
            default(){
                return[{
                    price:10,
                    count:1
                }]
            }
        }
    },
    computed:{
        totalPrice(){
            let total = 0;
            this.goodsArray.forEach((good)=>{
                total += good.price*good.count;
            })
            return total;
        },
        totalCount(){
            let count = 0;
            this.goodsArray.forEach((good)=>{
                count += good.count;
            })
            return count;
        },
        selectText(){
            if (this.totalPrice==0) {
                return `￥${this.minPrice}起送`
            }else if (this.totalPrice < this.minPrice) {
                let dis = this.minPrice - this.totalPrice
                return  `还差￥${dis}起送`
            }else{
                return `请结算`
            }
        },
        selectStyle(){
            if (this.totalPrice < this.minPrice) {
                return "no-enough"
            }else{
                return "enough"
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .shopcart
        position fixed;
        color rgba(255,255,255,.4)
        font-weight 700
        left 0;
        bottom 0;
        z-index 50;
        width 100%;
        height 48px;
        background-color #141d27;
        .content
            display flex;
            height 100%;
            font-size 0;
            .content-left
                flex 1; 
                .logoWrapper
                    display inline-block
                    position relative
                    top -10px
                    left 0
                    margin 0 18px 0 12px;
                    padding 6px;
                    width 56px;
                    height 56px;
                    border-radius 50%;
                    background-color:#141d27;
                    box-sizing border-box;
                    .logo
                        width 100%;
                        height 100%;
                        border-radius 50%;
                        background-color:#2b343c;
                        text-align center
                        &.changeStyle
                            background-color rgb(0,160,220)
                            color #fff;
                        .icon-shopping_cart
                            font-size 24px;
                            line-height 44px;
                    .num
                        position absolute;
                        top 0;
                        right 0;
                        width 24px;
                        height 16px;
                        border-radius 6px;
                        background-color rgb(240,20,20)
                        line-height 16px;
                        text-align center;
                        font-size 9px;
                        color #fff;
                .price
                    display inline-block
                    margin-top 12px;
                    margin-right 12px;
                    padding-right 12px;
                    line-height 24px;
                    vertical-align top;
                    font-size 16px;
                    border-right 1px solid rgba(255,255,255,.1);
                    &.changeStyle
                        color #fff;
                .desc
                    display inline-block
                    .text
                        font-size 10px;
                        line-height 24px;
                        vertical-align bottom;  
            .content-right
                width 105px;
                height 100%;
                text-align center;
                &.no-enough
                    background-color rgb(43,51,59)
                &.enough
                    background-color green
                    color #fff
                .text
                    line-height 48px;
                    font-size 12px;
</style>