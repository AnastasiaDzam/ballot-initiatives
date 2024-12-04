function isValidId(id) { 
    return !isNaN(id); //если может стать числом - true, не может - false;
};

module.exports = isValidId;
