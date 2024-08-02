
// Modelling Relationships


// Using references (Normalization)

let author = {
    name: 'Mosh'
}

let course1 = {
    author: 'id'
}


// Using embeded Documents (Denormalization)

let course = {
    author: {
        name: 'Mosh'
    }
}