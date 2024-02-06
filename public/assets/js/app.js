const platformBtns = document.querySelectorAll(".open-platform-btn")
const platformTitle = document.querySelector("#platform-title")
const sideBar = document.querySelector(".side-bar")
const openSidebar = document.querySelector("#open-sidebar")
const createBtn = document.querySelector("#create-btn")

openSidebar.addEventListener("click", () => {
    sideBar.classList.toggle("active")
})

let currentPlatform = "windows"

platformBtns.forEach((btn, index, btns) => {
    btn.addEventListener("click", () => {
        const platform = btn.getAttribute("data-value")
        platformTitle.innerHTML = platform
        currentPlatform = platform

        document.querySelectorAll(".platform-content").forEach(div => {
            div.classList.remove("active")
        })

        btns.forEach(btn => {
            btn.classList.remove("active")
        })

        btn.classList.add("active")
        document.querySelector(`.${platform}-container`).classList.add('active')
    })
})

createBtn.addEventListener("click", async () => {
    const platformContainer = document.querySelector(`.${currentPlatform}-container`)
    const platformInputs = platformContainer.querySelectorAll(`.props`)
    const buildData = new Object()

    for (const inp of platformInputs) {
        if (inp.required && inp.value.length == 0) {
            inp.focus()
            return
        }

        if (inp.value.length == 0) continue

        buildData[inp.name] = inp.value
        if (inp.value == "true") buildData[inp.name] = true
        if (inp.value == "false") buildData[inp.name] = false
    }

    try {
        const response = await axios.post(`/?platform=${currentPlatform}`, buildData, {
            headers: {
                'Content-Type': "application/json"
            }
        })

        alert(response.data)
    } catch (error) {
        console.error(error)
        alert(error.message)
    }
})