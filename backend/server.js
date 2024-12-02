const express = require('express');
const si = require('systeminformation');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/system', async (req, res) => {
  try {
    const cpu = await si.currentLoad();
    const memory = await si.mem();
    const battery = await si.battery();
    const disk = await si.fsSize();
    const network = await si.networkStats();
    res.json({ cpu, memory, battery, disk, network });
  } catch (err) {
    res.status(500).send('Error fetching system data');
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
