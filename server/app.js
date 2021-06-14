import createError from 'http-errors';
import express from  'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import winston from '@server/config/winston';

import indexRouter from '@s-routes/index';
import usersRouter from '@s-routes/users';

//importting configurations
import configTemplateEngine from '@s-config/template-engine';

// Webpack modules
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackDevConfig from '../webpack.dev.config';

// Consultar el modo en que se está ejecutando la aplicación 
const env = process.env.NODE_ENV || 'development';



// se crea aplicacion express
const app = express();
console.log(`env ${env}`);
 
const myvar = 'development';
console.log(`env: ${typeof env}, myvar: ${typeof myvar}`);

//verificando el modo de ejecución de la aplicación
if (env === 'development'){
  console.log ('>Excecuting in Development Mode: Webpack Hot Reloading');
  //Agregando la ruta del hot module replacement
  //Reload=true: Habilita la recarga del front end cuando hay cambios en el codigo fuente del front end 
  //timeout=1000: Tiempo de espera entre recarga y recarga de la pagina
  webpackDevConfig.entry = [
    'webpack-hot-middleware/client?reload=true&timeout=1000', 
    webpackDevConfig.entry
    ];
  //agregamos plugin
  webpackDevConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

  //crear el complilador de webpack
  const compiler = webpack(webpackDevConfig);

  //agregamos el middleware a la cadena de middlewares
  //de nuestra aplicacion 
  app.use(webpackDevMiddleware(compiler,{
  }));

  //Agregando el webpack Hot Mddleware
  app.use(webpackHotMiddleware(compiler));
} else{
  console.log('>Excecuting in Production Mode...');
}

// view engine setup
configTemplateEngine(app);

app.use(morgan('dev', { steam : winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'..', 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res)=>{
  //log 
  winston.error(`Code: 404, Mesage: Page not found, URL: ${req.originalUrl}, Method: ${req.
    method} `); 
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //loggeando con Winston
  winston.error(
    `status: ${err.status || 500}, Message: ${err.message}, Method: ${
      req.method
    }, IP:${req.ip}`
    );

    //render the error page
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;
  