<template>
    <span :class="classGroup[index]" class="icon" :style="getSize"></span>
</template>

<script>
export default {
    name:'Activity',
    props:{
        size:Number,
        index:Number
    },
    data() {
        return {
            classGroup:['decrease','discount','special','invoice','guarantee']
        }
    },
    methods: {
        bgImage($url){
            let oSpan = document.querySelector('.icon');
            oSpan.style.backgroundImage = $url+'@2x.png';
            // if (@media (-webkit-min-device-pixel-ratio:3),(min-device-pixel-ratio:3)) {
            //      oSpan.style.backgroundImage = $url+'@3x.png';
            // }
        // }
        }
    },  
    computed:{
        getSize(){
            const CLASS = this.classGroup[this.index]+'_'+this.size;
            console.log(CLASS);
            return this.bgImage(CLASS);
        }
    }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl' 
</style>