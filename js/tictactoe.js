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
      this.symbol = 1;
    }

    this.init();
  }

  /**
   * Combinations getter.
   *
   * @return {Object}
   */
  get combinations() {
    return {
      1: [0, 1, 2],
      2: [3, 4, 5],
      3: [6, 7, 8],
      4: [0, 3, 6],
      5: [1, 4, 7],
      6: [2, 5, 8],
      7: [0, 4, 8],
      8: [2, 4, 6],
    }
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
   * Fade-in default options getter.
   *
   * @return {Object}
   */
  get canvasFadeInAnimationDefaultOptions() {
    return {
      from: 0.5,
      to: 1,
      duration: 200
    };
  }

  /**
   * Initialize tictactoe.
   *
   * @return {Object} this
   */
  init() {
    this
      .setCanvasSize()
      .addCanvasGroups()
      .initCanvasGroups()
      .addCanvasMouseDownEvent();

    return this;
  }

  /**
   * Set canvas size.
   *
   * @return {Object} this
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
   * Add canvas fade-in animation.
   *
   * @param {Object} target
   * @param {Object} options
   *
   * @return {Object} target
   */ 
  addCanvasFadeInAnimation(target, options = this.canvasFadeInAnimationDefaultOptions) {
    target.set('opacity', options.from);
    target.animate('opacity', options.to, {
      duration: options.duration,
      onChange: this.canvas.renderAll.bind(this.canvas)
    });

    return target;
  }

  /**
   * Add canvas groups.
   *
   * @return {Object} this
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

  /**
   * Add canvas X symbol.
   *
   * @param {Object} target
   *
   * @return {void}
   */
  addCanvasXSymbol(target) {
    const [top, left, width, height, gap] = [
      target.getTop(),
      target.getLeft(),
      target.getWidth(),
      target.getHeight(),
      target.getWidth() / 4,
    ];

    const xSymbol = this.addCanvasGroup([
      this.addCanvasLine([left + gap, top + gap, left + width - gap, top + height - gap]),
      this.addCanvasLine([left + width - gap, top + gap, left + gap, top + height - gap]),
    ]);

    this.canvas.add(this.addCanvasFadeInAnimation(xSymbol));
  }

 /**
   * Add canvas O symbol.
   *
   * @param {Object} target
   *
   * @return {void}
   */
  addCanvasOSymbol(target) {
    const [center, radius] = [
      target.getPointByOrigin('center', 'center'),
      target.getWidth() / 3,
    ];

    const oSymbol = this.addCanvasCircle({
      top: center.x,
      left: center.y,
      radius: radius,
    });

    this.canvas.add(this.addCanvasFadeInAnimation(oSymbol));
  }

  /**
   * Add canvas mouse:down event.
   *
   * @return this
   */
  addCanvasMouseDownEvent() {
    this.canvas.on({
      'mouse:down': (e) => {
        const target = e.target;
        let targets = [];
        // Get target group id.
        const gid = target.get('gid');
        //const target = e.target;

        if (this.symbol === 1) {
          this.addCanvasXSymbol(target);
        }
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


}
