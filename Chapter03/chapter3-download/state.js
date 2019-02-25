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
            name: 'Wang Tianyu',
            // 游戏开始时的状态
            food: 10,
            health: 10,
            // 是否跳过下个回合
            skipTurn: false,
            // 跳过了上个回合
            skippedTurn: false,
            // 手牌
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        },
        {
            name: 'William',
            // 游戏开始时的状态
            food: 10,
            health: 10,
            // 是否跳过下个回合
            skipTurn: false,
            // 跳过了上个回合
            skippedTurn: false,
            // 手牌
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        }
    ],
    currentPlayerIndex: Math.round(Math.random()), // 随机使用0或1来决定谁先行动
    activeOverlay: null, // 用于保存当前显示浮层的名称，如果没有浮层则为null，用户界面，当activeOverlay没有定义时，显示hand组件
    drawPile: pile, // 玩家可以抽牌的牌堆。
    discardPile: {}, // 弃牌堆(墓场)
    canPlay:true, // 是否能操作，防止作弊,防止玩家在回合中重复出牌
    get currentPlayer() {
        return state.players[state.currentPlayerIndex]
    },
    get currentOpponentId() {
        return state.currentPlayerIndex === 0 ? 1 : 0;
    },
    get currentOpponent() {
        return state.players[state.currentOpponentId]
    },
    get currentHand() {
        return state.currentPlayer.hand
    }
}