const { body } = require("express-validator");

const profileValidator = [
  body("user")
    .notEmpty().withMessage("User ID is required")
    .isMongoId().withMessage("Invalid User ID"),

  body("profilePic")
    .optional()
    .isString().withMessage("Profile picture must be a string"),

  body("nickName")
    .optional()
    .isString().withMessage("Nickname must be a string"),

  body("age")
    .optional()
    .isString().withMessage("Age must be a string"),

  body("birthDay")
    .optional()
    .isISO8601().withMessage("Birthday must be a valid date"),

  body("skills")
    .optional()
    .isArray().withMessage("Skills must be an array")
    .custom((skills) => {
      const allowed = [
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
      ];
      for (let skill of skills) {
        if (!allowed.includes(skill)) {
          throw new Error(`Invalid skill: ${skill}`);
        }
      }
      return true;
    }),

  body("profession")
    .optional()
    .isIn([
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
    ])
    .withMessage("Invalid profession"),

  body("industry")
    .optional()
    .isIn([
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
    ])
    .withMessage("Invalid industry"),
];

module.exports = profileValidator;
