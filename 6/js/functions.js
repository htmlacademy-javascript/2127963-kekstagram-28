const checkCommentLength = (comment, maxLength) => (comment.length <= maxLength);

const isPalindrome = (text) => {
  const textWithoutSpaces = text.toLowerCase().replaceAll(' ', '');

  let invertedText = '';

  for (let i = textWithoutSpaces.length - 1; i >= 0; i--) {
    invertedText += textWithoutSpaces[i];
  }

  return (invertedText === textWithoutSpaces);
};

const extractNumbers = (text) => {
  let newText = '';

  if (typeof text === 'number') {
    const textToString = String(text);
    for (let i = 0; i < textToString.length; i++) {
      if (textToString[i] !== ' ' && !isNaN(textToString[i] - 0)) {
        newText += textToString[i];
      }
    }
  } else {

    for (let i = 0; i < text.length; i++) {
      if (text[i] !== ' ' && !isNaN(text[i] - 0)) {
        newText += text[i];
      }
    }
  }

  return (newText === '') ? NaN : Number(newText);
};

const createFileAddress = (address, minLength, additionalText) => {
  let fileAddress;
  if (address.length >= minLength) {
    fileAddress = address;
    return fileAddress;
  }
  const additionalSymbolsNumber = minLength - address.length;

  if (additionalText.length > additionalSymbolsNumber) {
    fileAddress = additionalText.slice(0, additionalSymbolsNumber - additionalText.length) + address;
    return fileAddress;
  }

  while ((additionalSymbolsNumber / additionalText.length) >= 2) {
    additionalText += additionalText;
  }

  fileAddress = additionalText.slice(0, additionalSymbolsNumber - additionalText.length) + additionalText + address;
  return fileAddress;
};

checkCommentLength('hello', 20);
isPalindrome('Лёша на полке клопа нашёл');
extractNumbers('а я томат');
createFileAddress ('q', 4, 'we');
