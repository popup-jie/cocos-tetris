cc.Class({
  extends: cc.Component,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:

  // onLoad () {},

  init(game) {
    this.game = game
  },

  start() {

  },

  onCollisionEnter(other, self) {
    // console.log(other.node.groupIndex)
    this.game.onCollisionEnter(other, self)
  },
  
  // onCollisionStay(other, self) {
  //   console.log('现在正在有交集');
  // },
  // onCollisionExit(other, self) {
  //   console.log('现在刚离开')
  // }
  // update (dt) {},
});