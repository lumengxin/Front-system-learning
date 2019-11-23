show dbs;
use practice;
show collections;
db.users.find({});
db.users.remove({name: "zhbajie"},true);
db.users.insert({name:"tangseng"});

for (var i=1; i<=20000; i++){
    db.numbers.insert({num: i});
}
db.numbers.find();
db.numbers.remove({});

var arr = [];
for (var i=1; i<=20000; i++) {
  arr.push({num:i});
}
db.numbers.insert(arr);

db.numbers.find({num:500});
db.numbers.find({num:{$gt:500}});
db.numbers.find({num:{$gt:40, $lt:50}});
db.numbers.find().limit(10);
db.numbers.find().skip(10).limit(10);

db.game.find();
db.emp.find();
db.emp.find({$or:[{sal:{$lt:1000}},{sal:{$gt:2500}}]});
db.emp.find({mgr:7698});
db.emp.updateMany({sal:{$lte:1000}},{$inc:{sal:400}});


