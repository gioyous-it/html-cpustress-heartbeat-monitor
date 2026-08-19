const params=new URLSearchParams(location.search);

if(!params.has("color"))params.set("color","black");
if(!params.has("initial"))params.set("initial","100");

history.replaceState(null,"","?"+params.toString());

const color=params.get("color");
const initialHeartbeat=parseFloat(params.get("initial"))||100;

document.body.style.backgroundColor=color;

const heartbeatElement=document.getElementById("heartbeat");
heartbeatElement.textContent=initialHeartbeat;

let n=0;
let lastN=0;
let start=performance.now();
let value=0;

function benchmark(){
    for(let i=0;i<100000;i++){
        value=(value+i)%1000000;
        n++;
    }

    const now=performance.now();

    if(now-start>=1000){
        const ratio=lastN?n/lastN:1;
        const heartbeat=Math.floor(initialHeartbeat*ratio);

        heartbeatElement.textContent=heartbeat;

        lastN=n;
        n=0;
        start=now;
    }

    setTimeout(benchmark,0);
}

benchmark();
