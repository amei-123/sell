<template>
    <div id="seller">
        <div class="content-wrap">
            <div class="Img"><img class="avatar" :src='seller.avatar'></div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classGroup[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div class="count-group" v-if="seller.supports" v-on:click="detailIsShow">
                <span class="count">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
        </div>
        <div class="bullet-wrap" v-on:click="detailIsShow">
            <span class="notice"></span>
            <span class="notice-info">{{seller.bulletin}}</span>
            <span class="icon-keyboard_arrow_right"></span>
        </div>
        <div class="background">
            <img :src="seller.avatar" width="100%" height="100%">
        </div>
        <div class="detail" v-show="detailShow">
            <div class="detailwrap clearfix">
                <div class="main">
                    <h1 class="main-name">{{seller.name}}</h1>
                </div>
            </div>
            <div class="detailfooter" v-on:click='detailIsClose'>
                <i class="icon-close"></i>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'Seller',
        props:{
            seller:Object
        },
        created() {
            this.classGroup = ['decrease','discount','special','invoice','guarantee']
        },
        data() {
            return {
                detailShow:false
            }
        },
        methods: {
            detailIsShow(){
                this.detailShow = true;
            },
            detailIsClose(){
                this.detailShow = false;
            }
        },
    }
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl' 
    #seller
        position relative
        background-color :rgba(7,17,27,0.5)
        color #fff
        .content-wrap
            display :flex;
            position relative;
            align-items :center;
            .Img
                 margin :24px 16px 18px 24px;
                .avatar
                    width :64px;
                    height :64px;
                    border-radius :2px;
            .content
                .title
                    font-size :16px;
                    .brand
                        display :inline-block;
                        margin-right :6px;
                        width :32px;
                        height :16px;
                        bg-image('brand');
                        background-size :32px;
                        vertical-align :bottom;
                    .name 
                        font-weight :bold;
                        vertical-align :bottom;
                .description
                    margin-top 8px;
                    margin-bottom 10px;
                    font-size :12px;
                .support
                    .icon
                        display :inline-block;
                        width :12px;
                        height :12px;
                        background-size :12px 12px;
                        vertical-align bottom;
                        &.decrease
                            bg-image('decrease_1');
                        &.discount
                            bg-image('discount_1');
                        &.guarantee
                            bg-image('guarantee_1');
                        &.invoice
                            bg-image('invoice_1');
                        &.special
                            bg-image('special_1');
                    .text
                        font-size :10px;
                        vertical-align :bottom;

            .count-group
                position absolute;
                right 12px;
                bottom 18px;
                padding 0 8px;
                height 24px;
                line-height 24px;
                border-radius 14px;
                background-color rgba(0,0,0,.2);
                text-align center;
                .count
                    font-size 10px;
                .icon-keyboard_arrow_right
                    margin-left :2px;
                    line-height 24px;
                    font-size 10px;
        .bullet-wrap
            display flex;
            align-items center;
            height 28px;
            background-color rgba(7,17,27,.2);
            font-size 10px;
            .notice
                display inline-block;
                width 22px;
                height 12px;
                margin-left 12px;
                margin-right 4px;
                bg-image('bulletin')
                background-size 22px 12px;
            .notice-info
                display inline-block;
                flex 1;
                white-space nowrap
                overflow hidden
                text-overflow ellipsis
            .icon-keyboard_arrow_right
                margin-left 4px;
                margin-right 8px;
        .background
            position absolute  
            left 0;
            top 0;
            width 100%;
            height 100%;
            z-index -1;
            filter blur(10px)
        .detail
            position fixed;
            top 0;
            left 0;
            width 100%;
            height 100%;
            z-index 100
            overflow auto
            background-color rgba(7,17,27,0.8)
            .detailwrap
                min-height 100%;
                width 100%
                .main
                    width 100%
                    margin-top 64px;
                    padding-bottom 64px;
                    text-align center
                    .main-name
                        line-height 16px;
                        font-size 16px;
                        font-weight 350       
            .detailfooter
                position relative
                width 32px;
                height 32px;
                margin -64px auto 0 auto
                font-size 32px;
                clear both;

</style>
