<template>
    <div class="loader-overlay">
      <div class="loader"></div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Loader',
  };
  </script>
  
  <style scoped>
  .loader-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.263); /* Optional: adds a semi-transparent background */
    z-index: 3; /* Makes sure it appears above other content */
  }
  
  .loader {
    width: 60px;
    display: flex;
    align-items: flex-start;
    aspect-ratio: 1;
  }
  
  .loader:before,
  .loader:after {
    content: "";
    flex: 1;
    aspect-ratio: 1;
    --g: conic-gradient(from -90deg at 10px 10px, #6b1f1f 90deg, #0000 0);
    background: var(--g), var(--g), var(--g);
    filter: drop-shadow(30px 30px 0 #6b1f1f);
    animation: l20 1s infinite;
  }
  
  .loader:after {
    transform: scaleX(-1);
  }
  
  @keyframes l20 {
    0%   {background-position:0     0, 10px 10px, 20px 20px}
    33%  {background-position:10px  10px}
    66%  {background-position:0    20px,10px 10px,20px 0}
    100% {background-position:0     0, 10px 10px, 20px 20px}
  }
  </style>
  