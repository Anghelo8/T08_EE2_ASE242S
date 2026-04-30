# 📱 Documentación de la Aplicación: Gestión de Clientes

## 1. Descripción de la Aplicación
Esta aplicación es un sistema de gestión operativa enfocado en el modelo **CRUD (Create, Read, Update, Delete)**, desarrollada utilizando **React Native** y **Expo Router**. Su propósito es permitir a las empresas o emprendedores llevar un control centralizado de su base de datos de clientes, permitiendo registrar información vital como nombres, teléfonos, correos y direcciones de forma rápida y segura.

---

## 2. Pantallas Desarrolladas
La arquitectura de la aplicación se divide en dos capas principales:

* **Pantalla de Control (Index):** Actúa como el núcleo de navegación. Implementa un **Header personalizado** y un **Menú Lateral (Drawer Manual)** que permite alternar entre la gestión de clientes y otros módulos sin interrumpir el flujo de datos.
* **Módulo de Clientes (CustomerCRUD):** Una interfaz de alta fidelidad que presenta un formulario de entrada optimizado y una lista de registros interactivos.

> **[INSERTE AQUÍ SU CAPTURA DE PANTALLA]**
> *Ejemplo: Captura del formulario con el fondo gris y tarjetas blancas.*

---

## 3. Problemas Identificados durante Pruebas
Durante la fase de validación y control de calidad, se identificaron los siguientes desafíos:
1.  **Conflicto de Navegación:** Se detectó que el menú automático de la librería `expo-router/drawer` creaba una doble barra superior, confundiendo al usuario final.
2.  **Vulnerabilidad en Integridad de Datos:** Inicialmente, el sistema permitía guardar nombres con caracteres numéricos y teléfonos con letras, lo que generaba "datos basura".
3.  **Dificultad de Edición:** Los usuarios no tenían una forma clara de modificar un dato ya ingresado sin tener que borrarlo y volverlo a escribir.

---

## 4. Mejoras Aplicadas (Feedback e Iteración)
Para resolver los problemas detectados, se aplicaron las siguientes mejoras técnicas:
* **Validación Regex en Tiempo Real:** Se implementaron expresiones regulares (`/[0-9]/` para nombres y `/[^0-9]/` para teléfonos) que monitorean la entrada del usuario segundo a segundo.
* **Feedback Visual de Error:** Se integró un sistema de **estilos condicionales**. Si el usuario comete un error, el campo se ilumina en rojo (`#FF5252`) y el botón de registro se deshabilita automáticamente.
* **Sistema de Edición Rápida:** Se añadió la funcionalidad de "subir" los datos de la lista al formulario al tocar un registro, permitiendo actualizaciones rápidas mediante un estado de `editingId`.
* **Confirmaciones de Seguridad:** Se integró el componente `Alert` de React Native para confirmar la eliminación de registros y evitar pérdidas accidentales.

---

## 5. Explicación de Decisiones de Diseño
* **Estética Profesional:** Se optó por un diseño **Minimalista y Limpio**. El uso de fondos neutros (`#F4F7F6`) y tarjetas blancas con sombras (`elevation: 4`) ayuda a reducir la carga cognitiva del usuario.
* **Paleta de Colores Semántica:** * **Verde (#4CAF50):** Utilizado para el botón principal, representando "Éxito" y "Acción".
    * **Rojo (#FF5252):** Reservado exclusivamente para errores y borrado, indicando "Precaución".
    * **Gris/Blanco:** Para el cuerpo de la aplicación, garantizando legibilidad.
* **Accesibilidad Móvil:** Se configuró el `keyboardType` según el campo (numérico para teléfonos, email-address para correos) para facilitar la escritura en dispositivos físicos.
* **Estructura de Componentes:** Se utilizó el componente `FlatList` en lugar de `ScrollView` para garantizar que la aplicación sea fluida incluso si la lista de clientes crece a cientos de registros.
