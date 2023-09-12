<script lang="ts">
import Chart from "$lib/components/Chart.svelte"
import { Dice } from "$lib/dice"
import exampleDiceJson from "$lib/exampleDice.json?raw"
import { page } from "$app/stores";
interface exampleDiceI {
    name: string
    code: string
}
const exampleDice : exampleDiceI[] = JSON.parse(exampleDiceJson)
let code:string = exampleDice[0].code
if ($page.url.hash) {
    code = $page.url.hash.slice(1)
}
let codeSelection:string|undefined
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
const updateCodeSelection = () => {
    if (codeSelection) {
        code = codeSelection
    }
    resetRolls()
}
setInterval(rollDice,1);
$: if (code) {
    resetRolls()
    if (exampleDice.map(d=>d.code).includes(code)) {
        codeSelection = code
    } else {
        codeSelection = undefined
    }
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
    <select style="width:100%" bind:value={codeSelection} on:change={updateCodeSelection}>
        <option value={undefined}>
            Custom die
        </option>
        {#each exampleDice as exampleDie}
            <option value={exampleDie.code}>
                {exampleDie.name}
            </option>
        {/each}
    </select>
</div>

<div>
    <input style="width:100%" bind:value={code}/>
</div>

<div>
    Share dice URL:
    <input disabled style="width:100%" value={$page.url.toString().split("#")[0]+"#"+code}/>
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
    <a href="http://gofirstdice.ericharshbarger.org">Learn more</a>
</p>
