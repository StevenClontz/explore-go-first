import type { fairnessCheck } from './fairnessChecks'
import { computePermCheck } from "./fairnessChecks"
import { charArray, sample, substringUsingCharacters, range } from "$lib"

export class Dice {
    code: string
    names: string[]
    ranks: number[]
    faces: number[][]
    // this.percentages[i][j] = ith rank, jth die
    percentages: number[][]
    displayLines: string[]
    rolls: number[][]
    permCheck: fairnessCheck|undefined
   
    constructor(code: string) {
        this.names = charArray(code)
        this.code = substringUsingCharacters(code,this.names)
        this.ranks = range(this.names.length)
        this.faces = this.names.map(dieName=>{
            const matches = [...this.code.matchAll(new RegExp(dieName,"g"))]
            return matches.map(match=>typeof match.index !== "undefined" ? match.index : 0)
        })
        this.percentages = this.names.map(_=>this.names.map(_=>0))
        this.displayLines = []
        this.rolls = []
        if (this.count()>6) {
            this.permCheck = undefined
        } else {
            this.permCheck = computePermCheck(this.code)
        }
    }

    getFaces(dieName:string) {
        return this.faces[this.names.indexOf(dieName)]
    }

    rollDice():void {
        const newRoll = this.names.map(dieName=>sample(this.getFaces(dieName)))
        const prevCount = this.rolls.length
        let percentageMults = this.percentages.map(ps=>ps.map(p=>p*prevCount/100))
        this.result(newRoll).forEach((rank,dieIndex)=>{
            percentageMults[rank][dieIndex] += 1
        })
        this.percentages = percentageMults.map(ps=>ps.map(p=>p/(prevCount+1)*100))
        this.rolls.push(newRoll)
        this.displayLines = [
            newRoll.toString()+" / "+this.result(newRoll).toString(),
            ...this.displayLines.slice(0,20)
        ]
    }

    result(roll:number[]):number[] {
        const values = [...roll].sort((a,b)=>a-b)
        return roll.map(value=>values.indexOf(value))
    }

    display():string {
        return this.displayLines.join("\n")
    }

    count():number {
        return this.names.length
    }

    flatPercentages():number[] {
        return this.percentages.reduce((p,c)=>[...p,...c],[])
    }
    
    averagePercentage():number {
        return this.flatPercentages().reduce((p,c)=>p+c,0)/this.count()/this.count()
    }
    
    maxPercentage():number {
        return Math.max(...this.flatPercentages())
    }
    
    minPercentage():number {
        return Math.min(...this.flatPercentages())
    }
    
    percentageRange():number {
        return this.maxPercentage()-this.minPercentage()
    }

    permCheckString():string {
        const permCheck = this.permCheck
        if (permCheck) {
            return JSON.stringify(permCheck, undefined, "  ")
        }
        return "permCheck unavailable"
    }
}
