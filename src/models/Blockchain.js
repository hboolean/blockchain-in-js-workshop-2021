// Blockchain
class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含 
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name) {
    this.name = name;
    this.genesis = null;
    this.block = {};
  }

  // 2. 定义 longestChain 函数
  /* 返回当前链中最长的区块信息列表*/
  longestChain() {
    let longestChain = [];
    let currentBlock = this.genesis;
    while (currentBlock) {
      longestChain.push(currentBlock);
      let nextBlocks = Object.values(this.blocks).filter(block => block.prevHash === currentBlock.hash);
      if (nextBlocks.length === 0) {
        break;
      }
      // Sort by height and the number of subsequent blocks
      nextBlocks.sort((a, b) => {
        let subsequentBlocksA = Object.values(this.blocks).filter(block => block.prevHash === a.hash);
        let subsequentBlocksB = Object.values(this.blocks).filter(block => block.prevHash === b.hash);
        return (b.height + subsequentBlocksB.length) - (a.height + subsequentBlocksA.length);
      });
      currentBlock = nextBlocks[0];
    }
    return longestChain;
  }
}


export default Blockchain;
