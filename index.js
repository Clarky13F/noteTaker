const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const path = require('path');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});