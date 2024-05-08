function foo(m,n) {
    console.log(arguments)
    
    //1.遍历
    // for (let i = 0; i < arguments.length; i++){
    //     console.log(arguments[i]);
    // }
    //获取所有参数中的偶数
    //2.数组filter;
    // for (let arg of arguments) {
    //     if (arg % 2 === 0) {
    //         console.log(arg);
    //     }
    // }
    // var evenNums = arguments.filter(item =>  item % 2 === 0 );//arguments不是一个数组对象，不可以调用filter
    // console.log(evenNums);
    var newArgs = [].slice.apply(arguments);
    console.log(newArgs)
}
foo(10,25,32,42) 