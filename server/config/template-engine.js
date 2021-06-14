import expHbs from 'express-handlebars';
import path from 'path';

//Exportando un funcion de configuracion
export default (app) => {
    //1.- Registrar el motor de plantillas 
    app.engine('hbs', expHbs({
        extname: '.hbs',
        defaultLayout: 'main',
    }));
    // 2.- Seleccionar el motor de plantillas recine registrados
    app.set('view engine', 'hbs');
    // 3.-Estableciendo la ruta de las vistas 
    app.set('views', pathjoin(__dirname, '..', 'views'));
    // 4.- Retornamos el valor de entrada
    return app; 
};
