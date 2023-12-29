if (window.localStorage) {

    const LS = window.localStorage;
    const key = "CE_FAVOURITES";

    // Pulling all guide data...
    async function getData() {
        fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
            // console.log(data);
            setFavs(data);

        });
    }

    // Setting favourites and getting data
    function setFavs(data) {
        const favs = LS.getItem(key).split(",");
        let favsList = [];
        let isLast = false;

        for (var i = 0; i < favs.length; i++) {
            let fav = favs[i];
            // console.log("FAV: ", fav);

            if (i+1 == favs.length) {
                isLast = true;
            }
            for (var x = 0; x < data.length; x++) {
                let entry = data[x];

                if (fav == entry.id) {
                    // console.log("MATCH!!! ", entry.id + " == " + fav)
                    favsList.push(entry);
                }
                if (isLast == true && x+1 == data.length) {
                    // Guaranteed last loop of all data...
                    // This is where you'd run the templating...
                    console.log("IS LAST RUN TOTAL ", favsList)
                    buildTemplate(favsList);
                }
            }

        }

    }

    function buildTemplate(f) {
        const output = document.getElementById("favsContainer");

        f.forEach(el => {
            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = "<a href='" + el.url + "'>" + el.name + "</a>";
            output.appendChild(card);
        });
    }

    getData();

}