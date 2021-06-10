//importando a winston
import winston, {format} from 'winston';
import appRoot from 'app-root-path';
// componentes para crear el formato personalizado de log 
const {combine, timestamp, printf, uncolorize, json, colorize} = winston.format;


//creando el perfil de color para el log 
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'green',
};
//agregando el perfil a wonston 
winston.addColors (colors);

//formato de consola 
const myFormat = format.combine(
    format.colorize({all: true}),
    format.timestamp(),
    format.printf((info) => `${info.timestamp} ${info.level}:  ${info.message}`)
);
//formato para la salids d los archivos de log
const myFileFormat = format.combine(
    format.uncolorize(),
    format.timestamp(),
    format.json()

);

//creando objetos de configuracion
const options = {
    infoFile: {
        level: 'info',
        filename: '${appRoot}/server/logs/infos.log',
        handleExceptions: true,
        maxsize: 52428800, //5 MB
        maxFiles: 5,
        format: myFileFormat,
    },
    warnFile: {
        level: 'warn',
        filename: '${appRoot}/server/logs/warns.log',
        handleExceptions: true,
        maxsize: 52428800, //5 MB
        maxFiles: 5,
        format: myFileFormat,
    },
        errorFile: {
        level: 'error',
        filename: '${appRoot}/server/logs/errors.log',
        handleExceptions: true,
        maxsize: 52428800, //5 MB
        maxFiles: 5,
        format: myFileFormat,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        format: myFormat,
    },
};

//creando la instancia del registrador o logguer
const logger = winston.CreateLogger({
    transports: [
        new winston.transports.File(options.infoFile),
        new winston.transports.File(options.warnFile),
        new winston.transports.File(options.errorFile),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false, //no finaliza en excepciones manejadas

});

//
logger.stream = {
write(message)
    {
        logger.info(message);
    },
};

export default logger;
