// // 

// async function getProducts() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve ("promise 1 product fulfilled");
//         }, 2000);
//     });
// }

// async function getUsers() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve ("promise 2 user fulfilled");
//         }, 2000);
//     });
// }
// async function getImages() {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve ("promise 3 image fulfilled");
//         }, 2000);
//     });
// }   

// async function handlePromises() {
//     const promises = await Promise.all([getProducts(), getUsers(), getImages()]);
//     console.log(promises[0]);
//     console.log(promises[1]);
//     console.log(promises[2]);
// }

// handlePromises();




// const container = document.getElementById("user-container");

// async function fetchUsers() {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await response.json();


//     data.user.forEach((user , index, array) => {
//         container.innerHTML += `
//         <div style="border: 1px solid black; margin: 10px; padding: 10px;">
//             <h2>${user.name}</h2>
//             <p>Email: ${user.email}</p>
//             <p>Phone: ${user.phone}</p>
//             <p>Website: ${user.website}</p>
//         </div>
//         `;
//     });
// }
// fetchUsers();