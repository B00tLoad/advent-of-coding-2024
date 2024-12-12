import fs from 'node:fs';

export default function runner(input: string) {
  fs.readFile(`./${input}`, 'utf8', async (err, data) => {
    if (err) throw err;
    let count = 0;
    let grid: string[][] = []

    data.split("\n").forEach((value, index) => {
      for (let i = 0; i < value.length; i++) {
        if (grid[i] === undefined) grid[i] = []
        if (grid[i] === undefined) throw new Error();
        // @ts-ignore
        grid[i][index] = value.charAt(i)
      }
    })

    for (let x = 0; x < grid.length; x++) {
      // @ts-ignore
      for (let y = 0; y < grid[x].length; y++) {
        const found = findWord(grid, x, y, "X")
        count+=found;
      }
    }

    console.log(count)
  })
}

function findWord(grid: string[][], x: number, y: number, char: string, dx: number = 0, dy: number = 0): number {
  // @ts-ignore
  if (x < 0 || x === grid.length || y < 0 || y === grid[x].length) {
    return 0;
  }
  // @ts-ignore
  if (grid[x][y] === char) {
    switch (char) {
      case 'X':
        let found = 0;
        for (let dX = -1; dX < 2; dX++) {
          for (let dY = -1; dY < 2; dY++) {
            if (dX === 0 && dY === 0) continue;
            if (findWord(grid, x + dX, y + dY, 'M', dX, dY) != 0) found++;
          }
        }
        return found;
      case 'M':
        return findWord(grid, x + dx, y + dy, 'A', dx, dy)
      case 'A':
        return findWord(grid, x + dx, y + dy, 'S', dx, dy)
      case 'S':
        return 1;
    }
  } else {
    return 0;
  }
  return 0;
}