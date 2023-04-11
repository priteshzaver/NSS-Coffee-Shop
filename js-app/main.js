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

const mainContainer = document.querySelector("#coffee");
const addButton = document.querySelector("#open-form");

addButton.addEventListener("click", () => {
    getAllBeanVarieties()
        .then(() => {
            mainContainer.innerHTML = FormToAddBean();
        })
})

const FormToAddBean = () => {
    return `
            <div class="field">
                <input id="name" type="text" name="name" placeholder="Name">
            </div>
            <div class="field">
                <input id="region" type="text" name="region" placeholder="region">
            </div>
            <div class="field">
                <button id="addBean" type="submit">Add Bean</button>
            </div>
            `
}

function addBeanToDatabase(newBean) {
    const postOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newBean)
    }
    return fetch(url, postOptions)
            .then(response => response.json())
}

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addBean") {     
        const nameEntered = document.querySelector("input[name='name']").value;
        const regionEntered = document.querySelector("input[name='region']").value;

        const dataToSend = {
            name: nameEntered,
            region: regionEntered
        }

        addBeanToDatabase(dataToSend)    
    }
})
