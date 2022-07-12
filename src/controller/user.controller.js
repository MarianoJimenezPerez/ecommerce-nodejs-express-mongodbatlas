
//Controla si la sesion está autenticada
const isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    
    return res.redirect('/user');
}

//Retorna de manera async el logout
const accLogout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { 
            return next(err); 
        }
    
        return res.redirect('/');
    });
}

module.exports = { isAuthenticated, accLogout };