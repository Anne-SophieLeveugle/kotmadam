var app = document.querySelector('#app');
function signIn() {
    var email = document.getElementById("mail").value;
    var password = document.getElementById("pasword").value;
    if (!email) {
        return alert('email is verplicht')
    }
    if (!password) {
        return alert('wachtwoord is verplicht')
    }
    firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            alert('signIn error', errorMessage);
        }).then(function() {
        window.location = 'home.html';
    });
};


function register() {
    var email = document.getElementById("mail").value;
    var password = document.getElementById("pasword").value;
    var tel = document.getElementById("tel").value;
    var name = document.getElementById("naam").value;
    var kot = document.getElementById("kot").value;
    var imageinputs = document.getElementById("photo").value;

    if (!imageinputs){
        return alert('Voeg een foto toe')
    }
    if (!name){
        return alert('naam is verplicht')
    }
    if (!email) {
        return alert('email is verplicht')
    }
    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (re.test(email)){
    }else {
        return alert('email is niet correct')
    }
    if (!password) {
        return alert('wachtwoord is verplicht')
    }
    if (!tel) {
        return alert('telefoonnummer is verplicht')
    }
    var regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    if (regex.test(tel)) {
    } else {
        return alert('telefoonnummer is niet correct')
    }
    if (!kot) {
        return alert('kot is verplicht')
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            var user = firebase.auth().currentUser;

            user.updateProfile({
                displayName: name,
            }).then(function() {
                console.log(user);
                uploadFile();
            }, function(error) {
            });
        }, function(error) {
            var errorCode = error.code;
            if (errorCode == 'auth/weak-password') {
                alert('Het wachtwoord is te kort');
            } else {
                console.error(error);
            }
        });
};


function signOut() {
    alert("logged out")
    firebase.auth().signOut();
    window.location='index.html';
};


function uploadFile() {

    const ref = firebase.storage().ref();
    const file = $('#photo').get(0).files[0];
    const name = (+new Date()) + '-' + file.name;
    const task = ref.child(name).put(file);
    task
        .then(function() {
            console.log(task)
    })
        .catch((error) => {
            switch (error.code) {
                case 'storage/unauthorized':
                    break;
                case 'storage/canceled':
                    break;
                case 'storage/unknown':
                    break;
            }
        })
        .then(function () {
            task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log('File available at', downloadURL);
                addToDatabase(downloadURL);
            });
        })

}