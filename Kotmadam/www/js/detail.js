var url = document.URL;
var id = url.substring(url.lastIndexOf('?') + 1);
var db = firebase.firestore();
db.collection("users").doc(id).get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data());
        document.getElementById("contentdetail").innerHTML =
            '<img src="img/profielfoto.png" alt="profielfoto" class="profielfoto profielfotodetail">\n' +
            '    <h1>'+ doc.data().naam +'</h1>\n' +
            '    <p>'+ doc.data().kot +'</p>\n' +
            '    <div class="gegevens">\n' +
            '        <ul>\n' +
            '            <li><a href="tel:'+ doc.data().telefoon +'">Bel</a></li>\n' +
            '            <li><a href="mailto:'+ doc.data().email +'">Mail</a></li>\n' +
            '        </ul>\n' +
            '    </div>';
    } else {
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});