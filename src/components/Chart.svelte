<script lang="ts">
    import { onMount } from 'svelte'
    import Chart from 'chart.js/auto'
    import type { Dice } from '$lib/dice'
    let chartCanvas:HTMLCanvasElement
    let chart:Chart
    let yAxisMin = 0
    let yAxisMax = 100
    export let dice:Dice
    const updateChart = (c:Chart,dice:Dice) => {
        c.data.labels = dice.names
        dice.ranks.forEach(rank=>{
            c.data.datasets[rank].data = dice.percentages[rank]
        })
        if (c.options.scales && c.options.scales.y) {
            const newMin = Math.min(
                Math.floor(dice.minPercentage()),
                Math.max(0,Math.floor(dice.minPercentage()-0.5*dice.percentageRange()))
            )
            if (newMin > yAxisMin || newMin < yAxisMin-1) {
                yAxisMin = newMin
                c.options.scales.y.min = yAxisMin
            }
            const newMax = Math.max(
                Math.ceil(dice.maxPercentage()),
                Math.min(100,Math.ceil(dice.maxPercentage()+0.5*dice.percentageRange())),
                10
            )
            if (newMax < yAxisMax || newMax > yAxisMax+1) {
                yAxisMax = newMax
                c.options.scales.y.max = yAxisMax
            }
        }
        c.update()
    }
    onMount(()=>{
        chart = new Chart(
            chartCanvas,
            {
                type: 'line',
                data: {
                    labels: dice.names,
                    datasets: dice.ranks.map(rank=>{
                        return {
                            label: "% rank "+rank.toString(),
                            data:dice.percentages[rank]
                        }
                    }),
                },
                options: {
                    scales: {
                        y: {
                            min: yAxisMin,
                            max: yAxisMax,
                        }
                    }
                }
            }
        );
        updateChart(chart,dice)
    })
    $: if (chart && dice) {
        updateChart(chart,dice)
    }
</script>

<div>
    <canvas style="max-height:60vh" bind:this={chartCanvas}/>
</div>
