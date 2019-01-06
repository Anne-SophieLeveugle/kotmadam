var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};


$('.nav-list').on('click', 'li', function() {
    $('.nav-list li.active').removeClass('active');
    $(this).addClass('active');
});


function filterFuntion() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("buren");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("h4")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}


function toevoegenAgenda () {
    var date = document.getElementById("textdate").innerHTML;
    var event = document.getElementById("event").value;

    if (!event){
        return alert('Vul een event in')
    }

    var db = firebase.firestore();

    db.collection("notes").add({
        date: date,
        event: event,
        timestampsInSnapshots: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            window.open('agenda.html', '_system');
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });

}


function sluitenAgenda () {
    document.getElementById("containerdiv").innerHTML = "";
}


function checkinput (id){
    console.log(id)
    if( document.getElementById(id).files.length == 0 ){
        console.log("no files selected");
    } else {
        console.log("files selected");
        document.getElementById("plusje").style.backgroundColor = "lightgrey";
    }
}


function checkinputregister (id){
    console.log(id)
    if( document.getElementById(id).files.length == 0 ){
        console.log("no files selected");
    } else {
        console.log("files selected");
        document.getElementById("imagebutton").style.backgroundColor = "lightgrey";
    }
}


function addPost() {
    var postinputs = document.getElementById("postinput").value;
    var imageinputs = document.getElementById("photos").value;
    if (!imageinputs){
        return alert('Voeg een foto toe')
    }
    if (!postinputs) {
        return alert('Schrijf een bericht')
    }
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            var users = firebase.auth().currentUser.displayName;
            console.log(users)

        } else {
            console.log("no user is signed in")
        }
        addToPost();
    });

}

function setImage(downloadUrl) {
    var postinputs = document.getElementById("postinput").value;
    var users = firebase.auth().currentUser.displayName;
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    var db = firebase.firestore();

    db.collection("posts").add({
        post: postinputs,
        imagePath: downloadUrl,
        username: users,
        timestampsInSnapshots: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            window.open('social.html', '_system');
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
}

function addToPost() {
    const ref = firebase.storage().ref();
    const file = $('#photos').get(0).files[0];
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
                setImage(downloadURL);
            });
        })
}

function addToDatabase(downloadURL) {
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
    var db = firebase.firestore();
    var naam = document.getElementById("naam").value;
    var email = document.getElementById("mail").value;
    var telefoon = document.getElementById("tel").value;
    var kot = document.getElementById("kot").value;

    db.collection("users").add({
        naam: naam,
        email: email,
        image: downloadURL,
        telefoon: telefoon,
        kot: kot,
        timestampsInSnapshots: firebase.firestore.FieldValue.serverTimestamp()
    })
        .then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
            window.location = 'home.html'; //After successful login, user will be redirected to home.html
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
}