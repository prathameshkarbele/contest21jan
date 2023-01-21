const users = JSON.parse(localStorage.getItem("users")) || [];
let userId = 0;
function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const error = document.getElementById("error");

    // Name validation
    if (name.length < 2) {
        error.innerText = "Name should at least be 2 letter word.";
        error.style.color = "red";
        return false;
    }

    // Email validation
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        error.innerText = "Please enter a valid email address.";
        error.style.color = "red";
        return false;
    }

    // Check if email is already registered
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email) {
            error.innerText = "Email is already registered.";
            error.style.color = "red";
            return false;
        }
    }

    // Password validation
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
        error.innerText = "Passwords should have at least 1 capital letter, 1 small, 1 number and 1 special characters, but password cannot be the same as name or email.";
        error.style.color = "red";
        return false;
    }

    // Check if password is same as name or email
    if (password === name || password === email) {
        error.innerText = "Password cannot be the same as name or email.";
        error.style.color = "red";
        return false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
        error.innerText = "Password and confirm password should be the same.";
        error.style.color = "red";
        return false;
    }

    // Generate a unique token for the user
    function generateToken() {
        let token = "";
        const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (let i = 0; i < 10; i++) {
            token += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].token === token) {
                token = generateToken();
                break;
            }
        }
        return token;
    }
    const token = generateToken();
    // Store user data
    userId++;
    const user = { id: userId, name: name, email: email, password: password, token: token };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    error.innerText = "User registered successfully!";
    error.style.color = "green";
    // Redirect to next page
    window.location.href = "login.html";
    return true;
}

function validateLoginForm() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error");

    // Check if email and password match a record in the users array
    let matchFound = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
            matchFound = true;
            break;
        }
    }

    if (!matchFound) {
        error.innerHTML = "Invalid email or password.";
        error.style.color = "red";
        return false;
    }
    error.innerHTML = "Login successful!";
    error.style.color = "green";
    // Redirect to next page

    window.location.href = "chatGpt.html";
    return true;
}

let sampleData = [
    {question: "What is a dog", answer: "Dog is a animal with 4 legs", imageLink: "https://thumbs.dreamstime.com/b/golden-retriever-dog-21668976.jpg"},
    {question: "What is a cat", answer: "Cat is a animal with 4 legs", imageLink: "https://www.purina.co.nz/sites/default/files/2020-12/Cat%20Hunting%20BehavioursTEASER.jpg"},
    {question: "What is a bird", answer: "Bird is a animal with 2 legs", imageLink: "https://media.istockphoto.com/id/183412466/photo/eastern-bluebirds-male-and-female.jpg?s=612x612&w=0&k=20&c=6_EQHnGedwdjM9QTUF2c1ce7cC3XtlxvMPpU5HAouhc="}
  ];
  
  function submitForm() {
    const questionInput = document.getElementById("questionInput");
    let inputQuestion = questionInput.value;
    let match = false;
    for (let i = 0; i < sampleData.length; i++) {
      if (inputQuestion === sampleData[i].question) {
        document.getElementById("answer").innerHTML = sampleData[i].answer;
        document.getElementById("image").src = sampleData[i].imageLink;
        match = true;
        break;
      }
    }
    if(!match) {
      document.getElementById("answer").innerHTML = "No match found";
      document.getElementById("image").src = "";
    }
  }
  
  
  function speakText() {
    const tokenInput = document.getElementById("tokenInput");
    let inputToken = tokenInput.value;
    let msg = new SpeechSynthesisUtterance(inputToken);
    window.speechSynthesis.speak(msg);
  }
// const users = JSON.parse(localStorage.getItem("users")) || [];
// let userId = 0;
// function validateForm() {
// const name = document.getElementById("name").value;
// const email = document.getElementById("email").value;
// const password = document.getElementById("password").value;
// const confirmPassword = document.getElementById("confirmPassword").value;
// const error = document.getElementById("error");
// // Name validation
// if (name.length < 2) {
//     error.innerText = "Name should at least be 2 letter word.";
//     error.style.color = "red";
//     return false;
// }

// // Email validation
// if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//     error.innerText = "Please enter a valid email address.";
//     error.style.color = "red";
//     return false;
// }

// // Check if email is already registered
// for (let i = 0; i < users.length; i++) {
//     if (users[i].email === email) {
//         error.innerText = "Email is already registered.";
//         error.style.color = "red";
//         return false;
//     }
// }

// // Password validation
// if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
//     error.innerText = "Passwords should have at least 1 capital letter, 1 small, 1 number and 1 special characters, but password cannot be the same as name or email.";
//     error.style.color = "red";
//     return false;
// }

// // Check if password is same as name or email
// if (password === name || password === email) {
//     error.innerText = "Password cannot be the same as name or email.";
//     error.style.color = "red";
//     return false;
// }

// // Confirm password validation
// if (password !== confirmPassword) {
//     error.innerText = "Password and confirm password should be the same.";
//     error.style.color = "red";
//     return false;
// }

// // Store user data
// userId++;
// const user = { id: userId, name: name, email: email, password: password };
// users.push(user);
// localStorage.setItem("users", JSON.stringify(users));
// error.innerText = "User registered successfully!";
// error.style.color = "green";
// window.location.href = "login.html";
// return true;
// }

// function validateLoginForm() {
// const email = document.getElementById("email").value;
// const password = document.getElementById("password").value;
// const error = document.getElementById("error");


// // Check if email and password match a record in the users array
// let matchFound = false;
// for (let i = 0; i < users.length; i++) {
//     if (users[i].email === email && users[i].password === password) {
//         matchFound = true;
//         break;
//     }
// }

// if (!matchFound) {
//     error.innerHTML = "Invalid email or password.";
//     error.style.color = "red";
//     return false;
// }
// error.innerHTML = "Login successful!";
// error.style.color = "green";
// window.location.href = "welcome.html";
// return true;
// }






// const users = [];
// let userId = 0;

// function validateForm() {
//     const name = document.getElementById("name").value;
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const confirmPassword = document.getElementById("confirmPassword").value;
//     const error = document.getElementById("error");

//     // Name validation
//     if (name.length < 2) {
//         // alert("Name should at least be 2 letter word.");
//         error.innerText = "Name should at least be 2 letter word.";
//         error.style.color = "red";
//         return false;
//     }

//     // Email validation
//     if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
//         // alert("Please enter a valid email address.");
//         error.innerText = "Name should at least be 2 letter word.";
//         error.style.color = "red";
//         return false;
//     }

//     // Check if email is already registered
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].email === email) {
//             // alert("Email is already registered.");
//             error.innerText = "Email is already registered.";
//             error.style.color = "red";
//             return false;
//         }
//     }

//     // Password validation
//     if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(password)) {
//         // alert("Passwords should have at least 1 capital letter, 1 small, 1 number and 1 special characters, but password cannot be the same as name or email.");
//         error.innerText = "Passwords should have at least 1 capital letter, 1 small, 1 number and 1 special characters, but password cannot be the same as name or email.";
//         error.style.color = "red";
//         return false;
//     }

//     // Check if password is same as name or email
//     if (password === name || password === email) {
//         // alert("Password cannot be the same as name or email.");
//         error.innerText = "Password cannot be the same as name or email.";
//         error.style.color = "red";
//         return false;
//     }

//     // Confirm password validation
//     if (password !== confirmPassword) {
//         // alert("Password and confirm password should be the same.");
//         error.innerText = "Password and confirm password should be the same.";
//         error.style.color = "red";
//         return false;
//     }

//     // Store user data
//     userId++;
//     // users.push({ id: userId, name: name, email: email, password: password });
//     // // alert("User registered successfully!");
//     // console.log(users)
//     const user = { id: userId, name: name, email: email, password: password };
//   users.push(user);
//   localStorage.setItem("users", JSON.stringify(users));
//     error.innerText = "User registered successfully!";
//         error.style.color = "green";
//     window.location.href = "login.html";
//     return true;
// }

//  users = JSON.parse(localStorage.getItem("users")) || [];

// function validateLoginForm() {
//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     const error = document.getElementById("error");

//     // Check if email and password match a record in the users array
//     let matchFound = false;
//     for (let i = 0; i < users.length; i++) {
//         if (users[i].email === email && users[i].password === password) {
//             matchFound = true;
//             break;
//         }
//     }

//     if (!matchFound) {
//         error.innerHTML = "Invalid email or password.";
//         error.style.color = "red";
//         return false;
//         }
//         error.innerHTML = "Login successful!";
//         error.style.color = "green";
        
//         // Redirect to home page
//         window.location.href = "home.html";
        
//         return true;

//   