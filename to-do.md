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