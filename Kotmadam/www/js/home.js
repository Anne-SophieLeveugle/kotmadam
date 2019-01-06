var db = firebase.firestore();
var collection = "";
db.collection("users").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        collection = collection +
            '<li class="item"><a href="detail.html?'+ doc.id +'"> <img src='+ doc.data().image +' alt="profielfoto" class="profielfoto"> <h4 class="naam">'+ doc.data().naam +'</h4> <p class="kot">'+ doc.data().kot +'</p> </a> </li>';
        document.getElementById("buren").innerHTML = collection;
    });
    $(function() {
        $('.item').matchHeight();
    });
});