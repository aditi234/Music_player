const express=require('express');
const app=express();
const AppError=require('./utils/appError');
const rateLimit=require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const cors = require('cors');

//app.use(cors());
app.use(helmet());
app.use(express.json());
//app.options('*', cors());

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

const userRouter=require('./routes/UserRouter');
app.use('/api/v1/users',userRouter);



app.use((err, req, res, next)=>{
    err.statusCode=err.statusCode || 500;
    err.status = err.status || 'error'
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    })
})
app.all('*',(req, res, next)=>{//all is for all the http methods i.e post, get , patch
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
module.exports=app;
