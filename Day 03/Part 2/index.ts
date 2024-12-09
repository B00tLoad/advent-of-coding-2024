import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    let count = 0;

    data.split("do()").forEach(value => {
      value.split("don't()").forEach((value1, index) => {
        if(index != 0) return
        const regex = /mul\((?<a>\d{1,3}),(?<b>\d{1,3})\)/gm;

        let m;

        while ((m = regex.exec(value1)) !== null) {
          if (m.index === regex.lastIndex) {
            regex.lastIndex++;
          }

          count += parseInt(m[1]??"")*parseInt(m[2]??"")
        }
      })
    })

    console.log(count)
  })
}