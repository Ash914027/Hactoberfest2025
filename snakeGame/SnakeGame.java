import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import java.util.ArrayList;
import java.util.Random;

public class SnakeGame extends JPanel implements ActionListener, KeyListener {
    private static final int WIDTH = 600;
    private static final int HEIGHT = 600;
    private static final int UNIT_SIZE = 25;
    private static final int GAME_UNITS = (WIDTH * HEIGHT) / (UNIT_SIZE * UNIT_SIZE);
    private static final int DELAY = 100;
    
    private ArrayList<Point> snake;
    private Point food;
    private char direction = 'R';
    private boolean running = false;
    private Timer timer;
    private int score = 0;
    private Random random;
    
    public SnakeGame() {
        random = new Random();
        this.setPreferredSize(new Dimension(WIDTH, HEIGHT));
        this.setBackground(Color.BLACK);
        this.setFocusable(true);
        this.addKeyListener(this);
        startGame();
    }
    
    public void startGame() {
        snake = new ArrayList<>();
        snake.add(new Point(5, 5));
        snake.add(new Point(4, 5));
        snake.add(new Point(3, 5));
        spawnFood();
        running = true;
        score = 0;
        direction = 'R';
        timer = new Timer(DELAY, this);
        timer.start();
    }
    
    public void spawnFood() {
        int x = random.nextInt((int)(WIDTH / UNIT_SIZE));
        int y = random.nextInt((int)(HEIGHT / UNIT_SIZE));
        food = new Point(x, y);
        
        // Pastikan makanan tidak muncul di tubuh ular
        for (Point p : snake) {
            if (p.equals(food)) {
                spawnFood();
                return;
            }
        }
    }
    
    public void move() {
        Point head = snake.get(0);
        Point newHead = new Point(head.x, head.y);
        
        switch(direction) {
            case 'U':
                newHead.y--;
                break;
            case 'D':
                newHead.y++;
                break;
            case 'L':
                newHead.x--;
                break;
            case 'R':
                newHead.x++;
                break;
        }
        
        snake.add(0, newHead);
        
        // Cek apakah makan makanan
        if (newHead.equals(food)) {
            score += 10;
            spawnFood();
        } else {
            snake.remove(snake.size() - 1);
        }
    }
    
    public void checkCollision() {
        Point head = snake.get(0);
        
        // Cek tabrakan dengan dinding
        if (head.x < 0 || head.x >= WIDTH / UNIT_SIZE || 
            head.y < 0 || head.y >= HEIGHT / UNIT_SIZE) {
            running = false;
        }
        
        // Cek tabrakan dengan tubuh sendiri
        for (int i = 1; i < snake.size(); i++) {
            if (head.equals(snake.get(i))) {
                running = false;
            }
        }
        
        if (!running) {
            timer.stop();
        }
    }
    
    @Override
    public void paintComponent(Graphics g) {
        super.paintComponent(g);
        draw(g);
    }
    
    public void draw(Graphics g) {
        if (running) {
            // Gambar grid
            g.setColor(new Color(30, 30, 30));
            for (int i = 0; i < WIDTH / UNIT_SIZE; i++) {
                g.drawLine(i * UNIT_SIZE, 0, i * UNIT_SIZE, HEIGHT);
                g.drawLine(0, i * UNIT_SIZE, WIDTH, i * UNIT_SIZE);
            }
            
            // Gambar makanan
            g.setColor(Color.RED);
            g.fillOval(food.x * UNIT_SIZE, food.y * UNIT_SIZE, UNIT_SIZE, UNIT_SIZE);
            
            // Gambar ular
            for (int i = 0; i < snake.size(); i++) {
                if (i == 0) {
                    g.setColor(Color.GREEN);
                } else {
                    g.setColor(new Color(45, 180, 0));
                }
                g.fillRect(snake.get(i).x * UNIT_SIZE, snake.get(i).y * UNIT_SIZE, 
                          UNIT_SIZE, UNIT_SIZE);
            }
            
            // Gambar score
            g.setColor(Color.WHITE);
            g.setFont(new Font("Arial", Font.BOLD, 20));
            g.drawString("Score: " + score, 10, 25);
            
        } else {
            gameOver(g);
        }
    }
    
    public void gameOver(Graphics g) {
        // Game Over text
        g.setColor(Color.RED);
        g.setFont(new Font("Arial", Font.BOLD, 50));
        FontMetrics metrics1 = getFontMetrics(g.getFont());
        g.drawString("Game Over", (WIDTH - metrics1.stringWidth("Game Over")) / 2, HEIGHT / 2 - 50);
        
        // Score
        g.setColor(Color.WHITE);
        g.setFont(new Font("Arial", Font.BOLD, 30));
        FontMetrics metrics2 = getFontMetrics(g.getFont());
        g.drawString("Score: " + score, (WIDTH - metrics2.stringWidth("Score: " + score)) / 2, HEIGHT / 2);
        
        // Restart instruction
        g.setFont(new Font("Arial", Font.PLAIN, 20));
        FontMetrics metrics3 = getFontMetrics(g.getFont());
        g.drawString("Press SPACE to restart", (WIDTH - metrics3.stringWidth("Press SPACE to restart")) / 2, HEIGHT / 2 + 50);
    }
    
    @Override
    public void actionPerformed(ActionEvent e) {
        if (running) {
            move();
            checkCollision();
        }
        repaint();
    }
    
    @Override
    public void keyPressed(KeyEvent e) {
        switch(e.getKeyCode()) {
            case KeyEvent.VK_LEFT:
                if (direction != 'R') {
                    direction = 'L';
                }
                break;
            case KeyEvent.VK_RIGHT:
                if (direction != 'L') {
                    direction = 'R';
                }
                break;
            case KeyEvent.VK_UP:
                if (direction != 'D') {
                    direction = 'U';
                }
                break;
            case KeyEvent.VK_DOWN:
                if (direction != 'U') {
                    direction = 'D';
                }
                break;
            case KeyEvent.VK_SPACE:
                if (!running) {
                    startGame();
                }
                break;
        }
    }
    
    @Override
    public void keyReleased(KeyEvent e) {}
    
    @Override
    public void keyTyped(KeyEvent e) {}
    
    public static void main(String[] args) {
        JFrame frame = new JFrame("Snake Game");
        SnakeGame game = new SnakeGame();
        frame.add(game);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setResizable(false);
        frame.pack();
        frame.setLocationRelativeTo(null);
        frame.setVisible(true);
    }
}
