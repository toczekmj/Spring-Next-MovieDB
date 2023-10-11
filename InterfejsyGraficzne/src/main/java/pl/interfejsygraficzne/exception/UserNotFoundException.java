package pl.interfejsygraficzne.exception;


public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException() {
        super("User has not been found.");
    }

    public UserNotFoundException(String message) {
        super(message);
    }
}
