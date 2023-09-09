<script lang="ts">
    import { onMount } from 'svelte'
    import Chart from 'chart.js/auto'
    import type { Dice } from '$lib';
    let chartCanvas:HTMLCanvasElement
    let chart:Chart
    export let dice:Dice
    const updateChart = (c:Chart,dice:Dice) => {
        c.data.labels = dice.names()
        c.data.datasets = [...dice.names().keys()].map(place=>{
            return {
                label: "% place "+place,
                data: dice.names().map(dieName=>dice.resultPercentage(dieName,place))
            }
        })
        c.update()
    }
    onMount(()=>{
        chart = new Chart(
            chartCanvas,
            {
                type: 'line',
                data: {
                    labels: [],
                    datasets: [],
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
        updateChart(chart,dice)
    })
    $: if (chart && dice) {
        updateChart(chart,dice)
    }
</script>

<div>
    <canvas style="max-height:60vh" bind:this={chartCanvas}/>
</div>
