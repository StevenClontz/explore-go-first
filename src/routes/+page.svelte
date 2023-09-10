<script lang="ts">
import Chart from "../components/Chart.svelte"
import { Dice } from "$lib"
import defaultDiceJson from "$lib/defaultDice.json?raw"
interface defaultDiceI {
    name: string
    code: string
}
const defaultDice : defaultDiceI[] = JSON.parse(defaultDiceJson)
let code:string = defaultDice[0].code
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
    <input style="width:100%" bind:value={code}/>
</div>

<div>
    Rolls={dice.rolls.length} 
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
    <button on:click={resetRolls}>
        Reset rolls
    </button>

    <select bind:value={code} on:change={()=>rolling=false}>
		{#each defaultDice as defaultDie}
			<option value={defaultDie.code}>
				{defaultDie.name}:
                {defaultDie.code.slice(0,10)}
                {#if defaultDie.code.length > 10}...{/if}
			</option>
		{/each}
	</select>
</div>

<p>
    <a href="https://github.com/StevenClontz/explore-go-first">GitHub</a> |
    <a href="http://gofirstdice.ericharshbarger.org/doku.php">Learn more</a>
</p>