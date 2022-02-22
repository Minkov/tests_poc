import * as compose from 'docker-compose';
import * as path from 'path';

const sleep = (seconds) => new Promise((resolve) => {
    setTimeout(() => {
        resolve(null);
    }, seconds * 1000)
});

const setupDb = () => compose
    .upMany(['db', 'app'], {
        cwd: path.join(__dirname, '..'),
        log: false,
    })
    .then(() => {
        console.log(' --- up ---');
        return sleep(10);
    })
    .then(() => {
        console.log(' --- running restore ---');
        return compose.exec('db', '/bin/bash /queries/restore/restore.sh');
    })
    .then(() => {
        console.log(' --- complete restore ---');
    }, (err) => {
        console.log(err);
    });

const dropDb = () => {
    console.log(' --- down ---');
    return compose.down();
};

export {
    setupDb,
    dropDb,
};