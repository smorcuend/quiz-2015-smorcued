'use strict';
// Definicion del modelo de Quiz con validación

module.exports = function(sequelize, DataTypes) {
    return sequelize.define(
        'Quiz', {
            pregunta: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: '-> Falta Pregunta'
                    }
                }
            },
            respuesta: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: {
                        msg: '-> Falta Respuesta'
                    }
                }
            },
            category: {
                type: DataTypes.STRING,
                defaultValue: 'Otro',
                validate: {
                    notEmpty: {
                        msg: '-> Falta Categoria'
                    }
                }
            }
        }
    );
};
