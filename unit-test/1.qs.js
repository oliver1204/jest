// name=lzr&age=20 => {name: 'lzr', age: 20} 
export const parser = str => {
	const obj = {}; 
	str.replace(/([^=&]+)=([^=&]+)/g, (matchStr, group1, group2, index, sourceStr) => {
		obj[group1] = group2;
	});
	return obj;
}
// {name: 'lzr', age: 20} => name=lzr&age=20 
export const stringify = obj => {
  const arr = []

  Reflect.ownKeys(obj).forEach(key => {
    arr.push(`${key}=${obj[key]}`);
  })
  return arr.join("&");
}

// jest 0配置  jest默认只能测试模块

/**
 * 当replace方法的第二个参数传入一个function，这个function会在每次匹配后，替换之前调用。
 * 参数说明：`这个方法的参数是没有固定个数的，但有一定的规则，参数的个数需要根据捕获组的个数来定`。

 * function(matchStr,groups,index,sourceStr){}

 * 参数matchStr是每次正则匹配到的字符串，这是固定的；
 * 参数groups是正则表达式捕获组匹配到的内容。若正则表达式没有捕获组则没有该参数，groups加个s的意思是这边可能有多个分组，
 * 也就是说groups这个位置代表的是group1,group2,group3......等等参数。参数个数根据捕获组的个数来定。
 * 参数index是匹配项在字符串中的开始下标
 * 参数sourceStr则是原字符串
 */