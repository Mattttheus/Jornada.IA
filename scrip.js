import utils from './utils.js'
import Rna from './Rna.js'
import controls from'./controls.js'

const SAMPLES = 20

const game= Runner.instance_;

let dinoList = []
let dinoIndex = 0

let bestScore = 0;

let bestRna = null

function fillDinoList(){

    for (let i= 0; i < SAMPLES; i++){

        dinoList[i]= new Rna(3, [10,10,2])

        dinoList[i].load(bestRna)
        if(i>0) dinoList[i].mutate(0.5)
    }
    
    console.log('List dinossauro Criada')
}
setTimeout(()=>{

    fillDinoList()
    controls.dispatch('jump')

}, 1000)

setInterval(()=>{

    if (!game.activated) return;

    const dino = dinoList[dinoIndex];

    if (game.crashed){

        if (dino.score> bestScore){

            bestScore = dino.score
            bestRna = dino.save()
            console.log('Melhor pontuação:', bestScore)
        }

        dinoIndex++
    
      
    if (dinoIndex === SAMPLES){

        fillDinoList();
        dinoIndex = 0
        bestScore = 0
    }

    game.restart()

}

const{tREX, horizon, currentSpeed, distanceRan, dimensions}=game
dino.score = distanceRan -2000

const player ={

    x:tREX.Pos,
    y:tREX.yPos,
    speed:currentSpeed     
};

const[obstacle] = horizon.obstacle
.map ((obstacle)=>{
    return{

        x: obstacle.xPos,
        y: obstacle.yPos
    }
})

    .filter((obstacle)=> obstacle.x>player.x)

    if (obstacle){

        const distance = 1 -(utils.getDistance(player, obstacle)/dimensions.WIDTH);
        const speed = player.speed / 6
        const height = Math.tanh(105- obstacle.y)

        const[jump,crouch]= dino.comput([
            distance,
            speed,
            height,
        ]);

        if (jump === crouch )return;
        if (jump)controls.dispatch('jump')
        if(crouch)controls.dispatch('crouch')

    }

},100);

/*const s =document.createElement('script');
s. type = 'module';
s .src  ='http://localhost:5500/script.js'
document.body.appendChild(s)*/