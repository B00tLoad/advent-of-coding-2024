import fs from 'node:fs';

const listOne: number[] = [];
const listTwo: number[] = [];
const listDiff: number[] = [];

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    data.split('\n').forEach(line => {
      const spLine = line.split('   ');
      if (!spLine[0] || !spLine[1]) throw new Error()
      listOne.push(parseInt(spLine[0]))
      listTwo.push(parseInt(spLine[1]))
    })

    listOne.sort((a, b) => a - b)
    listTwo.sort((a, b) => a - b)

    if (listOne.length != listTwo.length || !listOne || !listTwo) {
      throw `Different length of list \n 01: ${listOne.length}, 02: ${listTwo.length}`
    }

    for (let i = 0; i < listTwo.length; i++) {
      let diff = ((listOne[i] ?? 0) - (listTwo[i] ?? 0));
      if (diff < 0) diff *= -1
      listDiff.push(diff)
    }

    let sum = 0;
    listDiff.forEach(value => {
      sum += value
    })

    console.log(sum)
  })
}