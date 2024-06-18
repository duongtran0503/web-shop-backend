const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes');
const db = require('./config');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
dotenv.config();
db.connect(process.env.MONGODB_URL);
const port = process.env.PORT || 3010;
const app = express();
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    })
);
app.use(bodyParser.json());
router(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
