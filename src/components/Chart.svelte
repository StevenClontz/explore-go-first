<script lang="ts">
    import { onMount } from 'svelte'
    import Chart from 'chart.js/auto'
    let chartDiv:HTMLCanvasElement
    export let results:number[][]
    $: firsts = results.reduce((p,c)=>{
        let first = c.indexOf(1)
        let next = p
        next[first] = next[first]+1
        return next
    },[0,0,0,0,0])

    onMount(() => {
        new Chart(
            chartDiv,
            {
                type: 'line',
                data: {
                    labels: ["P1","P2","P3","P4","P5"],
                    datasets: [
                        {
                            label: 'Percentage of firsts',
                            data: firsts.map(n=>n/firsts.reduce((a,b)=>a+b,0))
                        }
                    ]
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 1,
                        }
                    }
                }
            }
        );
    })
</script>

<div>
    <canvas bind:this={chartDiv}/>
</div>

{firsts}