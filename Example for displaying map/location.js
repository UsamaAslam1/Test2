var map ;
var infowindow;
function initMap(){

navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 300000 });
function onSuccess(position) {
var lat=position.coords.latitude;
var lang=position.coords.longitude;

localStorage.setItem("Lat",lat);
localStorage.setItem("Lang",lang);
//Google Maps

var myLatlng = new google.maps.LatLng(lat,lang);

var mapOptions = {
  zoom: 15,
  center: myLatlng,
  scrollwheel: false,
  mapTypeId: google.maps.MapTypeId.ROADMAP,

};

 map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
 
       
		
var marker = new google.maps.Marker({position: myLatlng,map: map});


}
}
    function onError(error) {
    alert('code: ' + error.code + '\n' +
    'message: ' + error.message + '\n');
    }
