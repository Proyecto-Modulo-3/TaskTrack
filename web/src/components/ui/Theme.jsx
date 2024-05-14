// import React, { useState } from 'react';
// import Profile from './Profile';

// function Theme() {
//   const [background, setBackground] = useState('default'); // Estado para el fondo de la aplicación

//   // Función para cambiar el fondo
//   const changeBackground = (newBackground) => {
//     setBackground(newBackground);
//   };

//   // Establecer estilos condicionales basados en el estado del fondo
//   const appStyle = {
//     backgroundColor: background === 'dark' ? '#333' : '#fff', // Cambia el color de fondo dependiendo del estado
//     color: background === 'dark' ? '#fff' : '#333', // Cambia el color del texto dependiendo del estado
//     minHeight: '100vh', // Asegura que la aplicación ocupe al menos toda la altura de la ventana
//     transition: 'background-color 0.3s ease-in-out, color 0.3s ease-in-out' // Agrega una transición suave al cambiar el fondo
//   };

//   return (
//     <div style={appStyle}>
//       <button onClick={() => changeBackground('default')}>Fondo Claro</button>
//       <button onClick={() => changeBackground('dark')}>Fondo Oscuro</button>
//       <Profile />
//     </div>
//   );
// }

// export default Theme;
