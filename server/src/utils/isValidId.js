//функция, которая проверяет id на валидность (id является строкой);
function isValidId(id) { 
    return !isNaN(id); //если может стать числом - true, не может - false;
};

module.exports = isValidId;


