# Device Heartbeat

A lightweight HTML/JavaScript device heartbeat visualizer that measures relative CPU benchmark performance and displays it as a heartbeat value.

## Demo

![Demo](demo.gif "CPU Stress Monitor Demo")

## Features

- Relative CPU performance heartbeat
- Configurable heartbeat baseline
- Configurable background color
- Optional credits
- Expanded credits for displaying the repository URL
- Transparent background support
- URL-based configuration
- No external dependencies

## URL Parameters

### `color`

Controls the background color.

Default:

```text
?color=black
```

Transparent:

```text
?color=transparent
```

Any valid CSS color can be used:

```text
?color=red
?color=blue
?color=purple
?color=rgba(255,0,0,0.5)
```

### `initial`

Sets the heartbeat baseline.

Default:

```text
?initial=100
```

For example:

```text
?initial=60
```

With `initial=60`:

- `60` = baseline
- Below `60` = slower
- Above `60` = faster

If the current performance is 10% higher than the previous measurement:

```text
1.10 * 60 = 66
```

The heartbeat becomes `66`.

## Credits

Add:

```text
?credits
```

to display:

```text
heartbeat.gioyous.it
GitHub Repository
```

Use:

```text
?credits=stream
```

for the expanded link version, which displays:

```text
heartbeat.gioyous.it
https://github.com/gioyous-it/html-cpustress-heartbeat-monitor
```

## Combining Parameters

Parameters can be combined:

```text
?color=transparent&initial=60&credits
```

Or with the expanded link version:

```text
?color=transparent&initial=60&credits=stream
```

## Automatic Defaults

If `color` is not specified, `black` is automatically added.

If `initial` is not specified, `100` is automatically added.

The defaults are added to the URL using `history.replaceState()`, so the URL changes without refreshing the page.

For example:

```text
https://example.com/
```

becomes:

```text
https://example.com/?color=black&initial=100
```

without a reload.

Existing parameters are preserved.

## How the Heartbeat Works

The script continuously performs deterministic JavaScript calculations:

```javascript
for(let i=0;i<100000;i++){
    value=(value+i)%1000000;
    n++;
}
```

Approximately once per second, it compares the current amount of completed work with the previous measurement.

The ratio is:

```text
current iterations / previous iterations
```

The ratio is then multiplied by the configured `initial` value.

With a baseline of `100`:

```text
Same performance = 100
10% faster = 110
10% slower = 90
5% faster = 105
5% slower = 95
```

The result is rounded down.

The heartbeat is a relative performance measurement. It does not represent actual heart rate, CPU frequency, or CPU utilization.

## First Measurement

There is no previous measurement when the script starts, so the first heartbeat uses the configured baseline.

With:

```text
?initial=100
```

the first heartbeat is `100`.

With:

```text
?initial=60
```

the first heartbeat is `60`.

## Important

The measured value can be affected by the environment running the JavaScript.

Factors include:

- CPU load
- JavaScript scheduling
- Power-saving behavior
- Thermal throttling
- Other processes
- Other JavaScript running at the same time
- Background execution throttling
