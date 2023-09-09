<script lang="ts">
import Chart from "../components/Chart.svelte";
let goFirst:string = "abcdeedcbdcbeebcdaecbddbceaaaaaaaaaecbddbceadcbeebcdbcdeedcbaaecdbbdceadcebbecdbceddecbaaaabceddecbdcebbecdaaaecdbbdceaecbddbceaaabceddecbdcebbecdaaaaaaaadcebbecdbceddecbaaaecbddbceaecdbbdceaaadcebbecdbceddecbaaaabceddecbdcebbecdaecdbbdceaadcbeebcdbcdeedcbaecdbbdceaaaaaaaaaecdbbdceabcdeedcbdcbeebcda"
const faces = ["a","b","c","d","e"].map(l=>[...goFirst.matchAll(
    new RegExp(l,"g"))].map(v=>typeof v.index == "undefined" ? 0 : v.index+1)
)
const sample = (a:Array<number>) => {
    return a[Math.floor((Math.random()*a.length))]
}
const roll = () => {
    return faces.map(face=>sample(face))
}
const result = (roll:number[]) => {
  const sorted = [...roll].sort();
  return roll.map((r) => sorted.indexOf(r) + 1);
}
let rolls : number[][] = []
let results : number[][] = []
let displayRolls = ""
let rolling = false
const appendRoll = () => {
    if (rolling) {
        let newRoll = roll()
        rolls = [...rolls, newRoll]
        displayRolls = newRoll + "\n" + displayRolls
        results = [...results, result(newRoll)]
    }
}
const resetRolls = () => {
    rolling = false
    rolls = []
    displayRolls = ""
    results = []
}
setInterval(appendRoll,5);
</script>

<div>
    <Chart {results}/>
</div>

<div>
    <input style="width:100%" bind:value={goFirst}/>
</div>

<div>
    <textarea disabled rows="10" value={displayRolls}/>
    
    <button on:click={()=>rolling=!rolling}>
        {#if rolling}
            Stop rolling
        {:else}
            Start rolling
        {/if}
    </button>
    <button on:click={resetRolls}>
        Reset rolls
    </button>

    <a href="https://github.com/StevenClontz/explore-go-first">GitHub</a>
</div>
