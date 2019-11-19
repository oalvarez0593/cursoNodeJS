# NodeJS

Documentación de algunas librerias a utilizar para nodeJS

## Nodemon

La libreria de nodemon lo que hace es que NO tengamos que lanzar comando de inicialización de nuestro código, por default se lanza el proyecto y cualquier cambio en el código el nodemon detectará los cambios y refrescará nuestra app.

### Para instalar nodemon se debe ejecutar npm install -g nodemon

Para iniciar una app con nodemon, se debe ejecutar el comando: nodemon {nombre-app.js}

### ===============================================================

## Init

Comando para crear un archivo package.json de nodeJS para nuestra app.

### El comando a utilizar es npm init

### ===============================================================

## Yargs

Esta librería brinda ayuda en la herramienta de linea de comandos, permitiendo poder pasar parámetros por linea de comandos.

### Para instalar el yargs se debe ejecutar el npm i yargs --save

### ===============================================================

## Axios

Libreria que trabaja con peticiones hacia servicios rest basado en promises

### Para instalar axios se debe ejecutar npm i axios

### ===============================================================

## Request

Libreria que trabaja con peticiones hacia servicios rest basado en callbacks

### Para instalar request se debe ejecutar npm i request

### ===============================================================

## Express

Framework que trabaja con peticiones hacia servicios rest

### Para instalar express se debe ejecutar npm i express

### ===============================================================

## HBS

Esta libreria le permite a express poder renderizar las páginas con sintaxys de hadlebars

### Para instalar request se debe ejecutar npm install hbs

### ===============================================================

Para desplegar la app en heroku, se debe configurar el puerto en el archivo del servidor, así como también configurar una nueva tarea en el package.json del proyecto creando una tarea start, para que ejecute nuestro archivo principal.

### ===============================================================

prueba