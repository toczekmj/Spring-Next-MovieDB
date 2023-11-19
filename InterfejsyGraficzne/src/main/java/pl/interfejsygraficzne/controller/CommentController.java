package pl.interfejsygraficzne.controller;


import org.springframework.web.bind.annotation.*;
import pl.interfejsygraficzne.Model.Comment;
import pl.interfejsygraficzne.Service.CommentService;
import pl.interfejsygraficzne.Service.MovieService;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PutMapping("/movies/{id}/comments")
    public Comment addComment(@RequestBody Comment comment, @PathVariable Long id) {
        return commentService.saveComment(comment, id);
    }
    // trzeba dac endpoint w moviecontroller zeby dla danego movie wszystkie komentarze bralo
    @GetMapping("/comments")
    public List<Comment> getAllComments() {
        return commentService.getComments();
    }

    @GetMapping("/comments/{id}")
    public Comment getCommentById(@PathVariable Long id) {
        return commentService.getCommentById(id);
    }

    @GetMapping("/comments")
    public List<Comment> getCommentContaining(@RequestParam String text) {
        return commentService.getCommentContaining(text);
    }


    @DeleteMapping("/comments/{id}")
    public String deleteUser(@PathVariable Long id){
        return commentService.deleteComment(id);
    }
}
