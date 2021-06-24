const http = require('./app/app');
const port = 10106;

http.listen(port,  () => {
  console.log(`Express server listening on port ${port}`);
});

