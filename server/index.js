import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());

/* ===========================
   Helper: Yahoo fetch
=========================== */
async function fetchYahoo(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Yahoo error ${res.status}`);
  return res.json();
}

/* ===========================
   SEARCH (AUTOCOMPLETE)
=========================== */
app.get('/api/search', async (req, res) => {
  const q = req.query.q;

  if (!q || q.length < 2) {
    return res.json([]);
  }

  try {
    const data = await fetchYahoo(
      `https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(
        q
      )}&quotesCount=7&newsCount=0`
    );

    const results = (data.quotes || [])
      .filter(item => item.symbol?.endsWith('.NS'))
      .map(item => ({
        symbol: item.symbol,
        name: item.shortname || item.longname || item.symbol,
        type: item.quoteType
      }));

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* ===========================
   GENERIC ASSET FETCH
=========================== */
app.get('/api/asset/:symbol', async (req, res) => {
  const symbol = req.params.symbol;

  try {
    const data = await fetchYahoo(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    );
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);
