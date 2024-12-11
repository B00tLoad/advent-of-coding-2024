import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    let sum = 0;
    data.split('\n').forEach(line => {
      const [result, equators] = line.split(": ")
      const factors = (equators??"").split(" ")
      if(calculate(parseInt(result??""), factors.map(value => parseInt(value)))) sum += parseInt(result??"")
    })
    console.log(sum)
  })
}

function calculate(result: number, factors: number[]): boolean{
  return math(result, factors, 0, 0);
}

function math(result: number, factors: number[], index: number, runningTotal: number): boolean {
  if(index === factors.length) return result === runningTotal;

  const add = math(result, factors, index+1, runningTotal+(factors[index]??1))
  const mult = math(result, factors, index+1, runningTotal*(factors[index]??1))
  const concat = math(result, factors, index+1, parseInt(runningTotal + "" + (factors[index]??1)))

  return add||mult||concat;
}