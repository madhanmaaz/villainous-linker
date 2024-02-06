const express = require("express")

const app = express()
const path = require("path")

app.use(express.static(path.join(__dirname, "public")))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine", "ejs")
process.__dirname = __dirname


app.use("/", require("./router/index"))


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`
+===============================+
Running on http://127.0.0.1:${PORT}
+===============================+
`);
})