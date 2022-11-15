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

El proyecto es un buscador de personajes de la serie Breaking Bad, está preparado para buscar mediante la barra de búsqueda, para de ese modo filtrar, después de haber filtrado el personaje que buscas puedes hacer click sobre el y se almacenará en el listado de favoritos, si haces click en él de nuevo lo eliminarás de la lista de favoritos.

Las búsquedas que puedes realizar pueden ser por nombre, buscando, por ejemplo todos los walter, Walter o WALTER que quieras (si, si, está preparado para que escribas cómo lo escribas, si el nombre está escrito correctamente, te lo localizamos) de ese modo te localiza todos los Walter que haya en la serie, en este caso, padre e hijo, pero si deseas afinar más tu búsqueda en el select siguiente puedes elegir el estado en el que se encuentran, vivo, muerto, o "no me queda del todo claro" como ocurre con Walter White. También puedes filtrar únicamente por el estado de los personajes, para que puedas comprobar de un vistazo, quien está en este barrio, y quién ha pasado a mejor vida. ¡¡SENTIMOS LOS SPOILERS!!

Puedes añadir todos los favoritos que quieras, y tantas veces como quieras, así como eliminarlos, bien pulsando sobre si mismo, en la sección de la derecha, mientras estás añadiendo personajes nuevos o bien cuando ya estás repasando todos tus favoritos y quieres explulsar a alguno de allí, podrás hacerlo pulsando en el aspa de la esquina superior derecha de la tarjeta. ¡Peeeeeero un momento! Para hacer tu vida más sencilla a la hora de eliminar los favoritos hemos incorporado un botón de RESET donde se borran todos los favoritos que tienes en tu listado. incluso la búsqueda que hayas escrito. ¡Fácil!

## ¿Cúal ha sido el enfoque?

El proyecto es una web donde mediante una peticion a un servidor obtenemos la informacion de los personajes de la serie Breaking Bad, el servidor nos ofrece multiples datos demiante arrays de objetos, con un personaje por objeto, de ahí tomamos los datos que nos interesan, en nuestro caso name, status e img.

El proyecto gira en torno a dos arrays que van situados en dos listas, la lista de todos los personajes, y la lista de favoritos, de ese modo, a lo largo de todo el proyeto, mediante funciones, métodos funcionales de arrats, condicionales y bucles hacemos que funcione lo que necesitamos.

El proyecto está preparado para ser eficiente con las interacciones de JS y con un mínimo de CSS, ya que en este caso no es lo importante para demostrar los conocimientos.

Tenemos el buscador que localiza los personajes por nombre, bien se escriba en mayúsculas o bien en minúsculas, si el nombre está escrito de manera correcta, lo localiza, incluso una parte de él, no es necesario escribirlo entero.

Otro método alternativo de búsqueda es el select, donde se filtra el estado con las opciones posibles del personaje. Este método alternativo de búsqueda es combinable con el método de input, de búsqueda por nombre.

El proyecto está preparado para poder trabajar con archivos de JS en partials, los lee en orden alfanumérico, y eso se ha tenido en cuenta a la hora de repartir el código en los distintos archivos, la división es la siguiente:

- **00_main.js**
  Aquí se encuentran nuestra variables globales, tanto los <strong>document.querySelector</strong> con los elementos que nos traemos de HTML como los arrays en torno a los que se mueve el proyecto entero.
- **00_renderCharacters.js**
  Encontramos cuatro funciones:

  - <strong>handleClick </strong> La función del evento click que tiene aplicada cada tarjeta. Aplica según un toggle a la tarjeta con la clase selected. Buscamos en el array el objeto que tenga el mismo char_id que el objeto sobre el que se ha hecho click(event.currentTarget.id) por otro lado buscamos la posición en favoritos si es que se encuentra Si lo encuentra, debe elminarlo del listado de favoritos. Rellena el localStorage con el de favoritos en según las modificaciones y también pinta de nuevo todos los favoritos con estos cambios.

  - <strong>renderOneCharacter</strong> Es la función que crea la estructura de html con la que vamos a hidratar posteriormente la página, con un condicionante que afecta, si no hay favoritos no hace nada, pero si si que los hay, añade la clase selected
  - <strong>addCharacterListeners </strong> En esta función tenemos la creación de una variable de JS de un elemento de html que nos da un array, y un bucle que recorre ese array aplicando a todo él un evento click.
  - <strong>renderAllCharacters</strong>La última función pinta nuestro contenido del array de <strong>AllCharacters</strong> en html.
    Por último la ejecución de la función <strong>addCharacterListeners</strong>

- **01_fetch.js**
  En este archivo encontramos la petición al servidor, donde traemos los datos que necesitamos desde la API hasta nuestro array <strong>AllCharacters</strong>.
- **02_addFavorites.js**
  Encontramos tres funciones, la primera la función que pinta nuestro contenido de html en el array de favoritos con la estructura de html, además de crear la variable con el contenido <strong>querySelector</strong>, para poder hacer un bulcle y aplicarles a todos los elementos del array el listener de ese evento.
  Segunda función que nos encontramos es <strong>renderFAVCharacter</strong> que es muy similar a la anterior <strong>renderOneCharacter</strong> pero simplificada, porque no necesitamos muchas de las cosas, y además esta estructura nos interesa por tener ya incluida la X con la que vamos a trabajar.
  Por último tenemos la función del evento que anteriormente hemos declarado en la X, a este evento se le pide que localice el índice de nuestro current id, que lo elimine del array y lo vuelva a pintar, que machaque encima del localStorage con la información nueva que tiene nuestro array de favoritos. Por último para finalizar localizamos el id de la tarjeta que vamos a borrar, que será el mismo id que el de la tarjeta que queremos quitar la clase seleccionada, y sobre ambas (aunque solo lo podremos ver en el array de <strong>AllCharacters</strong>) nos quita la clase selected.
- **03_search.js**
  Encontramos dos eventos en este archivo, por un lado, el primero asociado a todo el formulario, para evitar que se reinicie la pagina cuando enviamos con el <strong>event.preventDefault()</strong>
  Por otro lado el verdadero evento interesante, como input es case sensitive, buscamos que nos iguale lo que buscamos y lo que encontramos a minúsicula con <strong>toLowerCase()</strong>.
  Tenemos tres condicionantes para las búsquedas:
  1.  Cuando nos indica una búsqueda en el campo de texto y en la opción del select es una opción distinta a todos, para poder buscar por nombre y estado.
  2.  Cuando nos indican una busqueda en el campo de texto, de manera que busca los nombres que coincidan para poder buscar por nombre únicamente, en la opción de select ALL.
  3.  Cuando nos indica una opción de estado únicamente, para poder ver de ese modo, todos los personajes, los muertos, los vivos, etc.
      En cualquiera de las tres opciones, finaliza pintando en el array <strong>AllCharacters</strong> lo que encuentra en la búsqueda, distinta en cada caso, aunque la función que pinta es la misma, pero con qué lo rellena.
- **04_localStorage.js**
  Se genera dónde y qué vamos a guardar en localStorage, guardaremos en <strong>favoriteCharacter</strong> nuestra lista de favoritos dentro de la variable <strong>savedFavorites</strong>, le indicamos que pinte en localStorage lo que se encuentra en nuestro array de favoritos <strong>favoritesCharacters</strong>
- **05_resetBtn.js**
  Por último, tenemos el evento click del botón reset, donde se vacía el array de favoritos <strong>favoritesCharacters</strong> así como el contenido de html del mismo, también se hace un reseteo del <strong>localStorage</strong> y del value de nuestro input de búsqueda.
