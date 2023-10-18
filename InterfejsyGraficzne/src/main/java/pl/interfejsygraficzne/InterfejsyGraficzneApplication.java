package pl.interfejsygraficzne;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;

import java.io.IOException;

@SpringBootApplication
public class InterfejsyGraficzneApplication {

    public static void main(String[] args) {
        SpringApplication.run(InterfejsyGraficzneApplication.class, args);
    }

    @EventListener({ApplicationReadyEvent.class})
    private void ApplicationReadyEventa() throws IOException{
//        System.out.println("Application ready. Launching Browser");
//        AutoOpenBrowserOnStartup.Browse("http://localhost:8080/swagger-ui/index.html");
    }

}
