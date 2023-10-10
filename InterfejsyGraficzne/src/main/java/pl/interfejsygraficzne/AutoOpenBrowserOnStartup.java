package pl.interfejsygraficzne;

import java.io.IOException;

public class AutoOpenBrowserOnStartup {
    public static void Browse(String url) throws IOException{
        var os = GetOsName();
        if(IsWindows(os)){
            Runtime rt = Runtime.getRuntime();
            rt.exec("rundll32 url.dll,FileProtocolHandler " + url);
        }
        else if(IsMac(os)){
            String command = "open " + url;
                Runtime.getRuntime().exec(command);
        }
        else if(IsLinux(os)) {
            Runtime rt = Runtime.getRuntime();
            String[] browsers = { "google-chrome", "firefox", "mozilla", "epiphany", "konqueror",
                    "netscape", "opera", "links", "lynx" };

            StringBuilder cmd = new StringBuilder();
            for (int i = 0; i < browsers.length; i++)
                if(i == 0)
                    cmd.append(String.format(    "%s \"%s\"", browsers[i], url));
                else
                    cmd.append(String.format(" || %s \"%s\"", browsers[i], url));
            rt.exec(new String[] { "sh", "-c", cmd.toString() });
        }


    }

    private static String GetOsName(){
        return System.getProperty("os.name").toLowerCase();
    }

    private static boolean IsWindows(String os){
        return os.contains("win");
    }

    private static boolean IsMac(String os){
        return os.contains("mac");
    }

    private static boolean IsLinux(String os){
        return os.contains("nix") || os.contains("nux");
    }

}
