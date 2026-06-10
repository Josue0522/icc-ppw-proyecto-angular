# Pollo tu parte

## Proyectos asociados en perfil

En el proyecto se implemento una relación dinámica entre los módulos programadores y proyectos utilizando Strapi. 
En primer lugar, se crearon los Content Types para programador y proyectos, se configuró su relación de tipo muchos a muchos. Es decir, que un proyecto puede estar asociados a muchos programadores y que un programador puede participar en varios proyectos.
En el frontend que se desarrolló con Angular, se modifico los servicios de consumo de datos para obtener la información directamente desde Strapi utilizando consultas con populate=*.
Por último, en el apartado detalle de cada programador se logró implementar una sección de proyectos asociados, dónde se muestra dinámicamente los proyectos vínculado a cada desarrollador

## Firebase Auth

En el proyecto, se implementó un sistema de autenticación utilizando Firebase Authentication para gestionar el acceso de los usuarios.

### Configuración del Firebase

Se creo un proyecto en Firebase llamado Dev Duo y se habilitó la autenticación por correo electrónico y contraseña. Seguidamente, se integró Firebase con Angular.

### Servicio de autenticación

En el proyecto se desarrolló un servicio centralizado (AuthService) que se encargará de gestionar las operaciones de autenticación como:
Registro de nuevos usuarios
Inicio de Sesión/Cierre de sesión
###Protección de rutas
Por último, se agregó Auth Guard para restringir el acceso a funcionalidades como mis solicitudes y crear una solicitud. Las rutas restringidas solo pueden ser accedidas por usuarios autenticados, de otra manera, se redireccionará a la página de inicio de sesión. Además que se modificó el encabezado para ocultar o mostrar funcionalidades dependiendo del estado de sesión del usuario.

## Guardar solicitudes en Firestore
Se uso cloud firestore como base de datos. Esta funcionalidad permite al usuario autenticado realizar solicitudes desde la aplicación angular

### Servicio de solicitudes

En el proyecto se desarrolló un servicio llamado RequestService que se encargará de comunicarse con Cloud Firestore. Permite crear nuevos documentos en la sección solicitudes 

Cada solicitud creada tiene distintos datos. 

![Guardar solicitudes - datos](/assets/GuardarSolicitudes-datos.png)

### Relación con Firebase Authentication

Cada solicitud creada se queda asociada al usuario autenticado mediante su uid y correo eletrónico. Así se evitan solicitudes anónimas.

### Relación con Strapi

El formulario de solicitud obtiene los datos de los programadores mediante Strapi CMS. Esto permite que el usuario seleccione a un programador real desde Strapi y no a uno generado mediante datos estáticos.

## Listar solicitudes

En esta parte se implementa la visualización de las solicitudes almacenadas en Cloud Firestore. Cada usuario podrá consultar su historial de solicitudes enviadas desde la plataforma.

### Integración con Firestore

Se amplió el servicio de solicitudes (RequestService) incorporando funciones como leer la colección de solicitudes almacenada en la base de datos Cloud Firestore.
La forma en que se almacenan y se visualizan las solicitudes de cada usuario es mediante el identificador único (uid).

### Visualización de datos

El apartado de mis solicitudes ya no presenta datos estáticos como lo fue creado en un estado inicial del desarrollo.
La solicitud muestra información cómo:
Nombre del programador
Descripción del proyecto solicitado
Fecha de la creación de la solicitud 
Estado actual de la solicitud
Respuesta emitida por el programador, dónde. Pendiente, solicitud enviada pero no atendida; Respondida, solicitud revisada y respondida por el programador

Prueba 1, prueba1@gmai.com Se envió dos solicitudes

![Listar solicitudes - prueba1](/assets/ListarSolicitudes-prueba1.png)

Prueba 2, prueba2@gmail.com no ha hecho solicitudes

![Listar solicitudes - prueba2](/assets/ListarSolicitudes-prueba2.png)

## Responder y cambiar estado de solicitudes

Se implementó la gestión de solicitudes para los usuarios registrados como programadores. El sistema identifica si el usuario autenticado corresponde a un programador registrado en Strapi mediante la comparación del correo de Firebase Authentication con el correo de contacto del programador en el CMS.
Cuando el usuario autenticado es programador, la vista de solicitudes cambia de manera automática para mostrar solicitudes dirigidas hacia su perfil. 
El programador podrá registrar una respuesta a la solicitud. Al guardar la respuesta, la aplicación actualiza el documento que corresponde en Cloud Firestore. Cambiando el estado de la solicitud y también almacena la fecha de actualización junto al texto de respuesta

Respuesta registrada desde programador

![Responder solicitudes - programador](/assets/respondersolicituces-programador.png)

Respuesta visualizada desde usuario

![Responder solicitudes - usuario](/assets/respondersolicitudes-usuario.png)

## Guards
### Auth guard
Se desarrolló Auth Guard encargado de proteger las rutas que requieren autenticación

### Guest guard
Se implementó Guest guard para evitar que los usuarios autenticados accedan a /login o /registro
