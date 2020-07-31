import React from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

 import Inicio from './pages/inicio';

 //import Inicio from './pages/eventos/arquivos_teste/formulario1';
 
 /* CLIENTE */
 import Form from './pages/cliente/form';
 import List from './pages/cliente/list';
 import Edit from './pages/cliente/edit';
 import Alterar_senha from './pages/cliente/alterar_senha'; 
 import Area_cliente from './pages/cliente/area_cliente';
 import Tipo_cliente from './pages/cliente/tipo_cliente';
 import Representante from './pages/cliente/juridica/representante';
 import Empresa_dados from './pages/cliente/juridica/dados_empresa';
 import Empresa_endereco from './pages/cliente/juridica/endereco_empresa';
 import Empresa_senha from './pages/cliente/juridica/senha_empresa';

 import Cliente from './pages/cliente/fisica/representante';
 import cliente_endereco from './pages/cliente/fisica/endereco_empresa';
 import cliente_senha from './pages/cliente/fisica/senha_empresa';
 //import NovoCadastro from './pages/cliente/cadastro';

 /* EVENTOS */
 import Eventos_cadastro from './pages/eventos/form';
 import Listar_evento_cliente from './pages/eventos/list'; 
 

 /* TRANSLADOS */
 import Translados_incluir from './pages/translados/form';
 import Translados_editar from './pages/translados/editar';
 import Translado_listar from './pages/translados/list';


/* MOTORISTAS */ 
 import FormMotorista from './pages/motorista/form';
 import ListMotorista from './pages/motorista/list';
 import EditMotorista from './pages/motorista/edit'; 
 import Alterar_senha_Motorista from './pages/motorista/alterar_senha'; 
 import Area_motorista from './pages/motorista/area_motorista';

 import Motorista_cadastro from './pages/motorista/cadastro';
 import Motorista_endereceo from './pages/motorista/endereco';
 import Motorista_veiculo from './pages/motorista/veiculo';
 import Motorista_senha from './pages/motorista/senha';

 
/*ADMINISTRADOR */
import Area_administrador from './pages/administrador/area_administrador';

/* MATRIZ */
import Matriz_tarifaria_criar from './pages/matriz_tarifaria/form';
import Matriz_tarifaria_listar from './pages/matriz_tarifaria/list';

/* FAIXA TARIFARIA */
import Faixa_tarifaria_listar from './pages/faixa_tarifarias/list';
import Faixa_tarifaria_criar from './pages/faixa_tarifarias/form';
import Faixa_tarifaria_editar from './pages/faixa_tarifarias/edit';
/* MAPS */


/* EMAIL */
 import Esqueceu_senha from './pages/login/esqueceu_senha';

 import Sobre from './pages/sobre';
 import Login from './pages/login'; 
 import Rodape from './pages/rodape';
 import Servicos from './pages/servicos';
 import Contato from './pages/contato';
 import Logout from './pages/logout';
 import Teste4 from './pages/maps4';
 import LoginNovo from './pages/login_novo';

 var fs = require('fs');

//Convertendo binario em arquivo
function base64_decode(base64str,fileName){
  var bitmap = new Buffer (base64str, 'base64');
  fs.writeFileSync('src/temp/'+fileName+'',bitmap, 'binary', function (err){
    if(err){
      console.log('Conversao com erro');
    }
  } );
}

//Convertendo arquivo em binário
function base64_encode(fileName){
  var bitmap = fs.readFileSync('src/temp/'+fileName+'');
  return new Buffer (bitmap).toString('base64');
}
   
export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
         <div className="App">                
            <Route path="/" exact component={Inicio} />
            <Route path="/sobre" component={Sobre} />
            <Route path="/form" component={Form} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/login" component={Login} />
            <Route path="/list" component={List} />
            <Route path="/area_cliente" component={Area_cliente} />
            <Route path="/area_motorista" component={Area_motorista} />
            <Route path="/area_administrador" component={Area_administrador} />
            <Route path="/servicos" component={Servicos} />
            <Route path="/contato" component={Contato} />
            <Route path="/logout" component={Logout} />            

            <Route path="/criar" component={FormMotorista} />
            <Route path="/editar/:id" component={EditMotorista} />
            <Route path="/listar" component={ListMotorista} />            

            <Route path="/mapa4" component={Teste4} />      

            <Route path="/novologin" component={LoginNovo} />    

             <Route path="/alterar_senha" component={Alterar_senha} />

             <Route path="/alterar_senha_motorista" component={Alterar_senha_Motorista} />                            

             <Route path="/criar_eventos/:id" component={Eventos_cadastro} /> 
             <Route path="/listaeventocliente/:id" component={Listar_evento_cliente} />           

             <Route path="/listporevento/:id" component={Translado_listar} />    
             <Route path="/transladoscriar" component={Translados_incluir} />    
             <Route path="/transladoseditar/:id" component={Translados_editar} />                               

             <Route path="/matriz_criar" component={Matriz_tarifaria_criar} />
             <Route path="/matriz_listar" component={Matriz_tarifaria_listar} />

             <Route path="/faixa_listar/:id" component={Faixa_tarifaria_listar} />
             <Route path="/faixa_editar/:id" component={Faixa_tarifaria_editar} />
             <Route path="/faixa_criar" component={Faixa_tarifaria_criar} />          

             <Route path="/tipo" component={Tipo_cliente} />
             <Route path="/empresa" component={Representante} />
             <Route path="/empresa_dados" component={Empresa_dados} />
             <Route path="/empresa_endereco" component={Empresa_endereco} />             
             <Route path="/empresa_senha" component={Empresa_senha} />             

             <Route path="/cliente" component={Cliente} />             
             <Route path="/cliente_endereco" component={cliente_endereco} />             
             <Route path="/cliente_senha" component={cliente_senha} />             

             <Route path="/cadastro" component={Motorista_cadastro} />             
             <Route path="/endereco_motorista" component={Motorista_endereceo} />      
             <Route path="/veiculo_motorista" component={Motorista_veiculo} />      
             <Route path="/senha_motorista" component={Motorista_senha} />      
             
             
             <Route path="/esqueceu senha" component={Esqueceu_senha} />          
            <Rodape />
         </div>
        </Switch>
        </BrowserRouter>
    )
 }