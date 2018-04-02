
var db;
//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}

function AddNoteClicked()
{
    var entry = document.getElementById("entry_ID").value;
    if (id == "")
    {
        alert("The ID field cannot be empty. Please enter an id to proceed.");
        return;

    }
    
    var notes = document.getElementById("NOTE").value;
    if (note == "") {
        alert("You must enter something in the notes field to proceed");
        return;

    }

    // updates the note field in the database wrt to the id.
    db.transaction(function (transaction) {
        var executeQuery = "UPDATE Property SET notes=? WHERE id=?";
        transaction.executeSql(executeQuery, [note, entry],
            //On Success
            function (tx, result) { alert('Note has been attached successfully'); },
            //On Error
            function (error) { alert('Something went Wrong'); });
    });


}
