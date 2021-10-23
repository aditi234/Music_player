const express=require('express');
const app=express();
const AppError=require('./utils/appError');

app.use(express.json());
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
