const app = require('./app');
const PORT = process.env.PORT || 3000 ;
const server = app.listen(PORT,()=>{
    console.log(`Server listening on the http://localhost:${PORT}`);
});

module.exports = server;