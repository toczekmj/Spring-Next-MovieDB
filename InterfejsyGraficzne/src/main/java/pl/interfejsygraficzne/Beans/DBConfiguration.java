package pl.interfejsygraficzne.Beans;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

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
        if(Objects.requireNonNull(env.getProperty("working.environment")).equalsIgnoreCase("dev"))
            dsb.url("jdbc:mysql://maluch.mikr.us:40213/InterfejsyTest");
        else if(Objects.requireNonNull(env.getProperty("working.environment")).equalsIgnoreCase("prod"))
            dsb.url("jdbc:mysql://maluch.mikr.us:40213/Interfejsy");

        String password = env.getProperty("database.password");
        dsb.password(password);

        String login = env.getProperty("database.username");
        dsb.username(login);

        return dsb.build();
    }
}
