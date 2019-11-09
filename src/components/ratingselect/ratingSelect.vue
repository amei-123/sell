<template>
    <div class="ratingSelect">
        <div class="desc">
            <span 
                class="block positive" 
                :class="{'active':selectType===2}"
                v-on:click='changeType(2)'
            >{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span 
                class="block positive" 
                :class="{'active':selectType===0}"
                v-on:click='changeType(0)'
            >{{desc.positive}}<span class="count">{{Positive}}</span></span>
            <span 
                class="block nagitive" 
                :class="{'active':selectType===1}"
                v-on:click='changeType(1)'
            >{{desc.nagitive}}<span class="count">{{Nagitive}}</span></span>
        </div>
        <div class="onlyContent" :class="{on:onlyContent===true}" v-on:click='changeOnly'>
            <span class="icon-check_circle"></span>
            <span class="isContent">只看有内容的评价</span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    const POSITIVE = 0;
    const NAGITIVE =1;
    const ALL = 2;
    export default {
        name:"RatingSelect",
        props:{
            desc:{
                type:Object,
                default(){
                    return{
                        all:'全部',
                        positive:'满意',
                        nagitive:'不满意'
                    }
                }
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            ratings:{
                type:Array,
                default(){
                    return []
                }
            },
            selectType:{
                type:Number,
                default:ALL
            }
        },
        methods:{
            changeType(type){
                this.$emit('changeType',type)
            },
            changeOnly(){
                this.$emit("changeOnly")
            }
        },
        computed:{
            Positive(){
                return this.ratings.filter(item=>item.rateType===0).length;
            },
            Nagitive(){
                return this.ratings.filter(item=>item.rateType===1).length;
            }
        }
    }
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl';
    .ratingSelect
        font-size 0;
        .desc
            margin 18px 18px 0;
            padding-bottom 18px;
            border-1px(rgba(7,17,27,.1))
            .block
                display inline-block;
                padding 8px 12px;
                margin-right 8px;
                font-size 12px;
                color rgb(77,85,93);
                border-radius 1px;
                .count
                    margin-left 2px;
                    font-size 8px;
                &.positive  
                    background-color rgba(0,160,220,.2);
                    &.active 
                        background-color rgb(0,160,220);
                        color #fff;
                &.nagitive
                    background-color rgba(77,85,93,.2);
                    &.active 
                        background-color rgb(77,85,93);
                        color #fff;
        .onlyContent
            padding 12px 18px;
            border-1px(rgba(7,17,27,.1))
            color rgb(147,153,159);
            &.on
                .icon-check_circle
                    color #00c850
            .icon-check_circle
                margin-right 4px;
                font-size 24px;
                vertical-align middle
            .isContent
                font-size 12px;
                vertical-align middle
</style>