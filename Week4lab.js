const mongoose = require('mongoose');

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    gender: String,
    salary: Number
});

const Person = mongoose.model(
    'modelname',
    PersonSchema,
    'personCollection'
);

async function insertOne(name, age, gender, salary) {

    const doc1 = new Person({
        name: name,
        age: age,
        gender: gender,
        salary: salary
    });

    const savedDoc = await doc1.save();

    console.log('One document inserted');

    return savedDoc;
}
async function insertMany() {

    const manypersons = [
        { name: 'SimonNHQ', age: 42, gender: 'Male', salary: 3456 },
        { name: 'NeeshaNN', age: 53, gender: 'Female', salary: 1000 },
        { name: 'MaryNHQ', age: 27, gender: 'Female', salary: 5402 },
        { name: 'MikeNJQ', age: 40, gender: 'Male', salary: 4519 }
    ];

    const result = await Person.insertMany(manypersons);

    console.log('Many documents inserted');
    console.log(result);
}

async function findAll() {
    console.log("Before query");

    const docs = await Person.find({})
        .sort({ salary: 1 })
        .select('name salary age')
        .limit(100);
        console.log("After query");

    console.log("Showing multiple documents");

    docs.forEach(doc => {
        console.log(doc.age, doc.name, doc.salary);
    });
     return docs;
}

async function findFemalesOver30() {

    const givenAge = 30;

    const docs = await Person.find({
        gender: { $regex: /^female$/i },
        age: { $gte: givenAge }
    })
    .sort({ salary: 1 })
    .select('name salary age')
    .limit(10);

    console.log(`Females aged ${givenAge} or above:`);

    docs.forEach(doc => {
        console.log(doc.age, doc.name, doc.salary);
    });
     return docs;
}

async function countDocuments() {

    const count = await Person.countDocuments();

    console.log("Total Documents Count:", count);
     return count;
}

async function deleteManyPersons() {

    const result = await Person.deleteMany({
        age: { $gte: 45 }
    });

    console.log("Deleted documents:", result);
}
async function updateManyPersons() {

    const result = await Person.updateMany(
        { gender: "Female" },
        { salary: 5555 }
    );

    console.log("Update successful");
    console.log(result);
    return result
}
module.exports = {
    insertOne,
    insertMany,
    findAll,
    findFemalesOver30,
    countDocuments,
    deleteManyPersons,
    updateManyPersons
};