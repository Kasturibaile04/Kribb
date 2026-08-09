export const formatPrice = (value:number):string => {
    if(value >= 1000000){
        const cr = (value / 1000000).toFixed(1).replace(/\.0$/,'');
        return `${cr} Cr`
    }

    if(value>=100000){
        const lkh = (value / 100000).toFixed(1).replace(/\.0$/,'');
        return `${lkh} Lkh`
    }

    return value.toLocaleString('en-IN');
}