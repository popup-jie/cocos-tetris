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
    squareG: cc.Prefab,
    squareDis: 0
  },

  // LIFE-CYCLE CALLBACKS:

  onLoad() {
    let manager = cc.director.getCollisionManager()
    manager.enabled = true;
    manager.enabledDebugDraw = true;

    // 获取一半画布宽度
    this.nodeWidthRange = this.node.width / 2

    this.startGame()
    this.initEvent()
  },

  startGame() {
    this.enabled = true
    this.createSquare()

    this.childData = {}

    this.score = 0
  },


  // 随机创建方块
  createSquare() {

    let squareIndex = Math.floor(Math.random() * 1)
    let SquareList = [this.squareA, this.squareB, this.squareC, this.squareD, this.squareE, this.squareF, this.squareG]
    this.currentPrefab = cc.instantiate(SquareList[squareIndex])

    let d = this.currentPrefab.getComponent('CollisionProxy')
    d.init(this)

    this.currentPrefab.parent = this.node

    this.currentPrefab.y = this.node.height / 2 - this.squareDis

    console.log(this.currentPrefab)

    // 每1秒移动一次
    this.timerCount = 0
  },

  initEvent() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
  },

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
  },

  onKeyDown(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.a:
        if (this.currentPrefab.x <= -this.nodeWidthRange) {
          return
        }
        this.currentPrefab.x -= this.squareDis
        break;
      case cc.macro.KEY.d:
        if (this.currentPrefab.x + this.currentPrefab.width >= this.nodeWidthRange) {
          return
        }
        this.currentPrefab.x += this.squareDis
        break;
      case cc.macro.KEY.s:
        this.currentPrefab.y -= this.squareDis
        this.onDownKey = true
        break;
      default:
        break;
    }
  },
  onKeyUp(event) {
    switch (event.keyCode) {
      case cc.macro.KEY.s:
        this.onDownKey = false
        break;
      default:
        break;

    }
  },
  start() {

  },

  // 每一次碰撞重置直接点数据对象
  childDataHanlder() {
    this.node.children.forEach(child => {
      if (this.childData.childUUID[child.uuid]) {} else {
        this.childData.uuid = {
          childy: child.y,
          childx: child.x,
          childTarget: child
        }
      }
    })
  },

  // 处理得分
  gainScore() {
    let scoreData = {}

    for (let i in this.childData) {
      scoreData[this.childData[i].childy] = 0
      if (scoreData[this.childData[i].childy]) {
        scoreData[this.childData[i].childy]++

        // 如果当前同个Y轴上面存在 6个。即一行，则处理得分
        if (scoreData[this.childData[i].childy] == 6) {
          
        }
      } else {
        scoreData[this.childData[i].childy] = 0
      }
    }

    this.score += 10
  },

  update(dt) {
    if (this.onDownKey) {
      return
    }
    if (this.currentPrefab.y <= -this.node.height / 2) {
      return
    }

    this.timerCount += dt * 10

    if (this.timerCount / 8 >= 1) {
      // console.log(this.timerCount)
      this.timerCount = 0
      this.currentPrefab.y += -this.squareDis
    }

  },

  gameOver() {
    this.enabled = false
    this.onDestroy()
  },

  onCollisionEnter(other, self) {

    if (!this.enabled) {
      return
    }
    // 如果静态方块和头部碰撞，游戏结束
    if (self.node.groupIndex == 4 && other.node.groupIndex == 3) {
      this.gameOver()
    } else if (self.node.groupIndex == 1 && other.node.groupIndex == 2 || self.node.groupIndex == 1 && other.node.groupIndex == 4) {
      // 如果 方块和地面碰撞 或者 方块和静态方块碰撞
      this.currentPrefab = null
      this.createSquare()
      self.getComponent('CollisionProxy').node.group = 'staticSquare'
      this.childDataHanlder()
    }
  },

});