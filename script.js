
var modal = document.getElementById("myModal");
var btn = document.getElementById("infoBtn");
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    setTimeout(function() {
        modal.style.opacity = "1";
    }, 10); // Allow DOM to update display before starting opacity transition
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.opacity = "0";
    setTimeout(function() {
        modal.style.display = "none";
    }, 300); // Matches the CSS transition time
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.opacity = "0";
        setTimeout(function() {
            modal.style.display = "none";
        }, 300); // Matches the CSS transition time
    }
}

// Country and tariff rate detection
document.addEventListener("DOMContentLoaded", function() {
    const euCountries = ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden'];

    fetch('https://ipapi.co/json/')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        const countryName = data.country_name;
        document.getElementById('user-country').textContent = countryName;
        fetch('tariffs.json')
            .then(response => response.json())
            .then(data => {
                let tariff = 0;
                if (euCountries.includes(countryName)) {
                    tariff = data["European Union"];
                } else {
                    tariff = data[countryName];
                }
                if (countryName == "United States") {
                    document.getElementById('country_tariff').textContent = 'Congrats! You have been "liberated" by president Trump';
                } else {
                    if (tariff) {
                        document.getElementById('country_tariff').textContent = `${tariff}%`;
                    } else {
                        document.getElementById('country_tariff').textContent = "No data";
                    }
                }
            })
            .catch(error => {
                console.error('Error fetching tariff data:', error);
                document.getElementById('country_tariff').textContent = "Error loading tariff data.";
            });
    })
    .catch(function(error) {
        console.log('Error:', error);
        document.getElementById('user-ip').textContent = 'Error detecting IP';
        document.getElementById('user-country').textContent = 'Error detecting country';
    });

    



});
