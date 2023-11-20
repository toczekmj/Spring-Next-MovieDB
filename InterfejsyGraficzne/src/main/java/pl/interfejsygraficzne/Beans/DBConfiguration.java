package pl.interfejsygraficzne.Beans;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import pl.interfejsygraficzne.Misc.TerminalColours;

import javax.sql.DataSource;
import java.util.Objects;

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
            //set environment
            if(environment.equalsIgnoreCase("dev"))
                dsb.url("jdbc:mysql://maluch.mikr.us:40213/InterfejsyTest");
            else if(Objects.requireNonNull(env.getProperty("working.environment")).equalsIgnoreCase("prod"))
                dsb.url("jdbc:mysql://maluch.mikr.us:40213/Interfejsy");
            else
                System.out.println(TerminalColours.ANSI_RED + "Not a valid environment in application.properties" + TerminalColours.ANSI_RESET);

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
