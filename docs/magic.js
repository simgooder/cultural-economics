// Check for localStorage support..

if (window.localStorage) {

    // Find all lsApp support tags and assign "active" to them.
    const appElements = document.querySelectorAll("[data-lsappsupport]");
    const LS = window.localStorage;

    appElements.forEach(el => {
        el.setAttribute("data-lsappsupport", "active");
    });

    // Favouriting a guide  ------------------------
    const favBtn = document.querySelectorAll("[data-js='favorite'");
    const key = "CE_FAVOURITES"
    let db = LS.getItem(key) || [];
    console.log("DB: ", db)

    favBtn.forEach(el => {

        el.addEventListener('click', function(ev){
            favouriteGuide(ev);
        })
    });

    favouriteGuide = function(ev) {
        let newGuide = ev.currentTarget.getAttribute("data-id");
        db = LS.getItem(key);

        if (db == null) {
            LS.setItem(key, newGuide);
            console.log("Updated favourites: ", newGuide);
        } else {
            db = db.split(",");
            let update = [];

            dbLength = db.length;
            for (var i = 0; i < dbLength; i++) {
                let entry = db[i];

                if (entry == newGuide) {
                    console.log("Already saved.")
                    break;
                } else if (i+1 == db.length) {
                    db.push(newGuide);
                    LS.setItem(key, db);
                    console.log("Updated favourites: ", newGuide)
                }

            }

        }
    }

}

