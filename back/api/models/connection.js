const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'landing_motos'
});

connection.connect((err) => {
    if(err){
        console.error("Error de conexción a MYSQL:", err)
        return;
    }
    console.log("Conectado a la DB");
});

module.exports = connection