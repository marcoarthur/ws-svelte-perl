<script>
  import { tweened } from 'svelte/motion';
  import { onMount } from 'svelte';
  import Progress from './Progress.svelte';

  var ws;
  let max = 10;
  let usePercent = true;
  let value = tweened(0, { duration: 400 });
  let completed = tweened(0, { duration: 400});
  let data;

  // The websocket to mojo server
  onMount( () => {
    ws = new WebSocket('ws://127.0.0.1:8080/ws');

    ws.onmessage = function (event) {
      data = JSON.parse(event.data);
      completed.set(data.total);
    };

    ws.onopen = function (event) {
      ws.send(JSON.stringify({msg: 'I ♥ Mojolicious!'}));
    };
  });

</script>

<style>
  .progress-1 {
    display: block;
    height: 100px;
    margin: 20px;
    width: 100px;
  }
  span {
    display: block;
  }
</style>

<div>
  <span>The current value = {$value}</span>
  <button disabled={$value <= 0} on:click={() => value.update(v => Math.max(0, v - 1))}>-</button>
  <button disabled={$value >= max} on:click={() => value.update(v => Math.min(max, v + 1))}>+</button>
  <label>
    <input type="checkbox" bind:checked={usePercent} />
    <span>Show as percentage</span>
  </label>
</div>

<div class="progress-1"><Progress value={$value} {max} {usePercent} /> </div>
<hr/>
<div class="progress-1"><Progress value={$completed} {max} {usePercent} /> </div>

