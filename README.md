# eth-chain-stats-collector
A collection of scripts for collecting stats about the Ethereum chain usage.

# Preconditions
Note! There is a bug in processing large tries. You'll need to apply this pull request first.
https://github.com/medvedev1088/merkle-patricia-tree/pull/1/files

You will need to build up the leveldb database using geth.

# Running

1. Use geth to sync with the blockchain (full or fast)
1. ``npm install``
1. There is a bug in processing large tries. You'll need to apply this pull request first. https://github.com/medvedev1088/merkle-patricia-tree/pull/1/files
1. ``node collect/statsBytecode.js``
1. ``node calc/codeDuplicationWaste.js``
