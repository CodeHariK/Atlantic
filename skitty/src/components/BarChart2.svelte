<script lang="ts">
    import { onMount } from "svelte";
    import Chart from "chart.js/auto";

    onMount(() => {
        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 20 },
            { year: 2012, count: 15 },
            { year: 2013, count: 25 },
            { year: 2014, count: 22 },
            { year: 2015, count: 30 },
            { year: 2016, count: 28 },
        ];

        const ctx = document.getElementById(
            "acquisitions",
        ) as HTMLCanvasElement;

        if (ctx) {
            new Chart(ctx, {
                type: "bar",
                data: {
                    labels: data.map((row) => row.year),
                    datasets: [
                        {
                            label: "Acquisitions by year",
                            data: data.map((row) => row.count),
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        } else {
            console.error("Failed to acquire context for the chart");
        }
    });
</script>

<div class="chart-container">
    <canvas id="acquisitions"></canvas>
</div>
