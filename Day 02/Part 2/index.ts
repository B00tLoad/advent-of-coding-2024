import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    let count = 0;
    data.split('\n').forEach(line => {
      const spLine = line.split(' ');

      let safe = checkIsSafe(spLine)
      if(safe) count++
      if(!safe){
        let safeMinusOne = false;
        for(let j = 0; j<spLine.length; j++){
          if(safeMinusOne) continue;
          console.log(`-- unsafe - checking without value #${j} --`)
          let spLineF = spLine;
          spLineF = spLineF.filter((_value, index) => index !== j);
          safeMinusOne = checkIsSafe(spLineF)
        }
        if(safeMinusOne) {
          safe = safeMinusOne
          count++
        }
      }
      if (safe) console.log(`---- safe=${count} ----`)
      if (!safe) console.log("---- unsafe, even filtered ----")
    })


    console.log(count)
  })
}

function checkIsSafe(spLine:string[]){
  let safe = true;
  let positive = undefined;
  if (!spLine[0] || !spLine[1]) throw new Error()
  for(let i = 0; i<spLine.length-1;i++){
    if (!safe) continue;
    if(!spLine[i] || !spLine[i+1]) throw new Error();
    let i1 = parseInt((spLine[i]??"0"))
    let i2 = parseInt((spLine[i+1]??"0"))
    if(i1-i2>3 || i2-i1>3 || i2-i1 == 0) {
      safe = false;
    }
    if(i1-i2 > 0) {
      if(!positive && positive !== undefined){
        safe = false;
      }
      positive = true;
    }
    if(i1-i2 < 0) {
      if(positive){
        safe = false;
      }
      positive = false;
    }
    console.log(`i1: ${i1} | i2: ${i2} | diff: ${i1-i2} | safe: ${safe} | positive: ${positive}`)
  }
  return safe;
}