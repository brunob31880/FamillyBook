import moment from "moment";
const debug=false;
//
//
//
export const small = (d) => {
    let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(d);
    return `${ye}-${mo}-${da}`;
};
//
//
//
export const slashed = (d) => {
    let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(d);
    return `${da}/${mo}/${ye}`;
};
//
//
//
export const validateDateWithSeparator = (d, separator) => {
    if (!d) return [];
    console.log("Dateutils:Validating "+d);
    const regex = /^\d{2}:\d{2}/g;
    const found = d.match(regex);
    return found;
};

//
//
//
export const index = (d) => {
    let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(d);
    let mo = new Intl.DateTimeFormat('fr', { month: '2-digit' }).format(d);
    let da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(d);
    return `${ye}${mo}${da}`;
};
//
//
//
export const addDaysToDate = (date, days) => {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
}

//
// retourne le dernier jour du mois au format slashed
//
export const lastDayOfTheMonth = () => {
    let tmonth = dayOfTheMonth();
    return tmonth.pop();
}

//
// retourne le dernier jour du mois au format slashed
//
export const firstDayOfTheMonth = () => {
    let tmonth = dayOfTheMonth();
    return tmonth.pop();
}
//
//
//
export const doY = (fdate) => {
    let ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(fdate);
    let mo = new Intl.DateTimeFormat('fr', { month: 'numeric' }).format(fdate);
    let da = new Intl.DateTimeFormat('fr', { day: 'numeric' }).format(fdate);
    return moment().year(ye).month(mo - 1).date(da).dayOfYear();
}
//
// retourne un tableau contenant tous les jours du mois au format jj/mm/aaaa
//
export const dayOfTheMonth = () => {
    let lmonth = [];
    let today = new Date();
    let d = new Date(1, today.getMonth(), today.getFullYear());
    let i = 0;
    while (addDaysToDate(d, i).getMonth() === today.getMonth() && i < 31) {
        let nd = addDaysToDate(d, i);
        lmonth.push(slashed(nd));
        i++;
    }
    return lmonth;
}
//
//
//
export  function datesBetween(start, end) {
  for (var arr = [], dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1))  arr.push(new Date(dt));
  return arr;
}
//
//
//
export function buildDateAndTime(date, heure, minutes) {
    const result = new Date(date);
    result.setHours(heure);
    result.setMinutes(minutes);
    result.setSeconds(0);
    return result;

  }
 
//
//
//
export const sameDay = (d1, d2) => {
  if (debug) console.log("Same Day=" + d1 + " <=> " + d2)
  let t1 = new Date(d1).setHours(0, 0, 0, 0);
  let t2 = new Date(d2).setHours(0, 0, 0, 0)
  if (t1 === t2) {
      if (debug) console.log("Same Day=" + d1 + " <=> " + d2)
  }
  return (t1 === t2)
}

  export function buildDatePlusPeriod(date, period, hh, mm) {
    return buildDateAndTime(addDaysToDate(date, period), hh, mm);
  }

   /* trie une liste de dates dans l'ordre, en particulier pour traitement de metadata*/
   export function trierListeDeDates(liste) {

    liste.sort(function compare(a, b) {
      let dateAA = new Date(a);
      let dateBB = new Date(b);
      return dateAA - dateBB;
    });

  }

  export function twoDigits(hr) {
    return ("0" + hr).slice(-2);
  }


/**
* 
* @param {*} d 
*/
export const formatDate=(d)=> {
  if (d==="Vide") return d;
  let h=d.split(":")[0];
  let m=d.split(":")[1];
  return twoDigits(h)+":"+twoDigits(m);
}
