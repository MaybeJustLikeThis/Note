function createAdder(count) {
    function adder(num) {
        return count + num;
    }
    //返回函数使其有引用
    return adder;
    
}
var adder5 = createAdder(5);
adder5(100);
var adder10 = createAdder(10);
adder10(200);