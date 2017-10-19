const LINE_DRAW = 1; 
const POINT_DRAW = 2;
const LINE_POINT_DRAW = 3;

store = {
  side: {
    type: "range",
    min: 2,
    max: 8,
    val: 3
  },
  polygons: {
    type: "range",
    min: 1,
    max: 200,
    val: 100
  },
  scale: {
    min: 1,
    max: 2
  },
  rotate: {
    type: 'range',
    min: 0,
    max: 720,
    val: 360
  },
  spread: {
    type: 'range',
    min: 0,
    max: 300,
    val: 0
  },
  drawType: {
    type: 'select',
    vals: [
      {name: "Line draw", value: LINE_DRAW},
      {name: "Point draw", value: POINT_DRAW}
    ],
    val: LINE_DRAW
  }
  // opacity: {
  //   type: 'range',
  //   min: 0,
  //   max: 1,
  //   val: 0
  // }
}

buffers = [
  {
    name: 'Pont des Arts - St Germain',
    path: './sounds/Pont_des_arts.mp3'
  },
  {
    name: 'So Flute - St Germain',
    path: './sounds/so-flute.mp3'
  },
  {
    name: "Eastside - Ellie (Loyal x Don't) (Leo Gordy Remix)",
    path: './sounds/sound1.mp3'
  },
  {
    name: "Sittin On The Dock Of The Bay (TEEMID Edit) - Otis Redding",
    path: './sounds/sound2.mp3'
  }
]