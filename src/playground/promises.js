const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({
            name: 'Scotty',
            age: 'Too old'
        });
        reject('Something went wrong')
    }, 1500)
    
});
console.clear();
console.log('before')

promise.then((data) => {
    console.log('1',data);
    return {...data, height:"5'11''"}
}).then((data2) => {
    console.log('does this run?', data2);
}).catch((error) =>{
    console.log('error: ', error);
});



console.log('after');



const doAsync = new Promise((resolve, reject) => {
    // some async action going on here then... 
        resolve(
            // returns some data if async action is successful
        );

        reject(
            // returns error data if async action failed.
        );
});


doAsync.then((goodData) => {
    // do something wit the data returned by resolve
    data = goodData;
    return data;
}).then((goodData2) =>{
    // goodData2 is value of 'data' returned by the first 'then()'
    // do something with data returned by previous then
    data = goodData2;
    return data;
}).catch((error) => {
    // do something with data or value or error returned by reject.
    console.log('there was an error', error);
}).finally()