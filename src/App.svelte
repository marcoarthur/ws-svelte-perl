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
  let sse;
  let event_source = tweened(0, { duration: 400});
  let edata;

  // The websocket to mojo server
  onMount( () => {
    let conf = window.__app
    ws = new WebSocket(conf.wsUrl);

    ws.onmessage = function (event) {
      data = JSON.parse(event.data);
      completed.set(data.total);
    };

    ws.onopen = function (event) {
      ws.send(JSON.stringify({msg: 'I ♥ Mojolicious!'}));
    };

    sse = new EventSource(conf.sseUrl);

    sse.addEventListener('tick', function(event) {
      edata = JSON.parse(event.data);
      console.log(edata);
      event_source.set(edata.total);
    });
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


<h3> Using Controls </h3>
<div class="progress-1">
  <Progress value={$value} {max} {usePercent} />
</div>
<hr/>
<h3> Using Web Sockets </h3>
<div class="progress-1">
  <Progress value={$completed} {max} {usePercent} />
</div>
<hr/>
<h3> Using Source Events </h3>
<div class="progress-1">
  <Progress value={$event_source} {max} {usePercent} />
</div>

