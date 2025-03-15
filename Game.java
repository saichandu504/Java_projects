import java.util.Scanner;

public class Game 
{
    public static void main(String[] args) 
    {
        Scanner sc = new Scanner(System.in);
        int targetnumber = 10;
        int attempts = 3;
        boolean hasWon = false;
        System.out.println("Guess the number between 1 to 100 and you have 3 attempts");
        for(int i=1; i<=attempts; i++)
        {
            System.out.println("attempt " + i + " : ");
            int guess = sc.nextInt();
            if(guess == targetnumber)
            {
                System.out.println("Congratulations! You have guessed the number");
                hasWon = true;
                break;
            }
            else if(guess < targetnumber)
            {
                System.out.println("The number is greater than " + guess);
            }
            else if(guess > targetnumber)
            {
                System.out.println("The number is less than " + guess);
            }
        }
        if(!hasWon)
        {
            System.out.println("You lost all the attempts. The number is " + targetnumber);
        }
    }
}