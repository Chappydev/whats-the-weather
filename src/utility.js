export { appendTo, makeElement };

function appendTo(parent, ...children) {
  console.log(children);
  children.forEach((child) => {
    parent.appendChild(child);
  });

  // returns parent so the function may be used repeatedly
  return parent;
}

function makeElement(tag, text, ...attributes) {
  const newElement = document.createElement(tag);

  if (text) {
    const textNode = document.createTextNode(text);
    newElement.appendChild(textNode);
  }

  attributes.forEach((att) => {
    const isClass = att[0] === ".";
    const isId = att[0] === "#";

    if (isClass) {
      newElement.classList.add(att.slice(1));
    } else if (isId) {
      newElement.id = att.slice(1);
    } else {
      const attributeReg = /^.+=/;
      const valueReg = /=.+/;
      const [ attribute, value ] = [ att.match(attributeReg).replace('=', ''), att.match(valueReg).slice(1) ];
      newElement.setAttribute(attribute, value);
    }
  })

  return newElement;
}