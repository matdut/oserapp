const Sequelize = require('sequelize');
var sequelize = require('./database');

var nametable = 'veiculo_motorista'; // nombre de la tabla

var Veiculo = sequelize.define(nametable,{
  
  id:{
    type:Sequelize.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  motoristaId:  {
    type: Sequelize.INTEGER     
  },
  carro: {
    type: Sequelize.STRING(25), 
    allowNull: false,
   },
   placa: {
    type: Sequelize.STRING(10),
    allowNull: false,
   },
   modelo: {
    type: Sequelize.STRING(20),
    allowNull: false,
   },
   ano: { 
    type: Sequelize.STRING(5),
    allowNull: false,
   },
   cor: { 
    type: Sequelize.STRING(20), 
    allowNull: false,
   },
},
{
  // remove  createdAt y updated
  timestamps:false
});

module.exports = Veiculo
