<script lang="ts">
    export let href:string
    export let code:string
</script>
<input disabled style="width:100%" value={href.split("?")[0]+"?code="+code}/>
