const contractAddress = "0x7a9F1b6CEE15692b643dCeed919872D02a467cDE";

const contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "price",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			}
		],
		"name": "BidMade",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "price",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			}
		],
		"name": "BidRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "price",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "userID",
				"type": "uint32"
			}
		],
		"name": "Deal",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint32",
				"name": "price",
				"type": "uint32"
			},
			{
				"indexed": false,
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			},
			{
				"indexed": true,
				"internalType": "uint32",
				"name": "userID",
				"type": "uint32"
			}
		],
		"name": "DealRevoked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "consumer",
				"type": "address"
			}
		],
		"name": "consumerDeregistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "consumer",
				"type": "address"
			}
		],
		"name": "consumerRegistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			}
		],
		"name": "producerDeregistered",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "producer",
				"type": "address"
			}
		],
		"name": "producerRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "aproducer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "aday",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "aprice",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "aenergy",
				"type": "uint64"
			}
		],
		"name": "buy_energy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bproducer",
				"type": "address"
			}
		],
		"name": "deregisterProducer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "aday",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "apriceMax",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "apriceMin",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "amaxenergy",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "aminenergy",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "atimestamp",
				"type": "uint64"
			}
		],
		"name": "offer_energy",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "aconsumer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "auserID",
				"type": "uint32"
			}
		],
		"name": "registerConsumer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "bproducer",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "buserID",
				"type": "uint256"
			}
		],
		"name": "registerProducer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "asks",
		"outputs": [
			{
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "price",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			},
			{
				"internalType": "uint32",
				"name": "userID",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"name": "asksIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "consumers",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAsksCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "userID",
				"type": "uint32"
			}
		],
		"name": "getAskUserID",
		"outputs": [
			{
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "price",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "aproducer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "aday",
				"type": "uint32"
			}
		],
		"name": "getBidByProducerAndDay",
		"outputs": [
			{
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "maxprice",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBidsCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint32",
				"name": "aday",
				"type": "uint32"
			}
		],
		"name": "getMinPrice",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "producers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "idx",
				"type": "uint256"
			}
		],
		"name": "showBids",
		"outputs": [
			{
				"internalType": "address",
				"name": "producer",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "day",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "maxprice",
				"type": "uint32"
			},
			{
				"internalType": "uint64",
				"name": "energy",
				"type": "uint64"
			},
			{
				"internalType": "uint64",
				"name": "timestamp",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export {contractABI,contractAddress};