const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
    ID: Number,
    Number_of_Jobs: Number,
    Number_of_Adjectives: Number,
    Number_of_Degrees: Number,
    Number_of_Certificates: Number,
    Years_of_Experience: Number,
    Soft_skill_count: Number,
    Technical_skill_count: Number,
    Weighted_Score: Number,
    Risk_Category: String
});


const Applicant = mongoose.model("Applicant", applicantSchema);
module.exports=Applicant;
