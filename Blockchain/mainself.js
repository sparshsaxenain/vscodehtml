const SHA256 = require('crypto-js/sha256');

class Block
{
    constructor(index,timestamp,data,previoushash = '')
    {
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previoushash=previoushash;
        this.hash = this.GenerateHash();
    }

    GenerateHash()
    {
        return SHA256(this.index,this.timestamp,JSON.stringify(this.data),this.previoushash).toString();
    }
}

class Blockchain
{
    constructor()
    {
        this.chain = [this.generateGenesis()]
    }

    generateGenesis()
    {
        return new Block(0,"27/11/2021","{amount : empty}", "null");
    }

    getLatestBlock()
    {
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock)
    {
        newBlock.previoushash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.GenerateHash();
        this.chain.push(newBlock);
    }

}

let scoin = new Blockchain();
scoin.addBlock(new Block(1,"28/11/2021 @ 18:46:30",{amount : 5}));
scoin.addBlock(new Block(2,"29/11/2021 @ 22:00:49",{amount : 30}));
scoin.addBlock(new Block(3,"30/11/2021 @ 11:54:20",{amount : 34}));

console.log(JSON.stringify(scoin,null,4));