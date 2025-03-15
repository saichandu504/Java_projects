import java.util.Scanner;

class Game
{
    public static void main(String[] args)
    {
        Scanner sc = new Scanner(System.in);
        int targetnumber=10;
        int attempts=3;
        System.out.println("Guess the number between 1 and 100 and you have 3 attempts");
        for(int i=1;i<=attempts;i++)
        {
            System.out.println("attempt" + i + " : ");
            int guess = sc.nextInt();

            if(guess==targetnumber)
            {
                System.out.println("You have guessed the correct number");
                break;
            }
            else if(guess>targetnumber)
            {
                System.out.println("The number is less than " + guess);
            }
            else if(guess<targetnumber)
            {
                System.out.println("The number is greater than " + guess);
            }
    
                System.out.println("You have exhausted all the attempts and the number is " + targetnumber);
              
        }
    }
}