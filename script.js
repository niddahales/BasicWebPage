"use strict";
(function () {
   window.addEventListener("load", init);

   //Initialize the ajax button to call the correct function when pressed.
  function init() {
    let i=0;
    id("nextBut").addEventListener("click",async function() {
      if(i<3){
        i+=1;
        await processApodJson(i);
      }
      else {
        i=0;
        await processApodJson(i);
      }  
});
    processApodJson(0);
  }

  //Fetch data from Mars photos from Curiosity
  async function fetchMARS() {
    let url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3&api_key=LO6bkAoNCwACyBSA1DIFpGbHfXRN1AFPgHESVS2M";
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        handleError(error);
    }
  }

  // Changin status of card
  async function processApodJson(i) {
    let photos2 = await fetchMARS();
    id("img1").src=photos2.photos[i].img_src;
    id("title1").textContent=(i+1)+"/4";
    id("rover1").textContent="Rover Name : " + photos2.photos[i].rover.name;
    id("landing1").textContent="Landing Date : " + photos2.photos[i].rover.landing_date;
  }

  /*
   * This function is called when an error occurs in the fetch call chain (e.g. the request*/
  function handleError(err) {
    let response = gen("p");
    let msg = "There was an error requesting data from the APOD service " +
      "(it's possible the DEMO_KEY rate limit is used up!) Please try again later.";
    msg += "Error from server was: " + err;
    response.textContent = msg;
  }

    //Helper Functions
  function id(idName) {
    return document.getElementById(idName);
  }

  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
