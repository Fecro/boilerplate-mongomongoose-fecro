require('dotenv').config();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const { Schema } = mongoose;
const personSchema = new Schema({
  name : { type : String, required : true },
  age : Number,
  favoriteFoods : [String]
});

let Person = mongoose.model('Person', personSchema);

var arrayOfPeople = [
  {name: "Franklin Custodio", age: 36, favoriteFoods:["Pizza", "Lasagna"]},
  {name: "Marian Fisco", age: 32, favoriteFoods:["Sushi", "Helado"]},
  {name: "Kayleen Custodio", age: 10, favoriteFoods:["Pasta"]}
];

const createAndSavePerson = (done) => {
  person = new Person({
    name: "Franklin Custodio",
    age: 84,
    favoriteFoods: ["Pizza", "Lasagna"]
  });
  person.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, people) => {
    if (err) return console.error(err);
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, foodFound) => {
    if (err) return console.error(err);
    done(null, foodFound);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, (err, personIdFound) => {
    if (err) return console.error(err);
    done(null, personIdFound);
  });

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId}, (err, personIdFound) => {
    if (err) return console.error(err);
    personIdFound.favoriteFoods.push(foodToAdd);
    personIdFound.save((err,updatePerson) => {
      if (err) return console.error(err);
      done(null, updatePerson);  
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updateDoc) => {
    if (err) return console.error(err);
    done(null, updateDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id: personId}, (err, personFound) => {
    if (err) return console.error(err);
    done(null, personFound);
  });
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err,ppRemove) =>{
    if (err) return console.error(err);
    done(null,ppRemove);
  });

  
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name:'asc'}).limit(2).select('-age').exec((err,ppFound) => {
    if (err) return console.error(err);
    done(null, ppFound);  
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
