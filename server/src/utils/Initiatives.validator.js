//функция, которая проверяет корректность поступающих данных;
class InitiativeValidator {
  static validate(data) {
    const { title, content, level, user_id } = data;
    const userN = +user_id;
    if (!title || typeof title !== "string" || title.trim() === "") {
      return {
        isValid: false,
        error: "Title is required and must be a non-empty string",
      };
    } else if (
      !content ||
      typeof content !== "string" ||
      content.trim() === ""
    ) {
      return {
        isValid: false,
        error: "Content is required and must be a non-empty string",
      };
    } else if (!level || typeof level !== "string" || level.trim() === "") {
      return {
        isValid: false,
        error: "Level is required and must be a non-empty string",
      };
    } else if (!userN || typeof userN !== "number") {
      return {
        isValid: false,
        error: "User_id is required and must be a non-empty string",
      };
    }
    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = InitiativeValidator;
