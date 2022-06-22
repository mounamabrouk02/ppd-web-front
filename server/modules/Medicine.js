const mongoose = require("mongoose");
const {upperCaseFirstLetter} = require("../utils/UpperCaseFirstLetter");

const MedicineSchema = new mongoose.Schema({
    lastName: {
        type: String,
        transform: upperCaseFirstLetter
    },
    firstName: {
        type: String,
        transform: upperCaseFirstLetter
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    speciality: {
        type: String,
    }
})

MedicineSchema.methods.fullName = function () {
    return `${upperCaseFirstLetter(this.firstName)} ${upperCaseFirstLetter(this.lastName)}`
}

const Medicine = mongoose.model("medicines", MedicineSchema);

export {Medicine}