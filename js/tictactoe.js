'use strict';

class Tictactoe {

  /**
   * Constructor.
   *
   * @param {Object} canvas
   */
  constructor(canvas) {
    if (canvas.id !== '') {
      this.canvas = new fabric.Canvas(canvas.id)
    }

    this.init();
  }

  /**
   * Line default options getter.
   *
   * @return {Object}
   */
  get canvasLineDefaultOptions() {
    return {
      stroke: 'black',
      strokeWidth: 1,
      selectable: false,
      evented: false,
    }
  }

  /**
   * Circle default options getter.
   *
   * @return {Object}
   */
  get canvasCircleDefaulOptions() {
    return Object.assign({}, this.canvasLineDefaultOptions, {
      fill: '#fff',
      originX: 'center',
      originY: 'center',
    });
  }

  /**
   * Group default options getter.
   *
   * @return {Object}
   */
  get canvasGroupDefaultOptions() {
    return Object.assign({}, this.canvasLineDefaultOptions, {
      hasBorders: false,
      hasControls: false,
      lockMovementX: true,
      lockMovementY: true,
    });
  }

  /**
   * Initialize tictactoe.
   *
   * @return {Object}
   */
  init() {
    this
      .setCanvasSize()
      .addCanvasGroups()
      .initCanvasGroups()
      .addCanvasMouseDownEvent();
  }

  /**
   * Set canvas size.
   *
   * @param {Object} canvas
   */
  setCanvasSize() {
    // Get window width.
    var width = window.innerWidth;
    // Get window height.
    var height = window.innerHeight;
    // Get window width by orientation.
    width = height < width ? width - (width - height) : width;
    // Set canvas width.
    this.canvas.setWidth(width);
    // Set canvas height.
    this.canvas.setHeight(height);

    return this;
  }

  /**
   * Add canvas line.
   *
   * @param {Object} coordinates
   *
   * @return {Object}
   */
  addCanvasLine(coordinates) {
    return new fabric.Line(coordinates, this.canvasLineDefaultOptions);
  }

  /**
   * Add canvas circle.
   *
   * @param {Object} options
   *
   * @return {Object}
   */
  addCanvasCircle(options) {
    return new fabric.Circle(Object.assign({}, this.canvasCircleDefaulOptions, options));
  }

  /**
   * Add canvas group.
   *
   * @param {Object} group
   *
   * @return {Object}
   */  
  addCanvasGroup(group) {
    return new fabric.Group(group, this.canvasGroupDefaultOptions);
  }

  /**
   * Add canvas groups.
   *
   * @return this
   */
  addCanvasGroups() {
    const x = this.canvas.getWidth() / 3;
    const y = this.canvas.getHeight() / 3;

    this.canvas.add(
      this.addCanvasGroup([
        this.addCanvasLine([x, 0, x, y]),
        this.addCanvasLine([0, y, x, y])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 2, 0, x * 2, y]),
        this.addCanvasLine([x * 2, y, x, y])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 3, 0, x * 3, y]),
        this.addCanvasLine([x * 3, y, x * 2, y])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x, y, x, y * 2]),
        this.addCanvasLine([0, y * 2, x, y * 2])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 2, y, x * 2, y * 2]),
        this.addCanvasLine([x, y * 2, x * 2, y * 2])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 3, y, x * 3, y * 2]),
        this.addCanvasLine([x * 3, y * 2, x * 2, y * 2])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x, y * 2, x, y * 3]),
        this.addCanvasLine([0, y * 3, x, y * 3])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 2, y * 2, x * 2, y * 3]),
        this.addCanvasLine([x, y * 3, x * 2, y * 3])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 3, y * 2, x * 3, y * 3]),
        this.addCanvasLine([x * 2, y * 3, x * 3, y * 3])
      ])
    );

    return this;
  }

  addCanvasXSymbol(target) {
    const [top, left, width, height] = [
      target.top(),
      target.left(),
      target.width(),
      target.height(),
    ];

    const gap = width / 4;

    const xSymbol = this.addCanvasGroup([
      this.addCanvasLine([left + gap, top + gap, left + width - gap, top + height - gap]),
      this.addCanvasLine([left + width - gap, top + gap, left + gap, top + height - gap]),
    ]);

  }

  addCanvasOSymbol() {

  }

  /**
   * Add canvas mouse:down event.
   *
   * @return this
   */
  addCanvasMouseDownEvent() {
    this.canvas.on({
      'mouse:down': (e) => {
        console.log(e.target);
        //console.log(e.e.clientY);
      }
    });
  }

  /**
   * Initialize canvas groups.
   *
   * @return this
   */
  initCanvasGroups() {
    this.canvas.forEachObject((group, gid) => {
      group.set({
        gid: gid + 1,
        symbol: NaN,
        evented: true
      });
    });

    return this;
  }

  addCanvasCircle() {

  }

  addCanvasX() {

  }

  addCanvasSquare() {

  }

  addCanvasCircle() {

  }

  addCanvasCrossOut() {

  }



}
