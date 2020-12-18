function deck() {
  let cards = (function() {
    let name = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"]
    let suit = ["hearts", "diamond", "clubs", "spades"]
    let value = 0
    let cards = []

    for (let i = 0; i < suit.length; i++) {
      for (let j = 0; j < name.length; j++) {
        if (j > 9) {
          value = 10
        }
        else {
          value = j + 1
        }
        cards.push(new card(value, name[j], suit[i]))
      }
    }
    return cards
  })()

  function card(value, name, suit){
    this.value = value;
    this.name = name;
    this.suit = suit;
  }

//gets the deck of cards
  this.getDeck = () => cards;

//shuffles the built-in deck of cards
  this.shuffle = () => {
    let random = 0
    let swap = cards[0]
    for (let i = 0; i < cards.length; i++) {
      random = parseInt(Math.random() * cards.length)
      swap = cards[random]
      cards[random] = cards[i]
      cards[i] = swap
    }
  }
}

let init = new (function() {
  var bank = 100;
  this.getBank = () => bank;
  this.addBank = function(change) {
    bank += change
  };
})

let newgame = new game(10)

function game(bet) {
  let count = 0;
  let cards;
  let dealer_count = 0;

  this.bet = bet
  this.play = function() {
    count = 0;
    dealer_count = 0;
    cards = new deck()
    cards.shuffle()
    cards = cards.getDeck()
    clear_div("#player-options");
    clear_div("#message-box");
    clear_div("#player-cards");
    clear_div("#npc-cards");
    options();
  }

  function options() {
    if (count > 21) {
      end(count, 0);
    }
    if (count == 21) {
      dealer_turn();
    }
    else {
      let player_options_dom = document.querySelector("#player-options")

      let hit_dom = document.createElement("div")
      hit_dom.classList.add("game-option")
      hit_dom.innerHTML = "Hit"
      hit_dom.addEventListener("click", () => {
        clear_div("#player-options")
        hit()
        options()
      })
      player_options_dom.appendChild(hit_dom)

      let stand_dom = document.createElement("stand")
      stand_dom.classList.add("game-option")
      stand_dom.innerHTML = "Stand"
      stand_dom.addEventListener("click", () => {
        clear_div("#player-options")
        dealer_turn()
        options()
      })
      player_options_dom.appendChild(stand_dom)
    }
  }

  function hit() {
    let draw = cards.pop();
    create_card(draw, "#player-cards")
    count += draw.value
  }

  function clear_div(query) {
    let div = document.querySelector(query)
    while (div.firstChild) {
      div.removeChild(div.firstChild)
    }
  }

  function create_card(card, location) {
    let card_dom = document.createElement("div")
      card_dom.classList.add("card")
      card_dom.innerHTML = card.name + "<br>" + "&" + card.suit + ";"
      console.log(card_dom)
      document.querySelector(location).appendChild(card_dom)
  }

  function dealer_turn() {
    while (dealer_count < 17) {
      let draw = cards.pop();
      create_card(draw, "#npc-cards")
      dealer_count += draw.value;
    }
    end(count, dealer_count)
  }

  function end(count, dealer_count) {
    clear_div("#player-options");
    let end_message = document.querySelector("#message-box")
    if (count > 21) {
      end_message.innerHTML = "BUST"
      return
    }
    else if (dealer_count > 21) {
      end_message.innerHTML = "Dealer BUST"
      init.addBank(bet*2)
    }
    else if (dealer_count == count) {
      end_message.innerHTML = "Push"
      init.addBank(bet)
    }
    else if (count > dealer_count) {
      end_message.innerHTML = "You Win!"
      init.addBank(bet*2)
    }
    else {
      end_message.innerHTML = "You Lose"
    }
    let play_again = document.createElement("div")
  }
}

function clear_div(query) {
  let div = document.querySelector(query)
  while (div.firstChild) {
    div.removeChild(div.firstChild)
  }
}
