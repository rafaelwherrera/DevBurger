import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Image } from "@phosphor-icons/react"
import { toast } from "react-toastify"
import {
    Container,
    Form,
    InputGroup,
    Label,
    Input,
    LabelUpload,
    SubmitButton,
    ErrorMessage,
} from "./styles";
import { useState } from "react"
import { api } from "../../../services/api"

const schema = yup.object({
    name: yup.string().required('Digite o nome da categoria!'),
    file: yup
        .mixed()
        .test('required', 'Escolha uma imagem para a categoria', (value) => {
            return value && value.length > 0;
        })
        .test('fileSize', 'A imagem deve ter no máximo 5MB', (value) => {
            return value && value.length > 0 && value[0].size <= 5 * 1024 * 1024;
        })
        .test('type', 'Apenas imagens PNG ou JPEG são permitidas', value => {
            return (
                value &&
                value.length > 0 &&
                (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
            );
        }),
});

export function NewCategory() {
    const [fileName, setFileName] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('file', data.file[0]);

        await toast.promise(
            api.post('/categories', formData),
            {
                pending: 'Adicionando categoria...',
                success: 'Categoria cadastrada com sucesso!',
                error: 'Erro ao cadastrar categoria.',
            }
        );
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit(onSubmit)}>

                <InputGroup>
                    <Label>Nome da Categoria</Label>
                    <Input type="text" {...register("name")} />
                    <ErrorMessage>{errors?.name?.message}</ErrorMessage>
                </InputGroup>

                <InputGroup>
                    <LabelUpload>
                        <Image />
                        <Input
                            type="file"
                            {...register("file")}
                            accept="image/png, image/jpeg"
                            onChange={(value) => {
                                setFileName(value.target.files[0]?.name);
                                register('file').onChange(value);
                            }}
                        />
                        {fileName || "Upload da Imagem"}
                    </LabelUpload>
                    <ErrorMessage>{errors?.file?.message}</ErrorMessage>
                </InputGroup>

                <SubmitButton>Adicionar Categoria</SubmitButton>

            </Form>
        </Container>
    );
}
