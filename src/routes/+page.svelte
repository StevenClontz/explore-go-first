<script lang="ts">
import { Dice } from "$lib/dice"
import exampleDiceJson from "$lib/exampleDice.json?raw"
import ShareUrl from "$lib/components/ShareUrl.svelte";
import { page } from "$app/stores";
import { onMount } from "svelte";
interface exampleDiceI {
    name: string
    code: string
}
const exampleDice : exampleDiceI[] = JSON.parse(exampleDiceJson)
let code:string = exampleDice[0].code
let codeSelection:string|undefined
let dice = new Dice(code)
const updateCodeSelection = () => {
    if (codeSelection) {
        code = codeSelection
    }
    dice = new Dice(code)
}
$: if (code) {
    if (exampleDice.map(d=>d.code).includes(code)) {
        codeSelection = code
    } else {
        codeSelection = undefined
    }
    dice = new Dice(code)
}
onMount(()=>{
    const paramCode = $page.url.searchParams.get("code")
    if (paramCode) {
        code = paramCode
    }
})
</script>

<svelte:head>
    <title>Try Go-First Dice</title>
</svelte:head>

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
    <ShareUrl href={$page.url.href} {code}/>
</div>


{#each dice.names as name}
    <div>
        {#if dice.getSides(name) == 2}
            <img style="height:4em;" alt="d2" src="/dice/2.svg" />
        {:else if dice.getSides(name) == 4}
            <img style="height:4em;" alt="d4" src="/dice/4.svg" />
        {:else if dice.getSides(name) == 6}
            <img style="height:4em;" alt="d6" src="/dice/6.svg" />
        {:else if dice.getSides(name) == 8}
            <img style="height:4em;" alt="d8" src="/dice/8.svg" />
        {:else if dice.getSides(name) == 12}
            <img style="height:4em;" alt="d12" src="/dice/12.svg" />
        {:else if dice.getSides(name) == 20}
            <img style="height:4em;" alt="d20" src="/dice/20.svg" />
        {:else}
            <img style="height:4em;" alt="non-Platonic die" src="/dice/other.svg" />
        {/if}
        <p>{dice.getFaces(name).map(i=>(i+1).toString()).join(" ")}</p>
    </div>
{/each}

<p>
    <a href={"/dashboard?code="+code}>Dashboard</a> |
    <a href="https://github.com/StevenClontz/explore-go-first">GitHub</a> |
    <a href="http://gofirstdice.ericharshbarger.org">Learn more</a>
</p>
