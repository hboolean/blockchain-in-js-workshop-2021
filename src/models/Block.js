class Block {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含

  */
  constructor(blockchain,parentHash,nonce = sha256(new Date)) {
    this.blockchain = blockchain;
    this.nonce = nonce;
    this.parentHash = parentHash;
    this.hash=sha256(this.nonce+this.parentHash).toString()
  }
}

export default Block
