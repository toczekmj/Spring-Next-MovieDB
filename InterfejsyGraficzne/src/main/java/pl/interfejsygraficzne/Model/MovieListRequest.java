package pl.interfejsygraficzne.Model;

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

    private String listName;
    private List<Long> movieIds;


}
