import * as firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  };


  firebase.initializeApp(config);
  const db = firebase.database();

  export {firebase as default, db};



// db.ref('expenses').on('child_removed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (e) => {
//     console.log('Error!', e)
// });


// db.ref('expenses').on('child_changed', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (e) => {
//     console.log('Error!', e)
// });




// db.ref('expenses').on('child_added', (snapshot) => {
//     console.log(snapshot.key, snapshot.val());
// }, (e) => {
//     console.log('Error!', e)
// });


// /*
// const onValueChange = db.ref('expenses').on('value', (snapshot) =>{
//     const expenses = [];
//     snapshot.forEach((childSnapshot) => {
//         expenses.push({
//             id: childSnapshot.key,
//             ...childSnapshot.val()
//         })
//     });

//     console.log(expenses);
// },
// (e) =>{
//     console.log('error happened!', e)
// });
// */

//   db.ref('expenses').push({
//       description: 'Rent',
//       note: 'Gotta pay rent on monday',
//       amount: 57500,
//       createdAt: 12334567
//   });



// // const onValueChange = db.ref().on('value', (data) => {
// //     const rs = data.val();
// //     const name = rs.name;
// //     const company = rs.job.company;
// //     const title = rs.job.title;
    
// //     console.log(`${name} is a ${title} at ${company}`);
    
// // }, (e) => {
// //     console.log('Houston, we have a problem', e);
// // });


// //   const onValueChange = db.ref().on('value', (data) => {
// //     console.log(data.val());
// //   }, (e) => {
// //     console.log('Something bad happened', e);
// //   });

// //   setTimeout(() => {
// //     db.ref('age').set(29)
// //   }, 3500);
  

// //   setTimeout(() => {
// //     db.ref().off('value', onValueChange);
// //   }, 7000);
  

// //   setTimeout(() => {
// //     db.ref('age').set(30)
// //   }, 10500);
  



// //   db.ref('location').once('value')
// //     .then((data) => {
// //         const val = data.val();
// //         console.log(val);
// //     })
// //     .catch((e) => {
// //         console.log('Error fetching data', e)
// //     })




// //   db.ref().set({
// //       name: 'Scotty Compton',
// //       job: 'Computer geek',
// //       age: 53,
// //       location: {
// //           city: 'Dallas',
// //           state: 'Texas'
// //       }
// //   }).then(() => {
// //     console.log('Data is set');
// //   }).catch((e) => {
// //     console.log('This failed!', e)
// //   });

// //   db.ref().update({
// //     name: 'Freddy Mercury',
// //     age: 33,
// //     job: 'Manager',
// //     location: {
// //         city: 'Houston'
// //     }
// //   });

// // db.ref()
// //     .remove()
// //     .then(() => {
// //         console.log('removed isSingle data');
// //     })
// //     .catch((e) => {
// //         console.log('Houston, we have a problem...');
// //     });