/* eslint-disable no-bitwise */
export const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export const rgbToHex = (r, g, b) => {
  return `#${componentToHex(+r)}${componentToHex(+g)}${componentToHex(+b)}`;
};

export const getColorFromClass = (className) => {
  const para = document.querySelector(className);
  const compStyles = window.getComputedStyle(para);
  const color = compStyles.getPropertyValue('background-color');

  const colorValues = color.match(/\d+/g);
  const hexColor = rgbToHex(...colorValues);

  return hexColor;
};

export const LightenDarkenColor = (color, value) => {
  let usePound = false;
  let colorInHex = color;

  if (colorInHex[0] === '#') {
    colorInHex = colorInHex.slice(1);
    usePound = true;
  }

  const num = parseInt(colorInHex, 16);

  let r = (num >> 16) + value;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + value;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + value;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};
