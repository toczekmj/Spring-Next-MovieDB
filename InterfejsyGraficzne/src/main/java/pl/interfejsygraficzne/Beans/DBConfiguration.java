package pl.interfejsygraficzne.Beans;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import pl.interfejsygraficzne.Misc.TColours;
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
            TerminalColours.PrintColour("Please set environment in application.properties", TColours.ANSI_RED_BACKGROUND);
        }
        else {
            //here should go your mysql url
            String uri = env.getProperty("database.url");
            var port = env.getProperty("database.port");
            var name = env.getProperty("database.name");
            if(port == null || port.isEmpty())
                TerminalColours.PrintColour("Please set port in application.properties", TColours.ANSI_YELLOW_BACKGROUND);
            else if(name == null || name.isEmpty())
                TerminalColours.PrintColour("Please set database name in application.properties", TColours.ANSI_YELLOW_BACKGROUND);
            else
                uri += port + "/";

            //set environment
            switch (environment){
                case "dev":
                    uri += name + "Dev";
                    break;
                case "prod":
                    uri += name;
                    break;
                case "local":
                    uri += name + "Local";
                    break;
                default:
                    TerminalColours.PrintColour("Not a valid environment in application.properties", TColours.ANSI_RED);
                    break;
            }
            dsb.url(uri);

            //set password
            String password = env.getProperty("database.password");
            if(password != null && !password.isEmpty())
                dsb.password(password);
            else
                TerminalColours.PrintColour("Please set password in application.properties", TColours.ANSI_RED);

            //set login
            String login = env.getProperty("database.username");
            if(login != null && !login.isEmpty())
                dsb.username(login);
            else
                TerminalColours.PrintColour("Please set username in application.properties", TColours.ANSI_RED);
        }
        return dsb.build();
    }
}
