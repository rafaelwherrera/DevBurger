import { Router } from 'express';
import multer from 'multer';
import multerconfig from '../config/multer.js';
import authMiddleware from './app/middlewares/auth.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import CategoryController from './app/controllers/CategoryController.js';
import OrderController from './app/controllers/OrderController.js';
import { getDashboard } from './app/controllers/DashboardController.js';
import { calculateDeliveryTax } from './app/controllers/DeliveryController.js'
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';

const routes = Router();
const upload = multer(multerconfig);

// Rotas públicas (se houver)
routes.post('/session', SessionController.store);

// Middleware global de autenticação
routes.use(authMiddleware);

// Rotas protegidas
routes.post('/products', upload.single('file'), ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', upload.single('file'), ProductController.update);
routes.delete('/products/:id', ProductController.delete);

routes.get('/categories', CategoryController.index);
routes.post('/categories', upload.single('file'), CategoryController.store);
routes.put('/categories/:id', upload.single('file'), CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete)

routes.get('/order', OrderController.index);
routes.post('/order', authMiddleware, OrderController.store);
routes.put('/order/:id', OrderController.update);

routes.get('/admin/dashboard', getDashboard); 

routes.get('/delivery/:cep', calculateDeliveryTax);

routes.post('/create-payment-intent', CreatePaymentIntentController.store);

export default routes;
