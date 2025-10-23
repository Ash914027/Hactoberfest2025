"""
Emoji Mood Detector - simple Python CLI game.
No external libraries required.
"""

def main():
    moods = {
        "1": ("Happy", "😄 Yay! You are feeling happy! Keep smiling!"),
        "2": ("Sad", "😢 It's okay to feel sad sometimes. Take care!"),
        "3": ("Excited", "🤩 Wow! Your excitement is contagious!"),
        "4": ("Angry", "😡 Take a deep breath. Let's calm down."),
        "5": ("Relaxed", "😌 Take it easy and enjoy the moment."),
    }

    print("Welcome to Emoji Mood Detector! 🎭")
    print("How are you feeling today?")

    for key, (mood, _) in moods.items():
        print(f"{key}. {mood}")

    while True:
        choice = input("Enter the number corresponding to your mood: ").strip()
        if choice in moods:
            _, message = moods[choice]
            print(message)
            break
        else:
            print("❌ Invalid choice. Please enter a valid number.")

if __name__ == "__main__":
    main()
