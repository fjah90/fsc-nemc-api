# fsc-nemc-api
API to to consuming externar API to Full Stack challenge using Node + Express and Mocha + Chai to test


## Requisitos para el código del API

El código que envíes debe correr usando NodeJS 14 y no depender de librerías que están instaladas de forma global, variables de
entorno o configuraciones de algún sistema operativo especifico.

El código debe ser escrito en JavaScript (ES6+), no utilizar: Babel, TypeScript, Dart, Elm, etc

En cuanto a las librerías y frameworks, puede usar la versión que consideres apropiadas:

- **ExpressJs** [https://expressjs.com/]
- **Mocha** [https://mochajs.org/]
- **Chai** [https://www.chaijs.com/]

También se deben crear los tests que validan el API usando Mocha + Chai.

Los tests deben poder correrse usando npm test y el API debe poder iniciarse usando npm start.

## Intrucciones

El API a desarrollar, es un API REST que toma información de un API externa y la reformatea para exponerla.

- El API Externo de la cual se toma la información está documentada en el siguiente Swagger: [https://echo-serv.tbxnet.com/explorer/#/Secret]
- Para poder utilizarla, la API Key es: **"Bearer aSuperSecretKey"**.
- Los métodos a utilizar están en la sección "Secret" de la documentación del Swagger, pero a modo de resumen se indican a continuación:

### Para listar los archivos:

![image](https://user-images.githubusercontent.com/9141370/170843865-59d6770c-053d-4a41-8f5b-1991177318c6.png)

### Para descargar un archivo:

![image](https://user-images.githubusercontent.com/9141370/170843869-d4cf432f-e0b9-4244-bad3-d7540d7c0f0a.png)

### Los archivos siguen el formato CSV estricto con las siguientes columnas:

- **file:** el nombre del archivo.
- **text:** un texto de largo variable
- **number:** un numero
- **hex:** un hexadecimal de 32 dígitos

### Ejemplo del contenido de un archivo con información correctamente formateada:

![image](https://user-images.githubusercontent.com/9141370/170843905-9f4ed968-9e07-4f3e-acd6-ff2e05e37ad4.png)


## Cómo procesar la información

Se deben llamar al listado de archivos /v1/secret/files
Descargar cada file usando /v1/secret/file/{file}

### Formatear la información en los CSV:

Tener en cuenta que pueden existir archivos vacíos y líneas con error (que no tenga la cantidad de datos suficientes).
Si una línea tiene error se debe descartar.

También pueden existir errores al descargar un archivo.
Por cada archivo, se debe crear un objeto JSON que contenga las líneas válidas.

### Un objeto JSON pedido a partir de un archivo debe seguir el siguiente schema:

![image](https://user-images.githubusercontent.com/9141370/170844006-8e7f0020-dcad-47eb-8148-6ee86140aee3.png)

Usando NodeJs + ExpressJs, se debe crear el API para funcionar desde el siguiente endpoint:

![image](https://user-images.githubusercontent.com/9141370/170844027-604337c9-0b21-45ca-ba32-289607fec3cd.png)

Este endpoint es el encargado de buscar los archivos y formatear la información tal como se indicó en los pasos descriptos previamente.
Toda la información generada por el API deberá ser definida como *content-type: application/json.*

### Una respuesta 200 en caso de éxito se deberá ver como sigue:

![image](https://user-images.githubusercontent.com/9141370/170844059-6654a0ea-0097-4a53-953d-6410637a2da4.png)

### Ejemplo usando curl (llamada y respuesta):

![image](https://user-images.githubusercontent.com/9141370/170844072-69e2d4dd-de19-4fbd-887a-bf52045f66a7.png)

