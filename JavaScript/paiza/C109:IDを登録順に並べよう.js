// [C109:IDを登録順に並べようの問題に再チャレンジ！ | プログラミング学習サイト【paizaラーニング】](https://paiza.jp/works/challenges/535/retry)

process.stdin.resume();
process.stdin.setEncoding('utf8');

const lines = [];
const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
reader.on('line', (line) => {
  lines.push(line);
});
reader.on('close', () => {
  const N = Number(lines[0]); 
  
  const usersData = lines.slice(1, N+1).map((id)=>{
    const userId = id;
    const userNumber = Number(id.match(/\d+/)[0]);
    return{
      userId,
      userNumber,
    };
  })
  
  usersData.sort((a, b)=>{
    if(a.userNumber < b.userNumber){
      return -1;
    }else{
      return 1;
    }
  });
  
  for (let user of usersData) {
    console.log(user.userId);
  }
});
