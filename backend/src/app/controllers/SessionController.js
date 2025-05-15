import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import autoConfig from '../../../config/auth'

class SessionController {
    async store(request, response) {
        const schema = Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().min(6).required(),
        });

        const isValid = await schema.isValid(request.body);

        const emailOrPasswordIncorrect = () => {
            return response
            .status(401)
            .json ({ error: 'Make sure your email or password are correct' })
        };

        if (!isValid) {
           return emailOrPasswordIncorrect();
        }

        const { email, password } = request.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
           return emailOrPasswordIncorrect();
        }

        const isSamePassword = await user.checkPassword(password);
        
        if (!isSamePassword) {
           return emailOrPasswordIncorrect();
        }
        
        
        return response.status(200).json({
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              admin: user.admin,
              rua: user.rua,
              numero: user.numero,
              bairro: user.bairro,
              cep: user.cep,
            },
            token: jwt.sign({ id: user.id, name: user.name }, autoConfig.secret, {
              expiresIn: autoConfig.expiresIn,
            }),
          });
        
    }
}

export default new SessionController();