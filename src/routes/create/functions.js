// @ts-nocheck

// jos luku on suurempi tai yhtäsuuri kuin 10 -> palauttaa luvun ilman muutosta
// muutoin esim. jos luku 9 -> palauttaa luvun muodossa "09"
const addZero = d => d >= 10 ? d : "0" + d; 

// funktio palauttaa ajan muodossa "2022-11-22 08:23:12"
function currentTimestamp(){
    let now = new Date(Date.now());
    // getMonth() palauttaa luvun 0..11, joten lisätään 1
    let month = now.getMonth() + 1;

    now = `${now.getFullYear()}-${addZero(month)}-${addZero(now.getDate())} ${addZero(now.getHours())}:${addZero(now.getMinutes())}:${addZero(now.getSeconds())}`;

    return now;
}

export default {
    currentTimestamp,
}