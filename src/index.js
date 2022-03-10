/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = 'https://platzi-avo.vercel.app/';
const appNode = document.querySelector('#app');

//Api de internacionalización
//1. Formato a fechas
//2. Formato a monedas

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(price);
  return newPrice;
};

/**
 *  <div class="mx-auto">
          <img src="https://platzi-avo.vercel.app//images/maluma.jpg" class="w-48 rounded-full">
          <div class="p-6">
            <h2 class="">Maluma Hass Avocado</h2>
            <div class="">S/&nbsp;1.15</div>
          </div>
        </div>
 */

//web api
//Conectamos al servidor
window
  .fetch(`${baseUrl}api/avo`)
  .then((respuesta) => {
    //Procesamos la respuesta y la convertimos en JSON
    return respuesta.json();
  })
  .then((responseJSON) => {
    appNode.className = 'py-6 flex flex-row flex-wrap gap-6';
    let htmlObjects = [];
    responseJSON.data.forEach((item) => {
      //crear imagen
      const imagen = document.createElement('img');
      imagen.src = `${baseUrl}${item.image}`;
      imagen.className = 'w-48 rounded-full';

      //crear título
      const title = document.createElement('h2');
      title.textContent = item.name;
      //title.style = 'font-size: 2rem';
      //title.style.fontSize = '3rem';
      title.className = 'text-large';

      //crear precio
      const price = document.createElement('div');
      price.className = 'text-gray-600';
      price.textContent = formatPrice(item.price);

      const container = document.createElement('div');
      container.className = 'mx-auto';
      container.append(imagen, title, price);
      htmlObjects.push(container); 
    });

    appNode.append(...htmlObjects);
  });
