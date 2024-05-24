const generarInfoError = (usuario) =>{
    return `Datos incompletos o invalidos:
    Nombre: ${usuario.nombre}
    Apellido: ${usuario.apellido}
    Email: ${usuario.email}`
}

module.exports = generarInfoError;