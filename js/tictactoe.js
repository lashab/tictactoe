'use strict';

class TicTacToe {

  /**
   * Constructor.
   *
   * @param {Object} canvas
   */
  constructor(canvas) {
    if (canvas.id !== '') {
      fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';
      this.canvas = new fabric.Canvas(canvas.id);
      this.canvas.hoverCursor = 'default';
      this.canvas.selection = false;
      this.symbol = true;
      this.computer = false;
      this.canvasGroupsSize = 8;

      this.init();
    }
  }

  /**
   * Combinations getter.
   *
   * @return {Object}
   */
  get combinations() {
    return {
      0: [0, 1, 2],
      1: [3, 4, 5],
      2: [6, 7, 8],
      3: [0, 3, 6],
      4: [1, 4, 7],
      5: [2, 5, 8],
      6: [0, 4, 8],
      7: [2, 4, 6],
    }
  }

  /**
   * Shape default options getter.
   *
   * @return {Object}
   */
  get canvasShapeDefaultOptions() {
    return {
      stroke: 'black',
      strokeWidth: 10,
      selectable: false,
      evented: false,
    }
  }

  /**
   * Line default options getter.
   *
   * @return {Object}
   */
  get canvasLineDefaultOptions() {
    return Object.assign({}, this.canvasShapeDefaultOptions);
  }

  /**
   * Circle default options getter.
   *
   * @return {Object}
   */
  get canvasCircleDefaulOptions() {
    return Object.assign({}, this.canvasShapeDefaultOptions, {
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
    return Object.assign({}, this.canvasShapeDefaultOptions, {
      originX: 'center',
      originY: 'center',
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
   * Initialize Tic Tac Toe.
   *
   * @return {Object} this
   */
  init() {
    this
      .setCanvasSize()
      .addCanvasGroups()
      .addCanvasGroupObjectProperties()
      .addCanvasMouseDownEvent();

    return this;
  }

  /**
   * Add canvas group object properties.
   *
   * @return {Object} this
   */
  addCanvasGroupObjectProperties() {
    this.canvas.forEachObject((object, key) => {
      object.set({
        group: key,
        symbol: NaN,
        evented: true,
      });
    });

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
  addCanvasLine(coordinates, options) {
    return new fabric.Line(coordinates, Object.assign({}, this.canvasLineDefaultOptions, options));
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
  addCanvasGroup(group, options) {
    return new fabric.Group(group, Object.assign({}, this.canvasGroupDefaultOptions, options));
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
        this.addCanvasLine([x * 3, 0, x * 3, y], { opacity: 0 }),
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
        this.addCanvasLine([x * 3, y, x * 3, y * 2], { opacity: 0 }),
        this.addCanvasLine([x * 3, y * 2, x * 2, y * 2])
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x, y * 2, x, y * 3]),
        this.addCanvasLine([0, y * 3, x, y * 3], { opacity: 0 })
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 2, y * 2, x * 2, y * 3]),
        this.addCanvasLine([x, y * 3, x * 2, y * 3], { opacity: 0 })
      ]),
      this.addCanvasGroup([
        this.addCanvasLine([x * 3, y * 2, x * 3, y * 3], { opacity: 0 }),
        this.addCanvasLine([x * 2, y * 3, x * 3, y * 3], { opacity: 0 })
      ])
    );

    return this;
  }

  /**
   * Get canvas available groups.
   *
   * @param {Function} callback
   *
   * @return {Object} groups
   */
  getCanvasAvailableGroups(callback) {
    let groups = [];

    this.canvas.forEachObject((object) => {
      if ('symbol' in object && isNaN(object.symbol)) {
        if (typeof callback === 'function') {
          callback(object);
        }

        groups.push(object);
      }
    });

    return groups;
  }

  /**
   * Add canvas X symbol.
   *
   * @param {Object} target
   *
   * @return {Object} this
   */
  addCanvasXSymbol(target) {
    const [top, left, width, height, gap, center] = [
      target.getTop(),
      target.getLeft(),
      target.getWidth(),
      target.getHeight(),
      target.getWidth() / 4,
      target.getPointByOrigin('center', 'center'),
    ];

    const xSymbol = this.addCanvasGroup([
      this.addCanvasLine([left + gap, top + gap, left + width - gap, top + height - gap]),
      this.addCanvasLine([left + width - gap, top + gap, left + gap, top + height - gap]),
    ], {
      top: center.y,
      left: center.x,
    });

    this.canvas.add(this.addCanvasFadeInAnimation(xSymbol));

    return this;
  }

 /**
   * Add canvas O symbol.
   *
   * @param {Object} target
   *
   * @return {Object} this
   */
  addCanvasOSymbol(target) {
    const [center, radius] = [
      target.getPointByOrigin('center', 'center'),
      target.getWidth() / 3,
    ];

    const oSymbol = this.addCanvasCircle({
      top: center.y,
      left: center.x,
      radius: radius,
    });

    this.canvas.add(this.addCanvasFadeInAnimation(oSymbol));

    return this;
  }

 /**
   * Add canvas cross out.
   *
   * @param {Object} combination
   *
   * @return {Object} this
   */
  addCanvasCrossOut(combination) {
    const [a, b, c] = [
      combination[0],
      combination[2],
      combination[2] - combination[0],
    ];

    const [FGroup, LGroup,] = [
      this.canvas.item(a),
      this.canvas.item(b),
    ];

    const [FWGroup, LWGroup, FHGroup, LHGroup, FCGroup, LCGroup,] = [
      FGroup.getWidth() / 2.5,
      LGroup.getWidth() / 2.5,
      FGroup.getHeight() / 2.5,
      LGroup.getHeight() / 2.5,
      FGroup.getPointByOrigin('center', 'center'),
      LGroup.getPointByOrigin('center', 'center'),
    ];

    let coordinates = {};

    if (c === 2) {
      coordinates = {
        x1: FCGroup.x - FWGroup,
        y1: FCGroup.y,
        x2: LCGroup.x + LWGroup,
        y2: LCGroup.y
      };
    }
    else if (c === 4) {
      coordinates = {
        x1: FCGroup.x + FWGroup,
        y1: FCGroup.y - FHGroup,
        x2: LCGroup.x - LWGroup,
        y2: LCGroup.y + LHGroup
      };
    }
    else if (c === 6) {
      coordinates = {
        x1: FCGroup.x,
        y1: FCGroup.y - FHGroup,
        x2: LCGroup.x,
        y2: LCGroup.y + LHGroup
      };
    }
    else if (c === 8) {
      coordinates = {
        x1: FCGroup.x - FWGroup,
        y1: FCGroup.y - FHGroup,
        x2: LCGroup.x + LWGroup,
        y2: LCGroup.y + LHGroup
      };
    }

    this.canvas.add(this.addCanvasGroup([this.addCanvasLine([coordinates.x1, coordinates.y1, coordinates.x2, coordinates.y2])]));

    return this;
  }

  /**
   * Add canvas mouse:down event.
   *
   * @return {Object} this
   */
  addCanvasMouseDownEvent() {
    this.canvas.on({
      'mouse:down': (e) => {
        e.evented = e.evented || false;

        let [i, targets, win, over] = [
          this.canvasGroupsSize,
          [],
          false,
          false,
        ];

        const [target, group] = [
          e.target,
        ];

        this.symbol ? this.addCanvasXSymbol(target) : this.addCanvasOSymbol(target);

        target.set({
          symbol: this.symbol,
          evented: false,
        });

        this.getCanvasAvailableGroups((group) => {
          group.set('evented', e.evented);
        });

        while (i !== -1) {
          const symbol = this.canvas.item(i).get('symbol');

          if (isNaN(symbol)) {
            targets.push(symbol);
          }

          i--;
        }

        for (const j in this.combinations) {
          const combination = this.combinations[j];
          const a = this.canvas.item(combination[0]).get('symbol');
          const b = this.canvas.item(combination[1]).get('symbol');
          var c = this.canvas.item(combination[2]).get('symbol');
          if ((!isNaN(a) && !isNaN(b) && !isNaN(c)) && (a === b && b === c)) {
            win = true;
            this.addCanvasCrossOut(combination);
          }
        }

        if (win || (!targets.length && !win)) {
          over = true;
          this.restart();
        }

        this.symbol = !this.symbol;
        this.computer = !this.computer;

        if (this.computer && !over) {
          let availables = [];

          this.canvas.forEachObject((object) => {
            if ('symbol' in object && isNaN(object.symbol)) {
              availables.push(object.group);
            }
          });

          setTimeout(() => {
            this.canvas.trigger('mouse:down', {
              evented: true,
              target: this.canvas.item(availables[Math.floor(Math.random() * availables.length)]),
            });
          }, 1000);
        }
      }
    });

    return this;
  }

  /**
   * Restart Tic Tac Toe
   *
   * @return {Object} this
   */
  restart() {
    setTimeout(() => {
      let i = this.canvas.size() - 1;
      while (i !== this.canvasGroupsSize) {
        this.canvas.fxRemove(this.canvas.item(i));
        i--;
      }

      this.addCanvasGroupObjectProperties();

    }, 1000);

    return this;
  }

};
