module.exports = {
    ensureAuth: function (req, res, nex) {
        if (req.isAuthenticated()){
            return nex()
        }else{
            res.redirect('/')
        }
    },
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()){
            res.redirect('/dashboard',{
            })
        }else{
            return next()
        }
    }
}