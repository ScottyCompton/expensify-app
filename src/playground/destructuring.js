

// OBJECT DESTRUCTURING


// const person = {
//     name: 'Andrew',
//     age: 26,
//     location: {
//         city: 'Philadelphia',
//         temp: 92
//     }

// }

// const {name: firstName = 'Anonymous', age} = person;
// const {city, temp:temperature} = person.location;

// console.log(`${firstName} is ${age}.`);
// if (city && temperature) {
//     console.log(`It's ${temperature} in ${city}`);
// }


// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name: 'Penguin'
//     }
// };

// const {name: publisherName = 'Self Published'} = book.publisher;

// console.log(publisherName);


// ARRAY DESTRUCTURING 


const address = ['1299 South Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];
//const [street, city, state, zip] = address;
const [, city, state = 'Texas'] = address;

console.log(`You are in ${city}, ${state}`);

console.clear();

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];

const [menuItem, , mediumPrice]  = item;

console.log(`A medium ${menuItem} costs ${mediumPrice}`);


