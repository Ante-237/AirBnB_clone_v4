$(document).ready(function () {
    // Add data-name attribute to each amenity list item
    $("ul.amenities li").each(function () {
      var amenityName = $(this).attr("data-amenity");
      $(this).attr("data-name", ":" + amenityName);
    });
  
    // Listen for changes on each input checkbox tag
    $('input[type="checkbox"]').change(function () {
      var checkedAmenities = [];
      $('input[type="checkbox"]:checked').each(function () {
        checkedAmenities.push($(this).attr("data-id"));
      });
      // Update the h4 tag inside the div Amenities with the list of Amenities checked
      $("div.amenities h4").text(checkedAmenities.join(", "));
    });
  });
  
  function apiStatus() {
    const API_URL = `http://${HOST}:5001/api/v1/status/`;
    $.get(API_URL, (data, textStatus) => {
      if (textStatus === "success" && data.status === "OK") {
        $("#api_status").addClass("available");
      } else {
        $("#api_status").removeClass("available");
      }
    });
  }


fetch('http://0.0.0.0:5001/api/v1/places_search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  })
    .then(response => response.json())
    .then(data => {
      // Loop through the result and create an article tag for each Place
      const placesSection = document.querySelector('.places');
      data.forEach(place => {
        const article = document.createElement('article');
        article.innerHTML = `
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">${place.max_guest} Guest${place.max_guest > 1 ? 's' : ''}</div>
            <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms > 1 ? 's' : ''}</div>
            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms > 1 ? 's' : ''}</div>
            <div class="user"><b>Owner:</b>${ place.user.first_name } ${ place.user.last_name } </div>
          </div>
          <div class="description">${place.description}</div>

        `;
        placesSection.appendChild(article);
      });
    })
    .catch(error => console.error(error));
   
  