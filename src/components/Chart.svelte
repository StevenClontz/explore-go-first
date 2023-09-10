<script lang="ts">
    import { onMount } from 'svelte'
    import Chart from 'chart.js/auto'
    import type { Dice } from '$lib'
    let chartCanvas:HTMLCanvasElement
    let chart:Chart
    export let dice:Dice
    const updateChart = (c:Chart,dice:Dice) => {
        c.data.labels = dice.names
        dice.ranks.forEach(rank=>{
            c.data.datasets[rank].data = dice.percentages[rank]
        })
        if (c.options.scales && c.options.scales.y) {
            c.options.scales.y.min = Math.min(
                Math.floor(dice.minPercentage()),
                Math.max(0,Math.round(dice.averagePercentage())-5)
            )
            c.options.scales.y.max = Math.max(
                Math.ceil(dice.maxPercentage()),
                Math.min(100,Math.round(dice.averagePercentage())+5),
                10
            )
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
                            min: 0,
                            max: 100,
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
