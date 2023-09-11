<script lang="ts">
import Chart from "../components/Chart.svelte"
import { Dice } from "$lib/dice"
import exampleDiceJson from "$lib/exampleDice.json?raw"
interface exampleDiceI {
    name: string
    code: string
}
const exampleDice : exampleDiceI[] = JSON.parse(exampleDiceJson)
let code:string = exampleDice[0].code
let dice = new Dice(code)
let rolling = false
const rollDice = () => {
    if (rolling) {
        dice.rollDice(); dice = dice
    }
}
const resetRolls = () => {
    rolling = false
    dice = new Dice(code)
}
setInterval(rollDice,1);
$: if (code) {
    resetRolls()
}
</script>

<svelte:head>
    <title>Explore Go-First Dice</title>
</svelte:head>

<div>
    {#key code}
    <Chart {dice}/>
    {/key}
</div>

<div>
    <select style="width:100%" bind:value={code} on:change={()=>rolling=false}>
        {#each exampleDice as exampleDie}
            <option value={exampleDie.code}>
                {exampleDie.name}:
                {exampleDie.code.slice(0,10)}
                {#if exampleDie.code.length > 10}...{/if}
            </option>
        {/each}
    </select>
</div>

<div>
    <input style="width:100%" bind:value={code}/>
</div>

<div>
    Rolls={dice.rolls.length} 
</div>

<div>
    <textarea disabled rows="10" cols="40" value={dice.display()}/>
    <textarea disabled rows="10" cols="40" value={dice.permCheckString()}/>
</div>

<div>
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
</div>

<p>
    <a href="https://github.com/StevenClontz/explore-go-first">GitHub</a> |
    <a href="http://gofirstdice.ericharshbarger.org/doku.php">Learn more</a>
</p>
