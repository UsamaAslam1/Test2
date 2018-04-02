// Creating a global  variables

var db;
var money;
var r_name;
var selfie;
var bed_count;
var date_time;
var property;
var furnishing;
var notes;

document.addEventListener("deviceready", onDeviceReady, false);
// get db connection
function onDeviceReady() {
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}
function getPhoto() {
 
    //console.log(navigator.camera);
    
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 50,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
    
   
}
window.FilePath.resolveNativePath(imageURI, success, error);
function onPhotoURISuccess(imageURI) {

    
    window.FilePath.resolveNativePath(imageURI, success, error);
    

}
function error(){}
function success(imageURI)
{
    selfie = imageURI;
    var largeImage = document.getElementById('selfie');
    largeImage.src = imageURI;
}
function onFail(){}
function Add_to_DB()
{
    property = document.getElementById("p_type").value;
    furnishing = document.getElementById("f_type").value;
    notes = document.getElementById("Tag").value;
    money = document.getElementById("price").value;
    r_name = document.getElementById("r_name").value;
    bed_count = document.getElementById("No_of_Beds").value;
    date_time = document.getElementById("date_time").value;


  


  var alert = "Property Type: " + property + "\n Total Bedrooms: " + bed_count + "\n date & time: " + date_time +"\n Monthly rent: " + money + "\n Reporters Name: " + r_name;

  if (notes !== "")
      alert += "\n Notes: " + notes;

  if (furnishing != "")
      alert += "\n Furnishing Type: " + furnishing;

  if (money === "" || r_name === "" || bed_count === "" || date_time === "" || property === "") {
      alert("Cannot proceed. Missing required fields");
      return;
  }

       // the code below shows a confirmation dialog box and gets the users input if he want to edit or not.
  navigator.notification.confirm(
      alert,
      Store,
      'Confirm Details',
      'Submit,Go Back'
  );
    
}
function Store(clicked)
{
    // button index contains the number of the choice from the dialog box
    if (clicked == 2) {
        return;
    }
    else {
        
        // creating a table here if it already exists then it would just get a reference to that table otherwise it will create it.
        db.transaction(
            function (transaction) {
                transaction.executeSql('CREATE TABLE IF NOT EXISTS Property ( id integer primary key autoincrement , money text, r_name text , bed_count text, date_time text unique , property text , furnishing text , notes text ,  selfie text )', [],
                    function (tx, result) {
                      
                    },
                    function (error) {
                        alert("Error occurred while creating the table.");
                    });
            });

        // Inserting Data into db
        ;
        db.transaction(function (transaction) {
            var executeQuery = "INSERT INTO Property ( money , r_name , bed_count , date_time , property , furnishing , notes , selfie ) VALUES (?,?,?,?,?,?,?,?) ";
            transaction.executeSql(executeQuery, [ money, r_name, bed_count, date_time, property, furnishing, notes , selfie]
                , function (tx, result) {
                    
                    window.location.href = "index.html";
                },
                function (error) {
                    alert('Something went wrong. Kindly make sure that you have not inserted the same data again.');
                    
                });
        });
    }
}
