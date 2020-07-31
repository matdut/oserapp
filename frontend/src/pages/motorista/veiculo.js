import React from 'react';
import Box from '@material-ui/core/Box';
import {Form, Progress, Input, FormFeedback, Select, Button, Alert } from 'reactstrap';
import {Link} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import api from '../../services/api';
import './empresarial.css';

const andamento_cadastro = localStorage.getItem('logprogress');     
//const cep_empresa = localStorage.getItem('logcep');     
const userId = localStorage.getItem('logid');
const buscadorcep = require('buscadorcep');

//import { Area_direita, Area_esquerda, Titulo_logo, Logo, Titulo_representante, Preview } from "./style_empresarial";
class empresarialComponent extends React.Component{  

  constructor(props){
    super(props);
    this.state = {      
      campCarro: "",
      campModelo: "",
      campPlaca: "",
      campAno: "",
      campCor: "",
      campApolice: "",
      campSeguradoraId: 0,
      listEstados:[],
      listaMarcas:[],
      listaModelos:[],
      listSeguradoras:[],
        mensagem_carro: '',  
        mensagem_placa: '',  
        mensagem_cor: '',  
        mensagem_ano: '',  
        mensagem_apolice: '',  
        mensagem_seguro: '',  
        mensagem_modelo: '', 
      validate: {         
        carroState: '',          
        modeloState: '',          
        corState: '',     
        placaState: '',     
        anoState: '',     
        apoliceState: '',     
        seguroState: '',     
      }    
    }
   
    this.carroChange = this.carroChange.bind(this);
    this.modeloChange = this.modeloChange.bind(this);
    this.corChange = this.corChange.bind(this);      
    this.placaChange = this.placaChange.bind(this);
    this.anoChange = this.anoChange.bind(this);  
    this.apoliceChange = this.apoliceChange.bind(this);
    this.seguroChange = this.seguroChange.bind(this);  
    
    this.verificaCarro = this.verificaCarro.bind(this);  
    this.verificaModelo = this.verificaModelo.bind(this);  
    this.verificaCor = this.verificaCor.bind(this);  
    this.verificaAno = this.verificaAno.bind(this);  
    this.verificaPlaca = this.verificaPlaca.bind(this);  
    this.verificaApolice = this.verificaApolice.bind(this);  
    this.verificaSeguro = this.verificaSeguro.bind(this);  

    this.validaCarroChange = this.validaCarroChange.bind(this);  
    this.validaModeloChange = this.validaModeloChange.bind(this);  
    this.validaCorChange = this.validaCorChange.bind(this);  
    this.validaAnoChange = this.validaAnoChange.bind(this);  
    this.validaPlacaChange = this.validaPlacaChange.bind(this);  
    this.validaApoliceChange = this.validaApoliceChange.bind(this);  
    this.validaSeguroChange = this.validaSeguroChange.bind(this);  
  }

  componentDidMount(){  

    this.loadmarcas()
    
  }

  carroChange(e) {
    this.setState({ campCarro: e.target.value })
  }
  modeloChange(e) {
    this.setState({ campModelo: e.target.value })
  }
  corChange(e) {
    this.setState({ campCor: e.target.value })
  }
  anoChange(e) {
    this.setState({ campAno: e.target.value })
  }
  placaChange(e) {
    this.setState({ campPlaca: e.target.value })
  }
  apoliceChange(e) {
    this.setState({ campApolice: e.target.value })
  }
  seguroChange(e) {
    this.setState({ campSeguradoraId: e.target.value })
  }

  verificaCarro() {
    const { validate } = this.state
       if (this.state.campCarro.length == 0) {
        validate.carroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_carro: 'O campo Carro é obrigatório.'  
         })      
       }      
   }
   verificaModelo() {
    const { validate } = this.state
       if (this.state.campModelo.length == 0) {
        validate.modeloState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_modelo: 'O campo Modelo é obrigatório.'  
         })      
       }      
   }
   verificaAno() {
    const { validate } = this.state
       if (this.state.campAno.length == 0) {
        validate.anoState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_ano: 'O campo Ano é obrigatório.'  
         })      
       }      
   }
   verificaPlaca() {
    const { validate } = this.state
       if (this.state.campPlaca.length == 0) {
        validate.placaState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_placa: 'O campo Placa é obrigatório.'  
         })      
       }      
   }
   verificaCor() {
    const { validate } = this.state
       if (this.state.campCor.length == 0) {
        validate.corState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_cor: 'O campo Cor é obrigatório.'  
         })      
       }      
   }
   verificaApolice() {
    const { validate } = this.state
       if (this.state.campApolice.length == 0) {
        validate.apoliceState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_apolice: 'O campo Apolice é obrigatório.'  
         })      
       }      
   }
   verificaSeguro() {
    const { validate } = this.state
       if (this.state.campSeguradoraId.length == 0) {
        validate.seguroState = 'has-danger'
        this.setState({ 
          validate,
          mensagem_seguro: 'O campo Seguro é obrigatório.'  
         })      
       }      
   }

   validaCarroChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.carroState = 'has-danger'
        this.setState({ mensagem_carro: 'O campo Carro é obrigatório.' })  
      } else {
        validate.carroState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaModeloChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.modeloState = 'has-danger'
        this.setState({ mensagem_modelo: 'O campo Modelo é obrigatório.' })  
      } else {
        validate.modeloState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaCorChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.corState = 'has-danger'
        this.setState({ mensagem_cor: 'O campo Cor é obrigatório.' })  
      } else {
        validate.corState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaPlacaChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.placaState = 'has-danger'
        this.setState({ mensagem_placa: 'O campo Placa é obrigatório.' })  
      } else {
        validate.placaState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaAnoChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.anoState = 'has-danger'
        this.setState({ mensagem_ano: 'O campo Ano é obrigatório.' })  
      } else {
        validate.anoState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaApoliceChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.apoliceState = 'has-danger'
        this.setState({ mensagem_telefone1: 'O campo Apolice é obrigatório.' })  
      } else {
        validate.apoliceState = 'has-success'       
      }  
      this.setState({ validate })
  }
  validaSeguroChange(e){
    const { validate } = this.state
    
      if (e.target.value.length == 0) {
        validate.seguroState = 'has-danger'
        this.setState({ mensagem_seguro: 'O campo Seguro é obrigatório.' })  
      } else {
        validate.seguroState = 'has-success'       
      }  
      this.setState({ validate })
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

 loadmarcas() {
  const { validate } = this.state  
    
    api.get('http://fipeapi.appspot.com/api/1/carros/marcas.json')
    .then((val)=>{
      console.log(JSON.stringify(val.data, null, "    "));
      if (val.data !== null) {

        this.setState({ 
          listaMarcas: val.data     
        });  
        
      } else {
         validate.cnpjState = 'has-danger'
         this.setState({ mensagem_CNPJ: 'Lista não encontrada' })  
      }
        
     // console.log('callapi: ' + JSON.stringify(val))
    }).catch(error=>{
      validate.cnpjState = 'has-danger'
      this.setState({           
          mensagem_CNPJ: 'Lista não encontrada' 
       })  
    })
     //})
  //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));  
 }

 loadmodelo() {
  const { validate } = this.state  
    
    api.get('http://fipeapi.appspot.com/api/1/carros/veiculos/21.json')
    .then((val)=>{
      console.log(JSON.stringify(val.data, null, "    "));
      if (val.data !== null) {

        this.setState({ 
          listaMarcas: val.data     
        });  
        
      } else {
         validate.cnpjState = 'has-danger'
         this.setState({ mensagem_CNPJ: 'Lista não encontrada' })  
      }
        
     // console.log('callapi: ' + JSON.stringify(val))
    }).catch(error=>{
      validate.cnpjState = 'has-danger'
      this.setState({           
          mensagem_CNPJ: 'Lista não encontrada' 
       })  
    })
     //})
  //.catch((error) => console.log('callapi:'+ JSON.stringify(error)));  
 }

loadFillData(){
  //console.log(JSON.stringify(this.state.listEstados, null, "    ")); 
  //console.log(JSON.stringify(this.state.campEstadoId, null, "    ")); 
  
  return this.state.listaVeiculos.map((data)=>{          
    return(
      <option key={data.name} value={data.name}>{data.name} </option>
    )
  })
}

verifica_botao(inicio) {
   // console.log(JSON.stringify(this.state, null, "    "));
   // console.log(JSON.stringify(inicio, null, "    "));
    if (inicio == 1) {
      return (
  
        <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} onClick={()=>this.sendUpdate()}>
                <div className="d-flex justify-content-center">
                    Próximo
                 </div>     
           </Box>           
       );   
    } else {
    
     // console.log(JSON.stringify(' mensagem  ', null, "    "));
      if (this.state.mensagem_carro.length == 0 && this.state.mensagem_ano.length == 0  
        && this.state.mensagem_apolice.length == 0 && this.state.mensagem_cor.length == 0 
        && this.state.mensagem_ano.length == 0 && this.state.mensagem_modelo.length == 0 
        && this.state.mensagem_placa.length == 0 && this.state.mensagem_seguro.length == 0)  {

        //  console.log(JSON.stringify(' validacao campo ', null, "    "));
          if (this.state.campCarro.length !== 0 && this.state.campAno.length !== 0  
            && this.state.campApolice.length !== 0 && this.state.campCor.length !== 0 
            && this.state.campSeguradoraId.length !== 0 && this.state.campPlaca.length !== 0 
            && this.state.campModelo.length !== 0 && this.state.campModelo.length !== 0) {

            return (
              <Box bgcolor="error.main" color="error.contrastText" className="botao_cadastro_endereco" p={2}>
              <div className="d-flex justify-content-center">
                  Próximo
              </div>     
              </Box>           
            );
        } else {
          return (
  
            <Box bgcolor="text.disabled" color="background.paper" className="botao_cadastro_endereco"  p={2} onClick={()=>this.sendUpdate()}>
                    <div className="d-flex justify-content-center">
                        Próximo
                     </div>     
               </Box>           
           );   
        }
      }          
     }
  } 

  loadSeguradorasData(){
  
    return this.state.listSeguradoras.map((data)=>{          
      return(
        <option key={data.nome} value={data.id}>{data.nome} </option>
      )
    })
  
    // var users = [];   
    //console.log('Estado - '+this.state.campEstadoId); 
  
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
        api.put(`/motorista/update/${userId}`, datapost)
        .then(response=>{
          if (response.data.success==true) {                        
           
              localStorage.setItem('logprogress', this.state.progresso);  
              this.props.history.push('/empresa_senha');            
  
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
                 <Link to='/tipo'> <i className="fa fa-chevron-left fa-2x espacamento_seta"  aria-hidden="true"></i> </Link>
               </div>                  
               <div>
                 <div className="titulo_representante">                
                     Pedro, cadastre o seu veículo.            
                 </div>
               </div>   
               
               <div>
                  <div className="botao_navegacao">
                     <Link to='/'><img className="botao_close espacamento_seta" src="close_black.png"/> </Link>                            
                  </div>   
               </div>   
             
          </div>              
          <div>
                <Progress color="warning" value={this.state.progresso} className="progressbar"/>
          </div>
          <div class="d-flex flex-column espacamento_caixa_texto">              
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div>                      
                       <Autocomplete
                          id="combo-box-demo"
                          options={this.state.listaMarcas}
                          getOptionLabel={(option) => option.name}
                          style={{ width: 220 }}
                          //value={this.state.campCarro}
                          onChange={(e) => { this.carroChange(e)} }
                          renderInput={(params) => <TextField {...params} label="Selecione uma marca" variant="outlined" />}
                        />                                               
                        <FormFeedback 
                        invalid={this.state.validate.carroState}>
                            {this.state.mensagem_carro}
                        </FormFeedback>            
                       </div> 
                       
                       <div>                       
                       <Autocomplete
                          id="combo-box-demo"
                          options={this.state.listaModelos}
                          getOptionLabel={(option) => option.name}
                          style={{ width: 220 }}                        
                          onChange={(e) => { this.modeloChange(e)} }
                          renderInput={(params) => 
                          <TextField {...params} label="Selecione o modelo" variant="outlined" />}
                        />                                                                       
                        <FormFeedback 
                        invalid={this.state.validate.modeloState}>
                            {this.state.mensagem_modelo}
                        </FormFeedback>      
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">               
                  <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress">Placa *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campPlaca}
                        valid={ this.state.validate.placaState === 'has-success' }
                        invalid={ this.state.validate.placaState === 'has-danger' }
                        onBlur={this.verificaPlaca}
                        onChange={ (e) => {
                          this.placaChange(e)                       
                          this.validaPlacaChange(e)
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.placaState}>
                          {this.state.mensagem_placa}
                      </FormFeedback>    
                       </div> 
                       
                       <div>
                       <label for="inputAddress">Ano *</label>
                      <Input              
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campAno}
                        valid={ this.state.validate.anoState === 'has-success' }
                        invalid={ this.state.validate.anoState === 'has-danger' }
                        onBlur={this.verificaAno}
                        onChange={ (e) => {
                          this.anoChange(e)                       
                          this.validaAnoChange(e)
                        }}    
                        maxlength="4"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.anoState}>
                          {this.state.mensagem_ano}
                      </FormFeedback>    
                       </div>                        
                  </div>
              </div> 
              <div class="p-2">    
                <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress">Cor *</label>
                      <Input                    
                        type="text"
                        name="nome"
                        id="examplnome"
                        placeholder=""
                        value={this.state.campCor}
                        valid={ this.state.validate.corState === 'has-success' }
                        invalid={ this.state.validate.corState === 'has-danger' }
                        onBlur={this.verificaCor}
                        onChange={ (e) => {
                          this.corChange(e)                       
                          this.validaCorChange(e)
                        }}    
                        maxlength="20"                                                                      
                      />                                
                      <FormFeedback 
                      invalid={this.state.validate.corState}>
                          {this.state.mensagem_cor}
                      </FormFeedback>    
                       </div>                                                       
                </div>    
            </div>      
            <div class="p-2">    
                <div class="d-flex justify-content-start">
                       <div>
                       <label for="inputAddress">Seguradora *</label>
                        <Input 
                            disabled = {this.state.dado_cadastral_disabled}   
                            type="select" 
                            name="select" 
                            id="exampleSelect" 
                            value={this.state.campSeguradoraId}
                            valid={ this.state.validate.seguroState === 'has-success' }
                            invalid={ this.state.validate.seguroState === 'has-danger' }
                            onBlur={this.verificaSeguro}
                            onChange={ (e) => {
                              this.seguradoraChange(e)                       
                              this.validaSeguroChange(e)
                            }}                                                          >
                            <option selected>Selecione a seguradora</option>               
                            {this.loadSeguradorasData()}      
                        </Input>
                        <FormFeedback 
                          invalid={this.state.validate.seguroState}>
                              {this.state.mensagem_seguro}
                        </FormFeedback>    
                       </div>      
                       <div>
                       <label for="inputAddress">Número Apólice *</label>
                        <Input
                            disabled = {this.state.dado_cadastral_disabled}   
                            type="text"
                            name="nome"
                            id="examplnome"
                            placeholder=""
                            value={this.state.campApolice}
                            valid={ this.state.validate.apoliceState === 'has-success' }
                            invalid={ this.state.validate.apoliceState === 'has-danger' }
                            onBlur={this.verificaApolice}
                            onChange={ (e) => {
                              this.apoliceChange(e)                       
                              this.validaApoliceChange(e)
                            }}    
                            maxlength="10"                                                                      
                          />                                
                          <FormFeedback 
                          invalid={this.state.validate.apoliceState}>
                              {this.state.mensagem_apolice}
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