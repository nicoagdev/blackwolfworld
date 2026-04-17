# CONFIGURACION.md

## Configuración de WordPress para WooCommerce y API

Este documento proporciona instrucciones detalladas sobre cómo configurar WordPress y WooCommerce para que se conecten correctamente con el frontend de Next.js. Asegúrate de seguir cada paso cuidadosamente.

### 1. Instalación de WordPress

1. **Accede a tu servidor**: Conéctate a tu servidor donde deseas instalar WordPress.
2. **Descarga WordPress**: Ve a [wordpress.org](https://wordpress.org/download/) y descarga la última versión de WordPress.
3. **Sube WordPress al servidor**: Descomprime el archivo y sube los archivos a tu servidor en el directorio deseado.
4. **Crea una base de datos**: Accede a tu panel de control de hosting (como cPanel) y crea una nueva base de datos y un usuario con todos los privilegios para esa base de datos.
5. **Configura `wp-config.php`**: Renombra `wp-config-sample.php` a `wp-config.php` y edítalo para incluir los detalles de tu base de datos:
   ```php
   define('DB_NAME', 'nombre_de_tu_base_de_datos');
   define('DB_USER', 'tu_usuario');
   define('DB_PASSWORD', 'tu_contraseña');
   define('DB_HOST', 'localhost'); // Generalmente es localhost
   ```

### 2. Instalación de WooCommerce

1. **Accede al panel de administración de WordPress**: Ve a `http://tu_dominio/wp-admin`.
2. **Instala WooCommerce**:
   - Ve a "Plugins" > "Añadir nuevo".
   - Busca "WooCommerce" y haz clic en "Instalar ahora".
   - Activa el plugin después de la instalación.
3. **Configura WooCommerce**: Sigue el asistente de configuración de WooCommerce para establecer tu tienda, incluyendo moneda, métodos de envío y opciones de pago.

### 3. Configuración de la API REST de WooCommerce

1. **Habilita la API REST**:
   - Ve a "WooCommerce" > "Ajustes" > "Avanzado" > "REST API".
   - Haz clic en "Añadir clave" para crear una nueva clave API.
   - Asigna un nombre a la clave, selecciona un usuario y establece los permisos (lectura/escritura).
   - Guarda la clave y anota el `Consumer Key` y `Consumer Secret`.

2. **Configura los Permalinks**:
   - Ve a "Ajustes" > "Enlaces permanentes".
   - Selecciona la opción "Nombre de la entrada" y guarda los cambios.

### 4. Configuración de la Pasarela de Pagos

1. **Selecciona una pasarela de pago**:
   - Ve a "WooCommerce" > "Ajustes" > "Pagos".
   - Activa y configura la pasarela de pago que desees utilizar (por ejemplo, PayPal, Stripe, etc.).
   - Sigue las instrucciones específicas de cada pasarela para completar la configuración.

### 5. Configuración de CORS (Cross-Origin Resource Sharing)

Para permitir que tu aplicación Next.js se comunique con la API de WooCommerce, es posible que necesites configurar CORS. Esto se puede hacer mediante un plugin o añadiendo código en el archivo `functions.php` de tu tema:

```php
add_action('rest_api_init', function () {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
});
```

### 6. Pruebas de Conexión

1. **Verifica la conexión**: Desde tu aplicación Next.js, realiza una llamada a la API de WooCommerce utilizando las claves API que generaste. Asegúrate de que puedes obtener productos y realizar pedidos.
2. **Prueba la pasarela de pago**: Realiza una compra de prueba para asegurarte de que la pasarela de pago funciona correctamente.

### 7. Documentación Adicional

- Para más detalles sobre la API de WooCommerce, consulta la [documentación oficial](https://woocommerce.github.io/woocommerce-rest-api-docs/).
- Asegúrate de que tu servidor tenga habilitadas las extensiones necesarias de PHP (como cURL) para que WooCommerce funcione correctamente.

Siguiendo estos pasos, deberías poder configurar WordPress y WooCommerce para que se conecten correctamente con tu aplicación Next.js.