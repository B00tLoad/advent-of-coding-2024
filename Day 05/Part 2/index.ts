import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    const [rawRules, rawPages] = data.split('\n\n')


    var rules :Map<string, number> = new Map();

    const parsedRules = (rawRules??"").split("\n")
    parsedRules.map(pRule => {
      const [v1, v2] = pRule.split("|")
      rules.set(pRule, -1)
      rules.set(`${v2}|${v1}`, 1)
    })

    let splitPages = (rawPages??"").split("\n")
    splitPages = splitPages.filter(value => {
      const aPages = value.split(",");
      const bPages = value.split(",");


      aPages.sort((a, b) => {
        return rules.get(`${a}|${b}`)??0
      })


      return !compareArrays(aPages, bPages);
    })


    let sortedPages : string[][] = []
    splitPages.forEach(value => {
      sortedPages.push(value.split(',').sort((a, b) => rules.get(`${a}|${b}`)??0))
    })

    console.log(sortedPages)
    let sum = 0;

    sortedPages.forEach(value => {
      const mid = ((value.length-1)/2)
      console.log(mid, value[mid])
      sum += parseInt(value[mid]??"");
    })

    console.log(sum)

  })
}

function compareArrays (x: any[], y: any[]): boolean{
  return (x.length == y.length && x.every((value, index) => {
    return value === y[index];
  }))
}