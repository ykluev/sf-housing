// Making a map and tiles
const mymap = L.map('sfMap').setView([37.7749, -122.4194], 13);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);


let markers = new L.LayerGroup().addTo(mymap);

// Get all rentals
const api_url = "https://data.sfgov.org/resource/aaxw-2cb8.json?housing_tenure=Rental"

function getAvgAffordability(ami, mohcd_units) {

}

function getColorGradient() {
// tinycolor
}

function formvalidate(e) {
    e.preventDefault()
    const formData = new FormData(e.target);
    zipCode = formData.get("zip-code")
    console.log(zipCode)
    getAffordableHousing(zipCode)
}

async function getAffordableHousing(zipCode) {
    markers.clearLayers();
    // move fetch call outside function? -   
    const response = await fetch(api_url);
    const data = await response.json();
  
    // ignoring undefined locations for now
    let housingWithLocation = data
        .filter(item => item.location !== undefined)
        // .filter(item => item.zip_code == "94117")

    // enable filtering by zipCode
    if (zipCode != undefined) {
        housingWithLocation = housingWithLocation
        .filter(item => item.zip_code == zipCode)
    }
    

    for (let housingProject of housingWithLocation) {
        mohcd_units = housingProject.mohcd_affordable_units
        infoString = "<b>Project Name:</b> " + (housingProject.project_name) + "<br><b>MOHCD Affordable Units:</b> " + (mohcd_units)
        let marker = L.circle([housingProject.latitude, housingProject.longitude], {radius: mohcd_units, weight:2}).bindTooltip(infoString)
        marker.addTo(markers);
    }
}

getAffordableHousing();


let zipForm = document.getElementById("zipForm");
zipForm.addEventListener("submit",formvalidate,false);




