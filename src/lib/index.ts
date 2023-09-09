// place files you want to import through the `$lib` alias in this folder.

export const sample = (a:Array<any>) => {
    return a[Math.floor((Math.random()*a.length))]
}

export const dice = (diceString:string) => {
    return [...new Set(diceString.split(""))].sort().slice(0,5)
}

export const faces = (diceString:string) => {
    return dice(diceString).map(die=>{
        return [...diceString.matchAll(new RegExp(die,"g"))]
        .map(v=>typeof v.index == "undefined" ? 0 : v.index+1)
    })
}

export const roll = (diceString:string) => {
    return faces(diceString).map(face=>sample(face))
}

export const result = (roll:number[]) => {
    const sorted = [...roll].sort();
    return roll.map((r) => sorted.indexOf(r) + 1);
}