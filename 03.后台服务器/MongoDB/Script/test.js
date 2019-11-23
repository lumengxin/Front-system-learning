show dbs;
use test;
show collections;
db.stus.find();

db.stus.find({age:14})

db.stus.find();

db.stus.insert({_id:"001",name:"butong",age:22});

db.stus.update({name:'li'},{age:22});
db.stus.update(
    {"_id" : ObjectId("5dd3f9bc666a696fa55560c0")},
    {$set: {
        gender:"男",
        address:"liushhe"
     }}
);

db.stus.remove({_id:"001"});
db.stus.remove({age:22});
db.stus.insert({_id:"hello",name:"121",age:32});
db.stus.remove({name:'121'});
