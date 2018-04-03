// Creating variables

var db;
var money;
var r_name;
var selfie="";
var bed_count;
var date_time;
var property;
var furnishing;
var notes;


// when the device is ready call the function onDeviceReady
document.addEventListener("deviceready", onDeviceReady, false);
// get db connection
function onDeviceReady() {
    // opening the database stored and storing the reference of it in the db variable.
    db = window.sqlitePlugin.openDatabase({ name: "Database.db", location: 'default' });
}

// this function is responsible for getting the picture from the gallery
function getPhoto() {
 
    
    // if the it is successful in getting the picture it goes to onPhotoURISuccess function otherwise it goes to onFail Function.
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 50,
            sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: navigator.camera.DestinationType.FILE_URI
        });
    
   
}

function onPhotoURISuccess(imageURI) {

    //here we resolve the path we get to the actual path of the image in device. We need to this because if we uuse the imageURI sent to this function it will for this page but it wont work for any other pages. So in order to use it again we use this function to convert the address to native path.
    window.FilePath.resolveNativePath(imageURI, success, error);
    

}
// just a requirement for line 36 function call to have an error function.
function error() {
    alert("Failed to resolve image path.");
}
function success(imageURI)
{
    // here we will get the resolved native path ( the actual path) of the image we store it in selfie variable for future use.
    selfie = imageURI;
    // get a reference to the image tag with id = selfie
    var largeImage = document.getElementById('selfie');
    // set the source of that image to imageURI
    largeImage.src = imageURI;
}
// just a requirement for line 24 function call to have an error or onFail function.
function onFail() {
    alert("Failed to get the image");
}
// this function below will get all the values from the form and add them to the db.
function Add_to_DB()
{

    // here we are trying to get all the values froms the form into variable.
    property = document.getElementById("p_type").value;
    furnishing = document.getElementById("f_type").value;
    notes = document.getElementById("Tag").value;
    money = document.getElementById("price").value;
    r_name = document.getElementById("r_name").value;
    bed_count = document.getElementById("No_of_Beds").value;
    date_time = document.getElementById("date_time").value;


  

    // we are making up a paragraph so we can show it to the user. This will appear in the dialog box shown to the user
  var alerts = "Property Type: " + property + "\n Total Bedrooms: " + bed_count + "\n date & time: " + date_time +"\n Monthly rent: " + money + "\n Reporters Name: " + r_name;

  if (notes !== "")
      alerts += "\n Notes: " + notes;

  if (furnishing != "")
      alerts += "\n Furnishing Type: " + furnishing;

    //validating if any of the required fields is empty or not( i.e. VALIDATION)
  if (money === "" || r_name === "" || bed_count === "" || date_time === "" || property === "") {
      alert("Cannot proceed. Missing required fields");
      return;
  }

       // the code below shows a confirmation dialog box and gets the users input if he want to edit or not.
  navigator.notification.confirm(
      alerts,
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
                    // redirect to the index.html page
                    window.location.href = "index.html";
                },
                function (error) {
                    alert('Something went wrong. Kindly make sure that you have not inserted the same data again.');
                    
                });
        });
    }
}
