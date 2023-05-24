// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name;//链的名字
    this.genesis = null;//链的创世区块
    this.block = {};//一个空对象，用于存储链中所有的区块
  }

  // 2. 定义 longestChain 函数
  /* 返回当前链中最长的区块信息列表*/
  longestChain() {
    let longestChain = [];//创建一个数组，用于存储最长链
    let currentBlock = this.genesis;//初始化当前区块为初始区块
    while (currentBlock) {//当前区块不为null时进入循环
      longestChain.push(currentBlock);//把当前区块添加到最长链中
      //获取所有区块的值然后过滤出父区块的哈希值为当前区块哈希值的区块
      //即：寻找下一个可能的区块
      let nextBlocks = Object.values(this.blocks).filter(block => block.prevHash === currentBlock.hash);
      //如果没有找到则跳出循环
      if (nextBlocks.length === 0) {
        break;
      }
      // Sort by height and the number of subsequent blocks
      //如果找到了多个可能的区块则通过他们的高度和后续区块的数量进行比较
      nextBlocks.sort((a, b) => {
        let subsequentBlocksA = Object.values(this.blocks).filter(block => block.prevHash === a.hash);
        let subsequentBlocksB = Object.values(this.blocks).filter(block => block.prevHash === b.hash);
        return (b.height + subsequentBlocksB.length) - (a.height + subsequentBlocksA.length);
      });
      //排序后，将currentBlock更新为排序后的nextBlocks数组的第一个元素，
      //即具有最高高度和最多后续区块的区块。
      currentBlock = nextBlocks[0];
      //一直循环，直到找不到下一个区块，则找到了最长的链
    }
    return longestChain;
  }
}


export default Blockchain;
