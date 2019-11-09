export function formatTime(time,fmt){
    let reg = /(y+)/;
    if(reg.test(fmt)){
        let year = time.getFullYear()+'';
        fmt = fmt.replace(RegExp.$1,year).substr(4-RegExp.$1.length);
    }

    let Str = {
        'M+':time.getMonth()+1,
        'd+':time.getDate(),
        'h+':time.getHours(),
        'm+':time.getMinutes()
    }

    for(let key in Str){
        if(new RegExp(`(${key})`).test(fmt)){
            let value  = Str[key]+'';
            fmt = fmt.replace(RegExp.$1,(RegExp.$1.length===1?value:toTwo(value)));
        }
    }

    function toTwo(value){
        return ('00'+value).substr(value.length);
    }
    
    return fmt;
}
