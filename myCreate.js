/** 手写 Object.create
 * 用法：创建一个新的对象，将传入的对象原型指向新对象并返回
 * 思路：
 *  1、将原型写入到一个函数里面，然后将函数返回
 * @param {*} obj
 * @return {*} 
 */
function myCreate(obj) {
	function F() {}
	F.prototype = obj

	return new F()
}

function myCreate1(proto) {
    if (proto !== null && typeof proto !== 'object' && typeof proto !== 'function') {
        throw new TypeError('Object prototype may only be an Object or null');
    }

    function F() {}
    F.prototype = proto;
    return new F();
}