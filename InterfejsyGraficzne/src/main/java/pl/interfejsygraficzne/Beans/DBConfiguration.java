package pl.interfejsygraficzne.Beans;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import pl.interfejsygraficzne.Misc.TerminalColours;

import javax.sql.DataSource;

@Configuration
public class DBConfiguration {
    private final Environment env;

    public DBConfiguration(Environment env){
        this.env = env;
    }
    @Bean
    public DataSource CreadeDbConfiguration(){
        DataSourceBuilder<?> dsb = DataSourceBuilder.create();
        String environment = env.getProperty("working.environment");

        if(environment == null || environment.isEmpty())
        {
            System.out.println(TerminalColours.ANSI_RED_BACKGROUND + "Please set environment in application.properties" + TerminalColours.ANSI_RESET);
        }
        else {
            String uri = "jdbc:mysql://maluch.mikr.us:";

            var port = env.getProperty("database.port");
            if(port == null || port.isEmpty())
                System.out.println(TerminalColours.ANSI_YELLOW_BACKGROUND + "Please set port in application.properties" + TerminalColours.ANSI_RESET);
            else
                uri += port + "/";

            //set environment
            switch (environment){
                case "dev":
                    uri += "InterfejsyTest";
                    break;
                case "prod":
                    uri += "Interfejsy";
                    break;
                case "local":
                    uri = "jdbc:mysql://localhost:3306/InterfejsyLocal";
                    break;
                default:
                    System.out.println(TerminalColours.ANSI_RED + "Not a valid environment in application.properties" + TerminalColours.ANSI_RESET);
                    break;
            }
            dsb.url(uri);

            //set password
            String password = env.getProperty("database.password");
            if(password != null && !password.isEmpty())
                dsb.password(password);
            else
                System.out.println(TerminalColours.ANSI_RED + "Please set password in application.properties" + TerminalColours.ANSI_RESET);

            //set login
            String login = env.getProperty("database.username");
            if(login != null && !login.isEmpty())
                dsb.username(login);
            else
                System.out.println(TerminalColours.ANSI_RED + "Please set username in application.properties" + TerminalColours.ANSI_RESET);
        }
        return dsb.build();
    }
}
