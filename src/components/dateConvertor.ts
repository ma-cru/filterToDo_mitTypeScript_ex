const dateConvertor = (date: string): string => {

  const indexPnt = Number(date.indexOf('T'))+1;

  console.log(date.slice(0, indexPnt));

  return date.slice(0, indexPnt);

}

export default dateConvertor;