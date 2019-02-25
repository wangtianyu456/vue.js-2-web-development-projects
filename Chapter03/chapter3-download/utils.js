// WORLD

function getWorldRatio() {
  return 1 / 1920 * window.innerWidth
}

// GAME

// Pile
// 抽牌
function drawCard() {
  if (getDrawPileCount() === 0) {
    refillPile()
  }

  const choice = Math.round(Math.random() * (getDrawPileCount() - 1)) + 1 // 1-目前牌堆中的最后一张

  let accumulation = 0
  for (let k in state.drawPile) {
    accumulation += state.drawPile[k]
    if (choice <= accumulation) {
      // Draw the card from the pile
      state.drawPile[k]--
      return {
        id: k,
        uid: cardUid++,
        def: cards[k],
      }
    }
  }
}

// 绘制初始手牌
function drawInitialHand(player) {
  for (let i = 0; i < handSize; i++) {
    player.hand.push(drawCard())
  }
}

// 将当前的卡牌放到牌堆(或弃牌堆)中
function addCardToPile(pile, cardId) {
  // 判断当前牌堆中是否有该张牌，如果有直接++，否则将该张牌的数量初始化为1
  if (typeof pile[cardId] === 'number') {
    pile[cardId]++
  } else {
    pile[cardId] = 1
  }
}

// 当牌堆中的牌为空时，将墓场中的牌放到牌堆中，清空墓场
function refillPile() {
  Object.assign(state.drawPile, state.discardPile)
  state.discardPile = {}
}

// 牌堆中的牌总数
function getDrawPileCount() {
  let result = 0
  for (let k in state.drawPile) {
    result += state.drawPile[k]
  }
  return result
}

// Card play
// 应用卡牌效果
function applyCardEffect(card) {
  state.currentPlayer.lastPlayedCardId = card.id
  card.def.play(state.currentPlayer, state.currentOpponent)
  // Check if the stats (health, food) are not outside the boundaries
  state.players.forEach(checkStatsBounds)
}

function getLastPlayedCard(player) {
  return cards[player.lastPlayedCardId]
}

// Player

function checkStatsBounds(player) {
  // Health
  if (player.health < 0) {
    player.health = 0
  } else if (player.health > maxHealth) {
    player.health = maxHealth
  }

  // Food
  if (player.food < 0) {
    player.food = 0
  } else if (player.food > maxFood) {
    player.food = maxFood
  }
}

function checkPlayerLost(player) {
  player.dead = (player.health === 0 || player.food === 0)
}

function isOnePlayerDead() {
  return state.players.some(p => p.dead)
}