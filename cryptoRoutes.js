// const express = require('express');
// const axios = require('axios');

// const cryptoRoutes = express.Router();

// // A route that fetches the current price of a cryptocurrency using its ID
// cryptoRoutes.get('/global/decentralized_finance_defi', async (req, res) => {
  
//   try {
//     const response = await axios.get(`https://api.coingecko.com/api/v3/global/decentralized_finance_defi`);
//     const defiMarketCap = response.data.defi_market_cap.usd;
//     res.json({ defiMarketCap });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Unable to fetch value' });
//   }
// });

// module.exports = cryptoRoutes;