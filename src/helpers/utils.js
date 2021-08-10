export function truncate(text, length) {
  let newText;
  if (text.length >= length) {
    newText = text.slice(0, length) + ' ' +  '....'    
    return newText
  }
  else {
   return text;
  }
}