const total = 195.63;

function toTime(tme) {
 let hr =  tme/60
 console.log(`Hour is::`, hr);
 let remd = tme%60
 console.log(`Remainder is::`, remd);
}

toTime(total)