// const CollisionProxy
cc.Class({
  extends: cc.Component,

  properties: {
    squareA: cc.Prefab,
    squareB: cc.Prefab,
    squareC: cc.Prefab,
    squareD: cc.Prefab,
    squareE: cc.Prefab,
    squareF: cc.Prefab,
    squareG: cc.Prefab
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let manager = cc.director.getCollisionManager()
    manager.enabled = true;
    manager.enabledDebugDraw = true;

    this.createSquare()
  },

  createSquare() {

    let squareIndex = Math.floor(Math.random() * 7)
    let SquareList = [this.squareA, this.squareB, this.squareC, this.squareD, this.squareE, this.squareF, this.squareG]
    // this.currentPrefab = cc.instantiate(this.SquareList[0])
    this.prefab = cc.instantiate(this.squareA)

    let d = this.prefab.getComponent('CollisionProxy')
    d.init(this)

    this.prefab.parent = this.node
    console.log(this.node)
    this.prefab.x = -80
    this.prefab.y = this.node.height / 2

    // 每1秒移动一次
    this.timerCount = 0

  },

  startTime() {
    // setInterval(function () {})
  },


  start() {

  },

  update(dt) {
    if (this.prefab.y <= -this.node.height / 2) {
      return
    }

    this.timerCount += dt * 10

    if (this.timerCount / 8 >= 1) {
      this.timerCount = 0
      this.prefab.y += -80
    }

  },

  onCollisionEnter(other, self) {
    self.getComponent('CollisionProxy').node.group = 'ground'
    this.createSquare()
  },

});