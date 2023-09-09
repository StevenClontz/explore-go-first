<script lang="ts">
    import { onMount } from 'svelte'
    import Chart from 'chart.js/auto'
    let chartCanvas:HTMLCanvasElement
    let chart:Chart
    export let results:number[][]
    $: firsts = results.reduce((p,c)=>{
        let first = c.indexOf(1)
        let next = p
        next[first] = next[first]+1
        return next
    },[0,0,0,0,0])
    $: firstPercents = firsts.map(n=>n/firsts.reduce((a,b)=>a+b,0))
    onMount(()=>{
        chart = new Chart(
            chartCanvas,
            {
                type: 'line',
                data: {
                    labels: ["P1","P2","P3","P4","P5"],
                    datasets: [
                        {
                            label: 'Percentage of firsts',
                            data: []
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
    $: if (chart) {
        chart.data.datasets[0].data = firstPercents
        chart.update()
    }
</script>

<div>
    <canvas style="max-height:60vh" bind:this={chartCanvas}/>
</div>
