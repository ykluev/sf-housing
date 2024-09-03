// Making a map and tiles
const mymap = L.map('sfMap').setView([37.7749, -122.4194], 13);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Get all rentals
const api_url = "https://data.sfgov.org/resource/aaxw-2cb8.json?housing_tenure=Rental"


async function getAffordableHousing() {
  const response = await fetch(api_url);
  const data = await response.json();
  
  // ignoring undefined locations for now
  let housingWithLocation = data
      .filter(item => item.location !== undefined)

  

  for (let housingProject of housingWithLocation) {
    infoString = "<b>Project Name:</b> " + (housingProject.project_name) + "<br><b>MOHCD Affordable Units:</b> " + (housingProject.mohcd_affordable_units)
    marker = L.marker([housingProject.latitude, housingProject.longitude]).bindTooltip(infoString)
      
    marker.addTo(mymap);
  }

}

getAffordableHousing();