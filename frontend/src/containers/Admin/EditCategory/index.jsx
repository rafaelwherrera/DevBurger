import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import {
  Container,
  Form,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  ErrorMessage,
  Wrapper,
} from "./styles";

import { api } from "../../../services/api";

const schema = yup.object({
  name: yup.string().required("Digite o nome da categoria!"),
  description: yup.string().required("Digite a descrição da categoria!"),
});

export function EditCategory() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { category } = state;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setValue("name", category.name);
    setValue("description", category.description);
  }, [category, setValue]);

  const onSubmit = async (data) => {
    await toast.promise(
      api.put(`/categories/${category.id}`, data),
      {
        pending: "Editando categoria...",
        success: "Categoria editada com sucesso!",
        error: "Erro ao editar categoria.",
      }
    );
    setTimeout(() => {
      navigate("/admin/categorias");
    }, 2000);
  };

  return (
    <Wrapper>
      <Container>
        <h2>Editar Categoria</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputGroup>
            <Label>Nome</Label>
            <Input type="text" {...register("name")} />
            <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          </InputGroup>

          <InputGroup>
            <Label>Descrição</Label>
            <Input type="text" {...register("description")} />
            <ErrorMessage>{errors?.description?.message}</ErrorMessage>
          </InputGroup>

          <SubmitButton>Editar Categoria</SubmitButton>
        </Form>
      </Container>
    </Wrapper>

  );
}
