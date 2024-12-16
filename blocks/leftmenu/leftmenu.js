export default function decorate(block) {

   const container = document.createElement('div');
   container.className = 'left-menu-container';
   const divOne = document.createElement('div');
   divOne.className = 'left-menu';
   const divTwo = document.createElement('div');
   divTwo.className = 'free-area';
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
        div.className = 'menu-item'
    });
    li.addEventListener("click",(event)=>{
       let targetDiv = document.querySelector(".free-area");
       targetDiv.innerHTML = '';
       targetDiv.textContent = event.target.textContent;
    });
    ul.append(li);
  });
  divOne.append(ul);
  container.append(divOne);
  container.append(divTwo);
  block.textContent = '';
  block.append(container);
}
