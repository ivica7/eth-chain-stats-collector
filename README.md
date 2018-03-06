# eth-chain-stats-collector
A collection of scripts for collecting stats about the Ethereum chain usage.

This has been added to collect statistics for https://github.com/ethereum/EIPs/issues/911

1. Use geth to sync with the blockchain (full or fast)
1. ``npm install``
1. There is a bug in processing large tries. You'll need to apply this pull request first. https://github.com/medvedev1088/merkle-patricia-tree/pull/1/files
1. ``node collect/statsBytecode.js`` - this will take few hours. The data is written to ``data/``. You can skip this step and work with the data provided for block 5200035
1. ``node calc/codeDuplicationWaste.js data/stats.<NETWORK>.<BLOCK>.bytecode.json``
