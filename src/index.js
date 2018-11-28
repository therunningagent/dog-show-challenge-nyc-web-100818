const controller = new DogController()

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('table-body')
  const dogForm = document.getElementById('dog-form')

  // get the dogs when the page loads
  controller.loadDogsFromApi()
    .then(() => {
      renderApp()
    })

  // edit dog event
  tableBody.addEventListener('click', event => {
    if (event.target.nodeName === "BUTTON") {
      // find the dog
      const dogId = event.target.dataset.id
      const dog = controller.findDogById(dogId)
      // copy to form
      dogForm.dataset.id = dogId
      dogForm.querySelector('input[name="name"]').value = dog.name
      dogForm.querySelector('input[name="breed"]').value = dog.breed
      dogForm.querySelector('input[name="sex"]').value = dog.sex
    }
  })

  dogForm.addEventListener('submit', event => {
    event.preventDefault()
    const dogId = event.target.dataset.id
    const dog = controller.findDogById(dogId)
    // update our local doggo
    dog.name = event.target.querySelector('input[name="name"]').value
    dog.breed = event.target.querySelector('input[name="breed"]').value
    dog.sex = event.target.querySelector('input[name="sex"]').value
    // optimistic rendering + reset the form
    renderApp()
    event.target.dataset.id = 0
    event.target.reset()
    // then update the API
    dogObj = dog.toPojo()
    controller.updateDog(dogId, dogObj)
      .catch(console.error)
  })

  const renderApp = () => {
    tableBody.innerHTML = controller.render()
  }

})