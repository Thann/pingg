# pingg
Ping latency graphing CLI

`npm install thann/pingg`

`pingg google.com yahoo.com`

![screenshot](https://gitlab.com/Thann/pingg/raw/master/example2.png)

## options
`--trace` `-t`  executes traceroute and graphs pings to every target

`--interval 1` `-i`  set time between each ping

`--flood` `-f` `-A`  pings as fast as possible

`--color` `-c`  list of colors to use. default: `green,blue,red,white,yellow,magenta`

`--prune 1000` `-p`  set number of pings between each graph cleanup. disable with `0`, run with `Ctrl-p`

`--gateway` `g`  also pings the default gateway (router)
