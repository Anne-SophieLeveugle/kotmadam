var db = firebase.firestore();
var collection = "";
db.collection("posts").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        collection = collection + '<li><img class=\"bannersocial\" src='+ doc.data().imagePath +' alt=\"banner\"/><h3>'+ doc.data().username +'</h3><p>'+ doc.data().post +'</p></li>';

        document.getElementById("socials").innerHTML = collection;
    });
});