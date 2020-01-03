<script>	
export let value = 0;
export let max = 100;
export let usePercent = true;

$: charSize = 80 / (`${max}`.length * 3);

$: percent = Math.round((value / max)*100) + '%';
$: progressPath = getProgressPath(value, max);
$: cleanValue = parseInt(value * 10, 10) / 10;
	
function getProgressPath(value, max) {
	if (value <= 0) {
		return "";
	}	else if (value >=  max){
		return "M50,5A45 45 0 1 1 49.9999 5";
	} else {
		const angle = (Math.PI * 2) * (value / max);
		const x = 50 + (Math.cos(angle - (Math.PI / 2)) * 45);
		const y = 50 + (Math.sin(angle - (Math.PI / 2)) * 45);
		
		let path = "M50,5";
		
		if (angle > Math.PI) {
			path += "A45 45 0 0 1 50 95";
		}
		
		path += `A45 45 0 0 1 ${x} ${y}`;
		
		return path;
	}
}

</script>

<style>	
	.outer-circle,
	.progress {
		fill: transparent;
		stroke-linecap: round;
	}
	
	.outer-circle {
		stroke: grey;
		stroke-width: 9px;
	}
	
	.progress {
		stroke: lightgreen;
		stroke-width: 10px;
	}
	
	.value, .max {
		font-size: var(--fontSize);
		dominant-baseline: central;
	}
	
	.value {
		text-anchor: end;
	}
	
	.max {
		text-anchor: start;
	}
	
	.percent {		
			font-size: 30px;
			text-anchor: middle;
			dominant-baseline: central;
	}
</style>

<svg viewBox="0 0 100 100">
	<path class="outer-circle" d="M50,5A45 45 0 1 1 49.9999 5" />
	<path class="progress" d={progressPath} />
	{#if usePercent}
		<text class="percent" x="50" y="50">{percent}</text>
	{:else}
		<text class="value" style="--fontSize: {charSize * 3}px" x="55" y="50">{cleanValue}</text>
		<text class="max" style="--fontSize: {charSize * 1.5}px"x="55" y="{50 + charSize}">{max}</text>
	{/if}
</svg>
