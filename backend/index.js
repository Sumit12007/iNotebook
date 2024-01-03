const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors')


connectToMongo();
const app = express()
const port = 3000

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))
app.use(express.json())

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`iNotebook Backend listening on port http://localhost:${port}`)
})