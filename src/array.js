export function arrayToTree(data, { 
  id = 'id', 
  parentId = 'parentId', 
  rootParentId = 0, 
  children = 'children' 
} = {}) {

  const list = [],
    map = {},
    tree = [];

  for (let i = 0; i < data.length; i++) {
    map[data[i][id]] = i;
    list.push({
      ...data[i],
      [children]: []      
    });
  }

  for (let i = 0; i < list.length; i++) {
    const node = list[i];

    if (node[parentId] !== rootParentId) {
      const foundIndex = map[node[parentId]];

      if (typeof foundIndex === 'number') {
        const found = list[foundIndex];

        found.children.push(node);
      }
    } else {
      tree.push(node);
    }
  }

  return tree;
}

export function noop() {

}