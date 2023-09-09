<script lang="ts">
    import { onMount } from 'svelte'
    import Chart from 'chart.js/auto'
    import { dice } from '$lib';
    let chartCanvas:HTMLCanvasElement
    let chart:Chart
    export let results:number[][]
    export let diceString:string
    const countPlaces = (rs:number[][], place:number) => {
        return rs.reduce((p,c)=>{
            let first = c.indexOf(place)
            let next = p
            next[first] = next[first]+1
            return next
        },[0,0,0,0,0])
    }
    $: percents = [1,2,3,4,5].map(place=>{
        if (results.length==0) {
            return [0,0,0,0,0]
        } else {
            return countPlaces(results,place).map(n=>n/countPlaces(results,place).reduce((a,b)=>a+b,0))
        }
    })
    onMount(()=>{
        chart = new Chart(
            chartCanvas,
            {
                type: 'line',
                data: {
                    labels: dice(diceString),
                    datasets: dice(diceString).map((_,i)=>{
                        return {
                            label: '% place '+(i+1).toString(),
                            data: []
                        }
                    })
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
        percents.forEach((percent,i)=>chart.data.datasets[i].data=percent)
        chart.update()
    }
</script>

<div>
    <canvas style="max-height:60vh" bind:this={chartCanvas}/>
</div>
