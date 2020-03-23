window.addEventListener('load', function () {
    let nameElement = document.getElementById('name');
    let ageElement = document.getElementById('age');
    let placeElement = document.getElementById('place');
    let genderElement = document.getElementById('gender');
    let createButtonElement = document.getElementById('createbutton');
    let deleteIdElement = document.getElementById('deleteid');
    let deleteuserButtonElement = document.getElementById('deleteuserbutton');

    let outputElement = document.getElementById('output');

    createButtonElement.addEventListener('click', function () {
        let name = nameElement.value;
        let age = parseInt(ageElement.value);
        let place = placeElement.value;
        let gender = genderElement.value;

        if (name === '') {
            alert("please enter name");
            return;
        }

        if (isNaN(age) && (age < 1 || age > 100)) {
            alert("please enter age");
            return;
        }

        if (gender.toLowerCase() !== "male" && gender.toLowerCase() !== "female") {
            alert("please proper gender");
            return;
        }
        let bodyJSON = {
            'name': name,
            'age': age,
            'place': place,
            'gender': gender
        }

        let url = '/createuserdetails';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(bodyJSON),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                outputElement.innerText = data.message;
                setTimeout(function () {
                    outputElement.innerText = '';
                }, 3000);
                nameElement.value = '';
                ageElement.value = '';
                placeElement.value = '';
                genderElement.value = '';
                getUser();
            })
            .catch(function (error) {
                console.log(error);
            })
    })

    function getUser() {
        let url = '/getuserdetails';
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                var table = document.createElement("TABLE");
                table.classList.add("table");
                table.border = '1';
                var row = table.insertRow(-1);
                row.classList.add('thead-dark');

                var nameThElement = createElement('TH', 'Name');
                var ageThElement = createElement('TH', 'Age');
                var locationThElement = createElement('TH', 'Location');
                var genderThElement = createElement('TH', 'Gender');
                var idThElement = createElement('TH', 'Id');

                row.appendChild(idThElement);
                row.appendChild(nameThElement);
                row.appendChild(ageThElement);
                row.appendChild(locationThElement);
                row.appendChild(genderThElement);

                let classList = ['table-primary', 'table-secondary', "table-success", "table-danger", "table-warning"];
                for (let i = 0; i < data.length; i++) {
                    row = table.insertRow(-1);
                    row.style.color = "black";
                    row.classList.add(classList[i % 5]);
                    var nameTdElement = createElement('TD', data[i].name);
                    var ageTdElement = createElement('TD', data[i].age);
                    var locationTdElement = createElement('TD', data[i].place);
                    var genderTdElement = createElement('TD', data[i].gender);
                    var idTdElement = createElement('TD', data[i].id);

                    row.appendChild(idTdElement);
                    row.appendChild(nameTdElement);
                    row.appendChild(ageTdElement);
                    row.appendChild(locationTdElement);
                    row.appendChild(genderTdElement);

                }

                var divTable = document.getElementById("divTable");
                divTable.innerHTML = "";
                divTable.appendChild(table);

                function createElement(type, value) {
                    var element = document.createElement(type);
                    element.innerText = value;
                    return element;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    deleteuserButtonElement.addEventListener('click', function () {
        let id = deleteIdElement.value;
        let url = '/deleteuserdetails?id=' + id;
        fetch(url, {
            method: 'DELETE'
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                outputElement.innerText = data.message;
                setTimeout(function () {
                    outputElement.innerText = "";
                }, 3000);
                deleteIdElement.value = '';
                getUser();
            })
            .catch(function (error) {
                console.log(error);
            })
    });

});
