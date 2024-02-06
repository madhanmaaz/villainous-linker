const express = require("express")
const router = express.Router()
const shortcut = require("create-desktop-shortcuts")
const fs = require("fs")
const path = require("path")

router.route("/").get((req, res) => {
    res.render("index", {

    })
}).post((req, res) => {
    const { platform } = req.query
    const body = req.body
    const options = new Object()
    const folder = path.join(process.__dirname, "shortcuts")
    let eMessage = "success"

    body["outputPath"] = folder
    options[platform] = body
    options["customLogger"] = function (message, error) {
        let a = ""
        if (error) {
            a = error
        }

        eMessage = message + a
    }

    try {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true })
        }

        shortcut(options)
        res.send(eMessage)
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router