⚙️ What Was Fixed
This update fixes the winner determination logic in the Rock–Paper–Scissors game—making it correct, fair, and simple without changing the UI, icons, or any structural components.

🧑‍💻 What I Changed
Winner decision logic now uses move indices instead of symbols/icons, ensuring 100% correctness.

All original icons, hand symbols, and UI structure remain unchanged—the fix is entirely code-internal.

Kept the iconList (used for display) and mapped player/computer button clicks to indices:

0: Rock

1: Paper

2: Scissors

Refactored the event listeners and the calculateResult() function to use indices for both the player and computer’s choices.

🟩 Technical Explanation
Before (Buggy Logic)
Winner was determined using comparisons of emoji/symbols, leading to possible mistakes and unreadable code.

Any changes to which symbol represents which move could break the winner logic.

After (Corrected Index Logic)
On button click: Passes move index (0/1/2) to calculateResult.

For comparison:

Compares the index for player and computer directly:

javascript
if (userIndex === computerIndex)      // Draw
else if ((userIndex - computerIndex + 3) % 3 === 1)   // User wins
else                                  // Computer wins
Still uses your original iconList for displaying moves via their appropriate emoji.


📝 Summary for Reviewers
No new variables/arrays/symbols added.

No icons or UI/UX features changed.

Winner logic is now simple, efficient, and always accurate.