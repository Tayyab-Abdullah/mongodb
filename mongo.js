const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection Failed ', err.message));


const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean
});


const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        name: 'ReactJS Course',
        author: 'Abdullah',
        tags: ['JavaScript', 'frontend'],
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses(){
    const courses = await Course.find({ author: 'Tayyab'}); 
    // we can alse use .limit().sort({name: 1 or -1}) etc
    console.log(courses);
}

getCourses();
