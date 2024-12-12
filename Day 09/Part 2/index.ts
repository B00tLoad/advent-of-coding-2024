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

    const spaces: Map<number, number> = new Map()

    let currentIndex = 0;
    let prevSpace = false;

    for (let i = 0; i < fsblk.length; i++) {
      if(fsblk[i] === -1) {
        if(prevSpace) {
          spaces.set(currentIndex, (spaces.get(currentIndex)??0)+1)
        } else {
          currentIndex = i;
          prevSpace = true;
          spaces.set(i, 1)
        }
      } else {
        prevSpace = false
      }
    }

    let blocks: Map<number, number> = new Map()

    prevSpace = true

    for (let i = fsblk.length-1; i > -1; i--) {
      if(fsblk[i] !== fsblk[i+1]) prevSpace = true
      if(fsblk[i] !== -1) {
        if(!prevSpace) {
          blocks.set(currentIndex, (blocks.get(currentIndex)??0)+1)
        } else {
          currentIndex = i;
          prevSpace = false;
          blocks.set(currentIndex, 1)
        }
      }
    }

    console.log(spaces, blocks)

    for(let fileId = id; fileId>-1; fileId++) {
      const fileIndex = blocks.get(Array.from(blocks.keys())[fileId]??-1)??-1
      const fileSize = blocks.get(fileIndex??-1)??-1
      const freeBlockIndex = Array.from(spaces.keys())[Array.from(spaces.values()).findIndex(freeSpaceSize => freeSpaceSize>fileSize)]??-1

      if(freeBlockIndex === -1) continue

      console.log(freeBlockIndex)
      console.log(fsblk)

      for (let i = freeBlockIndex; i < freeBlockIndex + fileSize; i++) {
        fsblk[i] = fileId
      }
      const newSpace = (spaces.get(freeBlockIndex)??0)-fileSize

      spaces.delete(freeBlockIndex)
      if(newSpace > 0) spaces.set(freeBlockIndex+fileSize, newSpace)

      for (let i = 0; i < fileSize; i++) {
        fsblk[fileIndex-1+i] = -1
      }
    }

    let checksum = 0;
    fsblk.forEach((value, index) => {
      if(value === -1) return
      checksum += value*index
    })

    console.log(checksum)

  })
}