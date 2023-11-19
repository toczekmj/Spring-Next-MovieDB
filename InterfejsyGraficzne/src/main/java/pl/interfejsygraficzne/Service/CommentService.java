package pl.interfejsygraficzne.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.interfejsygraficzne.Model.Comment;
import pl.interfejsygraficzne.Model.Movie;
import pl.interfejsygraficzne.Repository.ICommentRepository;
import pl.interfejsygraficzne.Repository.IMovieRepository;

import java.util.List;

@Service
@Transactional
public class CommentService {

    private final ICommentRepository commentRepository;
    private final IMovieRepository movieRepository;

    public CommentService(ICommentRepository repository, IMovieRepository movieRepository) {
        this.commentRepository = repository;
        this.movieRepository = movieRepository;
    }

    public Comment saveComment(Comment comment, Long id){
        Movie movie = movieRepository.findById(id).orElse(null);
        comment.setMovie(movie);
        movie.addComment(comment);
        movieRepository.save(movie);
        return commentRepository.save(comment);
    }

    public List<Comment> getComments() {
        return commentRepository.findAll();
    }

    public Comment getCommentById(Long id) {
        return commentRepository.findById(id).orElse(null);
    }

    public List<Comment> getCommentContaining(String text) {
        return commentRepository.findCommentsByTextContaining(text);
    }

    public String deleteComment(Long id) {
        commentRepository.deleteById(id);
        return "Comment " + id + " removed";
    }
}
