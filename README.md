# Breaking Bad Search Characters

Este es un proyecto realizado para una evaluación en el módulo 2. Javascript dentro del Bootcamp de Adalab.

Está dentro de una estructura de carpetas preparada para poder funcionar, los archivos editables se encuentran dentro de la carpeta `src/`: son los ficheros de nuestra página web, como HTML, CSS, JS...

> **NOTA:** Necesitas tener instalado [Node JS](https://nodejs.org/)

### Pasos para arrancar el proyecto:

Si el proyecto no tiene la carpeta node_modules, deberñas ejecutar el siguiente comando:

npm install

Una vez hemos instalado las dependencias, vamos a arrancar el proyecto. **El proyecto hay que arrancarlo cada vez que te pongas a programar.** Para ello ejecuta el comando:

npm start

Con este comando se podrá abrir la web del mismo modo que lo haría el Live Server (Go live) de VSCode.

## Finalidad del proyecto

El proyecto es un buscador de personajes de la Serie Breaking Bad, está preparado para buscar mediante la barra de búsqueda, para de ese modo filtrar, después de haber filtrado el personaje que buscas puedes hacer click sobre el y se almacenará en el listado de favoritos, si haces click en él de nuevo lo eliminarás de la lista de favoritos.

Puedes añadir todos los favoritos que quieras, y tantas veces como quieras, así como eliminarlos. ¡Peeeeeero un momento! Para hacer tu vida más sencilla a la hora de eliminar los favoritos hemos incorporado un botón de RESET donde se borran todos los favoritos que tienes en tu listado.

## ¿Cúal ha sido el enfoque?

El proyecto es una web donde mediante una peticion a un servidor obtenemos la informacion de los personajes de la serie Breaking Bad, el servidor nos ofrece multiples datos demiante arrays de objetos, con un personaje por objeto, de ahí tomamos los datos que nos interesan, en nuestro caso name, status e img.

El proyecto gira en torno a dos arrays que van situados en dos listas, la lista de todos los personajes, y la lista de favoritos, de ese modo, a lo largo de todo el proyeto, mediante funciones, metodos funcionales de arrats, condicionales y bucles hacemos que funcione lo que necesitamos.

El proyecto está preparado para ser eficiente con las interacciones de JS y con un mínimo de CSS, ya que en este caso no es lo importante para demostrar los conocimientos.
