package pl.interfejsygraficzne.exception;


public class MovieNotFoundException extends RuntimeException {

    public MovieNotFoundException() {
        super("Movie has not been found.");
    }

    public MovieNotFoundException(String message) {
        super(message);
    }
}
