<script lang="ts">
import Chart from "../components/Chart.svelte";
import { Dice } from "$lib";
let diceString:string = "abcdeedcbdcbeebcdaecbddbceaaaaaaaaaecbddbceadcbeebcdbcdeedcbaaecdbbdceadcebbecdbceddecbaaaabceddecbdcebbecdaaaecdbbdceaecbddbceaaabceddecbdcebbecdaaaaaaaadcebbecdbceddecbaaaecbddbceaecdbbdceaaadcebbecdbceddecbaaaabceddecbdcebbecdaecdbbdceaadcbeebcdbcdeedcbaecdbbdceaaaaaaaaaecdbbdceabcdeedcbdcbeebcda"
$: dice = new Dice(diceString)
let rolling = false
const rollDice = () => {
    if (rolling) {
        dice.rollDice(); dice = dice
    }
}
const resetRolls = () => {
    rolling = false
    dice = new Dice(diceString)
}
setInterval(rollDice,5);
</script>

<div>
    <Chart {dice}/>
</div>

<div>
    <input on:change={resetRolls} style="width:100%" bind:value={diceString}/>
</div>

<div>
    <textarea disabled rows="10" cols="40" value={dice.display()}/>
    
    <button on:click={()=>rolling=!rolling}>
        {#if rolling}
            Stop rolling
        {:else}
            Start rolling
        {/if}
    </button>
    Rolls={dice.rolls.length} 
    <button on:click={resetRolls}>
        Reset rolls
    </button>

    <a href="https://github.com/StevenClontz/explore-go-first">GitHub</a>
</div>
