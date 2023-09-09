<script lang="ts">
const goFirst:string = "abcdeedcbadcbeebcdaaaaecbddbceecbddbceaaaadcbeebcdabcdeedcbaaadcbeebcdabcdeedcbaaecdbbdceaecdbbdceaabcdeedcbadcbeebcdaaaaaaecbddbceaabceddecbdcebbecdaadcebbecdbceddecbaaecbddbceaaaaaadcebbecdaecdbbdceaabcdeedcbabcdeedcbaaecdbbdceadcebbecdaaaecbddbceabceddecbaaaadcebbecddcebbecdaaaabceddecbaecbddbcea"
const faces = ["a","b","c","d","e"].map(l=>[...goFirst.matchAll(
    new RegExp(l,"g"))].map(v=>typeof v.index == "undefined" ? 0 : v.index+1)
)
const sample = (a:Array<number>) => {
    return a[Math.floor((Math.random()*a.length))]
}
const roll = () => {
    return faces.map(face=>sample(face))
}
let rolls : number[][] = []
$: displayRolls =  rolls.map(roll=>roll.toString()).join("\n")
let rolling = false
const appendRoll = () => {
    if (rolling) {
        rolls = [...rolls, roll()]
    }
}
setInterval(appendRoll,500);
</script>

<textarea disabled rows="10" value={displayRolls}/>

<button on:click={()=>rolling=!rolling}>
    {#if rolling}
        Stop rolling
    {:else}
        Start rolling
    {/if}
</button>
