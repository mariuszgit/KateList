const express = require('express');
const app = express();
const Datastore = require('nedb');

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}))

const db = new Datastore({filename: 'datastore.db'});
db.loadDatabase();

const port = process.env.PORT || 3000;
app.listen(3000, () => {
    console.log(`listening to port ${port}`);
})

app.get('/api', (request, response) => {
    db.find({}, (err, data) => {
        if (err) {
            request.end();
            return;
        }
        response.json(data);
    })
})

app.post('/api', (request, response) => {
    if (request.body.action == 'add') {
        console.log(request.body);
        response.json(request.body)
        db.insert(request.body)
    }
    if (request.body.action == 'remove') {
        db.remove({_id: request.body.id},{},function(err, removed_item) {
            console.log(removed_item);
        })
    }
})