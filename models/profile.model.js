const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bgPic: {
    type: String,
    default: 'No BG Image'
  },
  profilePic: {
    type: String,
    default: "No Profile Picture",
  },
  nickName: {
    type: String,
    default: "No Nickname",
  },
  age: {
    type: String,
    default: "No Age mentioned",
  },
  birthDay: {
    type: Date,
    default: null, 
  },
  skills: {
    type: [String], 
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX Design",
      "QA Testing",
      "Automation Testing",
      "Data Science",
      "Machine Learning",
      "DevOps",
      "Cloud Computing",
      "Cybersecurity",
      "Database Management",
      "Blockchain",
      "Game Development",
      "Other",
    ],
    default: ["Other"],
  },
  profession: {
    type: String,
    enum: [
      "Manager",
      "Software Engineer",
      "QA Engineer",
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "Designer",
      "Data Analyst",
      "Student",
      "Freelancer",
      "Other",
    ],
    default: "Other",
  },
  industry: {
    type: String,
    enum: [
      "IT",
      "Finance",
      "Healthcare",
      "Education",
      "E-commerce",
      "Manufacturing",
      "Entertainment",
      "Telecommunications",
      "Automotive",
      "Government",
      "Other",
    ],
    default: "Other",
  },
  about: {
    type: String,
    default: 'No About'
  },
  contactNo: {
    type: String,
    default: 'No Contact No'
  }
});


const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
