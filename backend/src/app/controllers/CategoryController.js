import * as Yup from 'yup';
import Category from '../models/Category';
import User from '../models/User'

class CategoryController {
    async store(request, response) {
        const schema = Yup.object({
          name: Yup.string().required(),
        });
      
        try {
          schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
          return response.status(400).json({ error: err.errors });
        }
      
        const user = await User.findByPk(request.userId);
      
        if (!user) {
          return response.status(401).json({ error: 'User not found' });
        }
      
        if (!user.admin) {
          return response.status(403).json({ error: 'Access denied: Admins only' });
        }
        
        const {filename: path} = request.file
        const { name } = request.body;
      
        const categoryExists = await Category.findOne({ where: { name } });
      
        if (categoryExists) {
          return response.status(400).json({ error: 'Category already exists' });
        }
      
        const { id } = await Category.create({ name, path });
      
        return response.status(201).json({ id, name });
      }

      async update(request, response) {
        const schema = Yup.object({
          name: Yup.string(),
        });
      
        try {
          schema.validateSync(request.body, { abortEarly: false });
        } catch (err) {
          return response.status(400).json({ error: err.errors });
        }
      
        const user = await User.findByPk(request.userId);
      
        if (!user) {
          return response.status(401).json({ error: 'User not found' });
        }
      
        if (!user.admin) {
          return response.status(403).json({ error: 'Access denied: Admins only' });
        }

        const {id} = request.params;

        const categoryExists = await Category.findByPk(id);

        if (!categoryExists){
          return response
          .status(400)
          .json({ message: 'Make sure your category ID is correct' });
        }
        
        let path;
        if (request.file) {
          path = request.file.filename
        }

        const { name } = request.body;
      
        if (name) {
          const categoryNameExists = await Category.findOne({
            where: {
              name,
            },
          });

          if (categoryNameExists && categoryNameExists.id !== +id) {
            return response.status(400).json ({ message: 'Category already exists' })
          };
        }

        await Category.update({
          name,
          path,
        },
        {
          where:{
            id,
          }
        })
            
        return response.status(200).json();
      }
      

    async index ( request, response ){
        const categories = await Category.findAll();     

        return response.json(categories);
    }

    async delete(request, response) {
      const { id } = request.params;
    
      const category = await Category.findByPk(id);
    
      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }
    
      await category.destroy();
    
      return response.status(204).send(); // Retorna sucesso sem conteúdo
    }
    

}

export default new CategoryController();