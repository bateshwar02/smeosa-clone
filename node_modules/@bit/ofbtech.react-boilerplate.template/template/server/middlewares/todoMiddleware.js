const Service = require('../services/todos');
module.exports = (req, res, next) => {
    try {
        Service.getToDos((error, response) => {
            if (error) {
                next();
                return;
            }
            res.setProp('toDo', {
                todos: response,
            });
            next();
        }, res.getRequestHeaders());
    } catch (error) {
        console.log('error', error);
        throw error;
    }
};
