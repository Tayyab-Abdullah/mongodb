const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dataValid')
 .then(() => console.log('Connected to Database....'))
 .catch((err) => console.log('Connection Failed to MongoDB: ', err.message));



const courseSchema = new mongoose.Schema({
    name: {type: String, required: true},
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    isPublished: Boolean,
    price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse(){
    const course = new Course({
        // name: 'NodeJs Course',
        author: 'Tayyab',
        tags: ['Backend', 'JavaScript'],
        isPublished: true,
        price: 2000
    });

    try{
        await course.validation();
        const result = await course.save();
        console.log(result);
    }
    catch (ex){
        console.log(ex.message);
    }
}

createCourse();