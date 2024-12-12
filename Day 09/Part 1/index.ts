import fs from 'node:fs';

export default function runner(input: string) {

  const fsblk: number[]= []

  let id = 0;
  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    for (let i = 0; i < data.length; i++) {
      for(let j = 0; j < parseInt(data.charAt(i)); j++) {
        if(i%2 == 0){
          fsblk.push(id)
        } else {
          fsblk.push(-1)
        }
      }
      if(i%2 == 0) id++;
    }

    for (let i = 0; i < fsblk.length; i++) {
      while(fsblk[i] === -1) {
        fsblk[i] = fsblk.pop()??-1
        if(fsblk.length === i+1) {
          fsblk.pop()
          break
        }
      }
    }

    let checksum = 0;
    fsblk.forEach((value, index) => {
      checksum += value*index
    })

    console.log(checksum)

  })
}