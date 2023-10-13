/**
 * @description This function generates the placeholders for the fields
 * @param translations
 * @param key
 * @returns {string}
 * @example generatePlaceholders(translations, 'name')
 */
export const generatePlaceholders = (translations, key) =>
  translations?.placeholders && translations?.placeholders[key] ? translations?.placeholders[key] : key;

/**
 * @description This function generates the messages for the fields validations
 * @param translations
 * @param key
 * @returns {string}
 * @example generateMessages(translations, 'name')
 */
export const generateMessages = (translations, key) =>
  translations?.messages && translations?.messages[key] ? translations?.messages[key] : key;
