// when the device is ready call the function onDeviceReady
document.addEventListener("deviceready", onDeviceReady, false);
var db;
//Make a database connection
function onDeviceReady() {
    // opening the database stored and storing the reference of it in the db variable.
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}

// this function will execute a query on the database and drop the table and all its contents when this command executes on the database.
function DropTable(selectedIndex) {
    //selectedIndex means the option you chose from the dialog box if you had chosen YES option selectedindex would be 1 otherwise it would be 2.
    if (selectedIndex == 1)
    {
            db.transaction(function (transaction) {
                var executeQuery = "DROP TABLE  IF EXISTS Property ";
                transaction.executeSql(executeQuery, [],
                    function (tx, result) { alert('Successfully deleted all data.'); },
                    function (error) { alert('Something went wrong. Please try again.'); }
                );
            });
   

        
    }
}
function DeleteData()
{
    // this will show a prompt to the user if he really wants to delete all the data. After selection of Option 1 ( YEs ) or Option 2 (NO) it will go into the drop table function.
    navigator.notification.confirm(
        "Are you sure you want to delete all." ,
        DropTable,
        'Delete all entries',
        'Yes,No'
    );
}