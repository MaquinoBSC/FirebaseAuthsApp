//signUp
const signForm= document.querySelector('#signup-form');

signForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const email= document.querySelector('#signup-email').value;
    const password= document.querySelector('#signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential)=> {
            console.log("signup");
            signForm.reset();
            $('#signupModal').modal('hide');
        });
});


//signIn
const signinForm= document.querySelector('#login-form');

signinForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const email= document.querySelector('#login-email').value;
    const password= document.querySelector('#login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredentials)=> {
            console.log(userCredentials);
            signinForm.reset();
            $('#signinModal').modal('hide');
        });
});


// Logout
const logout= document.querySelector('#logout');
logout.addEventListener('click', (e)=> {
    e.preventDefault();

    auth.signOut().then(()=> {
        console.log("Sign Out");
    });
});