import { Console } from 'console';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'process';
import keygenerator from 'keygenerator';
import { SHA3 } from 'sha3'; 

class KeyGen {
    newKey() {        
        return keygenerator._({
            forceUppercase: true,
            length: 64
        });
    }
}

class HmacGen {
    newHmac(key, computer_move) {
        let hash = new SHA3(256);
        hash.update(key+computer_move);
        return hash.digest('hex');
    }
}

class Winner {
    playerWin(comp,playe) {

        let step = (game_moves.length-1)/2;
        let k = game_moves.indexOf(playe)-step;

        game_moves = game_moves.splice(k).concat(game_moves);
        let comp_move = game_moves.indexOf(comp);

        game_moves = Array.from(process.argv);

        if (comp_move == step) {
            return "Draw";
        } 
        if (comp_move<step) {
            return "Lose";
        } else {
            return "Win";
        }
    }
}

class GameHelp {
    help() {
        let result = [];
        let arr = [];
        for (let i=0; i<game_moves.length+1; i++) {
            for (let j=0; j<game_moves.length+1; j++) {
                
               if (i==0 && j==0) {
                   arr[0]='-';
                   continue;
               }
               if (i==0) {
                   arr[j] = game_moves[j-1];
                   continue;
               }
               if (j==0) { 
                   arr[0] = game_moves[i-1];
                   continue;
               };              
              
               arr.push(Winner.prototype.playerWin(game_moves[j-1],game_moves[i-1]));
            };
            result.push(arr);
            arr = [];                
        };        
        return result;
    }
}

process.argv.splice(0,2)
if (process.argv.length < 3) {
    console.log("Error: input less than three elements");
    console.log("Example: Rock Paper Scissors");
    process.exit(-1);
}; 
if (process.argv.length % 2 == 0) {
    console.log("Error: an even number of rows");
    console.log("Example: Rock Paper Scissors");
    process.exit(-1);
};

let game_moves = Array.from(process.argv);
let game_duplic = new Set(game_moves);
if(game_moves.length !== game_duplic.size) {
    console.log("Error: there are duplicate elements");
    console.log("Example: Rock Paper Scissors");
    process.exit(-1);
}

const rl = readline.createInterface({input, output});

while(true) {
    
    let computer_move = game_moves[Math.floor(Math.random()*game_moves.length)];
    let key = KeyGen.prototype.newKey();
    let hmac = HmacGen.prototype.newHmac(key,computer_move);

    console.log("-------------------------------------");
    console.log(`HMAC: ${hmac}`);

    for (let i=0;i<game_moves.length;i++) {
        console.log(`${i+1} - ${game_moves[i]}`);
    }
    console.log('0 - exit');
    console.log('? - help');

    const answer = await rl.question('Enter your move: ');
    
    if (answer == "0") {
        rl.close();
        break;
    }   

    if (answer == "?") {
        console.table(GameHelp.prototype.help());       
    }

    let player_move=game_moves[answer-1];  
    if (player_move == undefined) continue;  

    console.log(`Your move: ${player_move}`);
    console.log(`Computer move: ${computer_move}`);
    console.log(Winner.prototype.playerWin(computer_move,player_move));
    console.log(`HMAC key: ${key}`);    
}
