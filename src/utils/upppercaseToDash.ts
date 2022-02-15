export default function uppercaseToDash(str){
  return !str
    ? ""
    : str.replace(
        /([A-Z]+)/g,
        function (g) { 
            return '-' + g[0].toLowerCase();
        });
}
