<template>
    <div class="star" :class="classType">
        <span v-for="(starClass,index) of starClasses" 
            :class="starClass" 
            class="star-item" 
            :key='index'
        ></span>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:'Star',
        props:{
            size:Number,
            score:Number
        },
        computed:{
            classType(){
                return 'star-' + this.size;
            },
            starClasses(){
                let result = [];
                const LENGTH = 5;
                const CLS_ON = 'on';
                const CLS_OFF = 'off';
                const CLS_HELF = 'half';
                let score = Math.floor(this.score*2)/2;
                let hasDecimal = score%1 !== 0 ;
                let integer = Math.floor(score);
                for(var i=0;i<integer;i++){
                    result.push(CLS_ON);
                }
                if (hasDecimal) {
                    result.push(CLS_HELF);
                }
                while(result.length < LENGTH){
                    result.push(CLS_OFF);
                }
                return result;
            }
        }

    }
</script>

<style lang="stylus" scoped ref="stylesheet/stylus">
@import '../../common/stylus/mixin.styl' 
    .star 
        font-size 0;
        .star-item
            display inline-block
            background-repeat no-repeat
        &.star-48
            .star-item
                width 20px;
                height 20px;
                maigin-right 22px;
                background-size 20px 20px;
                &.on
                    bg-image('star48_on');
                &.half
                    bg-image('star48_half')
                &.off
                    bg-image('star48_off')
        &.star-36
            .star-item
                width 15px;
                height 15px;
                maigin-right 6px;
                background-size 15px 15px;
                &.on
                    bg-image('star36_on');
                &.half
                    bg-image('star36_half')
                &.off
                    bg-image('star36_off')
        &.star-24    
            .star-item
                width 10px;
                height 10px;
                maigin-right 3px;
                background-size 10px 10px;
                &.on
                    bg-image('star24_on');
                &.half
                    bg-image('star24_half')
                &.off
                    bg-image('star24_off')
</style>