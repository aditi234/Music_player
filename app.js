const express=require('express');
const app=express();
const AppError=require('./utils/appError');
const rateLimit=require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });  
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

  
app.get('/api/v1/home', (req, res)=>{
    res.status(200).json({message: 'Hello from the server !',
    app: 'Music Player'});
});

const userRouter=require('./routes/UserRouter');
app.use('/api/v1/users',userRouter);

app.all('*',(req, res, next)=>{//all is for all the http methods i.e post, get , patch
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use((err, req, res, next)=>{
    err.statusCode=err.statusCode || 500;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})
module.exports=app;
