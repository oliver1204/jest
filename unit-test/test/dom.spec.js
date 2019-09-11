import { removeNode, append, insertBefore} from '../2.dom.js';

it('测试能否删除元素 removeNode', () => {
  document.body.innerHTML = '<div><button></button></div>'; // 非真实的dom ,是jest虚拟的dom
  let button = document.querySelector('button');
  expect(button).not.toBe(null);

  removeNode(button);

  button = document.querySelector('button');
  expect(button).toBe(null);
})

it('测试能否追加节点元素 append', () => {
  let i = document.querySelector('i');
  let container = document.querySelector('body');
  let childNodes = container.childNodes;
  expect(childNodes).not.toContain(i);

  document.body.innerHTML = '<i></i>';
  i = document.querySelector('i');
  childNodes = container.childNodes;
  append(i, container);
  expect(childNodes).toContain(i);
})

it('测试能否插入节点元素 insertBefore', () => {
  document.body.innerHTML = '<ul id="myList"><li>Coffee</li><li>Tea</li></ul>';
  let newEle = document.createElement("li");
  let textnode = document.createTextNode("Water")
  newEle.appendChild(textnode)

  let oldEle = document.getElementById("myList")

  expect(oldEle.childNodes[0].innerHTML).not.toBe('Water');
  
  oldEle.insertBefore(newEle,oldEle.childNodes[0]);
  expect(oldEle.childNodes[0].innerHTML).toBe('Water');
})