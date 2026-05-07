const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const session = require("express-session");
const path = require("path");

const Usuario = require("./models/Usuario");

dotenv.config();

const app = express();

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("PUBLIC"));

app.use(session({
    secret:"cyberguard123",
    resave:false,
    saveUninitialized:false
}));

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB conectado"))
.catch(err => console.log(err));

/* HOME */

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"));
});

/* REGISTRO */

app.post("/registro", async(req,res)=>{

    const {nombre,correo,password,pais,idioma,nacimiento} = req.body;

    const existe = await Usuario.findOne({correo});

    if(existe) return res.send("Correo ya registrado");

    const hash = await bcrypt.hash(password,10);

    const nuevo = new Usuario({
        nombre,
        correo,
        password:hash,
        pais,
        idioma,
        nacimiento
    });

    await nuevo.save();

    res.redirect("/");
});

/* LOGIN */

app.post("/login", async(req,res)=>{

    const {correo,password} = req.body;

    const usuario = await Usuario.findOne({correo});

    if(!usuario){
    return res.redirect("/?error=correo");
}

    const valida = await bcrypt.compare(password,usuario.password);

    if(!valida){
    return res.redirect("/?error=password");
}

    req.session.usuarioId = usuario._id;

    res.redirect("/dashboard");
});

/* DASHBOARD PROTEGIDO */

app.get("/dashboard",(req,res)=>{

    if(!req.session.usuarioId){
        return res.redirect("/");
    }

    res.sendFile(path.join(__dirname,"public","dashboard.html"));
});

/* PERFIL API */

app.get("/perfil", async(req,res)=>{

    if(!req.session.usuarioId){
        return res.status(401).json({error:"No autorizado"});
    }

    const usuario = await Usuario.findById(req.session.usuarioId).select("-password");

    res.json(usuario);
});

/* LOGOUT */

app.get("/logout",(req,res)=>{
    req.session.destroy(()=>{
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor activo");
});