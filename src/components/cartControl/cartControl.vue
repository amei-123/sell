<template>
    <div class="cartControl">
        <transition name="move">
                <div class="cartReduce " 
                        v-show="food.count>0" v-on:click.stop.prevent="reduceCartCount"
                >
                <transition name='rotate inner'>
                    <span class="icon-remove_circle_outline"></span>
                </transition>
                </div>
        </transition>
        <div class="cartCount" v-show="food.count>0">
            <span class="text">{{food.count}}</span>
        </div>
        <div class="addCount " v-on:click.stop.prevent="addCartCount">
            <span class="icon-add_circle"></span>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue';
    export default {
        name:"cartControl",
        props:{
            food:{
                type:Object
            }
        },
        methods: {
            addCartCount(){
                if (!this.food.count) {
                    Vue.set(this.food,"count",1);
                }else{
                    this.food.count++;
                }
            },
            reduceCartCount(){
                if (this.food.count>0) {
                    this.food.count--;
                }
            }
        },
    }
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
    .cartControl
        font-size 0;
        .cartReduce,.addCount
            display inline-block;
            font-size 24px;
            line-height 24px;
            color rgb(0,160,220);
            &.move-enter-active,&.move-leave-active
                transition  all 0.4s linear 
            &.move-enter-to
                opacity 1;
                transfrom  translate3d(0,0,0)
                .inner
                    display inline-block;
                    &.rotate-enter-active,&.rotate-leave-active
                        transition all 0.4s linear;
                    &.rotate-enter-to
                        transform rotate(0deg);
            &.move-enter,&.move-leave-to
                opacity 0;
                transform translate3d(24px,0,0)
                .inner
                    &.rotate-enter,&.rotate-leave-to
                        transform rotate(180deg)
        .cartCount
            display inline-block;
            width 24px;
            height 24px;
            text-align center;
            font-size 10px;
            color rgb(147,153,159);
            line-height 24px;
            vertical-align top
        .addCount
            display inline-block;
</style>