if(process.argv.length != 3) {
  console.log("Filename missing.")  
  process.exit(1);
}

var paramFileName = process.argv[2];

var fs = require('fs');

var map = JSON.parse(fs.readFileSync(paramFileName, 'utf8'));

var aggBytecodeCount = 0;
var aggBytecodeSizeSum = 0;
var aggBytecodeWithDuplicatesCount = 0;
var aggWastedBytes = 0;

for(h in map) {
  var v = map[h];

  if(v.hasOwnProperty("size")) {
    aggBytecodeCount++;
    aggBytecodeSizeSum += v.counter * v.size;
    if(v.counter > 1) {
      aggBytecodeWithDuplicatesCount++;
      aggWastedBytes += (v.counter-1)*v.size;
    }
  }
  else {
    console.log("EOAs?", "counter", v.counter, "Code Hash:", h);
  }
}

console.log("             Wasted Bytes:", aggWastedBytes, "/", aggBytecodeSizeSum, "-", aggWastedBytes*100/aggBytecodeSizeSum, "%");
console.log("Bytecodes with duplicates:", aggBytecodeWithDuplicatesCount, "/", aggBytecodeCount, "-", aggBytecodeWithDuplicatesCount*100/aggBytecodeCount, "%");

var gasWasted = aggWastedBytes * 200;
console.log("               Gas Wasted:", gasWasted);
