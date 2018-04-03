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
*********************************************************************************************************************************************************
CODE BELOW FOR GETTING THE ADDRESS OF IMAGE FROM DB AND OTHER DATA AND DISPLAYING IT ON SCREEN
*********************************************************************************************************************************************************
    
    // looking for data in the db
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM Property where property = ?', [property], function (tx, data) {
            // getting the number of rows we got back after running the query in len variable
            var len = data.rows.length;
         
         // if len is less than 1 it means there were no rows in the respective category  
            if (len < 1 )
            {
                para.innerHTML = "There are no enteries against the respective category";
            }
            // if there where rows we will loop through the rows and add the data of that row in msg variable and display it at the end
            var i;
            for (i = 0; i < len; i++) {
          

                
              // here we are getting each rows every columns values and add it to the msg variable
 msg += "<br /> Entry ID: " + data.rows.item(i).id
                        + "<br/> Property Type: " + data.rows.item(i).property
                         + "<br/> Reporter:  " + data.rows.item(i).r_name
                         + "<br/> Date:  " + data.rows.item(i).date_time
                         + "<br/> Bedrooms:  " + data.rows.item(i).bed_count
                         + " <br/> Rent: " + data.rows.item(i).money
                                        if (data.rows.item(i).notes != "")
                        msg += "<br/> Note:  " + data.rows.item(i).notes;

                    if (data.rows.item(i).furnishing != "")
                        msg += "<br/> Furniture Type: " + data.rows.item(i).furnishing;


                    
                // displaying the image after getting the address of the image from the database.
                    if (data.rows.item(i).selfie != "")
                    msg += "<br /><br /><input type='image' src= '" + data.rows.item(i).selfie+"' alt='Image not found!!' width='180' height='180'>"
                }
            // para.innerHTML will display all the data on the screen.
            if (msg != "")
                para.innerHTML = msg;
        }, null);
    });


*********************************************************************************************************************************************************

    // this code is getting the users location and saving it for later use. it will go in onSuccess function if it got the coordinates. it goes in onError function if something went wrong. if it fails to get the coordinates in the time mentioned in the timeout field it goes into onError function. The timeout is set in milliseconds.
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 60000 });
	
    function onSuccess(position) {
        var lat = position.coords.latitude;
        var lang = position.coords.longitude;

        localStorage.setItem("Lat", lat);
        localStorage.setItem("Lang", lang);
  
		var example= localStorage.getItem("Lat");
        };

        function onError(error) {
            alert("Problem occured while estabishing connection. Kindly make sure you have internet and GPS enabled.");
            navigator.app.exitApp();
        }

***********************************************************************************************************************************************************


https://codesundar.com/lesson/cordova-google-maps/