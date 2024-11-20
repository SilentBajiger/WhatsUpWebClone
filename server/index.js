
import express  from 'express';
import ConnectDB from './database/db.js';
import route from './routes/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8000;



app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.use("/",route);

app.get("/",(req,res)=>{
    res.json("done");
})

ConnectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server listening on: ${PORT}`);
    });
});

