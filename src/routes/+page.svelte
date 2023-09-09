<script lang="ts">
import Chart from "../components/Chart.svelte";
import { roll, result } from "$lib";
let diceString:string = "abcdeedcbdcbeebcdaecbddbceaaaaaaaaaecbddbceadcbeebcdbcdeedcbaaecdbbdceadcebbecdbceddecbaaaabceddecbdcebbecdaaaecdbbdceaecbddbceaaabceddecbdcebbecdaaaaaaaadcebbecdbceddecbaaaecbddbceaecdbbdceaaadcebbecdbceddecbaaaabceddecbdcebbecdaecdbbdceaadcbeebcdbcdeedcbaecdbbdceaaaaaaaaaecdbbdceabcdeedcbdcbeebcda"
let rolls : number[][] = []
let results : number[][] = []
let displayRolls = ""
let rolling = false
const appendRoll = () => {
    if (rolling) {
        let newRoll = roll(diceString)
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
    <Chart {results} {diceString}/>
</div>

<div>
    <input on:change={resetRolls} style="width:100%" bind:value={diceString}/>
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
