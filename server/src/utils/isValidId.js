//функция, которая проверяет id на валидность (id является строкой);
function isValidId(id) { 
    return !isNaN(id);
};


module.exports = isValidId;


