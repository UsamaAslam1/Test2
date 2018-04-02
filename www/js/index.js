
document.addEventListener("deviceready", onDeviceReady, false);
var db;
//Make a database connection
function onDeviceReady() {
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}

function DropTable(selectedIndex) {
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

    navigator.notification.confirm(
        "Are you sure you want to delete all." ,
        DropTable,
        'Delete all entries',
        'Yes,No'
    );
}