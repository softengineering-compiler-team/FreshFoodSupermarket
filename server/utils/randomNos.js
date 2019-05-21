/*fetch ${num} goodsNos and all of them haven't been in the given list*/
module.exports = function(list, num, max) {
  if(list.length >= num) {
    return list
  }

  for (var i = list.length; i < num; i++) {
    let id = Math.floor(Math.random() * max + 1)
    while (~list.indexOf(id)) {
      id = Math.floor(Math.random() * max + 1)
    }
    list.push(id)
  }
  return list
}

