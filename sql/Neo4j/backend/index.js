const express = require('express');
const cors = require('cors');
const neo4j = require('neo4j-driver');

const app = express();
app.use(express.json());
app.use(cors());

const driver = neo4j.driver('neo4j+s://c6cc9bbc.databases.neo4j.io',
  neo4j.auth.basic('neo4j', 'RB6ymiQR1mW5zO_FiL8XMYoPiIHDhvhqP1Q0cRU7cZk')  
);

driver.verifyConnectivity()
  .then(() => console.log('✅ Connected to Neo4j Aura!'))
  .catch(err => console.error('❌ Connection failed:', err));


async function runQuery(query, params) {
  const session = driver.session();
  try {
    const result = await session.run(query, params);
    return result.records;
  } catch (err) {
    console.error('Error running query: ', err);
    throw err;
  } finally {
    await session.close();
  }
}


app.get('/api/cites', async (req, res) => {
  const { from, to } = req.query;
  console.log(from," ",to)
  const query = `
    MATCH path=(a:Paper {id: $from})-[:CITES*1..]->(b:Paper {id: $to})
    RETURN COUNT(path) AS pathCount
  `;
  try {
    const records = await runQuery(query, { from, to });
    const pathCount = records[0].get('pathCount').toNumber();
    res.json({ cites: pathCount > 0, count: pathCount });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.get('/api/classifications/:id', async (req, res) => {
  const paperId = req.params.id;
  const query = `
    MATCH (p:Paper {id: $paperId})-[:HAS_CLASSIFICATION]->(c:Classification)
    RETURN COLLECT(c.name) AS classifications
  `;
  try {
    const records = await runQuery(query, { paperId });
    const classifications = records[0].get('classifications');
    res.json({ paperId, classifications });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


app.post('/api/misc', async (req, res) => {
  const { cypher } = req.body;
  try {
    const records = await runQuery(cypher, req.body.params || {});
    const results = records.map(rec => rec.toObject());
    res.json({ results });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
