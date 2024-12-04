//функция, которая форматирует ответ от сервера в один и тот же вид;
function formatResponse (statusCode, message, data = null, error = null) { 
    return {
        statusCode,
        message,
        data,
        error
    };
};


module.exports = formatResponse;
