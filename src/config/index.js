const mongoose = require('mongoose');
const connect = (url) => {
    try {
        mongoose.connect(url).then(() => console.log('Connected!'));
    } catch (error) {
        console.log('connect fald!');
    }
};
module.exports = { connect };
