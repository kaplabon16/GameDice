# diceGame
# 🎲 Non-Transitive Dice Game (Fair Play CLI)

This is a command-line based dice game built with Node.js. It allows a user to play against the computer using customizable dice, while ensuring fairness using HMAC (Hash-based Message Authentication Code).

---

## 🚀 How to Run

```bash
node game.js 1,2,3,4,5,6 6,5,4,3,2,1 2,2,3,4,5,6

Gameplay Flow
Computer selects a die secretly.
A fair random roll is committed using HMAC.
Player chooses a die (excluding computer's).
Dice are rolled — winner is shown.
HMAC is revealed to verify fairness.

Features
Custom number of dice and values
HMAC-based fair random generation
CLI-based interactive gameplay
Modular structure for easy understanding
📂 File Structure

game.js → Main entry point
inputParser.js → Parses dice input
fairRandom.js → Generates and verifies HMAC
menu.js → Handles CLI menu
utils.js → Comparison and validation functions

Example
$ node game.js 2,4,6,8,10,12 1,3,5,7,9,11 3,3,4,5,6,7

HMAC: a83f29...

Available Dice:
Dice 0: [2, 4, 6, 8, 10, 12]
Dice 2: [3, 3, 4, 5, 6, 7]

Pick your dice: 2

Computer chose Dice 1: [1, 3, 5, 7, 9, 11]
You chose Dice 2: [3, 3, 4, 5, 6, 7]
Computer rolled: 5
You rolled: 6
You win!
(HMAC matched)

Author
Kaushik Plabon
GitHub: @kaplabon16

# GameDice
# GameDice
