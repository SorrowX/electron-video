const getRandomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 * 数组随机换位
 * @param 
 *    arr: { Array } 数组
 * @return
 *    Array
*/
export const shuffle = function(arr) {
   let _arr = arr.slice()
   for (let i = 0; i < _arr.length; i++) {
       let j = getRandomInt(0, i)
       let t = _arr[i]
       _arr[i] = _arr[j]
       _arr[j] = t
   }
   return _arr
}

/**
 * 随机获取数组中的几个元素
 * @param 
 *    arr: { Array } 数组
 *    n: { Number } 需要获取的个数
 * @return
 *    Array
*/
export const getRandomItemFromArr = function(arr, n) {
    if (arr.length <= n) {
        return arr.slice()
    }
    let randomArr = shuffle(arr)
    return randomArr.slice(0, n)
}

export function extend (to, from) {
    for (const key in from) {
        to[key] = from[key]
    }
    return to
}