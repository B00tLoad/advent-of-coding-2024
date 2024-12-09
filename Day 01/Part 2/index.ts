import fs from 'node:fs';

const listOne: number[] = [];
const listTwo: number[] = [];
const map: Map<number, number> = new Map();

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    data.split('\n').forEach(line => {
      const spLine = line.split('   ');
      if (!spLine[0] || !spLine[1]) throw new Error()
      listOne.push(parseInt(spLine[0]))
      listTwo.push(parseInt(spLine[1]))
    })

    for(let i = 0; i<listTwo.length; i++){
      let k = listTwo[i] ?? 0;
      let v = 0;
      if(map.has(k)) v = map.get(k) ?? 0
      v++
      map.set(k, v);
    }

    let sum = 0

    for(let i = 0; i<listOne.length; i++){
      let v = listOne[i] ?? 0
      if(!map.has(v)) continue;
      let n = v*(map.get(v)??0);

      sum += n;
    }
    console.log(sum)
  })
}