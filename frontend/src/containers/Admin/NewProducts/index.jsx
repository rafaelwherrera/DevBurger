import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Image } from "@phosphor-icons/react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import {
  Container,
  Form,
  InputGroup,
  Label,
  Input,
  LabelUpload,
  Select,
  SubmitButton,
  ErrorMessage,
  ContainerCheckbox,
} from './styles';
import { useState, useEffect } from "react";
import { api } from "../../../services/api";

const schema = yup.object({
  name: yup.string().required('Digite o nome do produto!'),
  price: yup.number().positive().required('Digite o preço do produto!').typeError('Digite o preço do produto!'),
  category: yup.object().required('Escolha uma categoria!'),
  offer: yup.bool(),
  file: yup
    .mixed()
    .test('required', 'Escolha um arquivo para continuar', (value) => {
      return value && value.length > 0;
    })
    .test('fileSize', 'Carregue arquivos até 5mb', (value) => {
      return value && value.length > 0 && value[0].size <= 5242880;
    })
    .test('type', 'Carregue apenas imagens PNG ou JPEG', value => {
      return (
        value &&
        value.length > 0 &&
        (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
      );
    }),
});

export function NewProducts() {
  const [fileName, setFileName] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      const { data } = await api.get('/categories');
      setCategories(data);
    }
    loadCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const productFormData = new FormData();
    productFormData.append('name', data.name);
    productFormData.append('price', data.price * 100);
    productFormData.append('category_id', data.category.id);
    productFormData.append('file', data.file[0]);
    productFormData.append('offer', data.offer);

    await toast.promise(api.post('/products', productFormData), {
      pending: 'Adicionando Produto...',
      success: 'Produto Cadastrado com Sucesso',
      error: 'Falha ao cadastrar o produto, tente novamente.',
    });

    setTimeout(() => {
      navigate('/admin/produtos');
    }, 2000);
  };

  return (
    <Container color="#15151f">
      <h2>Adicionar Novo Produto</h2>
      <Form onSubmit={handleSubmit(onSubmit)}>

        <InputGroup>
          <Label>Nome</Label>
          <Input type="text" {...register("name")} placeholder="Ex: Hamburguer Artesanal" />
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Preço (R$)</Label>
          <Input type="number" step="0.01" {...register("price")} placeholder="Ex: 19.90" />
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <LabelUpload>
            <Image size={24} />
            <Input
              type="file"
              {...register("file")}
              accept="image/png, image/jpeg"
              onChange={(value) => {
                setFileName(value.target.files[0]?.name);
                register("file").onChange(value);
              }}
            />
            {fileName || "Escolha uma imagem"}
          </LabelUpload>
          <ErrorMessage>{errors?.file?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <Label>Categoria</Label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={categories}
                getOptionLabel={(cat) => cat.name}
                getOptionValue={(cat) => cat.id}
                placeholder="Selecione a categoria"
                menuPortalTarget={document.body}
              />
            )}
          />
          <ErrorMessage>{errors?.category?.message}</ErrorMessage>
        </InputGroup>

        <InputGroup>
          <ContainerCheckbox>
            <input type="checkbox" {...register("offer")} />
            <Label>Produto em Oferta?</Label>
          </ContainerCheckbox>
        </InputGroup>

        <SubmitButton>Adicionar Produto</SubmitButton>
      </Form>
    </Container>
  );
}
