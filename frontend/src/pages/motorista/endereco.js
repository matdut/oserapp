import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import { cepMask } from '../formatacao/cepmask';
import { cepremoveMask } from '../formatacao/cepremovemask';

import api from '../../services/api';
import './empresarial.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
const cep_empresa = localStorage.getItem('logcep');     
const userId = localStorage.getItem('logid');
const dataendereco = localStorage.getItem('logdatamotorista');

const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCep: '',    
      campBairro: '',
      campEndereco: '',
      campComplemento:'',
      campNumero:'',
      campCidade:'',
      campEstadoId:0,
      campNome: '',
      inicio: 1,
      progresso: '',    
      mensagem_cep: '',  
      mensagem_endereco: '',  
      mensagem_numero: '',  
      mensagem_complemento: '',      
      mensagem_estado: '',  
      mensagem_cidade: '',  
      mensagem_bairro: '',       
      cep_encontrado: '',
      busca_cep: '',     
      listEndereco:[], 
      listEstados:[],
      validate: {
        cepState: '',
        enderecoState: '',
        numeroState: '',     
        complementoState: '',
        bairroState: '',          
        cidadeState: '',     
        estadoState: '',     
      }    
    }
          
    this.cepchange = this.cepchange.bind(this);
    this.enderecochange = this.enderecochange.bind(this);
    this.numerochange = this.numerochange.bind(this);
    this.complementochange = this.complementochange.bind(this);
    this.bairrochange = this.bairrochange.bind(this);
    this.cidadechange = this.cidadechange.bind(this);   
    this.estadoChange = this.estadoChange.bind(this);    
    this.handleClick = this.handleClick.bind(this);
    this.limpar_endereco = this.limpar_endereco.bind(this);

    this.verificaEstado = this.verificaEstado.bind(this);  
    this.verificaCep = this.verificaCep.bind(this);  
    this.verificaEndereco = this.verificaEndereco.bind(this);  
    this.verificaNumero = this.verificaNumero.bind(this);  
    this.verificaBairro = this.verificaBairro.bind(this);  
    this.verificaCidade = this.verificaCidade.bind(this);  
    this.verificaComplemento = this.verificaComplemento.bind(this);  

    this.validaCepChange = this.validaCepChange.bind(this);  
    this.validaEnderecoChange = this.validaEnderecoChange.bind(this);  
    this.validaNumeroChange = this.validaNumeroChange.bind(this);  
    this.validaBairroChange = this.validaBairroChange.bind(this);  
    this.validaCidadeChange = this.validaCidadeChange.bind(this);  
    this.validaComplementoChange = this.validaComplementoChange.bind(this);  
    this.validaEstadoChange = this.validaEstadoChange.bind(this);  

    this.verifica_botao = this.verifica_botao.bind(this);  
    this.verifica_cep = this.verifica_cep.bind(this);  
    this.cep_preenchido = this.cep_preenchido.bind(this);
    this.busca_cep_banco = this.busca_cep_banco.bind(this);

    this.verifica_nome_individual = this.verifica_nome_individual.bind(this);
    
  }

  componentDidMount(){    
    
    //console.log('CEP 1 - '+cepremoveMask(localStorage.getItem('logcep')))
    this.setState({      
      progresso: andamento_cadastro,
      campCep: localStorage.getItem('logcep') 
    });  
    this.limpar_endereco();    
    this.loadEstados();   

    console.log('this.state.campCep - '+this.state.campCep)
    this.busca_cep_banco();    
    
    //this.handleClick();
  }

  
  verifica_nome_individual(nome){
    return(    
         nome.substring(0,nome.indexOf(" "))                          
       );  
  } 

  busca_cep_banco(e) {
    //console.log('ENTROU AQUI busca_cep_banco')
    const { validate } = this.state

    api.get(`/motorista/get/${localStorage.getItem('logid')}`)
    .then(res=>{
        console.log('busca motorista - '+JSON.stringify(res.data, null, "    ")); 
        if (res.data.data.length > 0) {
           
          this.setState({ 
            campEndereco: res.data.data[0].endereco,
            campNumero: res.data.data[0].numero,
            campComplemento: res.data.data[0].complemento,
            campCidade: res.data.data[0].cidade,
            campBairro: res.data.data[0].bairro,
            campEstadoId: res.data.data[0].estadoId,      
            campNome: res.data.data[0].nome,  
            campCep: res.data.data[0].cep,   

            inicio: 2
          })                           
          
         if (this.state.campCep !== "" ) {
            validate.cepState = 'has-success'      
          } 
          if (this.state.campEndereco !== "") {
            validate.enderecoState = 'has-success'      
          } 
          if (this.state.campNumero !== "") {
            validate.numeroState = 'has-success'      
          }        
          if (this.state.campBairro !== "") {
            validate.bairroState = 'has-success'      
          }        
          if (this.state.campCidade !== "") {
            validate.cidadeState = 'has-success'      
          }        
          if (this.state.campComplemento !== "")  {
            validate.complementoState = 'has-success'      
          }
          if (this.state.campEstadoId !== null) {
            validate.estadoState = 'has-success'      
          }         
  
          this.setState({ validate })

        /*  if (validate.estadoState !== 'has-success' && validate.cidadeState !== 'has-success' 
          && validate.bairroState !== 'has-success' && validate.enderecoState !== 'has-success'           
          && localStorage.getItem('logcep') !== null) {

            this.cep_preenchido(cepremoveMask(localStorage.getItem('logcep')))  
          }*/

        } else {          
             this.cep_preenchido(cepremoveMask(localStorage.getItem('logcep')));          
        }
      })        
      .catch(error=>{
        alert("Error de conexão  "+error)
      })   
    }
  loadEstados(){
  
    api.get('/estado/list')
    .then(res=>{
      if (res.data.success) {
        const data = res.data.data
        this.setState({listEstados:data})
      }
      else {
        alert('Lista vazia')
      }
    })
    .catch(error=>{
      alert("Error server "+error)
    })
  
   }  

  limpar_cnpj_nao_encontrado() {
    this.setState({      
      campCnpj:"",          
      campNome: "",
      campNome_fantasia:"",      
    });
   } 

   estadoChange(event) {     
    this.setState({        
        campEstadoId: event.target.value
    });    
 } 
cepchange(e) {
  this.setState({ campCep: cepMask(e.target.value) })
 // if (this.state.campCep.length > 0) {
 //   this.handleClick(e)
 // }
}
enderecochange(e) {
  this.setState({ campEndereco: e.target.value })
}

numerochange(e) {
  this.setState({ campNumero: e.target.value })
}
complementochange(e) {
  this.setState({ campComplemento: e.target.value })
}
bairrochange(e) {
  this.setState({ campBairro: e.target.value })
}
cidadechange(e) {
  this.setState({ campCidade: e.target.value })
}

limpar_endereco() {
  this.setState({ 
    campEndereco: "",
    campNumero: "",
    campComplemento:"",
    campCelular:"",
    campCidade:"",
    campEstadoId:0,
    estadoSelecionado: "",   
    campBairro:"", 
    mensagem_cep: '',  
    mensagem_endereco: '',  
    mensagem_numero: '',  
    mensagem_complemento: '',      
    mensagem_estado: '',  
    mensagem_cidade: '',  
    mensagem_bairro: '',      
    validate: {     
      enderecoState: '',
      numeroState: '',     
      complementoState: '',
      bairroState: '',          
      cidadeState: '',     
      estadoState: '',     
    }      
  });
 } 

handleClick(e) {    
  const base = e.target.value;
  const estadoId = "";
  const { validate } = this.state
  
  //console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => {           
      //console.log('Busca uF '+JSON.stringify(endereco.uf, null, "    "));                
      api.get(`/estado/get/${endereco.uf}`)
      .then(res=>{        
        validate.enderecoState = ''  
        validate.cidadeState = ''  
        validate.bairroState = ''  
        validate.estadoState = ''  
        console.log(JSON.stringify(res.data.data.length, null, "    "));          

        if (res.data.data.length !== 0) {      
          console.log(JSON.stringify(res.data, null, "    "));          
          
          if (endereco.logradouro !== "") {
             validate.enderecoState = 'has-success'         
          }
          if (endereco.localidade !== "") {
            validate.cidadeState = 'has-success'
          }
          if (endereco.bairro !== "") {
            validate.bairroState = 'has-success'
          } 
          if (endereco.uf !== "") {
            validate.estadoState = 'has-success'
          }           
          if (endereco.complemento !== "") {
            validate.complementoState = 'has-success'         
          }
          
          this.setState({                    
            cep_encontrado: 'encontrado',
            campCep: endereco.cep,
            campEndereco: endereco.logradouro,
            campCidade: endereco.localidade,
            campComplemento: '',
            campBairro: endereco.bairro,
            campEstadoId: res.data.data[0].id, // endereco.uf,           
            estado_selecionado: endereco.uf,
            campComplemento: endereco.complemento
          }); 

          //console.log(JSON.stringify(this.state, null, "    "));
        } else {  
       
          validate.cepState = 'has-danger'
          this.setState({             
              validate,
              cep_encontrado: '',
              mensagem_cep: 'O cep não encontrado', 
              campCep: "",
              campEndereco: "",
              campCidade: "",
              campBairro: "",
              campEstadoId: 0, 
              estado_selecionado: ""
          })            

        } 
      })        
      .catch(error=>{
        alert("Error server "+error)
      })
         
         //console.log(JSON.stringify(this.state, null, "    ")); 
        // this.estadoChange = this.estadoChange.bind(this); 
      });
      
    //}
    }  else {
       this.limpar_endereco();
    }

};

cep_preenchido(cep) {    
  const base = cep;
  const estadoId = "";
  const { validate } = this.state
  
  //console.log('BASE '+JSON.stringify(base.replace('-',''), null, "    "));                

  if (base.length > 0) {
   buscadorcep(base.replace('-','')).
     then(endereco => {           
      //console.log('Busca uF '+JSON.stringify(endereco.uf, null, "    "));                
      api.get(`/estado/get/${endereco.uf}`)
      .then(res=>{        
        validate.enderecoState = ''  
        validate.cidadeState = ''  
        validate.bairroState = ''  
        validate.estadoState = ''  
        //console.log(JSON.stringify(res.data.data.length, null, "    "));          

        if (res.data.data.length !== 0) {      
          console.log(JSON.stringify(res.data, null, "    "));          
          
          if (endereco.logradouro !== "") {
             validate.enderecoState = 'has-success'         
          }          
          //validate.cepState = 'has-success'
          if (endereco.localidade !== "") {
            validate.cidadeState = 'has-success'
          }
          if (endereco.bairro !== "") {
            validate.bairroState = 'has-success'
          } 
          if (endereco.uf !== null) {
            validate.estadoState = 'has-success'
          }           
          if (endereco.complemento !== null) {
            validate.complementoState = 'has-success'
          }           
          
          this.setState({                    
            cep_encontrado: 'encontrado',
            campCep: endereco.cep,
            campEndereco: endereco.logradouro,
            campCidade: endereco.localidade,
            campBairro: endereco.bairro,
            campEstadoId: res.data.data[0].id, // endereco.uf,           
            estado_selecionado: endereco.uf,
            campComplemento: endereco.complemento
          }); 

          //console.log(JSON.stringify(this.state, null, "    "));
        } else {  
       
          validate.cepState = 'has-danger'
          this.setState({             
              validate,
              cep_encontrado: '',
              mensagem_cep: 'O cep não encontrado', 
              campCep: "",
              campEndereco: "",
              campCidade: "",
              campBairro: "",
              campEstadoId: 0, 
              estado_selecionado: ""
          })            

        } 
      })        
      .catch(error=>{
        alert("Error server "+error)
      })
         
         //console.log(JSON.stringify(this.state, null, "    ")); 
        // this.estadoChange = this.estadoChange.bind(this); 
      });
      
    //}
    }  else {
       this.limpar_endereco();
    }

};

verificaCep() {
  const { validate } = this.state
  //console.log('verificaCep - '+JSON.stringify(this.state, null, "    "));
     if (this.state.campCep.length == 0) {
        this.limpar_endereco()
        validate.numeroState = ''     
        validate.complementoState = ''
        validate.bairroState = ''          
        validate.cidadeState = ''     
        validate.estadoState = ''
        validate.enderecoState = ''
        validate.cepState = 'has-danger'
        this.setState({           
          inicio: 1,       
          mensagem_cep: 'O campo CEP é obrigatório.'            
        })            
        this.setState({ validate })
    }   
 }

 verificaNumero() {
  const { validate } = this.state
     if (this.state.campNumero == "") {
      validate.numeroState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,        
        mensagem_numero: 'O campo Numero do Endereço é obrigatório.'  
       })            
     }      
 }

 verificaComplemento() {
  const { validate } = this.state
     if (this.state.campComplemento == "") {
      validate.complementoState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,             
        mensagem_complemento: 'O campo Complemento do Endereço é obrigatório.'  
       })             
     }      
 }

 verificaBairro() {
  const { validate } = this.state
     if (this.state.campBairro == "") {
      validate.bairroState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,       
        mensagem_bairro: 'O campo Bairro do Endereço é obrigatório.'  
       })           
     }      
 }
 verificaCidade() {
  const { validate } = this.state
     if (this.state.campCidade == "") {
      validate.cidadeState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_cidade: 'O campo cidade do Endereço é obrigatório.'  
       })        
     }      
 }
 verificaEndereco(e) {
  const { validate } = this.state
   //console.log('on blur '+e.target.value)
     if (e.target.value.length == 0) {           
      validate.enderecoState = 'has-danger'      
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_endereco: 'O campo Endereço é obrigatório.'  
       })            
     } else {                 
      validate.enderecoState = 'has-success'      
      this.setState({ 
        validate,
        mensagem_endereco: ''  
       })    
     }     
 }
verificaEstado() {
  const { validate } = this.state
    
     if (this.state.campEstadoId == 0) {

      validate.estadoState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 1,
        mensagem_estado: 'O campo Estado é obrigatório'  
       })      
     } else if (this.state.campEstadoId == "Selecione o estado") {
      validate.estadoState = 'has-danger'
      this.setState({ 
        validate,
        inicio: 2,
        mensagem_estado: 'O campo Estado é obrigatório'  
       })      
     }          
 }


validaEnderecoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.enderecoState = 'has-danger'
      this.setState({ 
          inicio: 1,
          mensagem_endereco: 'O campo Endereço é obrigatório.' 
      })  
    } else if (e.target.value.length > 0) {
      validate.enderecoState = 'has-success'      
      this.setState({           
        inicio: 2
      })    
    }  
    this.setState({ validate })    
}
validaNumeroChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.numeroState = 'has-danger'
      this.setState({ 
          inicio: 1,
          mensagem_numero: 'O campo Número é obrigatório.' 
      })  
    } else {
      validate.numeroState = 'has-success'  
      this.setState({           
        inicio: 2
      })
     
    }  
    this.setState({ validate })   
   
}
validaBairroChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.bairroState = 'has-danger'
      this.setState({ 
        inicio: 1,
        mensagem_bairro: 'O campo Bairro é obrigatório.' 
      })  
    } else {
      validate.bairroState = 'has-success'  
      this.setState({           
        inicio: 2
      })      
    }  
    this.setState({ validate })  
}
validaCidadeChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.cidadeState = 'has-danger'
      this.setState({ 
        inicio: 1,
        mensagem_cidade: 'O campo Cidade é obrigatório.' 
      })  
    } else {
      validate.cidadeState = 'has-success'  
      this.setState({           
        inicio: 2
      })     
    }  
    this.setState({ validate })    
}
validaComplementoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.complementoState = 'has-danger'
      this.setState({ 
        inicio: 1,
        mensagem_complemento: 'O campo Complemento é obrigatório.' 
      })  
    } else {
      validate.complementoState = 'has-success'       
      this.setState({           
        inicio: 2
      })     
      this.verifica_botao(this.state.inicio) 
    }  
    this.setState({ validate })
    
}
validaEstadoChange(e){
  const { validate } = this.state
  
    if (e.target.value.length == 0) {
      validate.estadoState = 'has-danger'
      this.setState({ 
         inicio: 1,
         mensagem_estado: 'O campo Estado é obrigatório.' 
      })  
    } else {
      validate.estadoState = 'has-success'  
      this.setState({           
        inicio: 2
      })     
    }  
    this.setState({ validate })
    
}
validaCepChange(e){
  const { validate } = this.state
  //console.log('teste cep '+e.target.value);
    if (e.target.value.length < 9) {
      validate.cepState = 'has-danger'
      this.setState({ 
         inicio: 1,
         mensagem_cep: 'CEP inválido' 
      })  
    } else if (e.target.value.length == 9) {      
            validate.cepState = 'has-success'                  
            this.setState({ 
              busca_cep: e.target.value,
              mensagem_cep: ''                                            
            })
            
        this.handleClick(e);
    }      
    this.setState({ validate })
}

loadFillData(){
  //console.log(JSON.stringify(this.state.listEstados, null, "    ")); 
  //console.log(JSON.stringify(this.state.campEstadoId, null, "    ")); 
  
  return this.state.listEstados.map((data)=>{          
    return(
      <option key={data.nome} value={data.id}>{data.nome} </option>
    )
  })
}
verifica_cep() {

   if (this.state.cep_encontrado.length > 0) {
      
     return (
        <div className="endereco_cep">            
           <div className="texto_endereco">
             <div className="titulo_endereco">Endereço</div> 
             <div className="endereco">
              {this.state.campEndereco}    
              {this.state.campBairro}  {this.state.campCidade}  {this.state.estado_selecionado}
             </div>
           </div>
        </div>
     );
   
   } 
}

verifica_botao(inicio) {
  const { validate } = this.state
  
    if (inicio == 1) {
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} >
                <div className="d-flex justify-content-center">
                <label> Próximo </label>
                 </div>     
           </Box>           
       );   
    } else {
    
     // console.log(JSON.stringify(this.state, null, "    "));
      if ( validate.cepState == 'has-success' && validate.bairroState == 'has-success'  
        && validate.cidadeState == 'has-success' && validate.complementoState == 'has-success'
        && validate.enderecoState == 'has-success' && validate.estadoState == 'has-success'
        && validate.numeroState == 'has-success') {

            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco"  p={2} onClick={()=>this.sendUpdate()}>
              <div className="d-flex justify-content-center">
              <label> Próximo </label>
              </div>     
              </Box>           
            );         
      } else {
        return (
  
          <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2}>
                  <div className="d-flex justify-content-center">
                  <label> Próximo </label>
                   </div>     
             </Box>           
         );   
      }          
     }
  } 

sendUpdate(){        
 
  const datapost = {
    endereco: this.state.campEndereco,
    numero: this.state.campNumero,
    complemento: this.state.campComplemento,
    cidade: this.state.campCidade,
    bairro: this.state.campBairro,
    estadoId: this.state.campEstadoId,      
    cep: this.state.campCep,    
  }          

      //  console.log(JSON.stringify(datapost, null, "    ")); 
        api.put(`/motorista/update/${localStorage.getItem('logid')}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
           
              localStorage.setItem('logprogress', 75);  
             // localStorage.setItem('logid', userId);

              this.props.history.push('/veiculo_motorista');            
  
          }
          else {
            alert("Error 34 ")              
          }
        }).catch(error=>{
          alert("Error 34 ")
        })
}  

render(){  

return (
<div>    
<div className="d-flex justify-content">
  <div className="d-flex justify-content-start"> 
      <div className="area_direita">   
          <div>   
            <img className="titulo_logo" src="logo.png"/>
         </div>      
      </div>    
   </div>
   <div className="area_esquerda">     
          <div className="d-flex justify-content-around">
               <div className="botao_navegacao">
                 <Link to='/cadastro'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     <label>{this.verifica_nome_individual(this.state.campNome)}, agora me fale onde você mora. </label>             
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="close_black.png"/> </Link>                            
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={50} className="progressbar"/>
          </div>
          <div class="d-flex flex-column espacamento_caixa_texto">
              <div class="p-2"> 
              <label for="inputAddress">Cep *</label>          
                  <Form inline>
                      <Input
                      className="input_text"    
                      type="text"
                      name="nome"
                      id="examplnome"
                      placeholder=""
                      value={this.state.campCep}
                      valid={ this.state.validate.cepState === 'has-success' }
                      invalid={ this.state.validate.cepState === 'has-danger' }
                      onblur={this.verificaCep}
                      onKeyUp={this.verificaCep}                      
                   //   onFocus={ (e) => {                        
                   //     this.validaCepChange(e)
                   //   }}    
                      onChange={ (e) => {
                        this.cepchange(e)                       
                        this.validaCepChange(e)
                      }}    
                      maxlength="9"                                                                          
                    />     
                    <div className="naoseiocep">
                        <a className="alink" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei o cep</a> 
                    </div>                               
                    <FormFeedback 
                    invalid={this.state.validate.cepState}>
                        {this.state.mensagem_cep}
                    </FormFeedback>                                  
                </Form>    
              </div>
              <div class="p-2"> 
                <label for="inputAddress">Endereço *</label>              
                  <Input
                      className="input_text"      
                      type="text"
                      name="endereco"
                      id="examplnome"
                      placeholder=""
                      value={ this.state.campEndereco}
                      valid={ this.state.validate.enderecoState === 'has-success' }
                      invalid={ this.state.validate.enderecoState === 'has-danger' }
                      onBlur={this.verificaEndereco}
                      //onFocus={this.verificaEndereco}
                      //onKeyUp={this.verificaEndereco}
                      onChange={ (e) => {
                        this.enderecochange(e)                       
                        this.validaEnderecoChange(e)
                      }}           
                      maxlength="100"                                                               
                    />                                
                    <FormFeedback 
                    invalid={this.state.validate.enderecoState}>
                        {this.state.mensagem_endereco}
                    </FormFeedback>   
              </div> 
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress">Número *</label>  
                       <Input
                          className="input_numero"   
                          type="text"
                          name="numero"
                          id="examplnome"
                          placeholder=""
                          value={this.state.campNumero}
                          valid={ this.state.validate.numeroState === 'has-success' }
                          invalid={ this.state.validate.numeroState === 'has-danger' }
                          onKeyUp={this.verificaNumero}
                          onChange={ (e) => {
                            this.numerochange(e)                       
                            this.validaNumeroChange(e)
                          }}      
                          maxlength="15"                                                                    
                        />                                
                        <FormFeedback 
                        invalid={this.state.validate.numeroState}>
                            {this.state.mensagem_numero}
                        </FormFeedback>     
                       </div> 
                       
                       <div>
                          <label className="label_complemento" for="inputAddress">Complemento *</label>
                          <Input
                            className="input_complemento"    
                            type="text"
                            name="complemento"
                            id="examplnome"
                            placeholder=""
                            value={this.state.campComplemento}
                            valid={ this.state.validate.complementoState === 'has-success' }
                            invalid={ this.state.validate.complementoState === 'has-danger' }
                            onKeyUp={this.verificaBairro}
                            onChange={ (e) => {
                              this.complementochange(e)                       
                              this.validaComplementoChange(e)
                            }}          
                            maxlength="60"                                                                
                          />                                
                          <FormFeedback className="label_complemento"     
                          invalid={this.state.validate.complementoState}>
                              {this.state.mensagem_complemento}
                          </FormFeedback>       
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">    
                 <div class="d-flex justify-content-start">
                       <div>
                          <label for="inputEmail4">Bairro *</label>                                                        
                            <Input
                            className="input_bairro"    
                            type="text"
                            name="bairro"
                            id="examplnome"
                            placeholder=""
                            value={this.state.campBairro}
                            valid={ this.state.validate.bairroState === 'has-success' }
                            invalid={ this.state.validate.bairroState === 'has-danger' }
                            onBlur={this.verificaBairro}
                            onChange={(e) => {
                              this.bairrochange(e)                       
                              this.validaBairroChange(e)
                            }}                                                                          
                            maxlength="75"
                          />                                
                          <FormFeedback 
                          invalid={this.state.validate.bairroState}>
                              {this.state.mensagem_bairro}
                          </FormFeedback>     
                       </div>
                     <div>
                      <label className="label_cidade" for="inputAddress">Cidade *</label>
                      <Input
                        className="input_cidade"   
                        type="text"
                        name="numero"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campCidade}
                        valid={ this.state.validate.cidadeState === 'has-success' }
                        invalid={ this.state.validate.cidadeState === 'has-danger' }
                        onBlur={this.verificaCidade}
                        onChange={ (e) => {
                          this.cidadechange(e)                       
                          this.validaCidadeChange(e)
                        }}            
                        maxlength="50"                                                              
                      />                                
                      <FormFeedback className="label_cidade"
                      invalid={this.state.validate.cidadeState}>
                          {this.state.mensagem_cidade}
                      </FormFeedback>  
                     </div>                                        
               </div>    
            </div>      
              <div class="p-2">    
                 <div class="d-flex justify-content-start">                   
                   <div>
                        <label>Estado *</label>
                        <Input 
                            className="input_estado"    
                            type="select" 
                            name="select" 
                            id="exampleSelect" 
                            value={this.state.campEstadoId}
                            valid={ this.state.validate.estadoState === 'has-success' }
                            invalid={ this.state.validate.estadoState === 'has-danger' }
                            onBlur={this.verificaEstado}
                            onChange={ (e) => {
                              this.estadoChange(e)                       
                              this.validaEstadoChange(e)
                            }}                                                          >
                            <option selected>Selecione o estado</option>               
                            {this.loadFillData()}                   
                        </Input>
                        <FormFeedback 
                          invalid={this.state.validate.estadoState}>
                              {this.state.mensagem_estado}
                        </FormFeedback>        
                 </div>        
              </div>                    
            </div>   
            </div>       
            {this.verifica_botao(this.state.inicio)}                                       
    </div>                 
   </div>  
</div> 
  );
} 
}
export default empresarialComponent;