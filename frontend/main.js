window.addEventListener('load', function () {
    let nameElement = document.getElementById('name');
    let ageElement = document.getElementById('age');
    let placeElement = document.getElementById('place');
    let genderElement = document.getElementById('gender');
    let createButtonElement = document.getElementById('createbutton');
    let getuserButtonElement = document.getElementById('getuserbutton');
    let outputElement = document.getElementById('output');

    createButtonElement.addEventListener('click', function () {
        let name = nameElement.value;
        let age = ageElement.value;
        let place = placeElement.value;
        let gender = genderElement.value;
        if (name === '') {
            alert("please enter name");
            return;
        }
        if (age === '') {
            alert("please enter age");
            return;
        }
        if (gender === '') {
            alert("please enter gender");
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
            })
            .catch(function (error) {
                console.log(error);
            })
    })
    getuserButtonElement.addEventListener('click', function () {
        let url = '/getuserdetails';
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {

                var table = document.createElement("TABLE");
                table.border = '1';
                var row = table.insertRow(-1);

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


                for (let i = 0; i < data.length; i++) {
                    row = table.insertRow(-1);

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
    });

});
