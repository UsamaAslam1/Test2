
var db;
//Open Database Connection
document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // opening the database stored and storing the reference of it in the db variable.
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}

// this function will be clicked if the user clicked save in Add a note page.
function AddNoteClicked()
{
    // checking if neither the id field nor the note field should be empty
    var entry = document.getElementById("entry_ID").value;
    if (entry == "")
    {
        alert("The ID field cannot be empty. Please enter an id to proceed.");
        return;

    }
    
    var notes = document.getElementById("NOTE").value;
    if (notes == "") {
        alert("You must enter something in the notes field to proceed");
        return;

    }

    // updates the note field in the database wrt to the id.
    db.transaction(function (transaction) {
        var executeQuery = "UPDATE Property SET notes=? WHERE id=?";
        transaction.executeSql(executeQuery, [notes, entry],
            //On Success
            function (tx, result) { alert('Note has been attached successfully'); },
            //On Error
            function (error) { alert('Something went Wrong'); });
    });


}
