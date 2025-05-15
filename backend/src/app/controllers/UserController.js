import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async store(request, response) {
        const schema = Yup.object({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
            admin: Yup.boolean(),
            rua: Yup.string().required(),
            numero: Yup.number().required(),
            bairro: Yup.string().required(),
            cep: Yup.string().required(),
        });

        try {
            schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
            return response.status(400).json({ error: err.errors });
        }

        const { name, email, password, admin, rua, numero, bairro, cep } = request.body;
        
        const userExists = await User.findOne({
            where: {
                email,
            }
        });

        if (userExists) {
            return response.status(400).json({ error: 'User already exists' });
        }
        
        const user = await User.create({
            id: v4(),
            name,
            email,
            password,
            admin,
            rua,
            numero,
            bairro,
            cep,
        });
        
        return response.status(201).json({
            id: user.id,
            name,
            email,
            admin,
            rua,
            numero,
            bairro,
            cep,
        }); // Aqui estava faltando fechar o objeto
    }
}

export default new UserController();
