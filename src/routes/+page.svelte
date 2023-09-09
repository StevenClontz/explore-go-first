<script lang="ts">
const goFirst:string = "abcdeedcbadcbeebcdaaaaecbddbceecbddbceaaaadcbeebcdabcdeedcbaaadcbeebcdabcdeedcbaaecdbbdceaecdbbdceaabcdeedcbadcbeebcdaaaaaaecbddbceaabceddecbdcebbecdaadcebbecdbceddecbaaecbddbceaaaaaadcebbecdaecdbbdceaabcdeedcbabcdeedcbaaecdbbdceadcebbecdaaaecbddbceabceddecbaaaadcebbecddcebbecdaaaabceddecbaecbddbcea"
const faces = [
    [...goFirst.matchAll(/a/g)].map(v=>typeof v.index == "undefined" ? 0 : v.index+1),
    [...goFirst.matchAll(/b/g)].map(v=>typeof v.index == "undefined" ? 0 : v.index+1),
    [...goFirst.matchAll(/c/g)].map(v=>typeof v.index == "undefined" ? 0 : v.index+1),
    [...goFirst.matchAll(/d/g)].map(v=>typeof v.index == "undefined" ? 0 : v.index+1),
    [...goFirst.matchAll(/e/g)].map(v=>typeof v.index == "undefined" ? 0 : v.index+1),
]
const sample = (a:Array<number>) => {
    return a[Math.floor((Math.random()*a.length))]
}
const roll = () => {
    return faces.map(face=>sample(face))
}
let rolls = ""
let rolling = false
const appendRoll = () => {
    if (rolling) {
        rolls = rolls + roll().toString() + "\n"
    }
}
setInterval(appendRoll,500);
</script>

<textarea disabled rows="10" value={rolls}/>

<button on:click={()=>rolling=!rolling}>
    {#if rolling}
        Stop rolling
    {:else}
        Start rolling
    {/if}
</button>
