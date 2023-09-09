// place files you want to import through the `$lib` alias in this folder.

export function sample<Type>(arr: Type[]): Type {
    // returns random element of array
    return arr[Math.floor((Math.random()*arr.length))]
}

interface ResultI {
    [dieName:string]: number
}
interface RollI {
    [dieName:string]: number
}

export class Dice {
    diceString: string;
    rolls: RollI[]
   
    constructor(diceString: string) {
      this.diceString = diceString;
      this.rolls = []
    }

    names() {
        return [...new Set(this.diceString.split(""))].sort().slice(0,5)
    }

    faces(dieName:string):number[] {
        const matches = [...this.diceString.matchAll(new RegExp(dieName,"g"))]
        return matches.map(match=>typeof match.index !== "undefined" ? match.index : 0)
    }

    rollDice():void {
        let newRoll:RollI = {}
        this.names().forEach((dieName)=>{
            newRoll[dieName] = sample(this.faces(dieName))
        })
        this.rolls.push(newRoll)
    }

    result(roll:RollI):ResultI {
        const values = this.names().map(name=>roll[name]).sort()
        let result:ResultI = {}
        this.names().forEach(name=>{
            result[name] = values.indexOf(roll[name])
        })
        return result
    }

    results():ResultI[] {
        return this.rolls.map(roll=>this.result(roll))
    }

    resultPercentage(dieName:string,place:number):number {
        if (this.rolls.length == 0) {
            return 0
        }
        return this.results().filter(result=>result[dieName]==place).length/this.results().length
    }

    display():string {
        return this.rolls.map(roll=>this.displayR(roll) + " / "+this.displayR(this.result(roll))).reverse().join("\n")
    }

    displayR(roll:RollI|ResultI):string {
        return this.names().map(name=>roll[name]).toString()
    }
}
