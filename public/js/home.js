const gallery = document.querySelector(".bgImage")
const catalog = document.querySelectorAll(".catalog .image img")
catalog.forEach((element) => {
    element.addEventListener("mouseover", (event) => {
        gallery.style.backgroundImage = `url("${element.src}")`
    })
})



const loadMenu = async (placeName) => {

    console.log(`The input for the ${placeName}`);

    const resp = await fetch(`/place/js/${placeName}`)
    const data = await resp.json()


    document.querySelector(".foodMenuName").innerText = placeName

    const innerList = document.querySelector(".foodMenuList")
    html = "<ul>"

    data.forEach((el) => {
        html += `<li><div class="foodName">${el.foodName}</div><div class="foodPrice">&#8377;${el.price}</div></li>`
    })

    html += "</ul>"
    innerList.innerHTML = html 

    // console.log(data);
}


loadMenu("Dhaba")


document.querySelectorAll(".foodMenuToChooseFrom ul li")
    .forEach( (el) => {
        el.addEventListener("click", () => {
            loadMenu(el.innerText)
        })
    })