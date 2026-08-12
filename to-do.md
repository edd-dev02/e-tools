# Próximas refactorizaciones:

shared/sidemenu
- Extraer la lógica de construcción del menú al servicio del sidebar.
- Crear un modelo MenuItem independiente de Route.
- Eliminar los operadores ! del template del componente SideMenu mediante tipado fuerte.

routes:
- Agregar el metadato de los colores del icono y el background de cada posible módulo
    - Después de obtener ambas propiedades, aplicar estilos dinámicamente para cada módulo

Generales:
- Para cada módulo, obtener los metadatos de la ruta en cuestión para pasarle información al componente del Header 
de manera automática.

Post-deploy:

Importancia muy alta:

    - Destruir componente de distribución cuando el componente de input se destruye (OnDestroy en cadena)

Importancia alta:

    - Investigar por que las signals tienen un comportamiento diferente en ciertos dispositivos móvil android

Importancia media:

- Ajustar detalles estéticos de estilos (Letras, botones)
    - Botón de calcular distribución que aparezca desactivado cuando no tiene un valor adecuado pero no ocultarlo
    - Botones de disminuir / sumar porcentaje volverlos opacos cuando no se pueda seguir realizando la acción y cambia el cursor
