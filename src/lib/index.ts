// place files you want to import through the `$lib` alias in this folder.

export function sample<Type>(arr: Type[]): Type {
    // returns random element of array
    return arr[Math.floor((Math.random()*arr.length))]
}

export const charArray = (s:string) : string[] => {
    return [...new Set(s.split(""))].sort()
}

export const range = (n:number): number[] => {
    return Array.from(new Array(n), (_,i) => i)
}

export const substringUsingCharacters = (str:string,chars:string[]): string => {
    return str.split("").filter(l=>chars.includes(l)).join("");
}
