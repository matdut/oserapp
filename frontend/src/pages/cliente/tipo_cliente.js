import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {Link} from 'react-router-dom';
import { withTheme } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  cabacalho: {
    backgroundColor: '#0F074E',    
    width: '100% !important',
    lineHeight: '320px !important',
            
  },  
  botao: {
    margin: theme.spacing(1),
    width: '384px !important',
    lineHeight: '129px !important', 
    marginLeft: '280px !important',  
    marginRight: '280px !important',  
    textAlign: 'left !important',
    fontSize: '22px !important'  
  },
  espacamento_seta: {
    marginLeft: '48px'
  },
  texto_logo: {  
    color: 'white',
    marginTop: '34px !important',
    marginLeft: '50px !important',  
    width: '518px !important',  
   lineHeight: '190px !important',  
    fontSize: '40px !important'  
  },
  logo_inicio: {  
    marginTop: '14px !important',
    marginLeft: '16px !important',
    width: '450px !important',  
    lineHeight: '42px !important',
    marginLeft: '16px !important',
  },
  logo_image: {    
    width: '150px !important',  
    //lineHeight: '42px !important',  
  },
  botao_close: {   
    marginTop: '4px',      
    width: '24px !important',
    lineHeight: '50px !important',        
  },
  caixa_botao_close: {  
    marginTop: '32px !important',
    marginLeft: '1252px !important',  
  },
  botao_navegacao: {  
    marginTop: '4px',  
    width: '108px',
    lineHeight: '50px',      
  }  
}));

export default function Tipo_cliente() {
  const classes = useStyles();
  
 // localStorage.removeItem('logemail');
 // localStorage.removeItem('lognome');       
 // localStorage.removeItem('logid');  
 // localStorage.removeItem('logperfil'); 
 // localStorage.removeItem('logcep');      
    
  return (
   <div>
     <div className={classes.cabacalho}>   
      <div className="d-flex justify-content-around">
               <div className={classes.botao_navegacao}>
                   <img className={classes.logo_image} src="logo.png"/>
               </div>                  
               <div>
                 <div className="titulo_representante">                                              
                 </div>
               </div>   
               
               <div>
                 <div className={classes.botao_navegacao}>
                       <Link to='/'><img className={classes.botao_close} src="close.png"/> </Link>     
                  </div>   
               </div>   
             
      </div>  
          <div className="d-flex justify-content-around">
               <div className={classes.botao_navegacao}>               
               </div>                  
               <div>                 
                 <div className={classes.texto_logo}>
                 <label>   Olá! Qual tipo de cadastro?</label>
                 </div>
               </div>   
               
               <div>
                 <div className={classes.botao_navegacao}>                       
                  </div>   
               </div>   
             
          </div>        
    </div>         
    <div className="d-flex justify-content-center">       
        <div className={classes.botao}>
            <Link to='/empresa'> Empresarial <i className="fa fa-chevron-right espacamento_seta"  aria-hidden="true"></i></Link> 
        </div>        
        <div className={classes.botao}>
          <Link to='/cliente'> Individual <i className="fa fa-chevron-right espacamento_seta_2" aria-hidden="true"></i></Link>                 
        </div>           
    </div>    
    <br/>
    <br/>
    <br/>
    <br/>
    </div> 
  );
}