var config = require("../config.json");

var Trie = require('merkle-patricia-tree/secure');
var levelup = require('levelup');
var leveldown = require('leveldown');
var RLP = require('rlp');
var assert = require('assert');
var utils = require('ethereumjs-util');
var BN = utils.BN;
var fs = require('fs');

//Connecting to the leveldb database
var db = levelup(leveldown(config.chaindataPath));

//Creating a trie object of the merkle-patricia-tree library
var trie = new Trie(db, config.blockStateRootHash);

//Creating a nodejs stream object so that we can access the data
var stream = trie.createReadStream()

var map = {}

var counter = 0;

function writeToFile() {
  var fileName = 'work/stats.'+config.network+'.'+config.blockNr+'.bytecode.json';
  console.log("saving to", fileName);
  fs.writeFileSync(fileName, JSON.stringify(map, null, 2));
}

stream.on('data', function (data){
  //console.log(data.key)

  if((counter % 10000) == 0) {
    console.log(counter);
    writeToFile(); 
  }

  var decodedVal = RLP.decode(data.value);
  // 0:nonce, 1:balance, 2:storageHash, 3:codeHash
  
  //console.log(decodedVal);
  
  var nonce = (new BN(decodedVal[0])).toString();
  var codeHash = utils.bufferToHex(new BN(decodedVal[3]));
 
  //console.log(codeHash);
 
  if(map.hasOwnProperty(codeHash)) {
    map[codeHash].counter++;
  }
  else {
    map[codeHash] = {};
    db.get(decodedVal[3], function (err, value) { 
      if(value) {
        //console.log(value, value.byteLength);
        map[codeHash].size = value.byteLength;
      }
    });
    map[codeHash].counter = 1;
  }

  counter++;
}).on('end', function () {
  console.log(map);
  writeToFile();
});


