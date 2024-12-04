//ЗДЕСЬ пишут доп ПО middle-ware, самонаписанные, (кастом);

//например эта middle-ware срезает 'x-powered-by' из заголовка;
const removeHTTPHeader = (req, res, next) => {   //принимает 3 параметра, next позволяет идти дальше;
    res.removeHeader('x-powered-by');
    next();
};

module.exports = removeHTTPHeader; //экспортируем мидлварку;

