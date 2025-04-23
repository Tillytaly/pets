class PetValidator {
  static allowedTypes = ["cats", "dogs"];

  static isValidPet(pet) {
    // Check if the pet data is an object and contains the required fields
    // Initialize the response object
    const response = { isValid: true, message: "" };

    // Check if the pet data is an object and contains the required fields
    if (typeof pet !== "object" || Object.keys(pet).length === 0) {
      response.isValid = false;
      response.message = "Invalid pet data: must be a non-empty object.";
      return response;
    }

    const petKeys = ["name", "age", "type", "description"];
    // Validate required fields

    const areKeysInvalid = petKeys.some((petKey) => !pet[petKey]);
    if (areKeysInvalid) {
      response.isValid = false;
      response.message =
        "Invalid pet data: must contain name, age, type, and description.";
      return response;
    }

    // Validate pet type

    const allowedTypes = ["dog", "cat"];
    if (!allowedTypes.includes(pet.type)) {
      response.isValid = false;
      response.message = `Invalid pet type: must be one of ${this.allowedTypes.join(
        ", "
      )}.`;
      return response;
    }

    // Validate age
    if (typeof pet.age !== "number") {
      response.isValid = false;
      response.message = "Invalid pet data: age must be a number.";
      return response;
    }

    // If all validations pass
    return response;
  }
}

module.exports = PetValidator;
