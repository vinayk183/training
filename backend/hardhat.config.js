require("@nomiclabs/hardhat-waffle"); 
 
module.exports = { 
  solidity: '0.8.0', 
  networks: { 
    goerli: { 
      url: "https://goerli.infura.io/v3/525b88e0a6394df2828a7a45770ca118", 
      accounts: ["568fe2357354eb944b920ece1a2d8a94d48df8cba9947db1829a3a186344aeab"] 
 
    } 
  } 
}