  //create a function that take a paramater obj that return name field if obj is an object
  //else return obj
  export const getName = (obj: any) => {
    if (obj && obj.name) {
      return obj.name;
    }
    return obj;
  };
  //create a function that take a paramater obj that return icon field if obj is an object
  //else return undefined
  export const getIcon = (obj: any) => {
    if (obj && obj.icon) {
      return obj.icon;
    }
    return undefined;
  };

 export  function convertCamelCaseStringToHyphenatedString(str: string) {
    return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
  }

//create a function that return in an array of object the field list of an object which have the field name equal to the parameter name 
export const getList = (category: any, name: any) => {

  let obj = category.filter((object: any) => object.name === name)[0];
  console.log("Liste de category pour document ",obj.list);;
  return obj ? obj.list : [];
}
//create an array of string from an array of object with the field name which is a string  or string 
export const getListName = (list: any) => {
  let tmp = [];
  list.forEach((object) => {
    tmp.push(getName(object));
  });
  return tmp;
}