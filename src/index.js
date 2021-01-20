getAllDogs();

/* Having issues rerendering the table */ 

const tableBody = document.querySelector('tbody#table-body');
const dogForm = document.querySelector('#dog-form');
const dogNameForm = dogForm.querySelector('input[name="name"]');
const dogBreedForm = dogForm.querySelector('input[name="breed"]');
const dogSexForm = dogForm.querySelector('input[name="sex"]');

function getAllDogs() {
    fetch('http://localhost:3000/dogs')
        .then(response => response.json())
        .then(dogs => dogs.forEach(function (dog) {
            renderDog(dog)
        })
        )
};

function dogInformation(id) {
    fetch(`http://localhost:3000/dogs/${id}`)
        .then(response => response.json())
        .then(dogObj => updateDogInfo(dogObj))
};

function fetchUpdate(id, dogObj) {
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dogObj),
    })
        .then(response => response.json())
        .then(getAllDogs);
};

// Render Dog // 

function renderDog(dog) {
    const tr = document.createElement('tr');
    const tdName = document.createElement('td');
    const tdBreed = document.createElement('td');
    const tdSex = document.createElement('td');

    const button = document.createElement('button')

    tdName.textContent = dog.name;
    tdBreed.textContent = dog.breed;
    tdSex.textContent = dog.sex;
    button.textContent = 'Edit';
    button.id = 'edit-btn';
    button.dataset.dogId = dog.id;

    tableBody.append(tr, tdName, tdBreed, tdSex, button);

    button.addEventListener('click', event => {
        grabDogId(event);
    })
}

function grabDogId(dogEvent) {
    let dogId = dogEvent.target.dataset.dogId;
    dogInformation(dogId);
}

function updateDogInfo(dogObj) {
    dogNameForm.value = dogObj.name;
    dogBreedForm.value = dogObj.breed;
    dogSexForm.value = dogObj.sex;

    dogForm.addEventListener('submit', event => {
        event.preventDefault();

        let updatedDogObj = {
            name: dogNameForm.value,
            breed: dogBreedForm.value,
            sex: dogSexForm.value
        }

        fetchUpdate(dogObj.id, updatedDogObj);
    })
}


