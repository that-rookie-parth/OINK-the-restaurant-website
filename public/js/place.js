document.querySelectorAll(".item")
    .forEach((el) => {
        el.querySelector("a").addEventListener("click", () => {
            const foodId = el.querySelector(".foodId").innerText
            fetch(`/addToCart/${foodId}`)
                .then((resp) => resp.json())
                .then((data) => {
                    alert("Added to cart successfully!");
                    window.open(`/cart`, target="_self")
                })  
        })
    })