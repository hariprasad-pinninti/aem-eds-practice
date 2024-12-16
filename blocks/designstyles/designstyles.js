import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const divContainer = document.createElement('div');
  divContainer.className = 'design-style-container';
  [...block.children].forEach((row) => {
    const divContainerItem = document.createElement('div');
    divContainerItem.className = 'design-style-item';
    while (row.firstElementChild) divContainerItem.append(row.firstElementChild);
    [...divContainerItem.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'design-style-image';
      else {
        div.className = 'right-div';
      }
    });
    divContainer.append(divContainerItem);
  });
  divContainer.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(divContainer);
}
