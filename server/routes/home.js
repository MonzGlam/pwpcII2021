//Import Router 
import{Router} from 'express';

//Importando al Home controller
import homeController from  '@server/controllers/homeController';

//creando la instancia de un router
const router = new Router();

//GET '/'
router.get('/', homeController.index);

//GET '/greeting'
router.get('/greeting', homeController.greeting);

//exportando el router que maneja las surutas para el controlador home

export default router;
