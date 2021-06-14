
import { Router } from 'express';
//Importando el router de home
import homeRouter from './home';

const router = new Router();

/* GET home page. */
router.use('/', homeRouter);

module.exports = router;
