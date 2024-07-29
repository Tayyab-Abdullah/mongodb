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

async function getCourse(){
    const courses = await Course.find(); 
    // we can alse use .limit().sort({name: 1 or -1}) etc
    console.log(courses);
}


async function updateCourse(id){
    const course = await Course.findById(id);
    if(!course) return;
    course.set({
        author: 'Mushtaq'
    });

    const result = await course.save();
    console.log(result);
}

//Operators in MongoDb are gt = greater than, eq = equals to, ne = not equals etc.
//We can user these as Course.find({price: { $gt: 20 }});



//Logical Operator and , or

// Course.find().or([{ name: "Tayyab" }, { isPublished: true }])
// Similar for and operator Course.find().and([{ filters }, {filters}])


// Regular Expression.
// Course.find({ author: /^Tayyab/i }); /Tayyab$/i /.*Tayyab.*/i

updateCourse('66a4b43d784944d1d240cc2e');
