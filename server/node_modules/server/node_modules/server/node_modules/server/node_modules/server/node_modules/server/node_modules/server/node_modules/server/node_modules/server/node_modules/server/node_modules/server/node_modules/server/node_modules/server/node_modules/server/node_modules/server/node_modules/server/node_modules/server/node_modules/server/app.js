const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRouters = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// global middleWare for all router
app.use('*', authMiddleware); 


app.use('/api/auth', authRouters);

const PORT = 3000;
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
