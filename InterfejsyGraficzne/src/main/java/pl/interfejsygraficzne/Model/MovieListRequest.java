package pl.interfejsygraficzne.Model;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;


@RequiredArgsConstructor
@Getter
@Setter
public class MovieListRequest {

    @NotNull
    private String listName;
    @NotNull
    private List<Long> movieIds;

}
