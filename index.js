const express = require('express');
const cluster = require('cluster');
const yargs = require('yargs')(process.argv.slice(2));

if(cluster.isPrimary){
    console.log(`I am the primary process with pid ${process.pid}`);
    cluster.fork();
} else{
    console.log(`I am worker proces with pid ${process.pid}`);
    const args = yargs

    .default({PORT: 8080})
    .alias({p: 'PORT'})
    .argv;

    const PORT = args.PORT;

    let visitas = 0;

    const delay = (duration) => {
        const startTime = Date.now();
        while(Date.now() - startTime < duration){
            //event loop is block
        };
    };


    const app = express();

    app.get('/' , (req , res) => {
        res.send(`Nro de visitas en ${process.pid} => ${++visitas}`);
    });

    app.get('/timer', (req, res) => {
        delay(8000);
        res.send(`[${process.pid}] Ding timer`);
    });

    app.listen(PORT , () => {
        console.log(`Server is up and running on http://localhost:${PORT}`);
    });
}

