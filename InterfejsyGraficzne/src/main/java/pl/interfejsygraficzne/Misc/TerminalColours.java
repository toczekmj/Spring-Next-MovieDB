package pl.interfejsygraficzne.Misc;

public class TerminalColours {
    public static void PrintColour(String text, TColours colour){
        System.out.println(colour.label + " " + text + " " + TColours.ANSI_RESET.label);
    }
}
