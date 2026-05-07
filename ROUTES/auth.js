const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

/* =========================
   REGISTRO
========================= */
router.post("/register", async (req, res) => {
    try {
        const { nombre, correo, password } = req.body;

        const hash = await bcrypt.hash(password, 10);

        // Aquí deberías guardar usuario en Mongo (si ya tienes modelo User)
        res.json({ msg: "Usuario registrado (simulado)" });

    } catch (error) {
        res.status(500).json({ error: "Error en registro" });
    }
});

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
    try {
        const { correo, password } = req.body;

        // Simulación básica (debes conectar a DB si tienes modelo User)
        const token = jwt.sign(
            { correo },
            "secreto_cyberguard",
            { expiresIn: "1h" }
        );

        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: "Error en login" });
    }
});

module.exports = router;