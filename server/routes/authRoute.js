const express = require("express")
const router = express.Router();
const popup = require("popup-tools")
const passport = require("passport")

//Burada req.logIn fonksiyonu otomatik olarak çalışır önemli olan session oluşturmak
//Session oluşmazsa req.user erişilemez

router.get("/login", passport.authenticate("google", { scope: ['profile'] }));


router.get("/auth/redirect", passport.authenticate("google"), (req, res, next) => {
    // Burada login eventi tetiklenebilir cliente

    var responseHTML = '<html><head><title>Main</title></head><body></body><script>res = %value%; window.opener.postMessage(res, "*");window.close();</script></html>'
    responseHTML = responseHTML.replace('%value%', JSON.stringify({
        user: req.user
    }));
    res.status(200).send(responseHTML);
    // res.set({ "content-type": "text/html; charset=utf-8" });

    // res.end(popup.popupResponse(req.user));

})

router.get("/logout", (req, res, next) => {
    req.logOut();
    res.redirect("/api/login")

})
module.exports = router