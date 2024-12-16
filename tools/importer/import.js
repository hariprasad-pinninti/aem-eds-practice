const domainName = 'https://www.aristokraft.com';

const createDataDesignStylesBlock = (main, document) => {
  const designStyles = [['designStyles']];
  document.querySelectorAll('.design-style').forEach((section) => {
    const imageElement = section.querySelector('img');
    const imageSrc = new URL(imageElement.src, domainName).href;
    const newImageElement = document.createElement('img');
    newImageElement.src = imageSrc;
    const headingElement = section.querySelector('.design-style-description h3');
    const heading = headingElement.outerHTML;
    const descriptionElement = section.querySelector('.design-style-description p:nth-child(2)');
    const description = descriptionElement.outerHTML;
    const anchorDivElement = section.querySelector('.design-style-section');
    const anchor = anchorDivElement.innerHTML;
    designStyles.push([newImageElement, heading + description + anchor]);
  });

  const table = WebImporter.DOMUtils.createTable(designStyles, document);
  main.prepend(table);
};

const createMetadataBlock = (main, document) => {
  const meta = {};

  // find the <title> element
  const title = document.querySelector('title');
  if (title) {
    meta.Title = title.innerHTML.replace(/[\n\t]/gm, '');
  }

  // find the <meta property="og:description"> element
  const desc = document.querySelector('[name="description"]');
  if (desc) {
    meta.Description = desc.content;
  }

  // find the <meta property="og:description"> element
  const navigationtitle = document.querySelector('[name="navigationtitle"]');
  if (navigationtitle) {
    meta.navigationtitle = navigationtitle.content;
  }

  // helper to create the metadata block
  const block = WebImporter.Blocks.getMetadataBlock(document, meta);

  // append the block to the main element
  main.append(block);

  // returning the meta object might be usefull to other rules
  return meta;
};

export default {
  transformDOM: ({ document }) => {
    const main = document.body;

    createMetadataBlock(main, document);

    // final cleanup
    WebImporter.DOMUtils.remove(main, [
      'header',
      '.header',
      'footer',
      '.footer',
      'nav',
      '.navigation',
      '.disclaimer',
    ]);
    createDataDesignStylesBlock(main, document);
    return main;
  },
};
