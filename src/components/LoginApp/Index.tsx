import { ButtonSubmit } from "../Button/Button.styles";
import { TesteStyle, Login } from "./LoginApp.style";
import { useForm, SubmitHandler } from "react-hook-form";
import api from "../../api"
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import avatar from "../../assets/avatar.png"

type Inputs = {
    username: string,
    password: string,
}

const LoginPageApp = () => {
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const submitInfos = () => {
      api.post(`/index`, {
        username: data.username,
        password: data.password,
      }).then((res) => {
        localStorage.setItem('token', `${String(res.data.token)}`);
        localStorage.setItem('_id', `${String(res.data.User._id)}`);
        localStorage.setItem('photo', `${String(res.data.User.photo)}`)
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
    }
    submitInfos()
    setTimeout(() => navigate('/users'), 1000) 

  };

  return (
    <>
      <Login className="Login">
        <TesteStyle onSubmit={handleSubmit(onSubmit)}>
            <div className="row"> 
            <label className="login">
             <p className="remember">DESAFIO SHARENERGY - THIAGO RODRIGUES</p>
             <div className="col-lg-2 col-md-12 col-sm-12 col-12 text-center logo"><img src={avatar} alt="logo" width={410}/></div>
            </label>
            </div>
            <div className='row'>
            <div className='col-12 col-md-12 '>
                <label className='username'>
                Username
                <input {...register('username', { required: true })} placeholder="Digite aqui o seu Username" />
                </label>
            </div>
            </div>
            <div className='row'>
            <div className='col-12 col-md-12 '>
                <label className='password'>
                Senha
                <input {...register('password', { required: true })} placeholder="Digite aqui a sua Senha" />
                </label>
            </div>
            </div>
            <div className="row"> 
            <label className="login">
              <ButtonSubmit  >Login</ButtonSubmit>
             <p className="remember"><input className="checkbox" type="checkbox" /> Remember me</p>
            </label>
            </div>
        </TesteStyle>
      </Login>
    </>
  )
}

export default LoginPageApp