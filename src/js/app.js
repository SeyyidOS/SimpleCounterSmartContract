// Your contract ABI and address
const contractABI = [
    {
        "inputs": [],
        "name": "count",
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
        "inputs": [],
        "name": "getCount",
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
        "inputs": [],
        "name": "incrementCounter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];  
const contractAddress = '0x5C4D54ff5B15c8F119c3d86838eec0b1AC70F46C'; // Replace with your actual contract address

let myContract;
let accounts;

async function startApp() {
  myContract = new web3.eth.Contract(contractABI, contractAddress);
  accounts = await web3.eth.getAccounts();

  // Call the read function from the smart contract
  updateCounterDisplay();

  // Set up a click listener for your button
  document.getElementById('increment-btn').addEventListener('click', incrementCounter);
}

async function updateCounterDisplay() {
  const count = await myContract.methods.getCount().call();
  document.getElementById('counter-value').innerText = count.toString();
}

async function incrementCounter() {
  try {
    await myContract.methods.incrementCounter().send({ from: accounts[0] });
    updateCounterDisplay(); // Update the UI with the new counter value
  } catch (error) {
    console.error(error);
  }
}

window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);

    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      // Accounts now exposed
      startApp();
    } catch (error) {
      console.error("User denied account access");
    }
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
  }
});

// Reload the page if network changes
ethereum.on('chainChanged', (_chainId) => window.location.reload());

// Handle account changes
ethereum.on('accountsChanged', function (newAccounts) {
  accounts = newAccounts;
  updateCounterDisplay();
});
