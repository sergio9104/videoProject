window.onload = function() {
    let videoElement = document.querySelector("#myVideo");
    let myIFrame = document.querySelector("#myIframe");

    let textTracks = videoElement.textTracks; // one for each track element
    let textTrack = textTracks[0]; // corresponds to the first track element
   
    // change mode so we can use the track
    textTrack.mode = "hidden";
    // Default position on the google map
    let centerpos = new google.maps.LatLng(38.897203, -77.036747);
    
    // default options for the google map
    let optionsGmaps = {
       center:centerpos,
       navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
       mapTypeId: google.maps.MapTypeId.ROADMAP,
       zoom: 3
    };
    
    // Init map object
    let map = new google.maps.Map(document.getElementById("map"), optionsGmaps);
    
    // cue change listener, this is where the synchronization between
    // the HTML document and the video is done
    textTrack.oncuechange = function (){
       // we suppose that we have no overlapping cues
       let cue = this.activeCues[0];
       if(cue === undefined) return;
       // get cue content as a JavaScript object
       let cueContentJSON = JSON.parse(cue.text);

        // show wikipedia and google maps position
        let myURL = cueContentJSON.url;
        let myLink = "<a href=\"" + myURL + "\">" + myURL + "</a>";
        myIFrame.src = myURL; // assign url to src property
        drawPosition(cueContentJSON.long, cueContentJSON.lat, cueContentJSON.zoom);
   };
 
   function drawPosition(long, lat, zoom) {
      // Make new object LatLng for Google Maps
      let latlng = new google.maps.LatLng(lat, long);

      // Add a marker at position
      map.setCenter(latlng);
      map.setZoom(zoom);

     
   }
};