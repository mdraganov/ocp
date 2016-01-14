// app.js
'use strict';

let express = require('express');
let config = require('./config/config');
let app = express();

require('./models');
require('./config/mongoose')(config.db);
require('./config/express')(app);
require('./config/passport')();

require('./routers')(app);

let port = process.env.PORT || 3001;

app.listen(port, () => console.log(`App running at port ${port}`));