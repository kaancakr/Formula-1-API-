let driverNameRef = document.getElementById("driver-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//function to fetch data from api

let getDriver = () => {
    let driverName = driverNameRef.value;
    let url = `http://ergast.com/api/f1/current/driverStandings`;
    //if input field is empty

    if (driverName.length <= 0) {
        result.innerHTML = `<h3 class="msg">Please enter a driver name </h3>`;
    }

    //if input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            //if driver exist in database
            if (data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <div>
                            <h2>${data.givenName}</h2>
                            <h2>${data.familyName}</h2>
                            <div class="rating">
                                <h4>${data.points}</h4>
                                <h4>${data.positionText}</h4>
                            </div>
                            <div class="details">
                                <span>${data.nationality}</span>
                                <span>${data.name}</span>
                                <span>${data.url}</span>
                            </div>
                        </div>
                    </div>
                `;
            }

            //if driver doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
            //if error occurs
            .catch(() => {
                result.innerHTML = `<h3 class="msg">Error Occured</h3>`;
            });
    }
};


searchBtn.addEventListener("click", getDriver);
window.addEventListener("load", getDriver);