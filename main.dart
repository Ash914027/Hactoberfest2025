/*
 * main.dart
 * ----------
 * A minimal Flutter app for Hacktoberfest 2025.
 * Displays a random coding quote each time you tap the button.
 *
 * Author: <Your Name>
 * Hacktoberfest 2025 Contribution
 * License: MIT
 */

import 'dart:math';
import 'package:flutter/material.dart';

void main() {
  runApp(const HacktoberfestApp());
}

class HacktoberfestApp extends StatelessWidget {
  const HacktoberfestApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Hacktoberfest 2025',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const HacktoberfestHomePage(),
    );
  }
}

class HacktoberfestHomePage extends StatefulWidget {
  const HacktoberfestHomePage({super.key});

  @override
  State<HacktoberfestHomePage> createState() => _HacktoberfestHomePageState();
}

class _HacktoberfestHomePageState extends State<HacktoberfestHomePage> {
  final List<String> _quotes = [
    "Talk is cheap. Show me the code. – Linus Torvalds",
    "Programs must be written for people to read. – Harold Abelson",
    "Simplicity is the soul of efficiency. – Austin Freeman",
    "Code is like humor. When you have to explain it, it’s bad. – Cory House",
    "Fix the cause, not the symptom. – Steve Maguire",
    "Experience is the name everyone gives to their mistakes. – Oscar Wilde",
    "Before software can be reusable it first has to be usable. – Ralph Johnson",
  ];

  String _currentQuote = "Tap the button to get a quote!";

  void _showRandomQuote() {
    setState(() {
      _currentQuote = _quotes[Random().nextInt(_quotes.length)];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.deepPurple.shade50,
      appBar: AppBar(
        title: const Text('Hacktoberfest 2025 💻'),
        backgroundColor: Colors.deepPurple,
        foregroundColor: Colors.white,
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Card(
            elevation: 8,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(16),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Icon(Icons.code_rounded, size: 60, color: Colors.deepPurple),
                  const SizedBox(height: 20),
                  Text(
                    _currentQuote,
                    textAlign: TextAlign.center,
                    style: const TextStyle(
                      fontSize: 18,
                      fontStyle: FontStyle.italic,
                      color: Colors.black87,
                    ),
                  ),
                  const SizedBox(height: 30),
                  ElevatedButton.icon(
                    onPressed: _showRandomQuote,
                    icon: const Icon(Icons.refresh),
                    label: const Text("New Quote"),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.deepPurple,
                      foregroundColor: Colors.white,
                      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
