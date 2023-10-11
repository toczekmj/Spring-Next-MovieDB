package pl.interfejsygraficzne.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ApiException {
    private int statusCode;
    private String message;
}
