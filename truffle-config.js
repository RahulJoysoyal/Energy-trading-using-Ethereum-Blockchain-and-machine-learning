module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: "./src/contract",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    develop: {
      port: 7545
    },
    gas: 2100000,
    gasPrice: 8000000000
  },
  compilers: {
    solc: {
      version: '0.8.13',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};
