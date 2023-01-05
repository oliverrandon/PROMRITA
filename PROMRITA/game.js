 //PROMRITA: A Space Themed Text ADVENTURE Game
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

//state function, where the tracking of what the character has on him is
let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

//function that displays where the player is in the game/what text appears when
function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

//function that shows the player's options
function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

//function for everytime an option is selected by the player
function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}
//The above will take the current state of the player and will add everything from option.setState to it and overide anything that is already there || So if normalMode is true, but false in the option.setState returning a brand new object which we will set to our current state

//this is where the text nodes will be defined in a variable, defining the gameplay
const textNodes = [
    {
      id: 1,
      text: 'Welcome to PROMRITA, a sci-fi, space themed text ADVENTURE game... May the stars guide you! You are onboard the Spaceship PROMRITA enroute to Alpha Centauri in the year 2091. You and your crew will be the first human beings to enter another solar system. You wake up in your cryo pod as your ship enters the outter solar system of Alpha Centauri. The door of which, will not open, what do you do?',
      options: [
        {
          text: 'As an intellegent person, you try to get in contact with your crew by using your intercom sytem hooked up to your cyro suit.',
          setState: { characterIntellegence: true, characterLunatic: false },
          nextText: 2
        },
        {
          text: 'Start screaming and banging on the door like a lunatic with all your strength.',
          setState: { characterLunatic: true, characterIntellegence: false },
          nextText: 2
        }
      ]
    },
    {
      id: 2,
      text: 'The cryo door opens suddenly and your first mate, Penile Vagine is standing there looking perplexed. Sir, are you okay?',
      options: [
        {
          text: 'You state that it is merely the reanimation from porlonged cyro sleep that is getting to you and you are okay.',
          requiredState: (currentState) => currentState.characterIntellegence,
          setState: { characterIntellegence: true, characterLunatic: false },
          nextText: 3
        },
        {
          text: 'You start grunting incoherently, mumbling about puking out snails.',
          requiredState: (currentState) => currentState.characterLunatic,
          setState: { characterIntellegence: false, characterLunatic: true },
          nextText: 3
        },
        {
          text: 'You say nothing and walk right past Penile Vagine.',
          nextText: 3
        }
      ]
    },
    {
      id: 3,
      text: 'After leaving the cryo deck, you go to the command bridge where the flight crew of PROMRITA are waiting.',
      options: [
        {
          text: 'Crew, welcome to Alpha Centauri, we are to embark upon the greatest journey mankind has ever done before.',
          nextText: 4
        },
        {
          text: 'You get up on the command consol and start hopping around like a monkey and then lie down and fall asleep.',
          nextText: 5
        }
      ]
    },
    {
      id: 4,
      text: 'Your crew asks, what is the heading?.',
      options: [
        {
          text: 'You glare at your crew and state, set course for Alpha Centauri B (The planet within the habitable zone of the binary star system.Potentially even Earth-like)',
          nextText: 6
        }
      ]
    },
    {
      id: 5,
      text: 'Clearly suffering from immense cyro illness, you have become absolutely batshit insane. Your crew puts you back under and begins to explore Alpha Centauri, leaving you to be reanimated upon their return to Earth.',
      options: [
        {
          text: 'Restart',
          nextText: -1
        }
      ]
    },
    {
      id: 6,
      text: 'As you approach the planet, you begin to see that there is an immense amount of orbital debree, seamingly from bootstrap space exploration of a sentient species. But by the looks of it, the debree seems to be thousands of years old.',
      options: [
        {
          text: 'Let\'s begin an orbital analysis of the planet and see where we can best land.',
          nextText: 7
        },
        {
          text: 'You start laughing manically, it is too late once your crew notices, that you are infact sick from cyro sleep and your brain has degredated, you begin an orbital bombardment of the planet killing everything on Alpha Centauri B and in effect, the debree hits your ship killing you and your crew',
          nextText: 8
        }
      ]
    },
    {
      id: 7,
      text: 'Your crew\'s analysis of the surface showcases that there are signs of life throughout the planet but the toxicity and density of the atmosphere makes it rather difficult to identify the best landing zone, what will you choose?',
      options: [
        {
          text: 'Land in the remnants of an ancient and bygone city and begin studying the extinct sentient species.',
          nextText: 8
        },
        {
          text: 'You decide to land in what appears to be a continental sized jungle so you and your crew can begin catologuing and studying the wildlife of this planet.',
          requiredState: (currentState) => currentState.characterIntellegence,
          nextText: 8
        }
      ]
    },
    {
      id: 8,
      text: 'Work-in-Progress, game ending for the time being.',
      options: [
        {
          text: 'Congratulations. Restart.',
          nextText: -1
        }
      ]
    }
  ]

//function to call start the game, when it is loaded up
startGame()
