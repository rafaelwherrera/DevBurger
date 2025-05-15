import { api } from "../../services/api"
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "../../components/Button";
import {
    Container,
    Card,
    Title,
    Form,
    InputGroup,
    Label,
    Input,
    Error,
} from "./styles";

const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup.string().email("Email inválido").required("Email obrigatório"),
    password: yup.string().min(6, "Mínimo 6 caracteres").required("Senha obrigatória"),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Senhas não coincidem")
        .required("Confirme a senha"),
    rua: yup.string().required("Rua obrigatória"),
    numero: yup.number().required("Número obrigatório"),
    bairro: yup.string().required("Bairro obrigatório"),
    cep: yup
        .string()
        .matches(/^\d{5}-\d{3}$/, "CEP inválido")
        .required("CEP obrigatório"),
});

export function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = useForm({ resolver: yupResolver(schema) });

    const password = watch("password");
    const confirmPassword = watch("confirmPassword");
    const cep = watch("cep");
    const senhaIgual = password === confirmPassword && confirmPassword !== "";

    useEffect(() => {
        const fetchAddress = async () => {
            const cleanedCep = cep?.replace(/\D/g, '');
            if (cleanedCep?.length === 8) {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${cleanedCep}/json/`);
                    const { logradouro, bairro } = response.data;

                    if (logradouro) setValue("rua", logradouro);
                    if (bairro) setValue("bairro", bairro);
                } catch (error) {
                    toast.error("Erro ao buscar endereço pelo CEP");
                }
            }
        };

        fetchAddress();
    }, [cep, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await api.post('/users', {
                name: data.name,
                email: data.email,
                password: data.password,
                rua: data.rua,
                numero: data.numero,
                bairro: data.bairro,
                cep: data.cep,
            }, {
                validateStatus: () => true,
            });
    
            if (response.status === 201 || response.status === 200) {
                toast.success("Cadastro realizado com sucesso!");
                navigate("/login");
            } else if (response.status === 400) {
                toast.error("Email já cadastrado!");
            } else {
                toast.error("Erro ao cadastrar. Tente novamente.");
            }
        } catch (error) {
            toast.error("Erro no servidor. Verifique o backend.");
            console.error(error);
        }
    };
    

    return (
        <Container>
            <Card>
                <Title>Criar Conta</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <InputGroup>
                        <Label>Nome</Label>
                        <Input {...register("name")} />
                        <Error>{errors.name?.message}</Error>
                    </InputGroup>

                    <InputGroup>
                        <Label>Email</Label>
                        <Input {...register("email")} />
                        <Error>{errors.email?.message}</Error>
                    </InputGroup>

                    <InputGroup>
                        <Label>Senha</Label>
                        <Input type="password" {...register("password")} />
                        <Error>{errors.password?.message}</Error>
                    </InputGroup>

                    <InputGroup>
                        <Label>Confirmar Senha</Label>
                        <Input type="password" {...register("confirmPassword")} />
                        <Error>{errors.confirmPassword?.message}</Error>
                        {!errors.confirmPassword && confirmPassword && (
                            <p style={{ color: senhaIgual ? 'green' : 'red' }}>
                                {senhaIgual ? '✔ Senhas iguais' : '✖ Senhas diferentes'}
                            </p>
                        )}
                    </InputGroup>

                    <InputGroup>
                        <Label>CEP</Label>
                        <Input {...register("cep")} placeholder="00000-000" />
                        <Error>{errors.cep?.message}</Error>
                    </InputGroup>

                    <InputGroup>
                        <Label>Rua</Label>
                        <Input {...register("rua")} />
                        <Error>{errors.rua?.message}</Error>
                    </InputGroup>

                    <InputGroup>
                        <Label>Número</Label>
                        <Input type="number" {...register("numero")} />
                        <Error>{errors.numero?.message}</Error>
                    </InputGroup>

                    <InputGroup>
                        <Label>Bairro</Label>
                        <Input {...register("bairro")} />
                        <Error>{errors.bairro?.message}</Error>
                    </InputGroup>

                    <Button type="submit">Cadastrar</Button>
                </Form>
            </Card>
        </Container>
    );
}
