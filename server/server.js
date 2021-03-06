const app=require('./app');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({ path: './config.env'});
const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con =>{
    console.log('DB connection successful')
});


const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
  