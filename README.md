# pingg
Ping latency graphing CLI

`npm install thann/pingg`

`pingg google.com yahoo.com`

OR `docker run --rm -it thann/pingg`

![screenshot](https://gitlab.com/Thann/pingg/raw/master/example2.png)

## options
`--trace` `-t`  executes traceroute and graphs pings to every target

`--interval 1` `-i`  set time between each ping

`--flood` `-f` `-A`  pings as fast as possible

`--color` `-c`  list of colors to use. default: `green,blue,red,white,yellow,magenta`

`--prune 1000` `-p`  set number of pings between each graph simplification. disable with `0`, run with `Ctrl-p`

`--max 1000` `-m`  set max number of data-points for a sliding window graph instead of pruning

`--gateway` `g`  also pings the default gateway (router)

#### TCP
Adding a port to a hostname will use TCP intead of ICMP. i.e. `pingg google.com:443`
