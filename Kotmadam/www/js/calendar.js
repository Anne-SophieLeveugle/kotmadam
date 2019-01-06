var db = firebase.firestore();
var collection = []
db.collection("notes").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.data().date + doc.data().event)
        var datums = doc.data().date;
        var event = doc.data().event;
        console.log(datums)
        var b = { "date": datums, "note": [event] };
        collection.push(b);
        calendarCreate(datums, event);
    });
});


function calendarCreate(datums, event) {
    var events = collection;
    console.log(datums)
    var my_calendar = $("#dncalendar-container").dnCalendar({
        minDate: "2019-01-01",
        maxDate: "2020-01-01",
        defaultDate: "2019-01-01",
        monthNames: [ "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December" ],
        monthNamesShort: [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec' ],
        dayNames: [ 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo' ],
        dayNamesShort: [ 'Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo' ],
        dataTitles: { defaultDate: 'default', today : 'Vandaag' },
        notes: events,
        showNotes: true,
        startWeek: 'Maandag',
        dayClick: function(date, view) {
            console.log(date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate());
            document.getElementById("containerdiv").innerHTML = "<div class=\"noteAdd registreren\">\n" +
                "            <button onclick='sluitenAgenda()' class='sluitenbutton'>x</button><div id=\"datenote\"><label>Datum</label><br/><p id='textdate'>" + date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + "</p></div>\n" +
                "            <label>Event<br><input id='event' type='text' placeholder='naam' required/></label><button onclick='toevoegenAgenda()' class='toevoegen registrerenbut'>Toevoegen</button>";
        }
    });
    my_calendar.build();
};