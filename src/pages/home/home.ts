import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google: any;
var location = [[13.835838, 100.853721], [13.829377, 100.845911], [13.845753, 100.858871], [13.852920, 100.859472]];


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  location: any;
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  latitude :any;
  longitude : any;
  image : any;

  constructor(public navCtrl: NavController,private geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    console.log(location.length);
    this.showMap();
  }
getlocation(map){
    this.geolocation.getCurrentPosition().then((resp) => {
    this.latitude = resp.coords.latitude
    this.longitude = resp.coords.longitude
    this.location = new google.maps.LatLng(this.latitude, this.longitude);     
    this.addMarker(this.location,map,null);
    }).catch((error) => {
       console.log('Error getting location', error);
     });
}
busStop(map){
  this.image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
  };
  
  for (var i=0;i<location.length;i++) {  
    console.log(location.length, i);    
    this.location = new google.maps.LatLng(location[i][0],location[i][1]);     
    this.addMarker(this.location,map,this.image);
  };
}
 showMap() {
    
    const center = new google.maps.LatLng(location[0][0], location[0][1]);
    const options = {
      center: center,
      zoom: 14,
      streeViewControl: false,
      mapTypeId: 'roadmap'
    };
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.getlocation(this.map);   
    this.busStop(this.map);
   
   }
  addMarker(position, map,image) {
    return new google.maps.Marker({
      position,
      map,
      icon: image
    });
  }
}

