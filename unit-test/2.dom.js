// 删除节点
export const removeNode = node => {
  node.parentNode.removeChild(node);
}

// 追加节点
export const append = (newEle, container) => {
  container.appendChild(newEle);
}

// 插入节点
export const insertBefore = (newEle, oldEle) => {
  oldEle.parentNode.insertBefore(newEle, oldEle);
}
