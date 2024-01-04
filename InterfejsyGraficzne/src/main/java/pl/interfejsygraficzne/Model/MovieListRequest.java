package pl.interfejsygraficzne.Model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;


@RequiredArgsConstructor
@Getter
@Setter
public class MovieListRequest {

    @NotNull(message = "Proszę wybrać nazwę dla listy.")
    private String listName;
    @NotNull
    @Size(min = 1, message = "Proszę wybrać przynajmniej jeden film.")
    private List<Long> movieIds;

}
