// Init web3 
window.addEventListener("load", function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== "undefined") {
      // Use Mist/MetaMask's provider
      window.web3 = new Web3(web3.currentProvider);
    } else {
      console.log("No web3? You should consider trying MetaMask!");
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    //   window.web3 = new Web3(
    //     new Web3.providers.HttpProvider("https://localhost:8545")
    //   );
    }

    

});

// Function for purchasing token
function purchaseToken(paymentNum) {

    // Check web3
    if (typeof web3 === "undefined") {
        console.log('Web3 is not ready yet');
        return;
    }

    // Get user account
    web3.eth.getAccounts(function(error, accounts) {
        if (!error) {

            userAccounts = accounts;
            console.log(userAccounts);
            
            // Init constract instance
            var icoInstance = web3.eth.contract(abi).at(contractAddr);
            console.log(icoInstance);
            

            // Show Token Contract
            icoInstance.token(function (error, result){
                console.log('token');
                console.log(result);
            });

            // Show Crowdsale Wallet
            icoInstance.wallet(function (error, result){
                console.log('wallet');
                console.log(result);
            });

            // Show Crowdsale Rate
            icoInstance.rate(function (error, result){
                console.log('rate');
                console.log(result);
            });

            // Show Crowdsale Total Raised Amount
            icoInstance.weiRaised(function (error, result){
                console.log('weiRaised');
                console.log(result);
            });


            // Listen to Event
            var icoEvent = icoInstance.TokenPurchase();
            icoEvent.watch(function(error, result){
                if(error){
                    console.log("Get event error:", error);
                } else {
                    console.log('Event! : ');
                    console.log(result);
                }
            });
            
            // Purchase
            var transaction = {value: web3.toWei(paymentNum, 'ether'),};
            icoInstance.buyTokens(userAccounts[0], transaction, function(error, result){
                console.log('transaction result(trans id) : ');
                console.log(result);
            });




        } else {
            console.error(error);
        }
    });

}

// User data
var userAccounts;

// 21:06 Shawn ICOCrowdsale: 0xd45b2db8706e0102a91609ae600bc9ed3c443b2d
// 21:06 Shawn Ｓrmin: 0xdea38f16724bc65a0949f4874ddbe319d9d3ddb5

// Crowdsale contract data
var contractAddr = '0xd45b2db8706e0102a91609ae600bc9ed3c443b2d'; 
var abi = [
    {
      "constant": true,
      "inputs": [],
      "name": "rate",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "weiRaised",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "wallet",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_beneficiary",
          "type": "address"
        }
      ],
      "name": "buyTokens",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "token",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "payable": true,
      "stateMutability": "payable",
      "type": "fallback"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "purchaser",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "beneficiary",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "value",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "TokenPurchase",
      "type": "event"
    }
  ];

  var tokenAbi = [
    {
      "constant": true,
      "inputs": [],
      "name": "name",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "totalSupply",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "balances",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "decimals",
      "outputs": [
        {
          "name": "",
          "type": "uint8"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        },
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "allowed",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "symbol",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_initialAmount",
          "type": "uint256"
        },
        {
          "name": "_tokenName",
          "type": "string"
        },
        {
          "name": "_decimalUnits",
          "type": "uint8"
        },
        {
          "name": "_tokenSymbol",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_from",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_to",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Transfer",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "_owner",
          "type": "address"
        },
        {
          "indexed": true,
          "name": "_spender",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "Approval",
      "type": "event"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_from",
          "type": "address"
        },
        {
          "name": "_to",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "transferFrom",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_spender",
          "type": "address"
        },
        {
          "name": "_value",
          "type": "uint256"
        }
      ],
      "name": "approve",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_owner",
          "type": "address"
        },
        {
          "name": "_spender",
          "type": "address"
        }
      ],
      "name": "allowance",
      "outputs": [
        {
          "name": "remaining",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];








/////////////////////////////////////////////////////////////////////////

// only for test
// Sending token to crowdsale address  
function trans() {

    var tokenAddr = '0x6a118a059eb81ac8440c4d96d8619c596c201e09';
    var targetAddr = '0xbac073a8ecd4bd43f0f4390d994c1b8615610905';

    web3.eth.getAccounts(function(error, accounts) {
        if (!error) {

            userAccounts = accounts;
            console.log(userAccounts);
            
            var tokenInstance = web3.eth.contract(tokenAbi).at(tokenAddr);
            console.log(tokenInstance);

            tokenInstance.balanceOf(userAccounts[0], function(error, result){
                console.log('balance of : ');
                console.log(result);
            });

            tokenInstance.transfer(targetAddr, 1000, function(error, result){
                console.log('transfer done : ');
                console.log(result);
            });
        }
    });
}

// only for test
// Check balance of a certain address
function balanceOf(account) {

    var tokenInstance = web3.eth.contract(tokenAbi).at('0x6a118a059eb81ac8440c4d96d8619c596c201e09');
    console.log(tokenInstance);
    
    tokenInstance.balanceOf(account, function(error, result){
        console.log('balance of ' + account + ' : ');
        console.log(result);
    });
}
