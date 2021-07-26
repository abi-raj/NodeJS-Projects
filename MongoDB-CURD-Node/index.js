const mongodb = require('mongodb').MongoClient;


const url = 'mongodb://localhost:27017/crud';
mongodb.connect(url, async function (err, client) {
    const db = client.db();
    await create(db);
    console.log('created');
    await update(db);
    console.log('updated');
    await read(db);

    
    await deleteDoc(db);
    console.log('deleted');
    client.close();

});


const create = async (db) => {
    const basicCollection = db.collection('basic');
    const basicData = {
        name: 'Jin',
        age: 23,
        address: 'Beijing'
    };
    basicCollection.insertOne(basicData, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
const read = async (db) => {
    const basicCollection = db.collection('basic');
    const res = await basicCollection.find().toArray();
    console.log(res);
}
const update = async (db) => {
    const basicCollection = db.collection('basic');
    const updateData = {
        $set: {
            name: 'John'
        }
    };
    basicCollection.updateOne({
        name: 'Jin'
    }, updateData, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
        }
    });
}
const deleteDoc = async (db) => {
    const basicCollection = db.collection('basic');
    const res = await basicCollection.deleteOne({
        name: 'John'
    });
    console.log(res);
}