package pl.interfejsygraficzne.Misc;

public class TerminalColours {
    public static void PrintColour(String text, TColours colour){
        System.out.println(colour + text + TColours.ANSI_RESET);
    }
}
