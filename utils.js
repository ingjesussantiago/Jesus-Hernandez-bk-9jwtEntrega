import { dirname } from "path"
import { fileURLToPath } from "url"
import multer from "multer"
//2
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const __dirname = dirname(fileURLToPath(import.meta.url))

// console.log(__dirname )

// Configuracion MULTER
const storage = multer.diskStorage(
    {

        destination: function (req, file, cb) {
            cb(null, __dirname + "/src/public/img")
        },


        filename: function (req, file, cb) {

            cb(null,file.originalname)

        }
    }
)

export const uploader = multer({
    storage,

    onError: function (err, next) {
        console.log(err);
        next();
    }
});

//bcryp
//3
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10))
//4
export const isValidPassword = (user, password) => {
    console.log(`Datos a validar: user-password: ${user.password}, password: ${password}`);
    return bcrypt.compareSync(password, user.password)
}


const PRIVATE_KEY = "CoderhouseBackendCourseSecretKeyJWT";

export const generateJWToken = (user) => {
    return jwt.sign({ user }, PRIVATE_KEY, { expiresIn: '24h' });
};

export const authToken = (req, res, next) => {
    //El JWT token se guarda en los headers de autorización.
    const authHeader = req.headers.authorization;
    console.log("Token present in header auth:");
    console.log(authHeader);
    if (!authHeader) {
        return res.status(401).send({ error: "User not authenticated or missing token." });
    }
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra Bearer.
    //Validar token
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if (error) return res.status(403).send({ error: "Token invalid, Unauthorized!" });
        //Token OK
        req.user = credentials.user;
        console.log(req.user);
        next();
    });
};
