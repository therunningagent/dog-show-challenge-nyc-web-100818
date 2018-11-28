class DogAdapter {
  constructor(dogJSON) {
    return new Dog(dogJSON.id, dogJSON.name, dogJSON.breed, dogJSON.sex)
  }
}