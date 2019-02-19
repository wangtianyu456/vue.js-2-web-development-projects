// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
  // World 世界
  worldRatio: getWorldRatio(),
  // Game 游戏
  turn: 1, // 第几轮
  players: [ // 玩家
    {
      name: 'Wang Tianyu'
    },
    {
      name: 'William'
    }
  ],
  currentPlayerIndex: Math.round(Math.random()), // 随机使用0或1来决定谁先行动
  testHand: [],
  activeOverlay: null // 用户界面，当activeOverlay没有定义时，显示hand组件
}