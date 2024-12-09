import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    let count = 0;
    data.split('\n').forEach(line => {
      let safe = true;
      let positive = undefined;

      const spLine = line.split(' ');
      if (!spLine[0] || !spLine[1]) throw new Error()
      for(let i = 0; i<spLine.length-1;i++){
        if(!spLine[i] || !spLine[i+1]) throw new Error();
        if (!safe) continue;
        let i1 = parseInt((spLine[i]??"0"))
        let i2 = parseInt((spLine[i+1]??"0"))
        console.log(`i1: ${i1} | i2: ${i2} | diff: ${i1-i2} | safe: ${safe}`)
        if(i1-i2>3 || i2-i1>3 || i2-i1 == 0) {
          safe = false;
          continue;
        }
        if(i1-i2 > 0) {
          if(!positive && positive !== undefined){
            safe = false;
            continue;
          }
          positive = true;
        }
        if(i1-i2 < 0) {
          if(positive){
            safe = false;
            continue;
          }
          positive = false;
        }
      }
      if(safe) count++
      console.log(`---- safe=${count} ----`)
    })


    console.log(count)
  })
}