window.addEventListener('load', function () {
    let nameElement = document.getElementById('name');
    let ageElement = document.getElementById('age');
    let placeElement = document.getElementById('place');
    let genderElement = document.getElementById('gender');
    let createButtonElement = document.getElementById('createbutton');
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
});
