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

// Google Login
const googleButton= document.querySelector('#googleLogin');
googleButton.addEventListener('click', (e)=> {
    const provider= new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result)=> {
            console.log("google sign in");
            signinForm.reset();
            $('#signinModal').modal('hide');
            console.log(result);
        })
        .catch((err)=> {
            console.log(err);
        });
});


// Posts
const posts= document.querySelector('.posts');
const setupPosts= (data)=> {
    if(data.length){
        let html= '';
        data.forEach(doc => {
            html+= `
                <li class="list-group-item list-group-item-action">
                    <h3>${doc.data().title}</h3>
                    <p>${doc.data().description}</p>
                </li>
            `;
        });

        posts.innerHTML= html;
    }
    else{
        posts.innerHTML= '<p class="text-center">there are not publications</p>'
    }
};


// events
auth.onAuthStateChanged(user=> {
    if(user){
        const postsRef= db.collection('posts');
        postsRef.get().then((snapshot)=> {
            setupPosts(snapshot.docs);
        });
    }
    else{
        posts.innerHTML= '';
    }
})