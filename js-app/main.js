const url = "https://localhost:5001/api/beanvariety/";

const button = document.querySelector("#run-button");
button.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(beans => {
            beans.map(bean => {

                const newDiv = document.createElement("div");
                
                const newContent = document.createTextNode(`${bean.name}`);
                
                newDiv.appendChild(newContent);
                
                const currentDiv = document.getElementById("coffee");
                document.body.insertBefore(newDiv, currentDiv);
            })
        })


});

function getAllBeanVarieties() {
    return fetch(url).then(resp => resp.json());
}

