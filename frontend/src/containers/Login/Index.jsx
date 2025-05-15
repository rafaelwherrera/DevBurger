import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../../hooks/UserContext";
import { api } from "../../services/api";
import { toast } from 'react-toastify';
import Logo from '../../assets/logo.svg';
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import {
  Container,
  LeftContainer,
  RightContainer,
  Title,
  Form,
  InputContainer,
  Link,
} from "./styles"

export function Login() {

  const navigate = useNavigate();
  const { putUserData } = useUser();

  const schema = yup
    .object({
      email: yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
      password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha'),
    })
    .required()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const { data: response } = await toast.promise(
        api.post('/session', {
          email: data.email,
          password: data.password,
        }),
        {
          pending: 'Verificando seus dados',
          success: {
            render({ data: res }) {
              const { user, token } = res.data;
              
              if (!user || !token) {
                throw new Error('dados do usuário não encontrados na resposta da API.');
              }
              
              localStorage.setItem('token', token);
              localStorage.setItem('devburger:userData', JSON.stringify(user));
  
              setTimeout(() => {
                if (user?.admin) {
                  navigate('/admin/pedidos');
                } else {
                  navigate('/');
                }
              }, 2000);
  
              return 'Seja Bem-Vindo(a)';
            }            
          },
          error: 'Email ou Senha Incorretos',
        }
      );
      
      if (response?.data?.user) {
        putUserData(response.data.user);
      } else {
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };
  


  return (
    <Container>
      <LeftContainer>
        <img src={Logo} alt="logo" />
      </LeftContainer>
      <RightContainer>
        <Title>
          Olá, seja bem vindo ao <span>Burger</span>! <br />
          Acesse com seu<br /><span>Login e senha.</span>
        </Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputContainer>
            <label>Email</label>
            <input type="email"  {...register("email")} />
            <p>{errors?.email?.message}</p>
          </InputContainer>

          <InputContainer >
            <label>Senha</label>
            <input type="password" {...register("password")} />
            <p>{errors?.password?.message}</p>
          </InputContainer>
          <Button type="submit">Entrar</Button>
        </Form>
        <p>Não possui conta? <Link to="/cadastro">Clique aqui</Link>.</p>
      </RightContainer>
    </Container>
  )
}