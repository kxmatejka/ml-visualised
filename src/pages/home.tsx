import React, {useState, FC} from 'react'
import {Stage, Layer, Rect, Circle} from 'react-konva'

const CANVAS_WIDTH = 500
const CANVAS_HEIGHT = 500

interface Point {
  x: number,
  y: number,
}

const Point: FC<{point: Point}> = ({point}) => {
  return <Circle radius={5} x={point.x} y={point.y} fill={'#2d9cf1'}/>
}

export const Home = () => {
  const [points, setPoints] = useState<Point[]>([])

  return (
    <Stage width={CANVAS_WIDTH} height={CANVAS_HEIGHT}>
      <Layer>
        <Rect
          width={CANVAS_WIDTH} height={CANVAS_HEIGHT} fill={'#dbdbdb'}
          onClick={(e) => setPoints((points) => [...points, {x: e.evt.x, y: e.evt.y}])}/>
      </Layer>
      <Layer>
        {points.map((point, index) => <Point key={index} point={point}/>)}
      </Layer>
    </Stage>
  )
}
