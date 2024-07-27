const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
 .then(() => console.log('Connected to database'))
 .catch((err) => console.error('Connection Failed:', err.message));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: Date,
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourse(){
    return await Course.find({isPublished: true, tags: 'backend' })
     .sort({name: 1})
     .select({name: 1, author: 1});
}

async function display(){
    const courses = await getCourse();
    console.log(courses);
}

display();