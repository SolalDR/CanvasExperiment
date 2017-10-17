store = {
  duration: {
    type: 'range',
    val: 200,
    min: 0,
    max: 2000
  },
  ridge: {
    type: "range",
    min: 2,
    max: 32,
    val: 3
  },
  polygons: {
    type: "range",
    min: 1,
    max: 1000,
    val: 100
  },
  scale: {
    min: 1,
    max: 3
  },
  rotate: {
    type: 'range',
    min: -720,
    max: 720,
    val: 300
  },
  spread: {
    type: 'range',
    min: 0,
    max: 100,
    val: 0
  },
  opacity: {
    type: 'range',
    min: 0,
    max: 1,
    val: 0
  }
}