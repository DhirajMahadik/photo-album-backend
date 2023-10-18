
export const verifyToken = (req,res,next) =>{
    let bearee_token = req.headers['authorization']
    if(typeof bearee_token === 'undefined') res.status(409)
    let token = bearee_token.split(' ')
    req.token = token[1]
    next()
}
