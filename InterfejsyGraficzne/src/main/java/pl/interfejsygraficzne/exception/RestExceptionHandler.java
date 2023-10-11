package pl.interfejsygraficzne.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ApiException> handleUserNotFoundException(UserNotFoundException e) {
        ApiException exceptionReponse = new ApiException(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<>(exceptionReponse, HttpStatus.NOT_FOUND);
    }


}
