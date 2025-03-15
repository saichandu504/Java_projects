import java.util.Scanner;

class Game
 {
    public static void main(String args[])
     {
        Scanner sc = new Scanner(System.in);
        int targetNumber = 10; 
        int attempts = 3; 

        System.out.println("Guess the number between 1 to 100. You have " + attempts + " attempts.");

        for (int i = 1; i <= attempts; i++)
         {
            System.out.println("Attempt " + i + ": ");
            int guess = sc.nextInt();

            if (guess == targetNumber)
            {
                System.out.println("Congratulations! You won the game!");
                return; 
            } 
            else if (guess > targetNumber) 
            {
                System.out.println("Too high! Try again.");
            } 
            else 
            {
                System.out.println("Too low! Try again.");
            }
        }

        System.out.println("Sorry, you lost the game. The correct number is " + targetNumber + ".");
    
    }
}
