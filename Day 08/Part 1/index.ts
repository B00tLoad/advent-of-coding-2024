import fs from 'node:fs';

type Vec2d = {x: number, y: number};



export default function runner(input: string) {

  let h: number = 0, w : number = 0

  const mapOfMaps: Map<string, Vec2d[]> = new Map();
  const listOfAntinodes : Map<string, Vec2d> = new Map()

  fs.readFile(`./${input}`, 'utf8', (err, data) => {
    if (err) throw err;
    data.split('\n').forEach((line, lineNo) => {
      if(h < lineNo) h = lineNo
      for (let colNo = 0; colNo < line.length; colNo++) {
        if(w<colNo) w = colNo
        const char = line.at(colNo)??""
        if (char === '.') continue;
        if(!mapOfMaps.has(char)) mapOfMaps.set(char, [])
        mapOfMaps.get(char)?.push({x: colNo, y: lineNo})
      }
    })
    mapOfMaps.forEach((value) => {
      for (let i = 0; i < value.length; i++) {
        for (let j = i+1; j < value.length; j++) {
          // @ts-ignore
          const locDiff: Vec2d = {x: value[i].x - value[j].x, y: value[i].y - value[j].y}
          const negLocDiff: Vec2d = negate(locDiff)

          // @ts-ignore
          const posAntiNode: Vec2d = {x: value[i].x + locDiff.x, y: value[i].y + locDiff.y}
          // @ts-ignore
          const negAntiNode: Vec2d = {x: value[j].x + negLocDiff.x, y: value[j].y + negLocDiff.y}

          addNode(posAntiNode, listOfAntinodes, h, w)
          addNode(negAntiNode, listOfAntinodes, h, w)
        }
      }
    })

    console.log('Found ' + listOfAntinodes.size + ' antinodes')
  })
}

function negate(input : Vec2d){
  return {x: input.x*-1, y: input.y*-1}
}

function addNode(node: Vec2d, list: Map<string, Vec2d>, h: number, w: number){
  if(node.x <0 || node.x>w || node.y<0 || node.y>h) return false;
  if(!list.has(JSON.stringify(node))) list.set(JSON.stringify(node), node)
  return true
}